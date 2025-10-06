function filterTeams(minOvr, maxOvr, type, FC) {
    let teams = teamSetFC25;
    if (FC == 'FC26'){
        teams = teamSetFC26
    }
    const filteredTeams = [];
        teams.forEach(element => {
            if (minOvr == null && element.gender == type) {
                filteredTeams.push(element)
            } else if (element.ovr >= minOvr && element.ovr < maxOvr && element.gender == type) 
                filteredTeams.push(element);
            }); 
            return filteredTeams
};
        


const typeConfig = [
    {name: 'Elite', minOvr: 83, maxOvr: 100, type: 'Men'},
    {name: 'Strong', minOvr: 80, maxOvr: 83, type: 'Men'},
    {name: 'Mid', minOvr: 75, maxOvr: 80, type: 'Men'},
    {name: 'Women', minOvr: null, maxOvr: null, type: 'Women'},
    {name: 'International', minOvr: null, maxOvr: null, type: 'International'},
];

let viewTeamsSwitch = false

function viewTeams() {
    let fc = document.getElementById('fc').value;
    
    const showTeams = document.getElementById('showTeams')
    showTeams.innerHTML = '';
    showTeams.style='display: flex'
    typeConfig.forEach(type => {
        const matchType = document.createElement('h3');
        
        matchType.innerHTML = `${type.name}`
        showTeams.appendChild(matchType);
        let teams = filterTeams(type.minOvr, type.maxOvr, type.type, fc)
        teams.forEach(team => {
            const teamName = document.createElement('p');
            teamName.innerHTML = `${team.name}`
            matchType.appendChild(teamName)
        })
    })
    viewTeamsSwitch = true
}

const options = document.getElementById("optionDropdown");
typeConfig.forEach(type => {
    const option = document.createElement("option");
    option.innerHTML = `
    <option>${type.name}</option>`;
    options.appendChild(option);
});
  
function teamSelect(teamsArray){
    let teamsList = teamsArray
    let teams = []
    let team1 = (teamsList[Math.floor(Math.random()*teamsList.length)])
    teamsArray.splice(teamsList.indexOf(team1), 1)
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
};

function generateTeam(){
    let optionSelect = document.getElementById('optionDropdown').value;
    let fc = document.getElementById('fc').value;
    if (optionSelect !== 'Any') {
        selectedType = typeConfig.find(type => type.name == optionSelect);
    } else {
        selectedType = typeConfig[Math.floor(Math.random()*typeConfig.length)]
    }
    // console.log(selectedType)
    let teams = filterTeams(selectedType.minOvr, selectedType.maxOvr, selectedType.type, fc)
    // console.log(teams)
    let teamsFinal = teamSelect(teams)
    let team1 = teamsFinal[0];
    let team2 = teamsFinal[1];

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
        document.getElementById('type').innerHTML = selectedType.name;
        div1 = `<div><h4>${player1}</h4> <p>${team1.name}</p><img src='${team1src}'></div>`;
        div2 = `<div><h4>${player2}</h4> <p>${team2.name}</p><img src='${team2src}'></div>`;
        container.innerHTML = `${div1}${div2}`
    }

    showImage();

    return `Team 1 is: ${team1} and Team 2 is: ${team2}`;
};