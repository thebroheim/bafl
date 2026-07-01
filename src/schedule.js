// My Global State
let players = []
let matchesRaw = []
let seasonElo = []
let allTimeElo = []
let showToggle = {}
let uniqueDivisions = []

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
                       m.div == currentFilters.division;

    const isComplete = !!m.p1score;
    const matchesStatus = currentFilters.status === 'all' || 
                          (currentFilters.status === 'complete' && isComplete) || 
                          (currentFilters.status === 'incomplete' && !isComplete);

    return matchesPlayer && matchesDiv && matchesStatus;
  });
}

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

function eloWinLoss(p1, p2) {
  const player1 = seasonElo.find(player => player.Name === p1);
  const player2 = seasonElo.find(player => player.Name === p2);

  if (!player1 || !player2) {
    console.error(`Error: One or both players (${p1}, ${p2}) not found in seasonElo.`);
    return null; // Or return [0, 0] depending on how you want to handle it
  }

  let p1Elo = Number(player1.Elo);
  let p2Elo = Number(player2.Elo);

  const p1EloGain = Math.round((p1Elo + 64 * (1 - 1 / (1 + 10**((p2Elo - p1Elo)/400)))) - p1Elo);
  const p2EloGain = Math.round((p2Elo + 64 * (1 - 1 / (1 + 10**((p1Elo - p2Elo)/400)))) - p2Elo);

  const p1EloLoss = p2EloGain; 
  const p2EloLoss = p1EloGain; 

  return [p1EloGain, p1EloLoss];
}





function displayTable(players, container, groupNumber){
  if(players.length == 0){
    // document.getElementById(`${tableDiv}`).style.display = 'none';
    return
  }

  players = sortPlayers(players, matchesRaw)
  let tableDiv = document.getElementById(container)

  let tableContainer = document.createElement("div")
  tableContainer.className="tableContainer"
  tableDiv.appendChild(tableContainer)

  let tableHeader = document.createElement("h3")
  let groupPrefix = showToggle[0].groupprefix
  tableHeader.innerHTML = `${groupPrefix} ${groupNumber}`


  tableContainer.appendChild(tableHeader)


  let table = document.createElement('table')
  table.innerHTML = `
            <thead>
            <tr>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">P</th>
              <th scope="col">W</th>
              <th scope="col">D</th>
              <th scope="col">L</th>
              <th scope="col">GF</th>
              <th scope="col">GA</th>
              <th scope="col">GD</th>
              <th scope="col">Pts</th>
            </tr>
          </thead>
          <tbody id="div2TableData">
            
          </tbody>`

  players.forEach(player =>{
    
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
    tableContainer.appendChild(table)

  })
}

function displayGroupsOfTables(players) {

  // Loop through whatever divisions were found (e.g., ['1', '2', '3', '4'])
  uniqueDivisions.forEach(divNum => {
    let playersInDiv = players.filter(player => player.div === divNum);
    displayTable(playersInDiv, 'table', divNum);

    let filterBtn = document.createElement("button")
    filterBtn.innerHTML = `${showToggle[0].groupprefix} ${divNum}`;

    filterBtn.classList.add("filterBtn");
    filterBtn.dataset.type = "division";
    filterBtn.dataset.value = divNum;
    document.getElementById("buttonsDivs").appendChild(filterBtn)
  });
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

      if (match.reveal === "TRUE" || match.context == 'misc'){
        show1 = `<div class='teamInfo' style=' display: flex; align-items: center; gap: 8px;'><img src="/images/TeamImages/${team1img}"><p>${match.p1team}</p></div>`
        show2 = `<div class='teamInfo' style=' display: flex; align-items: center; gap: 8px;'><img src="/images/TeamImages/${team2img}"><p>${match.p2team}</p></div>`
      }

      let prefix  = 'Match'

      div.className = 'match'
      div.innerHTML = `
      <div class='matchHeader'>
        <div class='matchDiv'><p>${prefix} ${match.matchId}</p><p>${showToggle[0].groupprefix} ${match.div}</p></div>
        <div>${match.type}</div>
      </div>
        <div class='matchDetails'>

          <div class="row header">
          <div>Player</div>
          <div class="scoreHeader">Score</div>
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

      if (match.reveal === "TRUE" && (match.p1score === '')) {
        document.getElementById("upcomingMatches").style.display = ""
            const clone = div.cloneNode(true);
            let division = document.createElement("div")
            clone.prepend(division)
            upcomingMatches.appendChild(clone);
            let p1EloGainLoss = eloWinLoss(match.p1, match.p2)

            const p1NameElem = clone.querySelector(`.p1Name`)
            const p2NameElem = clone.querySelector(`.p2Name`)

            // Commented out Elo Check as Elo Used for World Cup Tournament
            // if(!match.context == 'misc'){
              if (p1NameElem) {
              p1NameElem.innerHTML += `<br>(+${p1EloGainLoss[0]})`;
            }
            if (p2NameElem) {
                p2NameElem.innerHTML += `<br>(+${p1EloGainLoss[1]})`;
              }
            // }}
          
            document.getElementById("upcomingMatches").appendChild(clone)
      }
      return div  
}

function displayScheduleContainer(matchList, divNum){
  let scheduleContainer = document.getElementById("schedule")


  // Create Division Schedule Container
  divisionContainer = document.createElement("div")
  divisionContainer.className="matchesContainer"

  if(matchList.length === 0){
    return
  }

  let containerHeader = document.createElement('h3')
  containerHeader.innerHTML = `${showToggle[0].groupprefix} ${divNum}`
  divisionContainer.appendChild(containerHeader)

  matchList.forEach((match) => {
    divisionContainer.appendChild(createMatchHTML(match))
  })

  scheduleContainer.appendChild(divisionContainer)

}

function displaySchedule(allMatches){
  document.getElementById('schedule').innerHTML = ``
  if(allMatches.length == 0)[
    alert(`There are no matches to show matching the filter of:
      Player: ${currentFilters.player} || Division: ${currentFilters.division} || Status: ${currentFilters.status}
      
      Please clear filter and try again` )
  ]
  let finalsMatches = []

  uniqueDivisions.forEach((division)=> {
    displayScheduleContainer(allMatches.filter((match) => match.div == division), division)
  })


  if(showToggle[0].finals == "TRUE"){
    finalsMatches = allMatches.filter(m => m.context === 'final' || m.context === 'promplayoff');
  }
  const upcomingMatches = allMatches.filter(m=> m.reveal == 'TRUE' && (!m.p1score || m.p1score == null));
}

function sortThreeWayTie(tiedTeams, matches) {
  // 1. Create a map to hold mini-table stats for just these tied teams
  const miniTable = {};
  tiedTeams.forEach(team => {
    miniTable[team.name] = { points: 0, goalDiff: 0, goalsFor: 0 };
  });

  const tiedNames = Object.keys(miniTable);

  // 2. Filter matches where BOTH players belong to the tied group
  const directMatches = matches.filter(m => 
    tiedNames.includes(m.p1) && tiedNames.includes(m.p2)
  );

  // 3. Populate the mini-table stats
  directMatches.forEach(match => {
    const p1Stats = miniTable[match.p1];
    const p2Stats = miniTable[match.p2];

    p1Stats.goalsFor += match.p1score;
    p2Stats.goalsFor += match.p2score;
    
    p1Stats.goalDiff += (match.p1score - match.p2score);
    p2Stats.goalDiff += (match.p2score - match.p1score);

    if (match.p1score > match.p2score) {
      p1Stats.points += 3;
    } else if (match.p2score > match.p1score) {
      p2Stats.points += 3;
    } else {
      p1Stats.points += 1;
      p2Stats.points += 1;
    }
  });

  // 4. Now use the standard .sort() leveraging our pre-calculated mini-table
  return [...tiedTeams].sort((a, b) => {
    const statsA = miniTable[a.name];
    const statsB = miniTable[b.name];
    console.log("")
    console.log("Tiebreaker")
    console.log(`Player: ${a.name} Points:${statsA.points} Goal Diff:${statsA.goalDiff} Goals For${statsA.goalsFor}`)
    console.log(`Player: ${b.name} Points:${statsB.points} Goal Diff:${statsB.goalDiff} Goals For${statsB.goalsFor}`)
    

    // Tiebreaker 1: Head-to-Head Points in the mini-table
    if (statsB.points !== statsA.points) {
      console.log(`Result determined by H2H Points`)
      return statsB.points - statsA.points;
    }

    // Tiebreaker 2: Head-to-Head Goal Difference
    if (statsB.goalDiff !== statsA.goalDiff) {
      console.log(`Result determined by H2H Goal Diff`)
      return statsB.goalDiff - statsA.goalDiff;
    }

    // Tiebreaker 3: Head-to-Head Goals Scored
    if (statsB.goalsFor !== statsA.goalsFor) {
      console.log(`Result determined by H2H Points`)
      return statsB.goalsFor - statsA.goalsFor;
    }

    // Fallback: If still perfectly tied, you'd fallback to overall group stats 
    // (which you can access via a.overallGoalDiff, b.overallGoalDiff, etc.)

    console.log(`Result determined by OVR Goal Diff`)

    return (b.goaldifference || 0) - (a.goaldifference || 0);
  });
}

function sortPlayers(players, matches = []) {
  // Clean up players list first
  const validPlayers = players.filter(p => p.name && p.name.trim() !== "");
  let sortMethod = showToggle[0].tiebreaker;

  if (sortMethod === 'goaldiff') {
    return validPlayers.sort((a, b) => 
      (b.points - a.points) || (b.goaldifference - a.goaldifference)
    );
  } 


  if (sortMethod === "h2h") {
    // 1. Group players by their overall points total
    const pointsGroups = {};
    validPlayers.forEach(player => {
      const pts = player.points;
      if (!pointsGroups[pts]) {
        pointsGroups[pts] = [];
      }
      pointsGroups[pts].push(player);
    });

    

    // 2. Resolve ties within each point bucket
    let resolvedStandings = [];
    
    // Sort point values descending (e.g., [9, 6, 3, 0])
    const sortedPointKeys = Object.keys(pointsGroups).map(Number).sort((a, b) => b - a);

    sortedPointKeys.forEach(pts => {
      const tiedGroup = pointsGroups[pts];
      

      if (tiedGroup.length === 1) {
        // No tie: add player directly
        resolvedStandings.push(tiedGroup[0]);
      } else {
        // Tie detected (2, 3, or 4 players): route through your multi-way handler
        // Note: For a 3-way tie, we need to pass down the overall group goal difference 
        // to act as the fallback, matching your miniTable structure.
        const resolvedGroup = sortThreeWayTie(tiedGroup, matches);
        resolvedStandings = resolvedStandings.concat(resolvedGroup);
      }
    });

    return resolvedStandings;
  }
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
    return a.matchId - b.matchId ;
  });
}

async function loadData() {
  const res = await fetch("/.netlify/functions/getData");
  const batch = await res.json();

  let contentContainer = document.getElementById('content')
  let loadingContainer = document.getElementById('loadingState')


  
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
  uniqueDivisions = [...new Set(players.map(player => player.div))].sort().filter((division)=> division != null);

  // Now run all your existing display logic here.



matchesRaw = sortMatches(matchesRaw)
displayEloTable(seasonElo, `theSeasonEloTable`)
displayEloTable(allTimeElo, `theAllTimeEloTable`)

if (showToggle[0].show == "TRUE"){
  displayGroupsOfTables(players)
  // displayMatches(matchesFinal)
  displaySchedule(matchesRaw)
} else {
  displayMaintenance()
};


if (!showToggle[0].tournamentbracket == ""){
  let bracketContainer = document.createElement('div');
  bracketContainer.id = 'bracketImage'
  let imageSrc = showToggle[0].tournamentbracket
  bracketContainer.innerHTML = `<img src= ${imageSrc}></img>`
  let divisionTables = document.getElementById('table')
  divisionTables.appendChild(bracketContainer)
}

contentContainer.classList.remove('hidden')
loadingContainer.classList.add('hidden')

}


loadData()