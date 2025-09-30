  // Your API key (same one you already have in your project)
  const API_KEY = "AIzaSyDVtoBOmEt28FAgu0LAstQ7kI1eR7EmzZY";

  // Discovery doc for Sheets API
  const DISCOVERY_DOC = "https://sheets.googleapis.com/$discovery/rest?version=v4";

  // The spreadsheet ID and range you want to read
  const SPREADSHEET_ID = "1eAhYqy0og9IEGeijDHTxvCnpQN8MD1v1FmE1TTDNGuk";
  const playersRange = "Players!A1:I17";
  const matchesRange = "Players!L1:U58";

  function convertToObjects(values) {
  const headers = values[0]; // first row is the keys
  return values.slice(1).map(row => {
    let obj = {};
    headers.forEach((key, i) => {
      obj[key] = row[i]; // assign property from header → value
    });
    return obj;
  });
}

let divisiontables = document.getElementById('table');
divisiontables.style.display = 'none'
let schedules = document.getElementById('schedule')
schedules.style.display = 'none'

async function getPlayers() {
  const response = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: playersRange,
  });

  const values = response.result.values;
  if (!values || values.length === 0) return [];

  return convertToObjects(values);
}

async function getMatches() {
  const response = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: matchesRange,
  });

  const values = response.result.values;
  if (!values || values.length === 0) return [];

  return convertToObjects(values);
}


// Initiate page
async function init() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  let players = await getPlayers(); 

  const matchesFinal = await getMatches()
  console.log(matchesFinal)
//   console.log(matchesFinal)



function sortPlayers() {
  players.sort((a, b) => {
    if (a.points !== b.points){
      return b.points - a.points;
    }
    return b.goaldifference - a.goaldifference;
  })
  return players
}

let sortedPlayers = sortPlayers()

let playersDiv1 = sortedPlayers.filter(player => player.div === '1');
let playersDiv2 = sortedPlayers.filter(player => player.div === '2');


console.log(playersDiv1)
console.log(playersDiv2)
// Print Tables for Div 1 and 2
playersDiv1.forEach(player =>{
  let container = document.getElementById('div1Table')
  const row = document.createElement("tr")
  row.innerHTML = `
      <th scope="row">${player.name}</th>
      <td>${player.wins}</td>
      <td>${player.draws}</td>
      <td>${player.losses}</td>
      <td>${player.goalsfor}</td>
      <td>${player.goalsagainst}</td>
      <td>${player.goaldifference}</td>
      <td>${player.points}</td>`

  container.appendChild(row)

})

playersDiv2.forEach(player =>{
  let container = document.getElementById('div2Table')
  const row = document.createElement("tr")
  row.innerHTML = `
      <th scope="row">${player.name}</th>
      <td>${player.wins}</td>
      <td>${player.draws}</td>
      <td>${player.losses}</td>
      <td>${player.goalsfor}</td>
      <td>${player.goalsagainst}</td>
      <td>${player.goaldifference}</td>
      <td>${player.points}</td>`

  container.appendChild(row)

})


// Print the matches in HTML. This now uses the matches imported from the spreadsheet

let importData = []
matchesFinal.forEach(match => {
  let container = document.getElementById("div1matches")
  const div = document.createElement("div")
  if(match.div === '2'){
    container= document.getElementById('div2matches')
  }
    let team1img = match.team1.replace(/[^a-zA-Z0-9]/g, '') + '.png'
    let team2img = match.team2.replace(/[^a-zA-Z0-9]/g, '') + '.png'
    let show1 = ''
    let show2= ``
    // if (match.reveal === "FALSE"){
    //   show = 'display: none; gap:10px'
    // }

    if (match.reveal === "TRUE"){
      show1 = `<div class='teamInfo' style=' display: flex; align-items: center; gap: 8px;'><img src="/images/TeamImages/${team1img}"><p>${match.team1}</p></div>`
      show2 = `<div class='teamInfo' style=' display: flex; align-items: center; gap: 8px;'><img src="/images/TeamImages/${team2img}"><p>${match.team2}</p></div>`
    }

    div.className = 'match'
    div.innerHTML = `
    <h3>Match ${match.matchId}</h3>
    <h3>${match.type}</h3>
      <div id="teams">
      <div class="row header">
        <div>Player</div>
        <div>Score</div>
        <div>Team</div>
      </div>
      <div class="row">
        <div>${match.player1}</div>
        <div>${match.p1score}</div>
        <div>${show1}</div>
      </div>
      <div class="row">
        <div>${match.player2}</div>
        <div>${match.p2score}</div>
        <div>${show2}</div>
      </div>
    </div>
        
      
    `;
    container.appendChild(div);

    divisiontables.style.display = 'flex'
    schedules.style.display = 'flex'
  });
//   console.log(importData)
return players
}

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("buttonDiv")) {
      const buttons = document.querySelectorAll('.buttonDiv');
      buttons.forEach(button => {
        button.style.backgroundColor = 'black';
      })
      e.target.style.backgroundColor = 'rgba(66, 66, 66, 1)';
      let div = e.target.innerHTML;
      let div1Content = [document.getElementById('tableDiv1'), document.getElementById('div1matches')]
      let div2Content = [document.getElementById('tableDiv2'), document.getElementById('div2matches')]
      switch (div) {
        case "Div 1":
          div1Content[0].style.display = "flex",
          div1Content[1].style.display = "flex", div1Content[1].style.width = "100%",
          div2Content[0].style.display = "none",
          div2Content[1].style.display = "none";
          break;
        case "Both":
          div1Content[0].style.display = "flex",
          div1Content[1].style.display = "flex", div1Content[1].style.width = "50%",
          div2Content[0].style.display = "flex",
          div2Content[1].style.display = "flex", div2Content[1].style.width = "50%";
          break;
        case "Div 2":
          div1Content[0].style.display = "none",
          div1Content[1].style.display = "none", div2Content[1].style.width = "100%",
          div2Content[0].style.display = "flex",
          div2Content[1].style.display = "flex";
      }
    }})


// document.addEventListener("click", function(e) {
//     if (e.target.classList.contains("revealBtn")) {
//         const matchDiv = e.target.closest(".match"); 
//         const teams = matchDiv.querySelectorAll(".teamInfo");
//         teams.forEach(team => {
//             team.style.display = "flex";
//             team.style.gap = "10px";
//         });
//     }
// }); <button class="revealBtn">Reveal Teams</button>


// console.log(matches)

  gapi.load("client", init);

