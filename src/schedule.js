let players = []

  // Your API key (same one you already have in your project)
  const API_KEY = "AIzaSyDVtoBOmEt28FAgu0LAstQ7kI1eR7EmzZY";

  // Discovery doc for Sheets API
  const DISCOVERY_DOC = "https://sheets.googleapis.com/$discovery/rest?version=v4";

  // The spreadsheet ID and range you want to read
  const SPREADSHEET_ID = "1eAhYqy0og9IEGeijDHTxvCnpQN8MD1v1FmE1TTDNGuk";
  const RANGE = "Players!A1:E5";

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
    range: RANGE,
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

let matches = []
const elite = filterTeams('ovr', 83, 'between', 100)
const strong = filterTeams('ovr', 81,'between', 83)
const mid = filterTeams('ovr', 75, 'between', 81)
const women = filterTeams('gender', 'Women', 'equals')
const international = filterTeams('gender', 'International', 'equals',)

const matchTypes = [
    [elite, 'Elite'],
    [strong, 'Strong'],
    [mid, 'Mid'],
    [international, 'International'],
    [women, 'Women']
]


function teamSelect(selectedType){
    let teamsList = selectedType
    let teams = []
    let team1 = (teamsList[Math.floor(Math.random()*teamsList.length)])
    selectedType.splice(teamsList.indexOf(team1), 1)
    let team2 = (teamsList[Math.floor(Math.random()*teamsList.length)])
    teamsList.push(team1)
    
    teams.push(team1, team2)

    return teams
}

function checkMatchForDupe(array, firstPlayer, secondPlayer) {
    return array.some(obj =>
        (obj._player1 === firstPlayer && obj._player2 === secondPlayer) ||
        (obj._player1 === secondPlayer && obj._player2 === firstPlayer)
    );
}

let matchId = 0

function createMatches(playersdiv1){
    let players = playersdiv1
for (let i = 0; i<players.length; i++){

    for (let x = 0; x < players.length; x++){
        if(x === i){
            continue;
        }
        // Check if the Match is  Dupe Pairing
        if (checkMatchForDupe(matches, players[i], players[x])) {
            continue;
        }
  
    let selectedType = matchTypes[Math.floor(Math.random()*matchTypes.length)]

    let teams = teamSelect(selectedType[0])
    
    let match = {type: selectedType[1], player1: players[i], team1: teams[0], player2: players[x], team2: teams[1]}

    matches.push(match)
    }}

// Print the matches in HTML
const container = document.getElementById("schedule")
matches.forEach(match => {
    const div = document.createElement("div");
    matchId += 1

    div.className = 'match'
    div.innerHTML = `
    <h3>Match ${matchId}</h3>
    <h4>${match.type}</h4>
    <div id= "teams">
        <div class= 'playerTeams'>
            <p>${match.player1.name} will play as:</p> <div class='teamInfo' style='display: none'><p>${match.team1.name}</p><img src="/images/TeamImages/${match.team1.image}"></div>
        </div>
        
        <div class= 'playerTeams'>
            <p>${match.player2.name} will play as:</p> <div class='teamInfo' style='display: none'><p>${match.team2.name}</p><img src="/images/TeamImages/${match.team2.image}"</div>
        </div>
    </div>
        <button class="revealBtn">Reveal Teams</button>
      
    `;
  
    container.appendChild(div);


  });
return matches


}

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("revealBtn")) {
        const matchDiv = e.target.closest(".match"); 
        const teams = matchDiv.querySelectorAll(".teamInfo");
        teams.forEach(team => {
            team.style.display = "flex";
            team.style.gap = "10px";
        });
    }
});

createMatches(playersdiv1)



}

  gapi.load("client", init);

//   Begin



function filterTeams(key, value1, condition, value2) {
    const teams = teamSet;
    const filteredTeams = [];

    if (condition === 'between') {
        teams.forEach(element => {
            if (element[key] >= value1 && element[key] < value2 && element.gender == 'Men') {
                filteredTeams.push(element);
            }
        });
    } else if (condition === 'equals') {
        teams.forEach(element => {
            if (element[key] === value1) {
                filteredTeams.push(element);
            }
        });
    }
    return filteredTeams;
}


