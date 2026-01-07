let mainContent = document.getElementById('main')
mainContent.style.display = 'none'
let divisiontables = document.getElementById('table');
divisiontables.style.display = 'none'
let schedules = document.getElementById('schedule')
schedules.style.display = 'none'
let clearFilterBtn = document.getElementById('filter')
clearFilterBtn.style.display = 'none'
let finalsBtn = document.getElementById("finalsFilter")
let buttonsDivs = document.getElementById('buttonsDivs')
buttonsDivs.style.display = 'none';
let finalsContainer = document.getElementById('finals')
finalsContainer.style.display = 'none'
let upComingHide = document.getElementById('upComingHide')
upComingHide.style.display = 'none'

let eloTables = document.getElementById('eloTables')

eloTables.style.display = 'none'



  function convertToObjects(values) {
  const headers = values[0]; // first row is the keys
  return values.slice(1).map(row => {
    let obj = {};
    headers.forEach((key, i) => {
      obj[key] = row[i]; // assign property from header → value
    });
    return obj;
  });
}

function setDefault(){
    let div1 = document.getElementById('div1matches');
    let div2 = document.getElementById('div2matches');
    let misc = document.getElementById('miscmatches');
    // finalsContainer.style.display = "none"
    eloTables.style.display = 'none'
    div1.style.cssText = "display: ''; flex-direction: column;";
    div2.style.cssText = "display: ''; flex-direction: column;";
    misc.style.cssText = "display: ''; flex-direction: column;";

  if(div1.children.length <= 1){
    div1.style.display = "none"
  }

    if(div2.children.length <= 1){
    div2.style.display = "none"
  }

    if(misc.children.length <= 1){
    misc.style.display = "none"
  }
}

setDefault()

let selectedPlayer = null

function filterMatches(e) {
  let div1 = document.getElementById('div1matches');
  let div2 = document.getElementById('div2matches');
  const tagValue = e.dataset.div;
 if (selectedPlayer == e){
    clearFilter();
    selectedPlayer = null;
  } else {
  selectedPlayer = e;
  clearFilterBtn.style.display = '';
  clearFilterBtn.style.backgroundColor = 'rgba(66, 66, 66, 1)'
  
  const rows = document.querySelectorAll('#table tr');

  // Set rows background to default colour
  rows.forEach((row) => {
    row.style.backgroundColor = ''
    const text = row.textContent
    const firstLine = text.split('\n')[1];
  })

  // Set targeted row background colour
 const targetText = e.textContent.trim(); // assuming e is an element
rows.forEach(row => {
  if (row.textContent.includes(targetText)) {
    row.style.backgroundColor = 'rgba(66, 66, 66, 1)'
  }
});
  

  if(tagValue== 'div2'){
    div1.style.cssText = "display: none; flex-direction: column;";
    div2.style.cssText = "display: ''; flex-direction: column; width: 100%";
  } else if (tagValue== 'div1'){
    div1.style.cssText = "display: ''; flex-direction: column; width: 100%;";
    div2.style.cssText = "display: none; flex-direction: column;";
  } else {
    div1.style.cssText = "display: ''; flex-direction: column;";
    div2.style.cssText = "display: ''; flex-direction: column;";
  }
  
  matches = document.querySelectorAll('.match')
  let player = e.innerHTML
  matches.forEach((match) => {
    if(!match.textContent.includes(player)){
      match.style.display = 'none'
    } else {
      match.style.display = ''
    }
  })
}
}

function clearFilter(){
  setDefault()
  matches = document.querySelectorAll('.match');
  const rows = document.querySelectorAll('#table tr');
  // Set rows background to default colour
  rows.forEach((row) => {
    row.style.backgroundColor = ''
  })

  matches.forEach((match) => {
      match.style.display = ''

  })
  clearFilterBtn.style.display = 'none'
}








async function loadData() {
  const res = await fetch("/.netlify/functions/getData");
  const batch = await res.json();

  // The batch contains 6 valueRanges
  const [
    playersRes,
    matchesRes,
    scheduleRes,
    seasonEloRes,
    allTimeEloRes
  ] = batch.valueRanges;

  // Convert each into your object arrays
  const players = convertToObjects(playersRes.values);
  const matchesFinal = convertToObjects(matchesRes.values);
  const showToggle = convertToObjects(scheduleRes.values);
  const seasonElo = convertToObjects(seasonEloRes.values);
  const allTimeElo = convertToObjects(allTimeEloRes.values);
  
  // console.log(matchesFinal)

  // Now run all your existing display logic here.


  mainContent.style.display = ''
  buttonsDivs.style.display = ''
  




function sortPlayers() {
  players.sort((a, b) => {
    if (a.points !== b.points){
      return b.points - a.points;
    }
    return b.goaldifference - a.goaldifference;
  })
  return players
}

let sortedPlayers = sortPlayers()

let playersDiv1 = sortedPlayers.filter(player => player.div === '1');
let playersDiv2 = sortedPlayers.filter(player => player.div === '2');


function displayMaintenance(){
  let buttons = document.getElementById('buttonsDivs')
  buttons.style.display = 'none';
  let container = document.getElementById('maintenance')
  container.innerHTML = `<h2>Table is under maintenance</h2>`
}


// Print Tables for Div 1 and 2
function displayTable(){
let div1header = document.getElementById("group1Header")
let div2header = document.getElementById("group2Header")

let groupPrefix = showToggle[0].groupprefix
console.log(showToggle[0])
div1header.innerHTML = `${groupPrefix} 1`
div2header.innerHTML = `${groupPrefix} 2`

playersDiv1.forEach(player =>{
  let container = document.getElementById('div1TableData')
  const row = document.createElement("tr")
  row.innerHTML = `
      <td scope="row"><a class= 'playerName' data-div="div1">${player.name}</a></td>
      <td>${player.played}</td>
      <td>${player.wins}</td>
      <td>${player.draws}</td>
      <td>${player.losses}</td>
      <td>${player.goalsfor}</td>
      <td>${player.goalsagainst}</td>
      <td>${player.goaldifference}</td>
      <td>${player.points}</td>`

  container.appendChild(row)

})

playersDiv2.forEach(player =>{
  let container = document.getElementById('div2TableData')
  const row = document.createElement("tr")
  if (player.name == ''){
    return console.log('Didnt add name to table')
  }
  row.innerHTML = `
      <td  scope="row"><a class = 'playerName' data-div="div2">${player.name}</a></td>
      <td>${player.played}</td>
      <td>${player.wins}</td>
      <td>${player.draws}</td>
      <td>${player.losses}</td>
      <td>${player.goalsfor}</td>
      <td>${player.goalsagainst}</td>
      <td>${player.goaldifference}</td>
      <td>${player.points}</td>`

  container.appendChild(row)

})}

function displaySeasonEloTable() {
  seasonElo.forEach(player => {
      let container = document.getElementById('theSeasonEloTable')
    const row = document.createElement("tr")
      row.innerHTML = `
        <td>${player.Name}</td>
        <td>${player.Elo}</td>`

    container.appendChild(row)
  })


}

function displayAllTimeEloTable() {
  allTimeElo.forEach(player => {
      let container = document.getElementById('theAllTimeEloTable')
    const row = document.createElement("tr")
      row.innerHTML = `
        <td>${player.Name}</td>
        <td>${player.Elo}</td>`

    container.appendChild(row)
  })


}


displaySeasonEloTable()
displayAllTimeEloTable()
// Print the matches in HTML. This now uses the matches imported from the spreadsheet

function displayMatches(matches){
    let div1 = document.getElementById("div1matches");
   let div2 = document.getElementById("div2matches");
   let misc = document.getElementById("miscmatches");

matches.forEach(match => {

   let divTag = null
   let finals = document.getElementById("finals");
   let upcomingMatches = document.getElementById('upcomingMatches');
   let prefix = 'Match';
   let container = misc;

   if (match.matchId === '' || match.p1 === null){
    return console.log('Didnt add match to schedule')
   }

   console.log(match)

  switch (match.div) {
    case '1':
      container = div1;
      break;
    case '2':
      container = div2
  };

  if (match.context == 'misc'){
    container = misc
  }

  if(match.context == 'final' || match.context == 'relplayoff'|| match.context == 'promplayoff'){
    container = finals
      if (showToggle[0].finals == "FALSE"){
      finalsBtn.style.display = 'none';
      container.style.display = 'none';
    };
    if (showToggle[0].finals == "TRUE"){
      finalsBtn.style.display = '';
      container.style.display = '';
    }
    
    prefix = ''
  };

  const div = document.createElement("div")
  
  const fallBackImg = 'Default.png';

const team1img =
  match.p1team?.trim()
    ? match.p1team.replace(/[^a-zA-Z0-9]/g, '') + '.png'
    : fallBackImg;

const team2img =
  match.p2team?.trim()
    ? match.p2team.replace(/[^a-zA-Z0-9]/g, '') + '.png'
    : fallBackImg;

    let show1 = ''
    let show2= ``
    // if (match.reveal === "FALSE"){
    //   show = 'display: none; gap:10px'
    // }

    if (match.reveal === "TRUE"){
      show1 = `<div class='teamInfo' style=' display: flex; align-items: center; gap: 8px;'><img src="/images/TeamImages/${team1img}"><p>${match.p1team}</p></div>`
      show2 = `<div class='teamInfo' style=' display: flex; align-items: center; gap: 8px;'><img src="/images/TeamImages/${team2img}"><p>${match.p2team}</p></div>`
    }

    div.className = 'match'
    div.innerHTML = `
    <h3>${prefix} ${match.matchId}</h3>
    <h3>${match.type}</h3>
      <div id="teams">
      <div class="row header">
        <div>Player</div>
        <div>Score</div>
        <div>Team</div>
      </div>
      <div class="row">
        <div class= "playerName" data-div="div${match.div}">${match.p1}</div>
        <div>${match.p1score}</div>
        <div>${show1}</div>
      </div>
      <div class="row">
        <div class= "playerName" data-div="div${match.div}">${match.p2}</div>
        <div>${match.p2score}</div>
        <div>${show2}</div>
      </div>
    </div>
        
      
    `;
    if (match.reveal === "TRUE" && (!match.p1score || match.p1score.trim() === "")) {
        upComingHide.style.display = ''
          const clone = div.cloneNode(true);
          let division = document.createElement("div")
          clone.prepend(division)
          division.innerHTML = `<div><strong>Division ${match.div}</strong></div>`
          upcomingMatches.appendChild(clone);
    }
    container.appendChild(div);
    divisiontables.style.display = 'flex'
    schedules.style.display = 'flex'
  })

  if(div1.children.length <= 1){
    div1.style.display = "none"
  }

    if(div2.children.length <= 1){
    div2.style.display = "none"
  }

    if(misc.children.length <= 1){
    misc.style.display = "none"
  }
};

if (showToggle[0].show == "TRUE"){
  displayTable()
  displayMatches(matchesFinal)
} else {
  displayMaintenance()
};

if (!showToggle[0].tournamentbracket == ""){
  let bracketContainer = document.createElement('div');
  let imageSrc = showToggle[0].tournamentbracket
  bracketContainer.innerHTML = `<img src= ${imageSrc}></img>`

  divisiontables.appendChild(bracketContainer)
  

}

setDefault()

return players
}




document.addEventListener("click", function(e) {
    if (e.target.classList.contains("buttonDiv")) {
      const buttons = document.querySelectorAll('.buttonDiv');
      buttons.forEach(button => {
        button.style.backgroundColor = 'black';
      })
      e.target.style.backgroundColor = 'rgba(66, 66, 66, 1)';
      let div = e.target.innerHTML;
      let div1Content = [document.getElementById('div1Table'), document.getElementById('div1matches')]
      let div2Content = [document.getElementById('div2Table'), document.getElementById('div2matches')]
      let finals = document.getElementById('finals')
      clearFilter()
      switch (div) {
        case "Div 1":
          div1Content[0].style.display = "",
          div1Content[1].style.display = "", div1Content[1].style.width = "100%",
          div2Content[0].style.display = "none",
          div2Content[1].style.display = "none";
          finals.style.display = 'none';
          break;
        case "Both":
          div1Content[0].style.display = "",
          div1Content[1].style.display = "", div1Content[1].style.width = "50%",
          div2Content[0].style.display = "",
          div2Content[1].style.display = "", div2Content[1].style.width = "50%";
          finals.style.display = 'none';
          break;
        case "Div 2":
          div1Content[0].style.display = "none",
          div1Content[1].style.display = "none", div2Content[1].style.width = "100%",
          div2Content[0].style.display = "",
          div2Content[1].style.display = "";
          finals.style.display = 'none';
          break;
        case "Finals":
          finals.style.display = '',
          div1Content[0].style.display = 'none', div1Content[1].style.display = 'none';
          div2Content[0].style.display = 'none', div2Content[1].style.display = 'none';
          break;
      }
    }})




document.addEventListener("click", function(e) {
    if (e.target.classList.contains("playerName")) {
      filterMatches(e.target)
    }
});

function showElo(){
  let eloButton = document.getElementById('eloButton')
  if (eloTables.style.display == ''){
    eloTables.style.display = 'none'

    eloButton.style.backgroundColor = 'black'
  } else {
    eloTables.style.display = '';
    eloButton.style.backgroundColor = 'rgba(66, 66, 66, 1)'
  }
 
}


loadData()

