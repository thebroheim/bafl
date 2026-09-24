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

  rawMatches = convertToObjects(matchesRes.values).reverse();
  hof = convertToObjects(hofRes.values);
  matches = [...rawMatches]

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


// showMisc = document.getElementById("miscCheck").checked

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

function sortByValue(arr, descending = true) {
    return arr.slice().sort((a, b) => descending ? b[1] - a[1] : a[1] - b[1]);
}

function getBiggestWinOfAll(division) {
    let biggestOverall = null;

    players.forEach(player => {
        const matches = getMatchesForPlayer(player, null, division);
        
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

function getBestTeamOfAll(type, division) {
    const teamCounts = {};
    const season = document.getElementById("seasonSelect").value;

    // Loop through the filtered global "matches" list, applying the same
    // division filter used elsewhere (matches on div is coerced to Number
    // since data loaded from Google Sheets often arrives as strings).
    matches.forEach(match => {
        if (division && Number(match.div) !== Number(division)) return;
        const seasonMatch = season === "All" ? true : match.season === Number(season); // 👈 add this
        if (!seasonMatch) return;
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


function getFinalWinRates(division){
    let finalsWinRates = [];
    players.forEach(player => {
        let finalsMatches = getMatchesForPlayer(player, 'final', division);
        let totalFinalWins = getFinalResults(player, 'wins', finalsMatches)
        let finalWinRate = (totalFinalWins.length / finalsMatches.length)*100
        

        if(Number.isNaN(finalWinRate)){
            return
        } else {
            finalsWinRates.push([player, finalWinRate.toFixed(2)])
        }
        
        


    })

    return finalsWinRates
    
}

function getStatForAllPlayers(statFn, division) {
    let results = []
    players.forEach(player => {
        let matches = getMatchesForPlayer(player, null, division)
        if (matches.length === 0) return
        results.push([player, statFn(player, matches)])  // statFn is whatever you pass in
    })
    return results
}


// Module-level filter state for the Overall Stats page.
// 1 = Div 1 only, 2 = Div 2 only, 3 = All divisions.
let currentGeneralDivFilter = 3;

function switchGeneralDivFilter(filter){
    currentGeneralDivFilter = filter;
    generalStats();
}

function generalStats(){
    console.log(players)
    document.getElementById('headToHeadp2').selectedIndex = 0
    document.getElementById("search").style.display = ''
    document.getElementById("headToHead").style.display = 'none'
    let options = document.getElementById("options")
    options.children[0].style.backgroundColor = "#7979796e"
    options.children[1].style.backgroundColor = ""

    // "All" (3) maps to undefined so getMatchesForPlayer's divMatch check
    // is skipped entirely, same convention used on the player stats page.
    const division = currentGeneralDivFilter === 3 ? undefined : currentGeneralDivFilter;

    const bestWinRate = sortByValue(getStatForAllPlayers(getWinRate, division), true);
    const div1Titles = getTitles().sortedDiv1;
    const div2Titles = getTitles().sortedDiv2;
    const bestGoalDiff = sortByValue(getStatForAllPlayers(getGoalDifference, division), true);
    const mostGoalsFor = sortByValue(getStatForAllPlayers(getGoalsFor, division), true)
    const mostGoalsAgainst = sortByValue(getStatForAllPlayers(getGoalsAgainst, division), true)
    const biggestWinOfAll = getBiggestWinOfAll(division);
    const bestTeamOfAll = getBestTeamOfAll('wins', division);
    const worstTeamOfAll = getBestTeamOfAll('losses', division);
    const finalWinRates = sortByValue(getFinalWinRates(division),true);
    const avgGoalsScored = sortByValue(getStatForAllPlayers(getAvgGoalsScoredPerGame, division), true)
    const avgGoalsConceded = sortByValue(getStatForAllPlayers(getAvgGoalsConcededPerGame, division), true)

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
    const bestTeamLeaderboard = createLeaderboard(bestTeamOfAll, 30, ' wins');
    const worstTeamLeaderboard = createLeaderboard(worstTeamOfAll, 30, ' losses')
    const finalWinRatesLeaderboard = createLeaderboard(finalWinRates, 10, '%')
    const mostGoalsForLeaderboard = createLeaderboard(mostGoalsFor, 30, '')
    const mostGoalsAgainstLeaderboard = createLeaderboard(mostGoalsAgainst, 30, '')
    const avgGoalsScoredLeaderboard = createLeaderboard(avgGoalsScored, 30, '') 
    const avgGoalsConcededLeaderboard = createLeaderboard(avgGoalsConceded, 30, '')



     const arrayIds = [
        ["bestWinRateLeaderboard", bestWinRateLeaderboard],
        ["bestGoalDiffLeaderboard",bestGoalDiffLeaderboard],
        ['finalWinRatesLeaderboard', finalWinRatesLeaderboard],
        ["bestTeamLeaderboard", bestTeamLeaderboard],
        ["worstTeamLeaderboard", worstTeamLeaderboard],
        ["mostGoalsAgainstLeaderboard",mostGoalsAgainstLeaderboard],
        ["mostGoalsForLeaderboard",mostGoalsForLeaderboard],
        ["avgGoalsScoredLeaderboard", avgGoalsScoredLeaderboard],
        ["avgGoalsConcededLeaderboard", avgGoalsConcededLeaderboard]
    ]

    


    const statsContent = document.getElementById("statsContent");
    statsContent.innerHTML = `
    <h2>Overall Stats</h2>
    <div class="btnFilters">
        <button onclick="switchGeneralDivFilter(1)" class="${currentGeneralDivFilter === 1 ? 'selectedBtn' : ''}">Div 1</button>
        <button onclick="switchGeneralDivFilter(3)" class="${currentGeneralDivFilter === 3 ? 'selectedBtn' : ''}">All</button>
        <button onclick="switchGeneralDivFilter(2)" class="${currentGeneralDivFilter === 2 ? 'selectedBtn' : ''}">Div 2</button>
    </div>
    <div id="statBoxes">
            <div class="statBoxMediumLeaderboard" id="bestWinRateLeaderboard"><p><strong>Best Win Rate: </strong></p>
            </div> 
            <div class="statBoxMediumLeaderboard" id="finalWinRatesLeaderboard"><p><strong>Final Win Rate: </strong></p></div> 
            
            <div class="statBoxSmallLeaderboard" id="bestGoalDiffLeaderboard"><p><strong>Best Goal Difference: </strong></p>
            </div> 



            <div class="statBoxSmallLeaderboard" id="mostGoalsForLeaderboard"><p><strong>Most Goals For: </strong></p></div>
            <div class="statBoxSmallLeaderboard" id="mostGoalsAgainstLeaderboard"><p><strong>Most Goals Against: </strong></p></div>
            <div class="statBoxMediumLeaderboard" id="avgGoalsScoredLeaderboard"><p><strong>Average Goals Scored: </strong></p></div>
            <div class="statBoxMediumLeaderboard" id="avgGoalsConcededLeaderboard"><p><strong>Average Goals Conceded: </strong></p></div>
            <div class="statBoxLarge"><p><strong>Biggest Win: </strong>${biggestWinOfAll.player} [${biggestWinOfAll.winScore}] vs ${biggestWinOfAll.opponent} [${biggestWinOfAll.loseScore}]</p></div>
            <div class="statBoxMediumLeaderboard" id="bestTeamLeaderboard"><p><strong>Best Teams: </strong></p>
            </div> 
            <div class="statBoxMediumLeaderboard" id="worstTeamLeaderboard"><p><strong>Worst Teams: </strong></p>
            </div> 
            <div class="statBoxMedium"><p><strong>Most Div 1 Titles:</strong> ${div1Titles[0][0]}  [${div1Titles[0][1]}]</p></div>
            <div class="statBoxMedium"><p><strong>Most Div 2 Titles:</strong> ${div2Titles[0][0]}  [${div2Titles[0][1]}]</p></div>
    </div>
    `;


// Append the leaderboards
appendLeaderboards(arrayIds)
      
}




// Helper: All matches involving the player
function getMatchesForPlayer(player, context, division) {
    const season = document.getElementById("seasonSelect").value;
    const showMisc = document.getElementById("miscCheck").checked;

    // Always start from rawMatches so you never "lose" data
    return rawMatches.filter(m => {
        // 1. Logic from your old filterMatches()
        const notForfeit = m.context !== 'forfeit';
        const miscCheck = showMisc ? true : m.context !== 'misc';
        
        // 2. Player Logic
        const playerMatch = player ? (m.p1 === player || m.p2 === player) : true;
        
        // 3. Season Logic
        const seasonMatch = season === "All" ? true : m.season === Number(season);

        // 4. Context (Finals) Logic
        const contextMatch = context ? m.context === context : true;

        // 5. Division Logic — Number() coercion handles data loaded from
        // Google Sheets, which often comes through as strings ("1" vs 1).
        const divMatch = division ? Number(m.div) === Number(division) : true;

        return notForfeit && miscCheck && playerMatch && seasonMatch && contextMatch &&divMatch;
    });
}
// Total Matches
function getTotalMatches(player, matches = getMatchesForPlayer(player)) {
    return matches.length;
}
// Total Wins
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

function getAvgGoalsScoredPerGame(player, matches) {
    return (getGoalsFor(player, matches) / matches.length).toFixed(2);
}

function getAvgGoalsConcededPerGame(player, matches) {
    return (getGoalsAgainst(player, matches) / matches.length).toFixed(2);
}



// Goal Difference
function getGoalDifference(player, matches = getMatchesForPlayer(player)) {
    return getGoalsFor(player, matches) - getGoalsAgainst(player, matches);
}

function getBiggestWin(player, matches = getMatchesForPlayer(player)) {
    let biggest = null;
    matches.forEach(match => {
        let diff = 0;
        let opponent = null;

        if (match.p1 === player) {
            diff = match.p1score - match.p2score;
            opponent = match.p2;
        }
        else if (match.p2 === player) {
            diff = match.p2score - match.p1score;
            opponent = match.p1;
        }

        if (diff > 0 && (!biggest || diff > biggest.diff)) {
            biggest = { match, diff, opponent };
        }
    });
    return biggest;
}


//  Biggest Loss (returns scoreline) 
function getBiggestLoss(player, matches = getMatchesForPlayer(player)) {
    let biggest = null;
    matches.forEach(match => {
        let diff = 0;
        let opponent = null;

        if (match.p1 === player) {
            diff = match.p2score - match.p1score;
            opponent = match.p2;
        }
        else if (match.p2 === player) {
            diff = match.p1score - match.p2score;
            opponent = match.p1;
        }

        if (diff > 0 && (!biggest || diff > biggest.diff)) {
            biggest = { match, diff, opponent };
        }
    });
    return biggest;
}

// Win Rate
function getWinRate(player, matches = getMatchesForPlayer(player)) {
    const total = matches.length;
    if (total === 0) return 0;
    return ((getTotalWins(player, matches).length / total) * 100).toFixed(1);
}

// Team Results
function getTeamMost(player, type, matches = getMatchesForPlayer(player)) {
    let filtered = matches.filter(match => {
        if (type === "wins") {
            if (match.p1 === player) return match.p1score > match.p2score;
            if (match.p2 === player) return match.p2score > match.p1score;
        }
        if (type === "losses") {
            if (match.p1 === player) return match.p1score < match.p2score;
            if (match.p2 === player) return match.p2score < match.p1score;
        }
        if (type === "draws") return match.p1score === match.p2score;
        return false;
    });

    filtered = filtered.filter(match => {
        const teamUsed = match.p1 === player ? match.p1team : match.p2team;
        return teamUsed != null && teamUsed !== "";
    });

    const teamCounts = {};
    filtered.forEach(match => {
        const teamUsed = match.p1 === player ? match.p1team : match.p2team;
        teamCounts[teamUsed] = (teamCounts[teamUsed] || 0) + 1;
    });

    let bestTeam = null, bestCount = 0;
    for (const team in teamCounts) {
        if (teamCounts[team] > bestCount) { bestTeam = team; bestCount = teamCounts[team]; }
    }
    return { team: bestTeam, count: bestCount, type };
}


// Finals Results
function getFinalResults(player, type, matches = getMatchesForPlayer(player)) {
    let filtered = matches.filter(match => {
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
    let finalMatches = filtered.filter(match => {
        if(match.context === "final"){
            return true
        }
    })
    return finalMatches
}

// MAIN FUNCTION THAT UPDATES THE PAGE
// module-level state — survives after playerStats() returns
let currentDivFilter = 3; // 1 = Div1, 2 = Div2, 3 = All

function switchMatchFilter(filter) {
    currentDivFilter = filter;
    playerStats(); // re-render with the new filter
}

function playerStats() {
    const player = document.getElementById("playerName").value;

    if (player == "Overall") {
        generalStats();
        return;
    }

    const statsContent = document.getElementById("statsContent");

    const allMatches = getMatchesForPlayer(player);
    const div1Matches = getMatchesForPlayer(player, null, 1);
    const div2Matches = getMatchesForPlayer(player, null, 2);

    function buildStatsBlock(matches) {
        const wins = getTotalWins(player, matches);
        const losses = getTotalLosses(player, matches);
        const draws = getTotalDraws(player, matches);
        const winRate = getWinRate(player, matches);
        const goalsFor = getGoalsFor(player, matches);
        const goalsAgainst = getGoalsAgainst(player, matches);
        const goalDiff = goalsFor - goalsAgainst;
        const biggestWin = getBiggestWin(player, matches);
        const biggestLoss = getBiggestLoss(player, matches);
        const teamMostWins = getTeamMost(player, 'wins', matches);
        const teamMostLosses = getTeamMost(player, 'losses', matches);
        const finalWins = getFinalResults(player, 'wins', matches);
        const finalLosses = getFinalResults(player, 'losses', matches);

        return {
            total: matches.length, wins, losses, draws, winRate,
            goalsFor, goalsAgainst, goalDiff, biggestWin, biggestLoss,
            teamMostWins, teamMostLosses, finalWins, finalLosses
        };
    }

    const all = buildStatsBlock(allMatches);
    const d1 = buildStatsBlock(div1Matches);
    const d2 = buildStatsBlock(div2Matches);

    // pick which block to display based on the persisted filter state
    let statsMatches;
    if (currentDivFilter === 1) statsMatches = d1;
    else if (currentDivFilter === 2) statsMatches = d2;
    else statsMatches = all;

    statsContent.innerHTML = `
        <h2>${player}'s Stats</h2>
        <div class="btnFilters">
            <button onclick="switchMatchFilter(1)" class="${currentDivFilter === 1 ? 'selectedBtn' : ''}">Div 1</button>
            <button onclick="switchMatchFilter(3)" class="${currentDivFilter === 3 ? 'selectedBtn' : ''}">All</button>
            <button onclick="switchMatchFilter(2)" class="${currentDivFilter === 2 ? 'selectedBtn' : ''}">Div 2</button>
        </div>
        <div id="statBoxes">
            <div class="statBoxLarge"><p><strong>Matches:</strong> ${statsMatches.total}</p>
            <p><strong>Wins: </strong> ${statsMatches.wins.length}</p>
            <p><strong>Losses: </strong> ${statsMatches.losses.length}</p>
            <p><strong>Draws: </strong> ${statsMatches.draws}</p>
            <p><strong>Win Rate:</strong>  ${statsMatches.winRate}%</p></div>

            <div class="statBoxSmall"><p><strong>Goals For: </strong> ${statsMatches.goalsFor}</p></div>
            <div class="statBoxSmall"><p><strong>Goals Against:</strong> ${statsMatches.goalsAgainst}</p></div>
            <div class="statBoxSmall"><p><strong>Goal Diff:</strong> ${statsMatches.goalDiff}</p></div>

            <div class="statBoxMedium"><p><strong>Biggest Win:</strong> ${
                statsMatches.biggestWin ? `${statsMatches.biggestWin.match.p1score}-${statsMatches.biggestWin.match.p2score} vs ${statsMatches.biggestWin.opponent}` : "None"
            }</p></div>
            <div class="statBoxMedium"><p><strong>Biggest Loss:</strong> ${
                statsMatches.biggestLoss ? `${statsMatches.biggestLoss.match.p1score}-${statsMatches.biggestLoss.match.p2score} vs ${statsMatches.biggestLoss.opponent}` : "None"
            }</p></div>

            <div class="statBoxMedium"><p><strong>Best Team:</strong> ${statsMatches.teamMostWins.team ?? "None"} --- ${statsMatches.teamMostWins.count} wins</p></div>
            <div class="statBoxMedium"><p><strong>Worst Team:</strong> ${statsMatches.teamMostLosses.team ?? "None"} --- ${statsMatches.teamMostLosses.count} losses</p></div>

            <div class="statBoxSmall"><p><strong>Final Wins:</strong> ${statsMatches.finalWins.length}</p></div>
            <div class="statBoxSmall"><p><strong>Final Losses:</strong> ${statsMatches.finalLosses.length}</p></div>
        </div>
    `;
}

// Head to Head
document.getElementById("headToHead").style.display = 'none'


function headToHead(){
    let options = document.getElementById("options")
    options.children[1].style.backgroundColor = "#7979796e"
    options.children[0].style.backgroundColor = ""
    document.getElementById("search").style.display = 'none'
    document.getElementById("seasonSelect").selectedIndex = 0
    document.getElementById("headToHead").style.display = ''
    
    const p1 = document.getElementById('headToHeadp1').value;
    const p2 = document.getElementById('headToHeadp2').value;
    

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

    h2hMatches.sort((a, b) => a.season - b.season)

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
