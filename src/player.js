const strong = ['Real Madrid', 'Manchester City', 'Liverpool', 'FC Bayern Munchen', 'FC Barcelona', 'Arsenal', 'Bayer 04 Leverkusen', 'Lombardia FC (Inter)', 'Paris Saint-Germain', 'Atletico Madrid', 'Chelsea', 'Borussia Dortmund', 'Milano (AC Milan)']
const mid = ['Aston Villa', 'Newcastle United', 'RB Leipzig', 'Juventus', 'Roma', 'Athletic Club', 'West Ham United', 'Atalanta', 'Lazio', 'Napoli', 'Galatasaray SK', 'Fenerbahce SK', 'Girona FC', 'Crystal Palace', 'Brighton & Hove Albion', 'Fiorentina', 'Al Hilal', 'Real Sociedad', 'Sporting CP', 'PSV', 'Nottingham Forest', 'Olympique Lyonnnais', 'Wolverhampton Wanderers', 'Fulham FC', 'Olympique de Marseille', 'Sevilla FC', 'FC Porto', 'Everton', 'Al Nassr', 'Brentford', 'AFC Bournemouth', 'VFL Wolfsburg', 'Ajax', 'Southampton', 'Leicester City', 'Manchester United', 'Tottenham Hotspur',]
const weak = ['Leeds United', 'Inter Miami', 'Rangers FC', 'Ipswich Town', 'Burnley', 'Los Angeles FC', 'Shakhtar Donetsk', 'RCD Espanyol', 'Genoa', 'Racing Club', 'Luton Town', 'Viktoria Plzeň', 'FC Twente', 'LA Galaxy', 'Sheffield United', 'Norwich City', 'Middlesbrough', 'Sunderland', 'West Bromwich Albion', 'Cardiff City', 'FC Cincinnati', 'FC Lorient']
const international = ['England', 'Portugal', 'France', 'Germany', 'Spain', 'Netherlands', 'Argentina', 'Italy']
const women = ['Chelsea', 'Arsenal', 'Manchester United', 'Manchester City', 'FC Barcalona', 'Olympique Lyonnais', 'Bayern Munchen', 'Real Madrid', 'Wolsburg', 'Paris Saint Germain']

// Archived FC24 teams
// const strong = ['Manchester City', 'Real Madrid', 'FC Bayern Munchen', 'FC Barcelona', 'Liverpool', 'Paris Saint-Germain', 'Atletico de Madrid', 'Inter', 'Arsenal', 'Manchester United'];
// const mid = ['Newcastle United', 'Tottenham Hotspur', 'Borussia Dortmund', 'Napoli', 'Aston Villa', 'Chelsea', 'Bayer 04 Leverkusen', 'RB Leipzig', 'Juventus', 'Latium', 'AC Milan', 'Roma', 'Sevilla FC', 'Athletic Club de Bilbao', 'Real Betis Balompie', 'Real Sociedad', 'Villarreal CF', 'SL Benfica', 'West Ham United', 'Fiorentina', 'Bergamo Calcio', 'Galatasaray SK', 'Olympique de Marseille', 'FC Porto'
// ];
// const weak = ['Everton', 'Nottingham Forest', 'Brighton & Hove Albion', 'AS Monaco', 'Fenerbahce SK', 'Al Hilal', 'Al Ittihad', 'Fulham', 'VfL Wolfsburg', 'CA Osasuna', 'Sporting CP', 'Crystal Palace', 'Al Nassr',  'Eintracht Frankfurt',  'LOSC Lille', 'Olympique Lyonnais', 'Getafe CF', 'OGC Nice',  'Wolverhampton Wanderers', 'Brentford', 'RCD Mallorca', 'Rayo Vallecano', 'Girona FC', 'Feyenoord', 'PSV', 'AEK Athens', 'Torino F.C.', 'Boca Juniors', 'AFC Bournemouth', 'Cadiz CF', 'AC Monza', 'Valencia CF', 'Ajax'];
// const women = ['FC Bayern Munich', 'VFL Wolfsburg', 'FC Barcelona', 'Chelsea', 'Arsenal', 'West Ham', 'Aston Villa', 'Real Madrid', 'Paris Saint Germain', 'Olympique Lyon'];
// const euros = ['Belgium', 'Denmark', 'Croatia', 'Czechia', 'England', 'France', 'Germany', 'Hungary', 'Italy', 'Netherlands', 'Poland', 'Portugal', 'Spain'];


function matchTypeSelect(){
    const matchTypes = [
        [strong, 'Strong'],
        [mid, 'Mid'],
        [international, 'International'],
        [women, 'Women']
    ]
    let selectedType = matchTypes[Math.floor(Math.random()*matchTypes.length)]
    return selectedType
}


let selectedType = matchTypeSelect() 

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

function generateTeam(){
    // Old Finals Override Button 
    // if (document.getElementById('finalsovr').checked ==1) {
    //     selectedType[0] = strong
    //     selectedType[1] ='Strong'
    // } 
    // else {
    //     selectedType = matchTypeSelect()
    // }

    // New Option Select Drop Down For Match Type
    let optionSelect = document.getElementById('optionDropdown').value;
    console.log('The selected option is: ', optionSelect)
    console.log(typeof optionSelect)

    if (optionSelect !== 'Any') {
        selectedType[0] = eval(optionSelect.toLowerCase());
        selectedType[1] = `${optionSelect}`
    } else {
        selectedType = matchTypeSelect()
    }


    let teams = teamSelect(selectedType[0])
    let team1 = teams[0]
    let team2 = teams[1]
    let player1 = document.getElementById('p1name').value
    let player2 = document.getElementById('p2name').value
    if (player1 == null || player1 == '' || player2 == null || player2 == '' ){
        alert('Please fill in both player names!')
    } else {
    document.getElementById('type').innerHTML = selectedType[1]
    document.getElementById('p1team').innerHTML = `${player1} will play as:  ${team1}`
    document.getElementById('p2team').innerHTML = `${player2} will play as:  ${team2}`
    } return `Team 1 is: ${team1} and Team 2 is: ${team2}`}




class Player {
    constructor(name){
        this._name = name;
        this._wins = 0;
        this._losses = 0;
        this._draws = 0;
    }
    get name(){
        return this._name
    }
    get wins (){
        return this._wins
    }
    get losses(){
        return this._losses
    }
    get draws(){
        return this._draws
    }
    get points(){
        let points = (this._wins * 3) + (this._draws * 1);
        this._points = points;
        return this._points
    }


    incrementWin(){
        this._wins ++
    }
    incrementLoss(){
        this._losses ++
    }
    incrementDraw(){
        this._draws ++
    }

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

let players = []

function addPlayer(){
    
    let newPlayer = document.getElementById('name').value;
    let playerObject = new Player
    playerObject._name = newPlayer
    players.push(playerObject)

    const para = document.createElement('p');
    const node = document.createTextNode(newPlayer)
    para.appendChild(node)
    document.getElementById('players').appendChild(para)
    return players
}



function createMatches(players){
    let matches = []
for (let i = 0; i<players.length; i++){
    for (let x = 0; x < players.length; x++){
        if(x == i){
            continue
        }
    selectedType = matchTypeSelect()
    let match = new Match
    match._player1 = players[i]._name
    match._player2 = players[x]._name
    matches.push(match)
    console.log(match)
    }
}

// console.log(matches)
return matches
}

// // //Testing Code
// let Sam = new Player('Sam') 
// let Max = new Player('Max')
// let Joe = new Player('Joe')

// // players = [Sam, Max]

// let generatedMatches = createMatches(players)
// console.log(generatedMatches)
// // // console.log(generatedMatches.length)

// function matchEquals(match1, match2) {

// }