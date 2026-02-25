//   function convertToObjects(values) {
//   const headers = values[0]; // first row is the keys
//   return values.slice(1).map(row => {
//     let obj = {};
//     headers.forEach((key, i) => {
//       obj[key] = row[i]; // assign property from header → value
//     });
//     return obj;
//   });
// }

function convertToObjects(values) {
  const headers = values[0];

  return values.slice(1).map(row => {
    let obj = {};

    headers.forEach((key, i) => {
      const val = row[i];

      // Convert numbers that come in as strings
      obj[key] = (typeof val === "string" && val.trim() !== "" && !isNaN(val))
        ? Number(val)
        : val;
    });

    return obj;
  });
}

    

    function filterMatches(matches){
        const showMisc = document.getElementById("miscCheck").checked
        const filteredMatches = matches.filter(m => {
        const notForfeit = m.context !== 'forfeit';
        const miscCheck = showMisc ? true : m.context !== 'misc';
        
        return notForfeit && miscCheck;
    });
    

    return filteredMatches
    }

let matches = []
let rawMatches = []
let hof =[]
let players = []

async function loadData() {
  const res = await fetch("/.netlify/functions/getMatchData");
  const batch = await res.json();

  // The batch contains 6 valueRanges
  const [
    matchesRes,
    hofRes,
  ] = batch.valueRanges;

  rawMatches = convertToObjects(matchesRes.values);
  hof = convertToObjects(hofRes.values);
  matches = [...rawMatches].sort((a, b) => a.season - b.season)

}

async function init() {
    await loadData();
    console.log("Before Filter: " + matches.length)
    matches = filterMatches(matches)
    console.log("After Filter: " + matches.length)

// Add Players To Dropdown
matches.forEach(match => {
    if (!players.includes(match.p1)) {
        players.push(match.p1);
    }

    if (!players.includes(match.p2)) {
        players.push(match.p2);
    }
});
console.log('Players in init: '+players)

let seasons = []

matches.forEach(match => {
    if (!seasons.includes(match.season)) {
        seasons.push(match.season);
    }
});

let seasonSelect = document.getElementById("seasonSelect")
seasons = sortByValue(seasons, true)

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
});


let h2hp1 = document.getElementById("headToHeadp1")
let h2hp2 = document.getElementById("headToHeadp2")

players.forEach(player => {
    let optionp1 = document.createElement('option')
    let optionp2 = document.createElement('option')
    optionp1.innerHTML = player
    optionp2.innerHTML = player
    h2hp1.appendChild(optionp1)
    h2hp2.appendChild(optionp2)
});
}




(async function initPage() {
    await init();
    generalStats();
})();


//Required Structure For Matches
// { matchType: "strong", p1: "Nick", p2: "Ezekiel", p1score: 0, p2score: 3, p1team: "Liverpool", p2team: "Arsenal", season: 3, context: 'finals' }

const testmatches = [
  { matchType: null, p1: "Dan", p1score: 2, p2: "Lachlan", p2score: 1, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Sam", p1score: 2, p2: "David", p2score: 1, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Kelvin", p1score: 2, p2: "Alex", p2score: 2, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Lei", p1score: 5, p2: "Oscar", p2score: 1, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "David", p1score: 0, p2: "Dan", p2score: 3, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Alex", p1score: 1, p2: "Lachlan", p2score: 0, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Oscar", p1score: 0, p2: "Sam", p2score: 7, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Lei", p1score: 2, p2: "Kelvin", p2score: 1, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Dan", p1score: 3, p2: "Alex", p2score: 3, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "David", p1score: 0, p2: "Oscar", p2score: 0, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Lachlan", p1score: 3, p2: "Lei", p2score: 6, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Sam", p1score: 5, p2: "Kelvin", p2score: 2, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Oscar", p1score: 1, p2: "Dan", p2score: 0, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Alex", p1score: 1, p2: "Lei", p2score: 6, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Kelvin", p1score: 2, p2: "David", p2score: 2, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Lachlan", p1score: 0, p2: "Sam", p2score: 4, p1team: null, p2team: null, div: 1, season: 8, context: "final" },
  { matchType: null, p1: "Dan", p1score: 2, p2: "Lei", p2score: 1, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Oscar", p1score: 1, p2: "Kelvin", p2score: 1, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Alex", p1score: 0, p2: "Sam", p2score: 5, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "David", p1score: 3, p2: "Lachlan", p2score: 2, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Kelvin", p1score: 1, p2: "Dan", p2score: 3, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Sam", p1score: 8, p2: "Lei", p2score: 2, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Lachlan", p1score: 1, p2: "Oscar", p2score: 1, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "David", p1score: 1, p2: "Alex", p2score: 1, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Dan", p1score: 2, p2: "Sam", p2score: 1, p1team: null, p2team: null, div: 1, season: 8, context: "final"},
  { matchType: null, p1: "Kelvin", p1score: 1, p2: "Lachlan", p2score: 0, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Lei", p1score: 5, p2: "David", p2score: 0, p1team: null, p2team: null, div: 1, season: 8, context: null },
  { matchType: null, p1: "Oscar", p1score: 0, p2: "Alex", p2score: 3, p1team: null, p2team: null, div: 1, season: 8, context: "forfeit" },
  { matchType: null, p1: "John", p1score: 7, p2: "Ricardo", p2score: 0, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "Dru", p1score: 4, p2: "Justin", p2score: 2, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "Jude", p1score: 0, p2: "Brent", p2score: 1, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "MJ", p1score: 0, p2: "Lachy W", p2score: 3, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "Ricardo", p1score: 0, p2: "Elliot", p2score: 3, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "Brent", p1score: 2, p2: "John", p2score: 0, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "Lachy W", p1score: 0, p2: "Dru", p2score: 1, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "MJ", p1score: 2, p2: "Jude", p2score: 3, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "Elliot", p1score: 2, p2: "Justin", p2score: 0, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "Ricardo", p1score: 0, p2: "Brent", p2score: 3, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "John", p1score: 4, p2: "MJ", p2score: 1, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "Dru", p1score: 2, p2: "Jude", p2score: 2, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "Brent", p1score: 2, p2: "Elliot", p2score: 0, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "Lachy W", p1score: 3, p2: "Justin", p2score: 0, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "MJ", p1score: 0, p2: "Ricardo", p2score: 0, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "Dru", p1score: 6, p2: "John", p2score: 3, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "Elliot", p1score: 3, p2: "Lachy W", p2score: 1, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "Brent", p1score: 3, p2: "MJ", p2score: 1, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "Justin", p1score: 0, p2: "Jude", p2score: 10, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "Ricardo", p1score: 0, p2: "Dru", p2score: 8, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "MJ", p1score: 2, p2: "Elliot", p2score: 2, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "Jude", p1score: 2, p2: "Lachy W", p2score: 2, p1team: null, p2team: null, div: 2, season: 8, context: null },
  { matchType: null, p1: "Sam", p1score: 1, p2: "Dan", p2score: 0, p1team: null, p2team: null, div: 1, season: 9, context: "final" },
  { matchType: null, p1: "Alex", p1score: 2, p2: "Brent", p2score: 2, p1team: null, p2team: null, div: 1, season: 9, context: "final" },
  { matchType: null, p1: "Dan", p1score: 7, p2: "Brent", p2score: 1, p1team: null, p2team: null, div: 1, season: 9, context: "final" },
  { matchType: null, p1: "Dan", p1score: 4, p2: "Sam", p2score: 1, p1team: null, p2team: null, div: 1, season: 9, context: "final" },
  { matchType: null, p1: "Lachy W", p1score: 7, p2: "Dru", p2score: 0, p1team: null, p2team: null, div: 1, season: 9, context: "relplayoff" },
  { matchType: null, p1: "MJ", p1score: 2, p2: "Jude", p2score: 1, p1team: null, p2team: null, div: 2, season: 9, context: "promplayoff" },
  { matchType: "Women", p1: "MJ", p1score: 3, p2: "Oscar", p2score: 0, p1team: "Paris Saint-Germain", p2team: "Arsenal", div: 1, season: 11, context: "forfeit"},
  { matchType: "Strong", p1: "Lachy W", p1score: 1, p2: "Sam", p2score: 5, p1team: "Tottenham Hotspur", p2team: "Milano (AC Milan)", div: 1, season: 11, context: null },
  { matchType: "Elite", p1: "Dan", p1score: 2, p2: "Kelvin", p2score: 0, p1team: "Manchester City", p2team: "FC Bayern Munchen", div: 1, season: 11, context: null },
  { matchType: "Women", p1: "Alex", p1score: 8, p2: "Lachlan", p2score: 1, p1team: "Paris Saint-Germain", p2team: "Arsenal", div: 1, season: 11, context: null },
  { matchType: "Strong", p1: "Brent", p1score: 5, p2: "MJ", p2score: 4, p1team: "Bergamo Calcio (Atalanta)", p2team: "Atletico Madrid", div: 1, season: 11, context: null },
  { matchType: "Strong", p1: "Oscar", p1score: 0, p2: "Sam", p2score: 3, p1team: "Juventus", p2team: "Aston Villa", div: 1, season: 11, context: "forfeit" },
  { matchType: "Elite", p1: "Kelvin", p1score: 1, p2: "Lachy W", p2score: 2, p1team: "FC Bayern Munchen", p2team: "Bayer 04 Leverkusen", div: 1, season: 11, context: null },
  { matchType: "Mid", p1: "Dan", p1score: 2, p2: "Lachlan", p2score: 0, p1team: "Olympique Lyonnais", p2team: "Crystal Palace", div: 1, season: 11, context: null },
  { matchType: "Strong", p1: "Alex", p1score: 8, p2: "Brent", p2score: 3, p1team: "Newcastle United", p2team: "Juventus", div: 1, season: 11, context: null },
  { matchType: "Women", p1: "MJ", p1score: 2, p2: "Sam", p2score: 9, p1team: "FC Barcelona", p2team: "Chelsea", div: 1, season: 11, context: null },
  { matchType: "International", p1: "Kelvin", p1score: 3, p2: "Oscar", p2score: 0, p1team: "Italy", p2team: "Argentina", div: 1, season: 11, context: null },
  { matchType: "Women", p1: "Lachlan", p1score: 1, p2: "Lachy W", p2score: 3, p1team: "Chelsea", p2team: "Manchester United", div: 1, season: 11, context: null },
  { matchType: "International", p1: "Brent", p1score: 1, p2: "Dan", p2score: 2, p1team: "France", p2team: "Netherlands", div: 1, season: 11, context: null },
  { matchType: "International", p1: "Alex", p1score: 2, p2: "Sam", p2score: 1, p1team: "Germany", p2team: "Argentina", div: 1, season: 11, context: null },
  { matchType: "Elite", p1: "Kelvin", p1score: 0, p2: "MJ", p2score: 4, p1team: "Manchester City", p2team: "Real Madrid", div: 1, season: 11, context: null },
  { matchType: "Elite", p1: "Lachlan", p1score: 3, p2: "Oscar", p2score: 0, p1team: "Manchester City", p2team: "Paris Saint-Germain", div: 1, season: 11, context: null },
  { matchType: "Strong", p1: "Brent", p1score: 6, p2: "Lachy W", p2score: 2, p1team: "Fenerbahce SK", p2team: "Borussia Dortmund", div: 1, season: 11, context: null },
  { matchType: "Women", p1: "Alex", p1score: 0, p2: "Dan", p2score: 1, p1team: "Real Madrid", p2team: "Real Madrid", div: 1, season: 11, context: null },
  { matchType: "Mid", p1: "Kelvin", p1score: 1, p2: "Sam", p2score: 3, p1team: "Olympique de Marseille", p2team: "Al Hilal", div: 1, season: 11, context: null },
  { matchType: "Strong", p1: "Lachlan", p1score: 5, p2: "MJ", p2score: 2, p1team: "Chelsea", p2team: "RB Leipzig", div: 1, season: 11, context: null },
  { matchType: "Mid", p1: "Lachy W", p1score: 3, p2: "Oscar", p2score: 0, p1team: "Sevilla FC", p2team: "Everton", div: 1, season: 11, context: null },
  { matchType: "Women", p1: "Alex", p1score: 1, p2: "Kelvin", p2score: 2, p1team: "Manchester United", p2team: "Paris Saint-Germain", div: 1, season: 11, context: null },
  { matchType: "Elite", p1: "Brent", p1score: 2, p2: "Sam", p2score: 8, p1team: "Manchester City", p2team: "Bayer 04 Leverkusen", div: 1, season: 11, context: null },
  { matchType: "Mid", p1: "Dan", p1score: 11, p2: "MJ", p2score: 0, p1team: "Sporting CP", p2team: "Brentford", div: 1, season: 11, context: null },
  { matchType: "Mid", p1: "Alex", p1score: 3, p2: "Oscar", p2score: 0, p1team: "Napoli", p2team: "Real Sociedad", div: 1, season: 11, context: null },
  { matchType: "Mid", p1: "Kelvin", p1score: 0, p2: "Lachlan", p2score: 2, p1team: "Real Betis", p2team: "Al Hilal", div: 1, season: 11, context: null },
  { matchType: "Mid", p1: "Lachy W", p1score: 6, p2: "MJ", p2score: 0, p1team: "Galatasaray SK", p2team: "Fulham FC", div: 1, season: 11, context: null },
  { matchType: "International", p1: "Dan", p1score: 3, p2: "Sam", p2score: 5, p1team: "Argentina", p2team: "Portugal", div: 1, season: 11, context: null },
  { matchType: "International", p1: "Brent", p1score: 3, p2: "Oscar", p2score: 0, p1team: "Italy", p2team: "Portugal", div: 1, season: 11, context: null },
  { matchType: "Mid", p1: "Alex", p1score: 3, p2: "Lachy W", p2score: 3, p1team: "Fiorentina", p2team: "Real Sociedad", div: 1, season: 11, context: null },
  { matchType: "Mid", p1: "Lachlan", p1score: 2, p2: "Sam", p2score: 7, p1team: "Ajax", p2team: "Fiorentina", div: 1, season: 11, context: null },
  { matchType: "International", p1: "Dan", p1score: 3, p2: "Oscar", p2score: 0, p1team: "Portugal", p2team: "Argentina", div: 1, season: 11, context: null },
  { matchType: "Elite", p1: "Brent", p1score: null, p2: "Kelvin", p2score: null, p1team: "FC Barcelona", p2team: "Bayer 04 Leverkusen", div: 1, season: 11, context: null },
  { matchType: "Women", p1: "Alex", p1score: null, p2: "MJ", p2score: null, p1team: "Real Madrid", p2team: "Manchester United", div: 1, season: 11, context: null },
  { matchType: "Strong", p1: "Dan", p1score: null, p2: "Lachy W", p2score: null, p1team: "Newcastle United", p2team: "Tottenham Hotspur", div: 1, season: 11, context: null },
  { matchType: "Women", p1: "Brent", p1score: null, p2: "Lachlan", p2score: null, p1team: "Manchester City", p2team: "FC Barcelona", div: 1, season: 11, context: null },
  { matchType: "Women", p1: "Ricardo", p1score: 0, p2: "Lachlan", p2score: 14, p1team: "Manchester City", p2team: "FC Barcelona", div: 1, season: 11, context: null }
];

const testhof = [
    {season: 1, div1Winner: 'Regi', div2Winner: null},
    {season: 2, div1Winner: 'Dan', div2Winner: null},
    {season: 3, div1Winner: 'Sam', div2Winner: null},
    {season: 4, div1Winner: 'Sam', div2Winner: "John"},
    {season: 5, div1Winner: "Lei", div2Winner: 'Dan'},
]


// showMisc = document.getElementById("miscCheck").checked



function getWinRates(){
    let winRates = []
    players.forEach(player => {
        let winRate = getWinRate(player)
        winRates.push([player, winRate])
    })
    return winRates
}

function getTitles() {
    let div1Winners = [];
    let div2Winners = [];

    hof.forEach(season => {
        if (season.div1Winner) div1Winners.push(season.div1Winner);
        if (season.div2Winner) div2Winners.push(season.div2Winner);
    });

    // Count occurrences function
    function countArray(arr) {
        const counts = {};
        arr.forEach(name => {
            counts[name] = (counts[name] || 0) + 1;
        });
        return Object.entries(counts); // converts to [[name, count], ...]
    }

    const div1Counts = countArray(div1Winners);
    const div2Counts = countArray(div2Winners);

    const sortedDiv1 = div1Counts.sort((a,b) => b[1]-a[1]);
    const sortedDiv2 = div2Counts.sort((a,b) => b[1]-a[1]);

    return { sortedDiv1, sortedDiv2 };
}

function getGoalDifferences(){
        let goalDiffs = []
    players.forEach(player => {
        let goalDiff = getGoalDifference(player)
        goalDiffs.push([player, goalDiff])
    })
    return goalDiffs
}

function sortByValue(arr, descending = true) {
    return arr.slice().sort((a, b) => descending ? b[1] - a[1] : a[1] - b[1]);
}

function getAllGoalsAgainst(){
        let total = []
    players.forEach(player => {

        let goalsAgainst = getGoalsAgainst(player)
        total.push([player, goalsAgainst])
    })
    return total
}
function getAllGoalsFor(){
        let total = []
    players.forEach(player => {
        let goalsFor = getGoalsFor(player)
        total.push([player, goalsFor])
    })
    return total
}

function getBiggestWinOfAll() {
    let biggestOverall = null;

    players.forEach(player => {
        const matches = getMatchesForPlayer(player);
        
        matches.forEach(match => {
            let playerScore, opponentScore, opponent;

            if (match.p1 === player) {
                playerScore = match.p1score ?? 0;
                opponentScore = match.p2score ?? 0;
                opponent = match.p2;
            } else if (match.p2 === player) {
                playerScore = match.p2score ?? 0;
                opponentScore = match.p1score ?? 0;
                opponent = match.p1;
            } else {
                return;
            }

            const diff = Math.abs(playerScore - opponentScore);

            if (!biggestOverall || diff > biggestOverall.diff) {
                biggestOverall = {
                    player,
                    opponent,
                    match,
                    diff,
                    winScore: playerScore,
                    loseScore: opponentScore
                };
            }
        });
    });

    return biggestOverall;
}

function getBestTeamOfAll(type, topN = 3) {
    const teamCounts = {};
    const season = document.getElementById("seasonSelect").value;


    // 2. Loop through the filtered list instead of the global matches array
    matches.forEach(match => {
        let team1 = match.p1team;
        let team2 = match.p2team;

        if (!team1 || !team2) return;

        if (type === "wins") {
            if (match.p1score > match.p2score) {
                teamCounts[team1] = (teamCounts[team1] || 0) + 1;
            } else if (match.p2score > match.p1score) {
                teamCounts[team2] = (teamCounts[team2] || 0) + 1;
            }
        }

        if (type === "losses") {
            if (match.p1score < match.p2score) {
                teamCounts[team1] = (teamCounts[team1] || 0) + 1;
            } else if (match.p2score < match.p1score) {
                teamCounts[team2] = (teamCounts[team2] || 0) + 1;
            }
        }

        if (type === "draws") {
            if (match.p1score === match.p2score) {
                teamCounts[team1] = (teamCounts[team1] || 0) + 1;
                teamCounts[team2] = (teamCounts[team2] || 0) + 1;
            }
        }
    });

    return Object.entries(teamCounts)
        .sort((a, b) => b[1] - a[1]);
}


function getFinalWinRates(){
    let finalsWinRates = [];
    players.forEach(player => {
        let finalsMatches = getMatchesForPlayer(player, 'final');
        let totalFinalWins = getFinalResults(player, 'wins')
        let finalWinRate = (totalFinalWins.length / finalsMatches.length)*100
        

        if(Number.isNaN(finalWinRate)){
            return
        } else {
            finalsWinRates.push([player, finalWinRate.toFixed(2)])
        }
        
        


    })

    return finalsWinRates
    
}



function generalStats(){
    console.log(players)
    document.getElementById('headToHeadp2').selectedIndex = 0
    document.getElementById("search").style.display = ''
    document.getElementById("headToHead").style.display = 'none'
    let options = document.getElementById("options")
    options.children[0].style.backgroundColor = "#7979796e"
    options.children[1].style.backgroundColor = ""
    const bestWinRate = sortByValue(getWinRates(), true);
    const div1Titles = getTitles().sortedDiv1;
    const div2Titles = getTitles().sortedDiv2;
    const bestGoalDiff = sortByValue(getGoalDifferences(), true);
    const worstGoalDiff = sortByValue(getGoalDifferences(), false);
    const mostGoalsFor = sortByValue(getAllGoalsFor(), true)[0]
    const mostGoalsAgainst = sortByValue(getAllGoalsAgainst(), true)[0]
    const biggestWinOfAll = getBiggestWinOfAll();
    const bestTeamOfAll = getBestTeamOfAll('wins');
    const worstTeamOfAll = getBestTeamOfAll('losses');
    const finalWinRates = sortByValue(getFinalWinRates(),true);

    function createLeaderboard(array, entries, suffix){
        let counter = 1

        const div = document.createElement('div')
        div.className= 'leaderboard'
        const ol = document.createElement('ol')
        div.appendChild(ol)
        array = array.slice(0, entries + 1)

        array.forEach((item => {
            const li = document.createElement('li');
            li.innerHTML = `<p>${counter}.  ${item[0]}</p><p>${item[1]}${suffix}</p>`
            ol.appendChild(li)
            counter += 1
        })); return div
    }

   
    function appendLeaderboards(arrayIds){
        arrayIds.forEach((id => {
                document
      .getElementById(id[0])
      .appendChild(id[1])
        }))
    }

    const bestWinRateLeaderboard = createLeaderboard(bestWinRate, 30, '%');
    const bestGoalDiffLeaderboard = createLeaderboard(bestGoalDiff, 30, '');
    const worstGoalDiffLeaderboard = createLeaderboard(worstGoalDiff, 30, '');
    const bestTeamLeaderboard = createLeaderboard(bestTeamOfAll, 30, ' wins');
    const worstTeamLeaderboard = createLeaderboard(worstTeamOfAll, 30, ' losses')
    const finalWinRatesLeaderboard = createLeaderboard(finalWinRates, 10, '%')


     const arrayIds = [
        ["bestWinRateLeaderboard", bestWinRateLeaderboard],
        ["bestGoalDiffLeaderboard",bestGoalDiffLeaderboard],
        ['finalWinRatesLeaderboard', finalWinRatesLeaderboard],
        ["bestTeamLeaderboard", bestTeamLeaderboard],
        ["worstTeamLeaderboard", worstTeamLeaderboard],
    ]

    


    const statsContent = document.getElementById("statsContent");
    statsContent.innerHTML = `
    <h2>Overall Stats</h2>
    <div id="statBoxes">
            <div class="statBoxSmallLeaderboard" id="bestWinRateLeaderboard"><p><strong>Best Win Rate: </strong></p>
            </div> 
            <div class="statBoxSmallLeaderboard" id="bestGoalDiffLeaderboard"><p><strong>Best Goal Difference: </strong></p>
            </div> 
            <div class="statBoxSmallLeaderboard" id="finalWinRatesLeaderboard"><p><strong>Final Win Rate: </strong></p>
            </div> 

            <div class="statBoxSmall"><p><strong>Most Div 1 Titles:</strong> ${div1Titles[0][0]}  [${div1Titles[0][1]}]</p></div>
            <div class="statBoxSmall"><p><strong>Most Div 2 Titles:</strong> ${div2Titles[0][0]}  [${div2Titles[0][1]}]</p></div>
            <div class="statBoxSmall"><p><strong>Most Goals For: </strong>${mostGoalsFor[0]} [${mostGoalsFor[1]}]</p></div>
            <div class="statBoxMedium"><p><strong>Most Goals Against: </strong>${mostGoalsAgainst[0]} [${mostGoalsAgainst[1]}]</p></div>
            <div class="statBoxMedium"><p><strong>Biggest Win: </strong>${biggestWinOfAll.player} [${biggestWinOfAll.winScore}] vs ${biggestWinOfAll.opponent} [${biggestWinOfAll.loseScore}]</p></div>
            <div class="statBoxMediumLeaderboard" id="bestTeamLeaderboard"><p><strong>Best Teams: </strong></p>
            </div> 
            <div class="statBoxMediumLeaderboard" id="worstTeamLeaderboard"><p><strong>Worst Teams: </strong></p>
            </div> 
    </div>
    `;


// Append the leaderboards
appendLeaderboards(arrayIds)
      
}




// Helper: All matches involving the player
function getMatchesForPlayer(player, context) {
    const season = document.getElementById("seasonSelect").value;

    return matches.filter(m => {
        const playerMatch = m.p1 === player || m.p2 === player;
        const seasonMatch = season === "All" ? true : m.season === Number(season);

        // Apply context filter only if a context was passed in
        const contextMatch = context ? m.context === context : true;

        // ...and now it's included here:
        return playerMatch && seasonMatch && contextMatch;
    });
}
// Total Matches
function getTotalMatches(player) {
    return getMatchesForPlayer(player).length;
}
// Total Wins
function getTotalWins(player) {
    return getMatchesForPlayer(player).filter(match => {
        if (match.p1 === player) return match.p1score > match.p2score;
        if (match.p2 === player) return match.p2score > match.p1score;
    });
}
// Total Losses
function getTotalWins(player, matches = getMatchesForPlayer(player)) {
    return matches.filter(match => {
        if (match.p1 === player) return match.p1score > match.p2score;
        if (match.p2 === player) return match.p2score > match.p1score;
    });
}

function getTotalLosses(player, matches = getMatchesForPlayer(player)) {
    return matches.filter(match => {
        if (match.p1 === player) return match.p1score < match.p2score;
        if (match.p2 === player) return match.p2score < match.p1score;
    });
}

function getTotalDraws(player, matches = getMatchesForPlayer(player)) {
    return matches.filter(match => match.p1score === match.p2score).length;
}

function getGoalsFor(player, matches = getMatchesForPlayer(player)) {
    return matches.reduce((sum, match) => {
        if (match.p1 === player) return sum + Math.floor(match.p1score);
        if (match.p2 === player) return sum + Math.floor(match.p2score);
        return sum;
    }, 0);
}

function getGoalsAgainst(player, matches = getMatchesForPlayer(player)) {
    return matches.reduce((sum, match) => {
        if (match.p1 === player) return sum + Math.floor(match.p2score);
        if (match.p2 === player) return sum + Math.floor(match.p1score);
        return sum;
    }, 0);
}

// Goal Difference
function getGoalDifference(player) {
    return getGoalsFor(player) - getGoalsAgainst(player);
}

// Biggest Win (returns scoreline)
// function getBiggestWin(player) {
//     let biggest = null;

//     getMatchesForPlayer(player).forEach(match => {
//         let diff = 0;
//         let tempOpponent, tempWinScore, tempLoseScore;

//         if (match.p1 === player) {
//             diff = match.p1score - match.p2score;
//             tempOpponent = match.p2;
//             tempWinScore = match.p1score;
//             tempLoseScore = match.p2score;
//         } else if (match.p2 === player) {
//             diff = match.p2score - match.p1score;
//             tempOpponent = match.p1;
//             tempWinScore = match.p2score;
//             tempLoseScore = match.p1score;
//         }

//         const absDiff = Math.abs(diff);

//         if (!biggest || absDiff > biggest.diff) {
//             biggest = { match, diff: absDiff, opponent: tempOpponent, winScore: tempWinScore, loseScore: tempLoseScore };
//         }
//     });

//     return biggest;
// }


function getBiggestWin(player) {
    let biggest = null;
    getMatchesForPlayer(player).forEach(match => {
        let diff = 0;
        let opponent = null

        if (match.p1 === player) {
            diff = match.p1score - match.p2score;
            opponent = match.p2
        }
        else if (match.p2 === player) {
            diff = match.p2score - match.p1score;
            opponent = match.p1
        
        }

        if (diff > 0 && (!biggest || diff > biggest.diff)) {
            biggest = { match, diff, opponent };
        }
    });
    return biggest;
}


//  Biggest Loss (returns scoreline) 
function getBiggestLoss(player) {
    let biggest = null;
    getMatchesForPlayer(player).forEach(match => {
        let diff = 0;
        let opponent = null

        if (match.p1 === player) {
            diff = match.p2score - match.p1score;
            opponent = match.p2
        }
        else if (match.p2 === player) {
            diff = match.p1score - match.p2score;
            opponent = match.p1
        
        }

        if (diff > 0 && (!biggest || diff > biggest.diff)) {
            biggest = { match, diff, opponent };
        }
    });
    return biggest;
}

// Win Rate
function getWinRate(player) {
    let total = getTotalMatches(player);
    if (total === 0) return 0;
    return ((getTotalWins(player).length / total) * 100).toFixed(1);
}

// Team Results
function getTeamMost(player, type) {
    // Determine which matches to use
    let matches = getMatchesForPlayer(player).filter(match => {
        if (type === "wins") {
            if (match.p1 === player) return match.p1score > match.p2score;
            if (match.p2 === player) return match.p2score > match.p1score;
        }

        if (type === "losses") {
            if (match.p1 === player) return match.p1score < match.p2score;
            if (match.p2 === player) return match.p2score < match.p1score;
        }

        if (type === "draws") {
            return match.p1score === match.p2score;
        }

        return false;
    });

    // NEW: Remove matches where the player's team is null
    matches = matches.filter(match => {
        const teamUsed = match.p1 === player ? match.p1team : match.p2team;
        return teamUsed != null && teamUsed !== "";
    });

    const teamCounts = {};

    matches.forEach(match => {
        const teamUsed = match.p1 === player ? match.p1team : match.p2team;
        teamCounts[teamUsed] = (teamCounts[teamUsed] || 0) + 1;
    });

    // Find the top team
    let bestTeam = null;
    let bestCount = 0;

    for (const team in teamCounts) {
        if (teamCounts[team] > bestCount) {
            bestTeam = team;
            bestCount = teamCounts[team];
        }
    }

    return {
        team: bestTeam,
        count: bestCount,
        type
    };
}


// Finals Results
function getFinalResults(player, type) {
    let matches = getMatchesForPlayer(player).filter(match => {
        if (type === "wins") {
            if (match.p1 === player) return match.p1score > match.p2score;
            if (match.p2 === player) return match.p2score > match.p1score;
        }

        if (type === "losses") {
            if (match.p1 === player) return match.p1score < match.p2score;
            if (match.p2 === player) return match.p2score < match.p1score;
        }

        return false; // fallback
    });
    let finalMatches = matches.filter(match => {
        if(match.context === "final"){
            return true
        }
    })
    return finalMatches
}

// MAIN FUNCTION THAT UPDATES THE PAGE
function playerStats() {
    const player = document.getElementById("playerName").value;
    
    matches = filterMatches(rawMatches);
    if(player == "Overall"){
        generalStats()
    } else {
    const statsContent = document.getElementById("statsContent");


    const totalMatches = getTotalMatches(player);
    const wins = getTotalWins(player);
    const losses = getTotalLosses(player);
    const draws = getTotalDraws(player);
    const winRate = getWinRate(player);
    const goalsFor = getGoalsFor(player);
    const goalsAgainst = getGoalsAgainst(player);
    const goalDiff = Math.round(getGoalDifference(player));

    const biggestWin = getBiggestWin(player);
    const biggestLoss = getBiggestLoss(player);
    const teamMostWins = getTeamMost(player, 'wins');
    const teamMostLosses = getTeamMost(player, 'losses');
    const finalWins = getFinalResults(player, 'wins');
    const finalLosses = getFinalResults(player, 'losses');

    statsContent.innerHTML = `
        <h2>${player}'s Stats</h2>
        <div id="statBoxes">
            <div class="statBoxLarge"><p><strong>Total Matches:</strong> ${totalMatches}</p>
            <p><strong>Wins: </strong> ${wins.length}</p>
            <p><strong>Losses: </strong> ${losses.length}</p>
            <p><strong>Draws: </strong> ${draws}</p>
            <p><strong>Win Rate:</strong>  ${winRate}%</p></div>

            <div class="statBoxSmall"><p><strong>Goals For: </strong> ${goalsFor}</p></div>
            <div class="statBoxSmall"><p><strong>Goals Against:</strong> ${goalsAgainst}</p></div>
            <div class="statBoxSmall"><p><strong>Goal Difference:</strong> ${goalDiff}</p></div>
            <div class="statBoxMedium"><p><strong>Biggest Win:</strong> ${
                biggestWin ? 
                `${biggestWin.match.p1score}-${biggestWin.match.p2score} vs ${biggestWin.opponent}` : "None"
            }</p></div>
            <div class="statBoxMedium"><p><strong>Biggest Loss:</strong> ${biggestLoss ? 
                `${biggestLoss.match.p1score}-${biggestLoss.match.p2score} vs ${biggestLoss.opponent}` : "None"
            }</p></div>

            <div class="statBoxMedium"><p><strong>Best Team:</strong> ${teamMostWins.team} --- ${teamMostWins.count} wins</p></div>
            <div class="statBoxMedium"><p><strong>Worst Team:</strong> ${teamMostLosses.team} --- ${teamMostLosses.count} losses</p></div>
            <div class="statBoxSmall"><p><strong>Final Wins:</strong> ${finalWins.length}</p></div>
            <div class="statBoxSmall"><p><strong>Final Losses:</strong> ${finalLosses.length}</p></div>

        </p></div>
    `
    ;}
}

// Head to Head
document.getElementById("headToHead").style.display = 'none'


function headToHead(){
    let options = document.getElementById("options")
    options.children[1].style.backgroundColor = "#7979796e"
    options.children[0].style.backgroundColor = ""
    document.getElementById("search").style.display = 'none'
    document.getElementById("headToHead").style.display = ''
    
    const p1 = document.getElementById('headToHeadp1').value;
    const p2 = document.getElementById('headToHeadp2').value;
    matches = [...rawMatches]

    const statsContent = document.getElementById("statsContent");
    let p1Matches = getMatchesForPlayer(p1)
    let h2hMatches = []

    if (p2 == 'Any'){
        h2hMatches = p1Matches
    } else {
        h2hMatches = p1Matches.filter(match => {
        if (p1 == match.p1){
            return match.p2 == p2
        } else {
        return match.p1 == p2
        }
    })
    }


    if (h2hMatches.length == 0){
        statsContent.innerHTML = `<p>No matches found between these players</p>`
        return
    }

    p1Wins = getTotalWins(p1, h2hMatches).length
    p1Losses = getTotalLosses(p1, h2hMatches).length
    p1Draws = getTotalDraws(p1, h2hMatches)

    p2Wins = p1Losses
    p2Losses = p1Wins
    p2Draws = p1Draws


    statsContent.innerHTML = `
    <div><h2>Head To Head</h2></div>
    <div id='h2hStatsTotal'>
        <div class="h2hStats">
            <p><strong>${p1}</strong></p>
            <p>Wins: ${p1Wins}</p>
            <p>Losses: ${p1Losses}</p>
            <p>Draws: ${p1Draws}</p>
        </div>
        <div class="h2hStats">
            <p><strong>${p2}</strong></p>
            <p>Wins: ${p2Wins}</p>
            <p>Losses: ${p2Losses}</p>
            <p>Draws: ${p2Draws}</p>
        </div>
    </div>
    `
    let container = document.createElement('div')
    container.className = 'h2hList'
    statsContent.appendChild(container)
    let headerRow = document.createElement('div')
    headerRow.className = 'h2hMatch'
    headerRow.innerHTML = `<p>Season</p><p>Division</p><p>Player</p><p>Team</p><p>Score</p><p>Opponent</p><p>Team</p><p>Score</p>`

    container.appendChild(headerRow)
      h2hMatches.forEach(match => {
        let winner = null
        if (match.p1score > match.p2score){
            winner = match.p1
        } else if (match.p1score < match.p2score){
            winner = match.p2
        } else {
            winner ='draw'
        }
        

        let row = document.createElement('div')
        if (winner == p1){
            row.style.backgroundColor = '#2bff0020'
        } else if (winner == 'draw') {
            row.style.backgroundColor = '#fffb0020'
        } else {
            row.style.backgroundColor = '#ff000020'
        }

        row.className= 'h2hMatch'
        if(match.p1 == p1){
            row.innerHTML = `<p>${match.season}</p><p>${match.div}</p><p>${match.p1}</p><p>${match.p1team}</p><p>${match.p1score}</p><p>${match.p2}</p><p>${match.p2team}</p><p>${match.p2score}</p>`
        } else {row.innerHTML = `<p>${match.season}</p><p>${match.div}</p><p>${match.p2}</p><p>${match.p2team}</p><p>${match.p2score}</p><p>${match.p1}</p><p>${match.p1team}</p><p>${match.p1score}</p>`}
        
        container.appendChild(row)
    })

}