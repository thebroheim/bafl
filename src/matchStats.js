function convertToObjects(values) {
  const headers = values[0];
  return values.slice(1).map(row => {
    let obj = {};
    headers.forEach((key, i) => {
      const val = row[i];
      obj[key] = (typeof val === "string" && val.trim() !== "" && !isNaN(val))
        ? Number(val)
        : val;
    });
    return obj;
  });
}

let matches = []
let hof = []
let players = []

async function loadData() {
  const res = await fetch("/.netlify/functions/getMatchData");
  const batch = await res.json();
  const [matchesRes, hofRes] = batch.valueRanges;
  matches = convertToObjects(matchesRes.values);
  hof = convertToObjects(hofRes.values);
}

async function init() {
  await loadData();

  matches.forEach(match => {
    if (!players.includes(match.p1)) players.push(match.p1);
    if (!players.includes(match.p2)) players.push(match.p2);
  });

  let seasons = []
  matches.forEach(match => {
    if (!seasons.includes(match.season)) seasons.push(match.season);
  });

  let seasonSelect = document.getElementById("seasonSelect")
  seasons = sortByValue(seasons.map(s => [s, s]), true).map(s => s[0])

  seasons.forEach(season => {
    let option = document.createElement('option')
    option.innerHTML = season
    seasonSelect.appendChild(option)
  })

  players = players.sort((a, b) => a.localeCompare(b));
  let select = document.getElementById("playerName")
  players.forEach(player => {
    let option = document.createElement('option')
    option.innerHTML = player
    select.appendChild(option)
  })

  let h2hp1 = document.getElementById("headToHeadp1")
  let h2hp2 = document.getElementById("headToHeadp2")
  players.forEach(player => {
    let optionp1 = document.createElement('option')
    let optionp2 = document.createElement('option')
    optionp1.innerHTML = player
    optionp2.innerHTML = player
    h2hp1.appendChild(optionp1)
    h2hp2.appendChild(optionp2)
  })

  // Add listeners for both Season and Misc Checkbox
  const refreshUI = () => {
    const playerSelect = document.getElementById("playerName");
    if (document.getElementById("headToHead").style.display !== 'none') {
      headToHead();
    } else if (playerSelect.value === "Overall") {
      generalStats();
    } else {
      playerStats();
    }
  };

  document.getElementById("seasonSelect").addEventListener("change", refreshUI);
  document.getElementById("miscCheck").addEventListener("change", refreshUI);
}

(async function initPage() {
  await init();
  generalStats();
})();

function getMatchesForPlayer(player, context) {
  const season = document.getElementById("seasonSelect").value;
  const showMisc = document.getElementById("miscCheck").checked;

  return matches.filter(m => {
    const playerMatch = m.p1 === player || m.p2 === player;
    const seasonMatch = season === "All" ? true : m.season === Number(season);
    const notForfeit = m.context !== 'forfeit';
    const miscCheck = showMisc || m.context !== 'misc';
    const contextMatch = context ? m.context === context : true;

    return playerMatch && seasonMatch && notForfeit && miscCheck && contextMatch;
  });
}

function getTotalMatches(player) {
  return getMatchesForPlayer(player).length;
}

function getTotalWins(player, customMatches) {
  const targetMatches = customMatches || getMatchesForPlayer(player);
  return targetMatches.filter(match => {
    if (match.p1 === player) return match.p1score > match.p2score;
    if (match.p2 === player) return match.p2score > match.p1score;
  });
}

function getTotalLosses(player, customMatches) {
  const targetMatches = customMatches || getMatchesForPlayer(player);
  return targetMatches.filter(match => {
    if (match.p1 === player) return match.p1score < match.p2score;
    if (match.p2 === player) return match.p2score < match.p1score;
  });
}

function getTotalDraws(player, customMatches) {
  const targetMatches = customMatches || getMatchesForPlayer(player);
  return targetMatches.filter(match => match.p1score === match.p2score).length;
}

function getGoalsFor(player, customMatches) {
  const targetMatches = customMatches || getMatchesForPlayer(player);
  return targetMatches.reduce((sum, match) => {
    const score = (match.p1 === player) ? match.p1score : match.p2score;
    return sum + (Number(score) || 0);
  }, 0);
}

function getGoalsAgainst(player, customMatches) {
  const targetMatches = customMatches || getMatchesForPlayer(player);
  return targetMatches.reduce((sum, match) => {
    const score = (match.p1 === player) ? match.p2score : match.p1score;
    return sum + (Number(score) || 0);
  }, 0);
}

function getGoalDifference(player) {
  return getGoalsFor(player) - getGoalsAgainst(player);
}

function getWinRate(player) {
  let total = getTotalMatches(player);
  if (total === 0) return 0;
  return ((getTotalWins(player).length / total) * 100).toFixed(1);
}

function sortByValue(arr, descending = true) {
  return arr.slice().sort((a, b) => descending ? b[1] - a[1] : a[1] - b[1]);
}

function generalStats() {
  document.getElementById('headToHeadp2').selectedIndex = 1;
  document.getElementById("search").style.display = '';
  document.getElementById("headToHead").style.display = 'none';
  let options = document.getElementById("options");
  options.children[0].style.backgroundColor = "#7979796e";
  options.children[1].style.backgroundColor = "";

  // Data for all boxes
  const winRateData = sortByValue(players.map(p => [p, getWinRate(p)]), true);
  const totalWinsData = sortByValue(players.map(p => [p, getTotalWins(p).length]), true);
  const totalMatchesData = sortByValue(players.map(p => [p, getTotalMatches(p)]), true);
  const goalDiffData = sortByValue(players.map(p => [p, getGoalDifference(p)]), true);
  const goalsForData = sortByValue(players.map(p => [p, getGoalsFor(p)]), true);

  const statsContent = document.getElementById("statsContent");
  statsContent.innerHTML = `
    <h2>Overall Stats</h2>
    <div id="statBoxes">
        <div class="statBoxSmallLeaderboard" id="winRateLB"><p><strong>Best Win Rate:</strong></p></div> 
        <div class="statBoxSmallLeaderboard" id="totalWinsLB"><p><strong>Most Wins:</strong></p></div> 
        <div class="statBoxSmallLeaderboard" id="totalMatchesLB"><p><strong>Most Matches:</strong></p></div> 
        <div class="statBoxSmallLeaderboard" id="goalDiffLB"><p><strong>Goal Difference:</strong></p></div> 
        <div class="statBoxSmallLeaderboard" id="goalsForLB"><p><strong>Goals Scored:</strong></p></div> 
    </div>
  `;

  function createLB(array, suffix = "") {
    let ol = document.createElement('ol');
    array.slice(0, 10).forEach((item, i) => {
      let li = document.createElement('li');
      li.innerHTML = `<p>${i + 1}. ${item[0]}</p><p>${item[1]}${suffix}</p>`;
      ol.appendChild(li);
    });
    return ol;
  }

  document.getElementById("winRateLB").appendChild(createLB(winRateData, "%"));
  document.getElementById("totalWinsLB").appendChild(createLB(totalWinsData));
  document.getElementById("totalMatchesLB").appendChild(createLB(totalMatchesData));
  document.getElementById("goalDiffLB").appendChild(createLB(goalDiffData));
  document.getElementById("goalsForLB").appendChild(createLB(goalsForData));
}

function playerStats() {
  const player = document.getElementById("playerName").value;
  if (player === "Overall") return generalStats();

  const statsContent = document.getElementById("statsContent");
  statsContent.innerHTML = `
    <h2>${player}'s Stats</h2>
    <div id="statBoxes">
        <div class="statBoxLarge">
            <p><strong>Matches:</strong> ${getTotalMatches(player)}</p>
            <p><strong>Wins:</strong> ${getTotalWins(player).length}</p>
            <p><strong>Losses:</strong> ${getTotalLosses(player).length}</p>
            <p><strong>Draws:</strong> ${getTotalDraws(player)}</p>
            <p><strong>Win Rate:</strong> ${getWinRate(player)}%</p>
            <p><strong>Goals For:</strong> ${getGoalsFor(player)}</p>
            <p><strong>Goals Against:</strong> ${getGoalsAgainst(player)}</p>
            <p><strong>Goal Diff:</strong> ${getGoalDifference(player)}</p>
        </div>
    </div>
  `;
}

function headToHead() {
  document.getElementById("search").style.display = 'none';
  document.getElementById("headToHead").style.display = '';
  let options = document.getElementById("options");
  options.children[1].style.backgroundColor = "#7979796e";
  options.children[0].style.backgroundColor = "";

  const p1 = document.getElementById('headToHeadp1').value;
  const p2 = document.getElementById('headToHeadp2').value;
  const statsContent = document.getElementById("statsContent");

  let h2hMatches = matches.filter(m => {
    const both = (m.p1 === p1 && m.p2 === p2) || (m.p1 === p2 && m.p2 === p1);
    return both && m.context !== 'forfeit';
  });

  if (h2hMatches.length == 0) {
    statsContent.innerHTML = `<p>No matches found</p>`;
    return;
  }

  const p1Wins = getTotalWins(p1, h2hMatches).length;
  const p2Wins = getTotalWins(p2, h2hMatches).length;
  const draws = getTotalDraws(p1, h2hMatches);

  statsContent.innerHTML = `
    <h2>Head To Head</h2>
    <div id="h2hStatsTotal">
        <div class="h2hStats"><p><strong>${p1}</strong></p><p>Wins: ${p1Wins}</p></div>
        <div class="h2hStats"><p><strong>Draws</strong></p><p>${draws}</p></div>
        <div class="h2hStats"><p><strong>${p2}</strong></p><p>Wins: ${p2Wins}</p></div>
    </div>
    <div class="h2hList" id="h2hMatchList"></div>
  `;

  let container = document.getElementById("h2hMatchList");
  h2hMatches.forEach(m => {
    let row = document.createElement('div');
    row.className = 'h2hMatch';
    let p1S = (m.p1 === p1) ? m.p1score : m.p2score;
    let p2S = (m.p1 === p1) ? m.p2score : m.p1score;
    
    if (p1S > p2S) row.style.backgroundColor = '#2bff0020';
    else if (p1S < p2S) row.style.backgroundColor = '#ff000020';
    else row.style.backgroundColor = '#fffb0020';

    row.innerHTML = `<p>S${m.season}</p><p>${p1} (${p1S})</p><p>vs</p><p>${p2} (${p2S})</p>`;
    container.appendChild(row);
  });
}