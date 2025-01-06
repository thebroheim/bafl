const strong = ['Real Madrid', 'Manchester City', 'Liverpool', 'FC Bayern Munchen', 'FC Barcelona', 'Arsenal', 'Bayer 04 Leverkusen', 'Inter', 'Paris Saint-Germain', 'Atletico Madrid', 'Chelsea', 'Manchester United', 'Tottenham Hotspur', 'Borussia Dortmund', 'AC Milan']
const mid = ['Aston Villa', 'Newcastle United', 'RB Leipzig', 'Juventus', 'Roma', 'Athletic Club', 'West Ham United', 'Atalanta', 'Lazio', 'Napoli', 'Galatasaray SK', 'Fenerbahce SK', 'Girona FC', 'Crystal Palace', 'Brighton & Hove Albion', 'Fiorentina', 'Al Hilal', 'Real Sociedad', 'Sporting CP', 'PSV', 'Nottingham Forest', 'Olympique Lyonnnais', 'Wolverhampton Wanderers', 'Fulham FC', 'Olympique de Marseille', 'Sevilla FC', 'FC Porto', 'Everton', 'Al Nassr', 'Brentford', 'AFC Bournemouth', 'VFL Wolfsburg', 'Ajax', 'Southampton', 'Leicester City']
const weak = ['Leeds United', 'Inter Miami', 'Rangers FC', 'Ipswich Town', 'Burnley', 'Los Angeles FC', 'Shakhtar Donetsk', 'RCD Espanyol', 'Genoa', 'Racing Club', 'Luton Town', 'Viktoria Plzeň', 'FC Twente', 'LA Galaxy', 'Sheffield United', 'Norwich City', 'Middlesbrough', 'Sunderland', 'West Bromwich Albion', 'Cardiff City', 'FC Cincinnati', 'FC Lorient']
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


        