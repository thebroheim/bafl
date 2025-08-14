
let players = [];

function addPlayer(){
    let newPlayer = document.getElementById('name').value;
    players.push(newPlayer)

    const para = document.createElement('p');
    const node = document.createTextNode(newPlayer)
    para.appendChild(node)
    document.getElementById('players').appendChild(para)
}


class Match {
    constructor(){
        this._player1 = ''
        this._player2 = ''
        this._matchType = selectedType[1]
        let teams = teamSelect(selectedType[0])
        let team1 = teams[0]
        let team2 = teams[1]
        this._player1team = team1
        this._player2team = team2
    }
}



let matchId = 0
let matches = []

function checkMatchForDupe(array, firstPlayer, secondPlayer) {
    return array.some(obj =>
        (obj._player1 === firstPlayer && obj._player2 === secondPlayer) ||
        (obj._player1 === secondPlayer && obj._player2 === firstPlayer)
    );
}

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
    selectedType = matchTypeSelect()
    let match = new Match

    match._player1 = players[i]
    match._player2 = players[x]

    matches.push(match)
    }}

// Print the matches in HTML
const container = document.getElementById("generatedMatches")
matches.forEach(match => {
    const div = document.createElement("div");
    matchId += 1
    div.innerHTML = `
    <h3>Match ${matchId}</h3>
    <h4>${match._matchType}</h4>
      <p>${match._player1} will play as ${match._player1team}</p>
      <p>${match._player2} will play as ${match._player2team}</p>
    `;
  
    container.appendChild(div);


  });
return matches


}