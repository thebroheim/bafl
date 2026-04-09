// My Global State
let players = []
let matchesRaw = []
let seasonElo = []
let allTimeElo = []
let showToggle = {}

let currentFilters = {
  selectedElement: [],
  player: null,
  division: 'all',
  status: 'all',
}

let containers = ['eloTables', 'finals', 'upComingHide', 'schedule', 'table', 'buttonsDivs', 'miscmatches']

// hideContainers(containers)

function hideContainers(containers){
  containers.forEach((container) => {
    document.getElementById(container).style.display = 'none'
  })
}

const eloBtn = document.getElementById('eloButton');
const eloContainer = document.getElementById('eloTables');

eloBtn.addEventListener('click', () => {
  // 1. Toggle the 'hidden' class
  const isHidden = eloContainer.classList.toggle('hidden');
  
  // 2. Update the button text based on the new state
  eloBtn.textContent = isHidden ? 'Show Elo' : 'Hide Elo';

});

function getFilteredMatches() {
  return matchesRaw.filter(m => {
    const matchesPlayer = !currentFilters.player || 
                          m.p1 === currentFilters.player || 
                          m.p2 === currentFilters.player;

    const matchesDiv = currentFilters.division === 'all' || 
                       m.div === currentFilters.division;

    const isComplete = !!m.p1score;
    const matchesStatus = currentFilters.status === 'all' || 
                          (currentFilters.status === 'complete' && isComplete) || 
                          (currentFilters.status === 'incomplete' && !isComplete);

    return matchesPlayer && matchesDiv && matchesStatus;
  });
}

// 2. The Logic Engine
function updateFilter(type, value, element) {
    // A. Handle Reset
    if (type === 'clear') {
        currentFilters = { player: null, division: 'all', status: 'all' };
        // Remove ALL selected classes from the UI
        document.querySelectorAll('.filterBtn').forEach(btn => btn.classList.remove('selected'));
    } 
    
    // B. Handle Division (Exclusive: Clears Player)
    else if (type === 'division') {
        currentFilters.division = value;
        currentFilters.player = null;
        clearVisuals('player'); // Clear player highlights
        updateVisuals('division', element);
    } 
    
    // C. Handle Player (Exclusive: Clears Division)
    else if (type === 'player') {
        currentFilters.player = value;
        currentFilters.division = 'all';
        clearVisuals('division'); // Clear division highlights
        updateVisuals('player', element);
    } 
    
    // D. Handle Status (Independent: Keeps others)
    else if (type === 'status') {
        currentFilters.status = value;
        updateVisuals('status', element);
    }

    // E. Run the UI Update
    const filteredMatches = getFilteredMatches();
    displaySchedule(filteredMatches);
}

// 3. The Visual Helpers
function updateVisuals(type, element) {
    if (!element) return;
    // Remove 'selected' from any other button in THIS category
    document.querySelectorAll(`.filterBtn[data-type="${type}"]`)
            .forEach(btn => btn.classList.remove('selected'));
    
    // Add 'selected' to the one we just clicked
    element.classList.add('selected');
}

function clearVisuals(type) {
    // Specifically wipe highlights for a certain category
    document.querySelectorAll(`.filterBtn[data-type="${type}"]`)
            .forEach(btn => btn.classList.remove('selected'));
}

// 4. The Event Listener
document.addEventListener("click", function(e) {
    const btn = e.target.closest('.filterBtn'); // Use closest in case they click an <i> or span inside
    if (btn) {
        const { type, value } = btn.dataset;
        updateFilter(type, value, btn);
    }
});

function displayEloTable(data, containerId) {
  data.forEach(player => {
      let container = document.getElementById(containerId)
    const row = document.createElement("tr")
      row.innerHTML = `
        <td>${player.Name}</td>
        <td>${player.Elo}</td>`

    container.appendChild(row)
  })
}

function eloWinLoss(p1, p2){
  let p1Elo = Number(seasonElo.find(player => player.Name === p1).Elo)
  let p2Elo = Number(seasonElo.find(player => player.Name === p2).Elo)

  p1EloGain = Math.round((p1Elo + 64 * (1 - 1 / (1 + 10**((p2Elo - p1Elo)/400))))-p1Elo)
  p2EloGain = Math.round((p2Elo + 64 * (1 - 1 / (1 + 10**((p1Elo - p2Elo)/400))))-p2Elo)

  p1EloLoss = p2EloGain
  p2EloLoss = p2EloGain
  return [p1EloGain, p1EloLoss]
}

function displayTable(players, container){
  // let div1header = document.getElementById("group1Header")

  let groupPrefix = showToggle[0].groupprefix
  // div1header.innerHTML = `${groupPrefix} 1`

  players.forEach(player =>{
    let table = document.getElementById(container)
    const row = document.createElement("tr")
    row.innerHTML = `
        <td scope="row"><a class= 'playerName filterBtn' data-type= 'player' data-value="${player.name}">${player.name}</a></td>
        <td>${player.played}</td>
        <td>${player.wins}</td>
        <td>${player.draws}</td>
        <td>${player.losses}</td>
        <td>${player.goalsfor}</td>
        <td>${player.goalsagainst}</td>
        <td>${player.goaldifference}</td>
        <td>${player.points}</td>`

    table.appendChild(row)

  })
}

function createMatchHTML(match){
  const div = document.createElement("div")
  const fallBackImg = 'Default.png';

  const team1img =
    match.p1team?.trim()
      ? match.p1team.replace(/[^a-zA-Z0-9]/g, '') + '.png'
      : fallBackImg;

  const team2img =
    match.p2team?.trim()
      ? match.p2team.replace(/[^a-zA-Z0-9]/g, '') + '.png'
      : fallBackImg;

      let show1 = ''
      let show2= ``

      if (match.reveal === "TRUE"){
        show1 = `<div class='teamInfo' style=' display: flex; align-items: center; gap: 8px;'><img src="/images/TeamImages/${team1img}"><p>${match.p1team}</p></div>`
        show2 = `<div class='teamInfo' style=' display: flex; align-items: center; gap: 8px;'><img src="/images/TeamImages/${team2img}"><p>${match.p2team}</p></div>`
      }

      let prefix  = 'Match'

      div.className = 'match'
      div.innerHTML = `
      <div class='matchHeader'>
        <div class='matchDiv'><p>${prefix} ${match.matchId}</p><p>Div ${match.div}</p></div>
        <div>${match.type}</div>
      </div>
        <div class='matchDetails'>

          <div class="row header">
          <div>Player</div>
          <div>Score</div>
          <div>Team</div>
          </div>
          <div class="row">
          <div class= "playerName" class='p1Name' data-div="div${match.div}"><span class='p1Name'>${match.p1}</span></div>
          <div class='matchScore'>${match.p1score}</div>
          <div>${show1}</div>
          </div>
          <div class="row">
          <div class= "playerName" data-div="div${match.div}"><span class='p2Name'>${match.p2}</span></div>
          <div class='matchScore'>${match.p2score}</div>
          <div>${show2}</div>
          </div>
      </div>
          
        
      `;

      if (match.reveal === "TRUE" && (!match.p1score || match.p1score.trim() === "")) {
            const clone = div.cloneNode(true);
            let division = document.createElement("div")
            clone.prepend(division)
            upcomingMatches.appendChild(clone);
            let p1EloGainLoss = eloWinLoss(match.p1, match.p2)

            const p1NameElem = clone.querySelector(`.p1Name`)
            const p2NameElem = clone.querySelector(`.p2Name`)
            if (p1NameElem) {
              p1NameElem.innerHTML += `<br>(+${p1EloGainLoss[0]})`;
            }
            if (p2NameElem) {
                p2NameElem.innerHTML += `<br>(+${p1EloGainLoss[1]})`;
            }
            return clone
      }
      return div  
}

function displayScheduleContainer(matchList, containerId){
  const container = document.getElementById(containerId)
  container.innerHTML= ``;

  if(matchList.length === 0){
    container.style.display = 'none'
    return
  }
  container.style.display = '';
  matchList.forEach((match) => {
    container.appendChild(createMatchHTML(match))
  })

}

function displaySchedule(allMatches){
  if(allMatches.length == 0)[
    alert(`There are no matches to show matching the filter of:
      Player: ${currentFilters.player} || Division: ${currentFilters.division} || Status: ${currentFilters.status}
      
      Please clear filter and try again` )
  ]
  const div1Matches = allMatches.filter(m=> m.div === '1' && m.context !== 'final');
  const div2Matches = allMatches.filter(m=> m.div === '2' && m.context !== 'final');
  let finalsMatches = []
  if(showToggle[0].finals == "TRUE"){
    finalsMatches = allMatches.filter(m => m.context === 'final' || m.context === 'promplayoff');
  }

  console.log(finalsMatches)
  
  const miscMatches = allMatches.filter(m => m.context === 'misc');
  const upcomingMatches = allMatches.filter(m=> m.reveal == 'TRUE' && (!m.p1score || m.p1score.trim() === ""));

  displayScheduleContainer(div1Matches, 'div1matches')
  displayScheduleContainer(div2Matches, 'div2matches')
  displayScheduleContainer(miscMatches, 'miscmatches')
  displayScheduleContainer(finalsMatches, 'finals')
  displayScheduleContainer(upcomingMatches, 'upcomingMatches')
}

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

function sortPlayers(players) {
  return players
    .filter(p => p.name && p.name.trim() !== "") // Remove players with no name
    .sort((a, b) => (b.points - a.points) || (b.goaldifference - a.goaldifference));
}

function isMatchComplete(match) {
  // 1. Check if it's null or undefined
  if (match.p1score === null || match.p1score === undefined) {
    return false;
  }

  // 2. Convert to string and trim to check if it's just empty whitespace
  // This catches the "" from Google Sheets
  if (String(match.p1score).trim() === "") {
    return false;
  }

  // 3. If it passed those, it's a real score (even if it's 0)
  return true;
}


// Refactored Functions above

function displayMaintenance(){
  let buttons = document.getElementById('buttonsDivs')
  buttons.style.display = 'none';
  let container = document.getElementById('maintenance')
  container.innerHTML = `<h2>Table is under maintenance</h2>`
}



function sortMatches(matches) {
  return [...matches].sort((a, b) => {
    const aDone = isMatchComplete(a);
    const bDone = isMatchComplete(b);

    // 1. Sort by Completion Status first
    // If 'a' is complete and 'b' isn't, move 'b' to the top (return 1)
    if (aDone && !bDone) return -1;
    if (!aDone && bDone) return 1;

    // 2. If both have the same status, sort by Match ID (Newest first)
    return b.matchId - a.matchId;
  });
}

async function loadData() {
  const res = await fetch("/.netlify/functions/getData");
  const batch = await res.json();


  
  // The batch contains 6 valueRanges
  const [
    playersRes,
    matchesRes,
    scheduleRes,
    seasonEloRes,
    allTimeEloRes
  ] = batch.valueRanges;

  // Convert each into your object arrays
  players = convertToObjects(playersRes.values);
  matchesRaw = convertToObjects(matchesRes.values);
  showToggle = convertToObjects(scheduleRes.values);
  seasonElo = convertToObjects(seasonEloRes.values);
  allTimeElo = convertToObjects(allTimeEloRes.values);

  // Now run all your existing display logic here.
let sortedPlayers = sortPlayers(players)



let playersDiv1 = sortedPlayers.filter(player => player.div === '1');
let playersDiv2 = sortedPlayers.filter(player => player.div === '2');

matchesRaw = sortMatches(matchesRaw)
displayEloTable(seasonElo, `seasonEloTable`)
displayEloTable(allTimeElo, `allTimeEloTable`)

if (showToggle[0].show == "TRUE"){
  displayTable(playersDiv1, 'div1TableData')
  displayTable(playersDiv2, 'div2TableData')
  // displayMatches(matchesFinal)
  displaySchedule(matchesRaw)
} else {
  displayMaintenance()
};

if (!showToggle[0].tournamentbracket == ""){
  let bracketContainer = document.createElement('div');
  let imageSrc = showToggle[0].tournamentbracket
  bracketContainer.innerHTML = `<img src= ${imageSrc}></img>`

  divisiontables.appendChild(bracketContainer)
}

}


loadData()