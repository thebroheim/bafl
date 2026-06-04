let players = [
    // Div 1
    { name: 'Sam Harvey', title: 'Season 12', imageSrc: "/images/SamSeason12Div1.png", div: '1'},
    { name: 'Sam Harvey', title: 'Season 11', imageSrc: '/images/SamSeason11Div1.png', div: '1' },
    { name: 'Daniel Dunphy', title: 'Season 10', imageSrc: '/images/DanSeason10Div1.png', div: '1' },
    { name: 'Sam Harvey', title: 'Season 9', imageSrc: '/images/SamSeason9Div1.png', div: '1' },
    { name: 'Sam Harvey', title: 'Season 8', imageSrc: '/images/SamSeason8Div1.png', div: '1' },
    { name: 'Daniel Dunphy', title: 'Season 7', imageSrc: '/images/DanSeason7Div1.png', div: '1' },
    { name: 'Sam Harvey', title: 'Season 6', imageSrc: '/images/SamSeason6Div1.png', div: '1' },
    { name: 'Lei Zhang', title: 'Season 5', imageSrc: '/images/Lei.png', div: '1' },
    { name: 'Sam Harvey', title: 'Season 4', imageSrc: '/images/Sam.png', div: '1' },
    { name: 'Sam Harvey', title: 'Season 3', imageSrc: '/images/Sam.png', div: '1' },
    { name: 'Dan Dunphy', title: 'Season 2', imageSrc: '/images/Dan.png', div: '1' },
    { name: 'Regi John', title: 'Season 1', imageSrc: '/images/Reg.png', div: '1' },

    // Div 2
    { name: 'Bass Klarica', title: 'Season 12', imageSrc: "/images/BassSeason12Div2.png", div: '2'},
    { name: 'Yasin Karatas', title: 'Season 11', imageSrc: '/images/YasinSeason11Div2.png', div: '2' },
    { name: 'Lachlan Thomson', title: 'Season 10', imageSrc: '/images/LachlanSeason10Div2.png', div: '2' },
    { name: 'John Hutchins', title: 'Season 9', imageSrc: '/images/JohnSeason9Div2.png', div: '2' },
    { name: 'Brent Landorf', title: 'Season 8', imageSrc: '/images/BrentSeason8Div2.png', div: '2' },
    { name: 'David Nguyen', title: 'Season 7', imageSrc: '/images/DavidSeason7Div2.png', div: '2' },
    { name: 'Daniel Dunphy', title: 'Season 6', imageSrc: '/images/DanSeason6Div2.png', div: '2' },
    { name: 'David Nguyen', title: 'Season 5', imageSrc: '/images/David.png', div: '2' },
    { name: 'John Hutchins', title: 'Season 4', imageSrc: '/images/John.png', div: '2' },
    // Misc
    { name: 'Daniel Dunphy', title: 'No Rules', imageSrc: '/images/DanNoRulesMiscSeason7.png', div: 'misc' },
    { name: 'Sam Harvey', title: 'Survival', imageSrc: '/images/SamSurvival1.png', div: 'misc' },
    { name: 'Sam Harvey', title: 'Mystery Ball', imageSrc: '/images/SamMysteryBall1.png', div: 'misc' },
    { name: 'Sam Harvey/Bass Klarica', title: 'Rush 2v2', imageSrc: '/images/SamBass2v2Rush1.png', div: 'misc' },
    { name: 'Sam Harvey', title: 'KO 2', imageSrc: '/images/SamKO2.png', div: 'misc' },
    { name: 'Mackenzie Hyder', title: 'KO 1', imageSrc: '/images/MaccaKO1.png', div: 'misc' },
    { name: 'Mackenzie Hyder', title: 'Season 4.5', imageSrc: '/images/Macca.png', div: 'misc' }

]


function createHOFCard({title, name, imageSrc}){
    let card = document.createElement('div')
    card.className = 'hofCard'
    card.innerHTML =`
        <h2>${title}</h2>
        <h3>${name}</h3>
        <img src=${imageSrc}>
    `
    card.addEventListener('click', function() {
        this.classList.toggle('expanded');
    });
    return card
}

let div1Container = document.getElementById("div1champs")
let div2Container = document.getElementById("div2champs")
let miscContainer = document.getElementById("otherchamps")


players.forEach((player) => {
    let cardContainer = miscContainer
    
    switch (player.div){
        case '1':
            cardContainer = div1Container;
            break;
        case '2':
            cardContainer = div2Container;
            break;
        case 'misc':
            cardContainer = miscContainer;
    }

    cardContainer.querySelector('.champs').appendChild(createHOFCard(player))

})