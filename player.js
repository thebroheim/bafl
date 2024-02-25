const strong = ['Manchester City', 'Real Madrid', 'FC Bayern Munchen', 'FC Barcelona', 'Liverpool', 'Paris Saint-Germain', 'Atletico de Madrid', 'Inter', 'Arsenal', 'Manchester United'];
const mid = ['Newcastle United', 'Tottenham Hotspur', 'Borussia Dortmund', 'Napoli', 'Aston Villa', 'Chelsea', 'Bayer 04 Leverkusen', 'RB Leipzig', 'Juventus', 'Latium', 'AC Milan', 'Roma', 'Sevilla FC', 'Athletic Club de Bilbao', 'Real Betis Balompie', 'Real Sociedad', 'Villarreal CF', 'SL Benfica', 'West Ham United', 'Fiorentina', 'Bergamo Calcio', 'Galatasaray SK', 'Olympique de Marseille', 'FC Porto'
];
const weak = ['Everton', 'Nottingham Forest', 'Brighton & Hove Albion', '1. FC Union Berlin', 'Racing Club de Lens', 'AS Monaco', 'Fenerbahce SK', 'Al Hilal', 'Al Ittihad', 'Fulham', 'VfL Wolfsburg', 'CA Osasuna', 'Sporting CP', 'Crystal Palace', 'Al Nassr', 'Flamengo', 'Borussia Monchengladbach', 'Sport-Club Freiburg', 'Eintracht Frankfurt', 'TSG Hoffenheim', 'LOSC Lille', 'Olympique Lyonnais', 'Getafe CF', 'OGC Nice', 'Stade Rennais FC', 'River Plate', 'SC Braga', 'Wolverhampton Wanderers', 'Palmeiras', 'Brentford','RC Celta de Vigo', 'RCD Mallorca', 'Rayo Vallecano', 'Girona FC', 'Feyenoord', 'PSV', 'Clube Atletico Mineiro', 'AEK Athens', 'Torino F.C.', 'Union Deportiva Almeria', 'Besiktas JK', 'Boca Juniors', 'U.S. Sassuolo Calcio', 'AFC Bournemouth', '1. FSV Mainz 05', 'Cadiz CF', 'AC Monza', 'Valencia CF', 'Ajax'];
const women = ['FC Bayern Munich', 'VFL Wolfsburg', 'FC Barcelona', 'Chelsea', 'Arsenal', 'West Ham', 'Aston Villa', 'Real Madrid', 'Paris Saint Germain', 'Olympique Lyon'];
const wildcard = ['WildCard' , 'WildCard']
const international = ['England', 'France', 'Germany', 'Portugal', 'Spain', 'Argentina', 'Italy', 'Netherlands', 'Belgium', 'Croatia', 'Denmark', 'Norway']

function matchTypeSelect(){
    const matchTypes = [[strong, 'Strong'], [mid, 'Mid'], [weak, 'Weak'], [international, 'International'], [women, 'Women']]
    let selectedType = matchTypes[Math.floor(Math.random()*matchTypes.length)]
    return selectedType
}

let selectedType = matchTypeSelect() 

function teamSelect(selectedType){
    let team = selectedType[Math.floor(Math.random()*selectedType.length)]
    console.log(selectedType)
    selectedType.splice(selectedType.indexOf(team), 1)
    return team
}

function generateTeam(){
    if (document.getElementById('finalsovr').checked ==1) {
        selectedType[0] = strong
        selectedType[1] ='Strong'
    } else {
        selectedType = matchTypeSelect()
    }
    let team1 = teamSelect(selectedType[0])
    let team2 = teamSelect(selectedType[0])
    let player1 = document.getElementById('p1name').value
    let player2 = document.getElementById('p2name').value
    if (player1 == null || player1 == '' || player2 == null || player2 == '' ){
        alert('Please fill in both player names!')
    } else {
    document.getElementById('type').innerHTML = selectedType[1]
    document.getElementById('p1team').innerHTML = `${player1} will play as:  ${team1}`
    document.getElementById('p2team').innerHTML = `${player2} will play as:  ${team2}`
    }}

function refreshPage(){
    document.getElementById('p1name').value =''
    document.getElementById('p2name').value =''
    location.reload()
}



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
    constructor(matchId){
        this._matchId = matchId;
        this._player1 = players[0].name
        this._player2 = players[1].name
        this._player1team = teamSelect(selectedType)
        this._player2team = teamSelect(selectedType)
    }
}

const sam = new Player('Sam Harvey')
const lachlan = new Player('Lachlan Thomson')
const players = [sam, lachlan]

function createMatches(num){
    let matches = []
for (let i = 0; i<num; i++){
    let match = new Match(i)
    matches.push(match)
}
return matches
}
