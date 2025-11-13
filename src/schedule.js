  // Your API key (same one you already have in your project)
  const API_KEY = "AIzaSyDVtoBOmEt28FAgu0LAstQ7kI1eR7EmzZY";

  // Discovery doc for Sheets API
  const DISCOVERY_DOC = "https://sheets.googleapis.com/$discovery/rest?version=v4";

  // The spreadsheet ID and range you want to read
  const SPREADSHEET_ID = "1eAhYqy0og9IEGeijDHTxvCnpQN8MD1v1FmE1TTDNGuk";
  const playersRange = "Players!A1:J19";
  const matchesRange = "Players!M1:V80";
  const finalsRange = "Players!A22:J28";
  const checkSchedule = "Players!B29:C30";


let mainContent = document.getElementById('main')
mainContent.style.display = 'none'
let divisiontables = document.getElementById('table');
divisiontables.style.display = 'none'
let schedules = document.getElementById('schedule')
schedules.style.display = 'none'
let clearFilterBtn = document.getElementById('filter')
clearFilterBtn.style.display = 'none'
let finalsBtn = document.getElementById("finalsFilter")
let buttonsDivs = document.getElementById('buttonsDivs')
buttonsDivs.style.display = 'none';
let finalsContainer = document.getElementById('finals')
finalsContainer.style.display = 'none'
let upComingHide = document.getElementById('upComingHide')
upComingHide.style.display = 'none'

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

function setDefault(){
    let div1 = document.getElementById('div1matches');
    let div2 = document.getElementById('div2matches');
    div1.style.cssText = "display: ''; flex-direction: column;";
    div2.style.cssText = "display: ''; flex-direction: column;";
}

setDefault()

let selectedPlayer = null

function filterMatches(e) {
  console.log('Before filtering: ' + e.dataset.div)
  let div1 = document.getElementById('div1matches');
  let div2 = document.getElementById('div2matches');
  const tagValue = e.dataset.div;
 if (selectedPlayer == e){
    clearFilter();
    selectedPlayer = null;
  } else {
  selectedPlayer = e;
  clearFilterBtn.style.display = '';
  clearFilterBtn.style.backgroundColor = 'rgba(66, 66, 66, 1)'
  
  const rows = document.querySelectorAll('#table tr');

  // Set rows background to default colour
  rows.forEach((row) => {
    row.style.backgroundColor = ''
    const text = row.textContent
    const firstLine = text.split('\n')[1];
    // console.log(firstLine)
  })

  // Set targeted row background colour
 const targetText = e.textContent.trim(); // assuming e is an element
rows.forEach(row => {
  if (row.textContent.includes(targetText)) {
    row.style.backgroundColor = 'rgba(66, 66, 66, 1)'
  }
  console.log('After filtering: ' + e.dataset.div)
});
  

  if(tagValue== 'div2'){
    div1.style.cssText = "display: none; flex-direction: column;";
    div2.style.cssText = "display: ''; flex-direction: column; width: 100%";
  } else if (tagValue== 'div1'){
    div1.style.cssText = "display: ''; flex-direction: column; width: 100%;";
    div2.style.cssText = "display: none; flex-direction: column;";
  } else {
    div1.style.cssText = "display: ''; flex-direction: column;";
    div2.style.cssText = "display: ''; flex-direction: column;";
  }
  
  matches = document.querySelectorAll('.match')
  let player = e.innerHTML
  matches.forEach((match) => {
    if(!match.textContent.includes(player)){
      match.style.display = 'none'
    } else {
      match.style.display = ''
    }
  })
}
}

function clearFilter(){
  setDefault()
  matches = document.querySelectorAll('.match');
  const rows = document.querySelectorAll('#table tr');
  // Set rows background to default colour
  rows.forEach((row) => {
    row.style.backgroundColor = ''
  })

  matches.forEach((match) => {
      match.style.display = ''

  })
  clearFilterBtn.style.display = 'none'
}



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

async function getFinalsMatches() {
  const response = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: finalsRange,
  });

  const values = response.result.values;
  if (!values || values.length === 0) return [];

  return convertToObjects(values);
}

async function getShowValue() {
  const response = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: checkSchedule,
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
  let showToggle = await getShowValue();
  let players = await getPlayers(); 
  let matchesFinal = await getMatches();
  let finalsMatches = await getFinalsMatches();
  if (showToggle[0].finals == "FALSE"){
    finalsBtn.style.display = 'none'
  }
  mainContent.style.display = ''
  buttonsDivs.style.display = ''
  
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


function displayMaintenance(){
  let buttons = document.getElementById('buttonsDivs')
  buttons.style.display = 'none';
  let container = document.getElementById('maintenance')
  container.innerHTML = `<h2>Table is under maintenance</h2>`
}


// Print Tables for Div 1 and 2
function displayTable(){
playersDiv1.forEach(player =>{
  let container = document.getElementById('div1TableData')
  const row = document.createElement("tr")
  row.innerHTML = `
      <td scope="row"><a class= 'playerName' data-div="div1">${player.name}</a></td>
      <td>${player.played}</td>
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
  let container = document.getElementById('div2TableData')
  const row = document.createElement("tr")
  row.innerHTML = `
      <td  scope="row"><a class = 'playerName' data-div="div2">${player.name}</a></td>
      <td>${player.played}</td>
      <td>${player.wins}</td>
      <td>${player.draws}</td>
      <td>${player.losses}</td>
      <td>${player.goalsfor}</td>
      <td>${player.goalsagainst}</td>
      <td>${player.goaldifference}</td>
      <td>${player.points}</td>`

  container.appendChild(row)

})}


// Print the matches in HTML. This now uses the matches imported from the spreadsheet

function displayMatches(matches){
matches.forEach(match => {
   let div1 = document.getElementById("div1matches");
   let div2 = document.getElementById("div2matches");
   let divTag = null
   let finals = document.getElementById("finals");
   let upcomingMatches = document.getElementById('upcomingMatches');
   let prefix = 'Match'
   let container = null;
   console.log(match.div)

  switch (match.div) {
    case '1':
      container = div1;
      break;
    case '2':
      container = div2
      break;
    case 'finals':
      container = finals;
      container.style.display = '';
      prefix = ''
  } ;

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
    <h3>${prefix} ${match.matchId}</h3>
    <h3>${match.type}</h3>
      <div id="teams">
      <div class="row header">
        <div>Player</div>
        <div>Score</div>
        <div>Team</div>
      </div>
      <div class="row">
        <div class= "playerName" data-div="div${match.div}">${match.player1}</div>
        <div>${match.p1score}</div>
        <div>${show1}</div>
      </div>
      <div class="row">
        <div class= "playerName" data-div="div${match.div}">${match.player2}</div>
        <div>${match.p2score}</div>
        <div>${show2}</div>
      </div>
    </div>
        
      
    `;
    if (match.reveal === "TRUE" && (!match.p1score || match.p1score.trim() === "")) {
        upComingHide.style.display = ''
          const clone = div.cloneNode(true);
          let division = document.createElement("div")
          clone.prepend(division)
          division.innerHTML = `<div><strong>Division ${match.div}</strong></div>`
          console.log(upcomingMatches);
          upcomingMatches.appendChild(clone);
    }
    container.appendChild(div);
    divisiontables.style.display = 'flex'
    schedules.style.display = 'flex'
  })};

if (showToggle[0].show == "TRUE"){
  displayTable()
  displayMatches(matchesFinal)
  console.log(showToggle[0])
} else {
  displayMaintenance()
};

if (showToggle[0].finals ==="TRUE"){
  console.log(showToggle[0].finals)
  displayMatches(finalsMatches)
  finalsBtn.style.display = '';
}
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
      let div1Content = [document.getElementById('div1Table'), document.getElementById('div1matches')]
      let div2Content = [document.getElementById('div2Table'), document.getElementById('div2matches')]
      let finals = document.getElementById('finals')
      clearFilter()
      switch (div) {
        case "Div 1":
          div1Content[0].style.display = "",
          div1Content[1].style.display = "", div1Content[1].style.width = "100%",
          div2Content[0].style.display = "none",
          div2Content[1].style.display = "none";
          finals.style.display = 'none';
          break;
        case "Both":
          div1Content[0].style.display = "",
          div1Content[1].style.display = "", div1Content[1].style.width = "50%",
          div2Content[0].style.display = "",
          div2Content[1].style.display = "", div2Content[1].style.width = "50%";
          finals.style.display = 'none';
          break;
        case "Div 2":
          div1Content[0].style.display = "none",
          div1Content[1].style.display = "none", div2Content[1].style.width = "100%",
          div2Content[0].style.display = "",
          div2Content[1].style.display = "";
          finals.style.display = 'none';
          break;
        case "Finals":
          finals.style.display = '',
          div1Content[0].style.display = 'none', div1Content[1].style.display = 'none'
          div2Content[0].style.display = 'none', div2Content[1].style.display = 'none'


      }
    }})




document.addEventListener("click", function(e) {
    if (e.target.classList.contains("playerName")) {
      filterMatches(e.target)
    }
});


  gapi.load("client", init);

