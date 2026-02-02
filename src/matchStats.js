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

let matches = [];
let hof = [];
let players = [];

async function loadData() {
    const res = await fetch("/.netlify/functions/getMatchData");
    const batch = await res.json();
    const [matchesRes, hofRes] = batch.valueRanges;
    matches = convertToObjects(matchesRes.values);
    hof = convertToObjects(hofRes.values);
}

async function init() {
    await loadData();

    // Add Players To Dropdown
    matches.forEach(match => {
        if (!players.includes(match.p1)) players.push(match.p1);
        if (!players.includes(match.p2)) players.push(match.p2);
    });

    let seasons = [];
    matches.forEach(match => {
        if (!seasons.includes(match.season)) seasons.push(match.season);
    });

    let seasonSelect = document.getElementById("seasonSelect");
    seasons = sortByValue(seasons.map(s => [s, s]), true).map(s => s[0]);

    seasons.forEach(season => {
        let option = document.createElement('option');
        option.innerHTML = season;
        seasonSelect.appendChild(option);
    });

    players = players.sort((a, b) => a.localeCompare(b));
    let select = document.getElementById("playerName");
    players.forEach(player => {
        let option = document.createElement('option');
        option.innerHTML = player;
        select.appendChild(option);
    });

    let h2hp1 = document.getElementById("headToHeadp1");
    let h2hp2 = document.getElementById("headToHeadp2");
    players.forEach(player => {
        let optionp1 = document.createElement('option');
        let optionp2 = document.createElement('option');
        optionp1.innerHTML = player;
        optionp2.innerHTML = player
        h2hp1.appendChild(optionp1);
        h2hp2.appendChild(optionp2);
    });

    // --- EVENT LISTENERS FOR FILTERS ---
    // This ensures the UI updates whenever any filter changes
    const refreshUI = () => {
        const currentPlayer = document.getElementById("playerName").value;
        const h2hDisplay = document.getElementById("headToHead").style.display;
        
        if (h2hDisplay !== 'none') {
            headToHead();
        } else if (currentPlayer === "Overall") {
            generalStats();
        } else {
            playerStats();
        }
    };

    document.getElementById("miscCheck").addEventListener("change", refreshUI);
    document.getElementById("seasonSelect").addEventListener("change", refreshUI);
}

(async function initPage() {
    await init();
    generalStats();
})();

// Helper: All matches involving the player
function getMatchesForPlayer(player, context) {
    const season = document.getElementById("seasonSelect").value;
    const showMisc = document.getElementById("miscCheck").checked;

    return matches.filter(m => {
        const playerMatch = m.p1 === player || m.p2 === player;
        const seasonMatch = season === "All" ? true : m.season === Number(season);
        const notForfeit = m.context !== 'forfeit';
        
        // Dynamic Misc Check
        const miscCheck = showMisc || m.context !== 'misc';

        // Apply context filter only if a context was passed in
        const contextMatch = context ? m.context === context : true;

        return playerMatch && seasonMatch && notForfeit && miscCheck && contextMatch;
    });
}

// --- STATS CALCULATION FUNCTIONS ---

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
        if (match.p1 === player) return sum + Math.floor(match.p1score || 0);
        if (match.p2 === player) return sum + Math.floor(match.p2score || 0);
        return sum;
    }, 0);
}

function getGoalsAgainst(player, customMatches) {
    const targetMatches = customMatches || getMatchesForPlayer(player);
    return targetMatches.reduce((sum, match) => {
        if (match.p1 === player) return sum + Math.floor(match.p2score || 0);
        if (match.p2 === player) return sum + Math.floor(match.p1score || 0);
        return sum;
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

// --- VIEW RENDERING FUNCTIONS ---

function generalStats() {
    document.getElementById('headToHeadp2').selectedIndex = 1;
    document.getElementById("search").style.display = '';
    document.getElementById("headToHead").style.display = 'none';
    
    let options = document.getElementById("options");
    options.children[0].style.backgroundColor = "#7979796e";
    options.children[1].style.backgroundColor = "";

    // Data generation for leaderboards
    const bestWinRate = sortByValue(players.map(p => [p, getWinRate(p)]), true);
    const bestGoalDiff = sortByValue(players.map(p => [p, getGoalDifference(p)]), true);

    const statsContent = document.getElementById("statsContent");
    statsContent.innerHTML = `
        <h2>Overall Stats</h2>
        <div id="statBoxes">
            <div class="statBoxSmallLeaderboard" id="bestWinRateLeaderboard"><p><strong>Best Win Rate:</strong></p></div> 
            <div class="statBoxSmallLeaderboard" id="bestGoalDiffLeaderboard"><p><strong>Best Goal Difference:</strong></p></div> 
        </div>
    `;

    // Leaderboard Helper
    function createLeaderboard(array, entries, suffix) {
        let counter = 1;
        const div = document.createElement('div');
        div.className = 'leaderboard';
        const ol = document.createElement('ol');
        div.appendChild(ol);
        array.slice(0, entries).forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<p>${counter}. ${item[0]}</p><p>${item[1]}${suffix}</p>`;
            ol.appendChild(li);
            counter++;
        });
        return div;
    }

    document.getElementById("bestWinRateLeaderboard").appendChild(createLeaderboard(bestWinRate, 10, '%'));
    document.getElementById("bestGoalDiffLeaderboard").appendChild(createLeaderboard(bestGoalDiff, 10, ''));
}

function playerStats() {
    const player = document.getElementById("playerName").value;
    if (player === "Overall") return generalStats();

    const statsContent = document.getElementById("statsContent");
    const totalMatches = getTotalMatches(player);
    const wins = getTotalWins(player);
    const winRate = getWinRate(player);

    statsContent.innerHTML = `
        <h2>${player}'s Stats</h2>
        <div id="statBoxes">
            <div class="statBoxLarge">
                <p><strong>Total Matches:</strong> ${totalMatches}</p>
                <p><strong>Wins:</strong> ${wins.length}</p>
                <p><strong>Win Rate:</strong> ${winRate}%</p>
            </div>
        </div>
    `;
}

function headToHead() {
    let options = document.getElementById("options");
    options.children[1].style.backgroundColor = "#7979796e";
    options.children[0].style.backgroundColor = "";
    document.getElementById("search").style.display = 'none';
    document.getElementById("headToHead").style.display = '';
    
    const p1 = document.getElementById('headToHeadp1').value;
    const p2 = document.getElementById('headToHeadp2').value;
    const statsContent = document.getElementById("statsContent");

    // H2H Bypass: Show all matches except forfeits (ignore season and misc toggle)
    let h2hMatches = matches.filter(match => {
        const involvesBoth = (match.p1 === p1 && match.p2 === p2) || (match.p1 === p2 && match.p2 === p1);
        const notForfeit = match.context !== 'forfeit';
        return involvesBoth && notForfeit;
    });

    if (h2hMatches.length == 0) {
        statsContent.innerHTML = `<p>No matches found between these players</p>`;
        return;
    }

    const p1Wins = getTotalWins(p1, h2hMatches).length;
    const p2Wins = getTotalWins(p2, h2hMatches).length;

    statsContent.innerHTML = `
        <div><h2>Head To Head</h2></div>
        <div id='h2hStatsTotal'>
            <div class="h2hStats"><p><strong>${p1}</strong></p><p>Wins: ${p1Wins}</p></div>
            <div class="h2hStats"><p><strong>${p2}</strong></p><p>Wins: ${p2Wins}</p></div>
        </div>
        <div class="h2hList" id="h2hMatchList"></div>
    `;

    const container = document.getElementById("h2hMatchList");
    h2hMatches.forEach(match => {
        let row = document.createElement('div');
        row.className = 'h2hMatch';
        const p1Score = match.p1 === p1 ? match.p1score : match.p2score;
        const p2Score = match.p1 === p1 ? match.p2score : match.p1score;
        
        row.style.backgroundColor = p1Score > p2Score ? '#2bff0020' : (p1Score === p2Score ? '#fffb0020' : '#ff000020');
        row.innerHTML = `<p>S${match.season}</p><p>${p1} (${p1Score})</p><p>vs</p><p>${p2} (${p2Score})</p>`;
        container.appendChild(row);
    });
}