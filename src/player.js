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
    {name: 'Mid', minOvr: 76, maxOvr: 80, type: 'Men'},
    {name: 'Weak', minOvr: 68, maxOvr: 76, type: 'Men'},
    {name: 'Women', minOvr: null, maxOvr: null, type: 'Women'},
    {name: 'International', minOvr: null, maxOvr: null, type: 'International'},
];

let viewTeamsSwitch = true

function viewTeams() {
    let fc = document.getElementById('fc').value;
    const showTeams = document.getElementById('showTeams');
    showTeams.innerHTML = '';
    showTeams.style.display = 'flex';
    showTeams.style.flexDirection = 'column'; // stack the sections vertically

    typeConfig.forEach(type => {
        const matchType = document.createElement('div');
        const matchTypeHeader = document.createElement('h3');
        const typeDiv = document.createElement('div');

        typeDiv.style.display = 'none';
        matchType.className = 'showTeamType';
        matchTypeHeader.innerHTML = `
            <span class="type-name">${type.name}</span>
            <span class="arrow">►</span>
        `;

        showTeams.appendChild(matchType);
        matchType.appendChild(matchTypeHeader)
        matchType.appendChild(typeDiv);

        let teams = filterTeams(type.minOvr, type.maxOvr, type.type, fc);
        teams.forEach(team => {
            const teamName = document.createElement('p');
            teamName.innerHTML = `${team.name}: ${team.ovr}`;
            typeDiv.appendChild(teamName);
        });
    });

    viewTeamsSwitch = true;
}

function teamsDisplay() {
    typeConfig.forEach(type => {
        const matchTypeHeader = document.createElement('h4');
        const teamsHeader = document.getElementById('teamsHeader')
        
        matchTypeHeader.textContent = type.name;
        matchTypeHeader.className = "headerType"

        teamsHeader.appendChild(matchTypeHeader)

;
    });

    viewTeamsSwitch = true;
}

function teamContent(aType){
    let fc = document.getElementById('fc').value;
    const teamsContent = document.getElementById('teamsContent')
    type = typeConfig.find(type => type.name == aType);
    let teams = filterTeams(type.minOvr, type.maxOvr, type.type, fc);

    teams.sort((a, b) =>
        b.ovr - a.ovr || a.name.localeCompare(b.name)
        );

    const typeDiv = document.createElement('div');

    teams.forEach(team => {
            const teamName = document.createElement('div');
            teamName.innerHTML = `<p>${team.name}</P> <p>OVR: ${team.ovr}</p>`;
            typeDiv.appendChild(teamName);
            teamsContent.innerHTML = typeDiv.innerHTML
        })
        
}

teamsDisplay()



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

advancedGen = document.getElementById("advCheck").checked
advancedGen.value = false
targetOvr = document.getElementById("targetOvr")
targetOvr.value = ''

function generateTeam(){
    advancedGen = document.getElementById("advCheck").checked
    let advMinOvr = document.getElementById("minOutput").innerHTML 
    let advMaxOvr = document.getElementById("maxOutput").innerHTML 

    console.log(advMaxOvr)

    let optionSelect = document.getElementById('optionDropdown').value;
    let fc = document.getElementById('fc').value;

    if (optionSelect !== 'Any') {
        selectedType = typeConfig.find(type => type.name == optionSelect);
    } else {
        selectedType = typeConfig[Math.floor(Math.random()*typeConfig.length)]
    }

    let teams = []
    // console.log(selectedType)
    if (advancedGen){
        if(targetOvr.value > 39){
            let minOvr = targetOvr.value -3
            let maxOvr = targetOvr.value + 3
            teams = filterTeams(minOvr, maxOvr, "Men", fc)
            selectedType.name = 'Custom'
            
        } else {
            teams = filterTeams(advMinOvr, advMaxOvr, "Men", fc);
            selectedType.name = 'Custom'
        }


    } else {teams = filterTeams(selectedType.minOvr, selectedType.maxOvr, selectedType.type, fc)}
    
    if(teams.length == 0){
        alert('No teams found')
        return
    }
    console.log(teams)
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


document.addEventListener("click", function(e) {
    if(e.target.classList == "headerType"){
         const headers = document.querySelectorAll('#teamsHeader h4');
 headers.forEach(header => {
    console.log(header.innerHTML)
    header.style.color = '#ffffff'
 })
    const type = e.target.innerHTML

    e.target.style.color = '#24e3fd'
    teamContent(type)
    }

});

const minSlider = document.getElementById("minRange");
const minOutput = document.getElementById("minOutput");
const maxSlider = document.getElementById("maxRange");
const maxOutput = document.getElementById("maxOutput");

// Update the current slider value each time you drag the handle
minSlider.oninput = function() {
  minOutput.innerHTML = this.value;
}
maxSlider.oninput = function() {
  maxOutput.innerHTML = this.value;
}

typeSelectContainer = document.getElementById("typeSelect")
typeConfig.forEach(type => {
    if(type.name == 'Women'){
        return
    }
    typeOption = document.createElement("p")
    typeOption.className = "typeOption"
    typeOption.innerHTML = type.name
    // typeSelectContainer.appendChild(typeOption)
})

let selectedTypes = [];

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("typeOption")) {
        
        // 1. Check if the element is already in the array
        const index = selectedTypes.indexOf(e.target);
        const isAlreadySelected = index !== -1;

        // 2. Logic: If it's there, remove it; if not, add it (Toggle behavior)
        isAlreadySelected 
            ? selectedTypes.splice(index, 1) 
            : selectedTypes.push(e.target);

        // 3. Ternary for CSS Style
        // If it's now in the array, show the border; otherwise, remove it
        e.target.style.border = selectedTypes.includes(e.target) 
            ? "solid #24e3fd" 
            : "none";
        
        console.log(selectedTypes[0].innerHTML)

    }
});

function showAdvanced() {
    let s = document.getElementById("advancedGen").style;
    let typeDrop = document.getElementById("optionDropdown").style
    typeDrop.display = (typeDrop.display === '' ? 'none' : '');
    s.display = (s.display === 'none' ? '' : 'none');
}