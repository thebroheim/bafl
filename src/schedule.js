const players = [
    {name: 'Sam', wins: 0, losses: 0, draws: 0},
    {name: 'Lachlan', wins: 0, losses: 0, draws: 0},
    {name: 'Alex', wins: 0, losses: 0, draws: 0},
    {name: 'Oscar', wins: 0, losses: 0, draws: 0},
    {name: 'Lachy W', wins: 0, losses: 0, draws: 0},
    {name: 'MJ', wins: 0, losses: 0, draws: 0},
];

let matches = []

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
    return array.some(obj =>
        (obj._player1 === firstPlayer && obj._player2 === secondPlayer) ||
        (obj._player1 === secondPlayer && obj._player2 === firstPlayer)
    );
}

let matchId = 0

function createMatches(players){
    
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
      <p>${match.player1.name} will play as ${match.team1.name}</p>
      <p>${match.player2.name} will play as ${match.team2.name}</p>
    `;
  
    container.appendChild(div);


  });
return matches


}

createMatches(players)
