  // Your API key (same one you already have in your project)
  const API_KEY = "AIzaSyDVtoBOmEt28FAgu0LAstQ7kI1eR7EmzZY";

  // Discovery doc for Sheets API
  const DISCOVERY_DOC = "https://sheets.googleapis.com/$discovery/rest?version=v4";

  // The spreadsheet ID and range you want to read
  const SPREADSHEET_ID = "1eAhYqy0og9IEGeijDHTxvCnpQN8MD1v1FmE1TTDNGuk";
  const playersRange = "Players!A1:E3";
  const matchesRange = "Matches!A1:G22";



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
  const players = await getPlayers(); 
  const playersdiv1 = players

  const matchesFinal = await getMatches()
  console.log(matchesFinal)
//   console.log(matchesFinal)



// Print the matches in HTML. This now uses the matches imported from the spreadsheet
const container = document.getElementById("schedule")
let importData = []
matchesFinal.forEach(match => {
    const div = document.createElement("div");
    let team1img = match.team1.replace(/[^a-zA-Z0-9]/g, '') + '.png'
    let team2img = match.team2.replace(/[^a-zA-Z0-9]/g, '') + '.png'
    let show1 = ''
    let show2= ``
    // if (match.reveal === "FALSE"){
    //   show = 'display: none; gap:10px'
    // }

    if (match.reveal === "TRUE"){
      show1 = `<div class='teamInfo' style='display: flex; gap: 10px'><p>${match.team1}</p><img src="/images/TeamImages/${team1img}"></div>`
      show2 = `<div class='teamInfo'style='display: flex; gap: 10px'><p>${match.team2}</p><img src="/images/TeamImages/${team2img}"</div>`
    }

    div.className = 'match'
    div.innerHTML = `
    <h3>Match ${match.matchId}</h3>
    <h4>${match.type}</h4>
    <div id= "teams">
        <div class= 'playerTeams'>
            <p>${match.player1} will play as:</p> ${show1}
        </div>
        
        <div class= 'playerTeams'>
            <p>${match.player2} will play as:</p> ${show2}
        </div>
    </div>
        
      
    `;
  
    container.appendChild(div);


  });
//   console.log(importData)
}

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

