let playersdiv2 = [
  "Alex",
  "Bass",
  "Brent",
  "Dan",
  "Dru",
  "Lachy W",
  "Oscar",
  "Sam"
]

let playersdiv1 = [
  "Ben",
  "Jade",
  "Jude",
  "Lachlan",
  "Matthew",
  "MJ",
  "Ricardo",
  "Yasin"
]

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
    // console.log(firstPlayer, secondPlayer)
    return array.some(obj =>
        (obj[1] === firstPlayer && obj[2] === secondPlayer) ||
        (obj[1] === secondPlayer && obj[2] === firstPlayer)
        
    );
}

let matchId = 0
let matches = []
function createMatches(playersdiv1){
    let players = playersdiv1
    let matchId = 0
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
    matchId = matchId + 1
    // let match = {matchId: matchId, type: selectedType[1], player1: players[i], team1: teams[0], player2: players[x], team2: teams[1]}
    let match = [selectedType[1], players[i], players[x], teams[0].name, teams[1].name]
    matches.push(match)
    }}
}

function reshuffleMatches(matches, { playerIndices = [1, 2], maxAttempts = 2000 } = {}) {
  if (!Array.isArray(matches)) throw new TypeError("matches must be an array");
  if (matches.length <= 1) return [...matches];

  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // Normalize player value to a stable string id (supports objects with id/name or plain strings)
  const playerId = (p) => {
    if (p == null) return String(p);
    if (typeof p === "object") return p.id !== undefined ? String(p.id) : p.name !== undefined ? String(p.name) : JSON.stringify(p);
    return String(p);
  };

  const getPlayers = (match) => playerIndices.map(i => playerId(match[i]));

  // Greedy randomized attempts: pick an order by always selecting a next match
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const pool = shuffle(matches);
    const out = [pool.shift()];

    let stuck = false;
    while (pool.length) {
      const lastPlayers = new Set(getPlayers(out[out.length - 1]));
      const idx = pool.findIndex(m => {
        const [p1, p2] = getPlayers(m);
        return !lastPlayers.has(p1) && !lastPlayers.has(p2);
      });

      if (idx === -1) { stuck = true; break; }
      out.push(pool.splice(idx, 1)[0]);
    }

    if (!stuck) return out;
  }

  // DFS fallback (tries all permutations with pruning) — slower but guaranteed to find solution if exists
  const n = matches.length;
  const used = new Array(n).fill(false);
  const order = new Array(n);

  const indices = Array.from({ length: n }, (_, i) => i);

  const dfs = (pos) => {
    if (pos === n) return true;
    // iterate remaining indices in random order to avoid worst-case deterministic paths
    const remaining = shuffle(indices.filter(i => !used[i]));
    for (const i of remaining) {
      if (pos > 0) {
        const lastPlayers = new Set(getPlayers(matches[order[pos - 1]]));
        const [p1, p2] = getPlayers(matches[i]);
        if (lastPlayers.has(p1) || lastPlayers.has(p2)) continue;
      }
      used[i] = true;
      order[pos] = i;
      if (dfs(pos + 1)) return true;
      used[i] = false;
    }
    return false;
  };

  if (dfs(0)) return order.map(i => matches[i]);

  // If we reach here, it's impossible to produce a sequence with zero adjacent player repeats.
  // Throw an error (caller can catch and decide to relax constraints).
  throw new Error("Couldn't rearrange matches to avoid consecutive players — constraints may be impossible.");
}


// createMatches(playersdiv1)
// let finalMatches = reshuffleMatches(matches)
// // console.log(finalMatches)

// const data = finalMatches;
// let csvContent = "data:text/csv;charset=utf-8," + data.map(e => e.join(",")).join("\n");

// const btn = document.createElement("button");
// btn.innerText = "Download CSV";

// btn.addEventListener("click", () => {
//   const encodedUri = encodeURI(csvContent);
//   const link = document.createElement("a");
//   link.setAttribute("href", encodedUri);
//   link.setAttribute("download", "my_array.csv");
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// });

// document.getElementById("downloadMatches").appendChild(btn);