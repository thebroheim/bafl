//////////////////////////////////////////////////////////////////////////////////////////////////////

// Archived arrays
// const strong = ['Real Madrid', 'Manchester City', 'Liverpool', 'FC Bayern Munchen', 'FC Barcelona', 'Arsenal', 'Bayer 04 Leverkusen', 'Lombardia FC (Inter)', 'Paris Saint-Germain', 'Atletico Madrid', 'Chelsea', 'Borussia Dortmund', 'Milano (AC Milan)']
// const mid = ['Aston Villa', 'Newcastle United', 'RB Leipzig', 'Juventus', 'Roma', 'Athletic Club', 'West Ham United', 'Bergamo Calcio', 'Latium', 'Napoli', 'Galatasaray SK', 'Fenerbahce SK', 'Girona FC', 'Crystal Palace', 'Brighton & Hove Albion', 'Fiorentina', 'Al Hilal', 'Real Sociedad', 'Sporting CP', 'PSV', 'Nottingham Forest', 'Olympique Lyonnnais', 'Wolverhampton Wanderers', 'Fulham FC', 'Olympique de Marseille', 'Sevilla FC', 'FC Porto', 'Everton', 'Al Nassr', 'Brentford', 'AFC Bournemouth', 'VFL Wolfsburg', 'Ajax', 'Southampton', 'Leicester City', 'Manchester United', 'Tottenham Hotspur',]
// const weak = ['Leeds United', 'Inter Miami', 'Rangers FC', 'Ipswich Town', 'Burnley', 'Los Angeles FC', 'Shakhtar Donetsk', 'RCD Espanyol', 'Genoa', 'Racing Club', 'Luton Town', 'Viktoria Plzeň', 'FC Twente', 'LA Galaxy', 'Sheffield United', 'Norwich City', 'Middlesbrough', 'Sunderland', 'West Bromwich Albion', 'Cardiff City', 'FC Cincinnati', 'FC Lorient']
// const international = ['England', 'Portugal', 'France', 'Germany', 'Spain', 'Netherlands', 'Argentina', 'Italy']
// const women = ['Chelsea', 'Arsenal', 'Manchester United', 'Manchester City', 'FC Barcalona', 'Olympique Lyonnais', 'Bayern Munchen', 'Real Madrid', 'Wolfsburg', 'Paris Saint Germain']

// Archived FC24 teams
// const strong = ['Manchester City', 'Real Madrid', 'FC Bayern Munchen', 'FC Barcelona', 'Liverpool', 'Paris Saint-Germain', 'Atletico de Madrid', 'Inter', 'Arsenal', 'Manchester United'];
// const mid = ['Newcastle United', 'Tottenham Hotspur', 'Borussia Dortmund', 'Napoli', 'Aston Villa', 'Chelsea', 'Bayer 04 Leverkusen', 'RB Leipzig', 'Juventus', 'Latium', 'AC Milan', 'Roma', 'Sevilla FC', 'Athletic Club de Bilbao', 'Real Betis Balompie', 'Real Sociedad', 'Villarreal CF', 'SL Benfica', 'West Ham United', 'Fiorentina', 'Bergamo Calcio', 'Galatasaray SK', 'Olympique de Marseille', 'FC Porto'
// ];
// const weak = ['Everton', 'Nottingham Forest', 'Brighton & Hove Albion', 'AS Monaco', 'Fenerbahce SK', 'Al Hilal', 'Al Ittihad', 'Fulham', 'VfL Wolfsburg', 'CA Osasuna', 'Sporting CP', 'Crystal Palace', 'Al Nassr',  'Eintracht Frankfurt',  'LOSC Lille', 'Olympique Lyonnais', 'Getafe CF', 'OGC Nice',  'Wolverhampton Wanderers', 'Brentford', 'RCD Mallorca', 'Rayo Vallecano', 'Girona FC', 'Feyenoord', 'PSV', 'AEK Athens', 'Torino F.C.', 'Boca Juniors', 'AFC Bournemouth', 'Cadiz CF', 'AC Monza', 'Valencia CF', 'Ajax'];
// const women = ['FC Bayern Munich', 'VFL Wolfsburg', 'FC Barcelona', 'Chelsea', 'Arsenal', 'West Ham', 'Aston Villa', 'Real Madrid', 'Paris Saint Germain', 'Olympique Lyon'];
// const euros = ['Belgium', 'Denmark', 'Croatia', 'Czechia', 'England', 'France', 'Germany', 'Hungary', 'Italy', 'Netherlands', 'Poland', 'Portugal', 'Spain'];


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

let viewTeamsSwitch = false
function viewTeams() {
    if (!viewTeamsSwitch){
    const showTeams = document.getElementById('showTeams')
    showTeams.style='display: flex'
    matchTypes.forEach(type => {
        const matchType = document.createElement('h3');

        matchType.innerHTML = `${type[1]}: `
        showTeams.appendChild(matchType);
        type[0].forEach(team => {
            const teamName = document.createElement('p');
            teamName.innerHTML = `${team.name}`
            matchType.appendChild(teamName)
        })
    })}
    viewTeamsSwitch = true
}


    const options = document.getElementById("optionDropdown");
    matchTypes.forEach(type => {
        const option = document.createElement("option");
        option.innerHTML = `
        <option>${type[1]}</option>`;
        options.appendChild(option);
    });
  




function matchTypeSelect(){

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

const fallBackImg = new Image();
fallBackImg.src = '/images/TeamImages/Default.png'

function loadImage(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = src;

        img.onload = () => resolve(src);
        img.onerror = () => resolve(fallBackImg.src); // fallback
    });
}

function generateTeam() {
    let optionSelect = document.getElementById('optionDropdown').value;

    if (optionSelect !== 'Any') {
        selectedType[0] = eval(optionSelect.toLowerCase());
        selectedType[1] = `${optionSelect}`;
    } else {
        selectedType = matchTypeSelect();
    }

    let teams = teamSelect(selectedType[0]);
    let team1 = teams[0];
    let team2 = teams[1];
    let team1img = `/images/TeamImages/${team1.image}`;
    let team2img = `/images/TeamImages/${team2.image}`;
    let player1 = document.getElementById('p1name').value;
    let player2 = document.getElementById('p2name').value;

    if (!player1 || !player2) {
        alert('Please fill in both player names!');
        return;
    }

    async function showImage() {
        const [team1src, team2src] = await Promise.all([
            loadImage(team1img),
            loadImage(team2img)
        ]);
        let container = document.getElementById('teamspicked');
        let div1 = document.createElement("div");
        let div2 = document.createElement("div");

        



        document.getElementById('type').innerHTML = selectedType[1];

        div1 = `<div><h4>${player1}</h4> <p>${team1.name}</p><img src='${team1src}'></div>`;

        div2 = `<div><h4>${player2}</h4> <p>${team2.name}</p><img src='${team2src}'></div>`;
        
        container.innerHTML = `${div1}${div2}`

        console.log(container)



        
    }

    showImage();

    return `Team 1 is: ${team1} and Team 2 is: ${team2}`;
}
