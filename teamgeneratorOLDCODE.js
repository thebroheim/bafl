const strong = ['Manchester City', 'Real Madrid', 'FC Bayern Munchen', 'FC Barcelona', 'Liverpool', 'Paris Saint-Germain', 'Atletico de Madrid', 'Inter', 'Arsenal', 'Manchester United'];
const mid = ['Newcastle United', 'Tottenham Hotspur', 'Borussia Dortmund', 'Napoli', 'Aston Villa', 'Chelsea', 'Bayer 04 Leverkusen', 'RB Leipzig', 'Juventus', 'Lazio', 'AC Milan', 'Roma', 'Sevilla FC', 'Athletic Club de Bilbao', 'Real Betis Balompie', 'Real Sociedad', 'Villarreal CF', 'SL Benfica', 'West Ham United', 'Fiorentina', 'Atalanta', 'Galatasaray SK', 'Olympique de Marseille', 'FC Porto'
];
const weak = ['Everton', 'Nottingham Forest', 'Brighton & Hove Albion', '1. FC Union Berlin', 'Racing Club de Lens', 'AS Monaco', 'Fenerbahce SK', 'Al Hilal', 'Al Ittihad', 'Fulham', 'VfL Wolfsburg', 'CA Osasuna', 'Sporting CP', 'Crystal Palace', 'Al Nassr', 'Flamengo', 'Borussia Monchengladbach', 'Sport-Club Freiburg', 'Eintracht Frankfurt', 'TSG Hoffenheim', 'LOSC Lille', 'Olympique Lyonnais', 'Getafe CF', 'OGC Nice', 'Stade Rennais FC', 'River Plate', 'SC Braga', 'Wolverhampton Wanderers', 'Palmeiras', 'Brentford','RC Celta de Vigo', 'RCD Mallorca', 'Rayo Vallecano', 'Girona FC', 'Feyenoord', 'PSV', 'Clube Atletico Mineiro', 'AEK Athens', 'Torino F.C.', 'Union Deportiva Almeria', 'Besiktas JK', 'Boca Juniors', 'U.S. Sassuolo Calcio', 'AFC Bournemouth', '1. FSV Mainz 05', 'Cadiz CF', 'AC Monza', 'Valencia CF', 'Ajax'];
// const women = ['Test', 'Testing'];
const wildcard = ['WildCard' , 'WildCard']
let player1 = "Sam"
let player2 = "Lei"

function randNum(number) {
    return Math.floor(Math.random()*number + 1)
}

randomNumber = randNum()

function matchType() {
    //This calculates the match type, based on the amount of types. This needs to be written better though as the case statements need to be altered if adding types
    const type = [strong, mid, weak, women]
    num = randNum(type.length + 5);
    switch (num) {
        case 0:
            return "Strong";
        case 1:
            return "Strong";
        case 2:
            return "Strong";
        case 3:
            return "Strong"
        case 4:
            return "Mid"
        case 5:
            return "Mid";
        case 6:
            return "Mid";
        case 7:
            return "Women";
        case 8:
            return "Weak"
        case 9:
            return "Wildcard"
    }
}

let theMatchType = matchType()
console.log(`The Match Type is: ${theMatchType}`)

function setMatchType() {
    switch (theMatchType){
        case "Strong":
            return strong;
        case "Mid":
            return mid;
        case "Weak":
            return weak;
        case "Women":
            return women
        case "Wildcard":
            return wildcard
    }

}

let actualMatchType = setMatchType()

function selectTeam(player1, player2) {
    let team1 = actualMatchType[Math.floor(Math.random()*actualMatchType.length)]
    let team2 = actualMatchType[Math.floor(Math.random()*actualMatchType.length)]
    console.log(actualMatchType.indexOf(team1))
    console.log( `${player1} will play as: ${team1}`);
    console.log(`${player2} will play as: ${team2}`)

}

selectTeam(player1, player2)