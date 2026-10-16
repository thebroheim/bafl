function filterTeams(key, value1, condition, value2) {
    const teams = teamsFC27;
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

const legend = filterTeams('ovr', 87, 'between', 100)
const elite = filterTeams('ovr', 83, 'between', 87)
const strong = filterTeams('ovr', 81, 'between', 83)
const mid = filterTeams('ovr', 80, 'between', 82)
const weak = filterTeams('ovr', 74, 'between', 80)



//Put players in order of rank. Best = Top, Worst = Bottom
const players = [
    'Sam',
    'Dan',
    'Alex',
    'Brent',
    'Dru',
    'Matthew',
    'Jude',
    'Lachlan', 
    'Nick',
    'Brendan',
    'Ricardo',
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
        console.log(player, {type})
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
    const divider = listLength / 4
    const firstQuarter = Math.round(divider)
    const secondQuarter = Math.round(divider + divider)
    const thirdQuarter = Math.round(divider *3)
    const fourthQuarter = Math.round(divider *4)


    //set type bases on the players index
    if (index < firstQuarter){
        return weak
    }if (index < secondQuarter){
        return strong
    }if (index < thirdQuarter){
        return elite
    }if (index < fourthQuarter){
        return legend
    }
    

}

// let assignedTeams = (assignTeams(players))
let assignedTeams = assignTeams(players)

// Display the teams on website
function displayTeams(assignedTeams){

        function slowIterate(arr) {
            if (arr.length === 0) {
              return;
            } 
            // console.log(arr[0]); // <-- replace with your custom code below
            let list = document.getElementById("myList");
            let li = document.createElement("li");
            console.log(arr)
            
            li.innerText = `${arr[0].playerName} will play as ${arr[0].teamName.name}`;
            console.log(arr[0])

        list.appendChild(li)
            
            setTimeout(() => {
              slowIterate(arr.slice(1));
            }, 3000); // <-- replace with your desired delay (in milliseconds) 
          }
          
          slowIterate(assignedTeams);
        }


        