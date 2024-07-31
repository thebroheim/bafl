const strong = ['Manchester City', 'Real Madrid', 'FC Bayern Munchen', 'FC Barcelona', 'Liverpool', 'Paris Saint-Germain', 'Atletico de Madrid', 'Inter', 'Arsenal', 'Manchester United'];
const mid = ['Newcastle United', 'Tottenham Hotspur', 'Borussia Dortmund', 'Napoli', 'Aston Villa', 'Chelsea', 'Bayer 04 Leverkusen', 'RB Leipzig', 'Juventus', 'Latium', 'AC Milan', 'Roma', 'Sevilla FC', 'Athletic Club de Bilbao', 'Real Betis Balompie', 'Real Sociedad', 'Villarreal CF', 'SL Benfica', 'West Ham United', 'Fiorentina', 'Bergamo Calcio', 'Galatasaray SK', 'Olympique de Marseille', 'FC Porto'
];
const weak = ['Everton', 'Nottingham Forest', 'Brighton & Hove Albion', '1. FC Union Berlin', 'Racing Club de Lens', 'AS Monaco', 'Fenerbahce SK', 'Al Hilal', 'Al Ittihad', 'Fulham', 'VfL Wolfsburg', 'CA Osasuna', 'Sporting CP', 'Crystal Palace', 'Al Nassr', 'Borussia Monchengladbach', 'Sport-Club Freiburg', 'Eintracht Frankfurt', 'TSG Hoffenheim', 'LOSC Lille', 'Olympique Lyonnais', 'Getafe CF', 'OGC Nice', 'Stade Rennais FC', 'SC Braga', 'Wolverhampton Wanderers', 'Brentford','RC Celta de Vigo', 'RCD Mallorca', 'Rayo Vallecano', 'Girona FC', 'Feyenoord', 'PSV', 'AEK Athens', 'Torino F.C.', 'Union Deportiva Almeria', 'Besiktas JK', 'Boca Juniors', 'U.S. Sassuolo Calcio', 'AFC Bournemouth', '1. FSV Mainz 05', 'Cadiz CF', 'AC Monza', 'Valencia CF', 'Ajax'];

//Put players in order of rank. Best = Top, Worst = Bottom
const players = [
    'Sam',
    'Macca',
    'Kelvin',
    'Lei',
    'Alex',
    'David', 
    'Elliot',
    'Dan',
    'Rav',
    'Regi',
    'Lachlan',
    'Pat',
    'Jude',
    'Dru',
    'John',
    'Oscar',
    'Yasin',
]

//Selects the team randomly from the type
function selectTeam(type) {
    let selectedTeam = (type[Math.floor(Math.random()*type.length)])
    return selectedTeam
}

//This is where the player gets assigned a team and it pushes the player and their team to an array
function assignTeams(players){
    let teams = []
    // For each player, assign a team and push it to the array
    players.forEach(player => {

        //Select the type
        let type = selectType(players, player)

        //Select the team
        let team = selectTeam(type)

        // Push the player and team to array
        // teams.push(`${player}: ${team}`)
        teams.push({playerName: player, teamName: team})
        type.splice(type.indexOf(team), 1)



        
    });

    return teams
}


//This is where the type is selected, based on the players rank in the players array.
function selectType(players, player){
    //grab index of player
    index = players.indexOf(player)

    //define list length
    const listLength = players.length
    //define percentiles
    const divider = listLength / 3
    const firstThird = divider
    const secondThird = divider + divider
    const thirdThird = divider *3

    //set type bases on the players index
    if (index < firstThird){
        return weak
    }if (index < secondThird){
        return mid
    }if (index < thirdThird){
        return strong
    }

}

// let assignedTeams = (assignTeams(players))
let assignedTeams = assignTeams(players)
console.log(assignedTeams)

// Display the teams on website
function displayTeams(assignedTeams){

        function slowIterate(arr) {
            if (arr.length === 0) {
              return;
            } 
            // console.log(arr[0]); // <-- replace with your custom code below
            let list = document.getElementById("myList");
            let li = document.createElement("li");
            
            li.innerText = `${arr[0].playerName} will play as ${arr[0].teamName}`;

        list.appendChild(li)
            
            setTimeout(() => {
              slowIterate(arr.slice(1));
            }, 3000); // <-- replace with your desired delay (in milliseconds) 
          }
          
          slowIterate(assignedTeams);
        }


        