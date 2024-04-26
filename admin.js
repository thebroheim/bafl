
let players = []
function addPlayer(){
    let newPlayer = document.getElementById('name').value;
    players.push(newPlayer)

    const para = document.createElement('p');
    const node = document.createTextNode(newPlayer)
    para.appendChild(node)
    document.getElementById('players').appendChild(para)
    console.log(players)
}