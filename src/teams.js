const teamsFC25 = [
    // Premier League
    { name: 'Manchester City', ovr: 85, star: 5, gender: 'Men' },
    { name: 'Liverpool', ovr: 84, star: 5, gender: 'Men' },
    { name: 'Arsenal', ovr: 83, star: 5, gender: 'Men' },
    { name: 'Tottenham Hotspur', ovr: 81, star: 4.5, gender: 'Men' },
    { name: 'Aston Villa', ovr: 81, star: 4.5, gender: 'Men' },
    { name: 'Newcastle United', ovr: 81, star: 4.5, gender: 'Men' },
    { name: 'Chelsea', ovr: 80, star: 4.5, gender: 'Men' },
    { name: 'Manchester United', ovr: 80, star: 4.5, gender: 'Men' },
    { name: 'West Ham United', ovr: 78, star: 4, gender: 'Men' },
    { name: 'Crystal Palace', ovr: 78, star: 4, gender: 'Men' },
    { name: 'Brighton & Hove Albion', ovr: 78, star: 4, gender: 'Men' },
    { name: 'Nottingham Forest', ovr: 78, star: 4, gender: 'Men' },
    { name: 'Fulham FC', ovr: 77, star: 4, gender: 'Men' },
    { name: 'Brentford', ovr: 77, star: 4, gender: 'Men' },
    { name: 'Everton', ovr: 76, star: 4, gender: 'Men' },
    { name: 'Wolverhampton Wanderers', ovr: 76, star: 4, gender: 'Men' },
    { name: 'AFC Bournemouth', ovr: 77, star: 4, gender: 'Men' },
    { name: 'Southampton', ovr: 74, star: 3.5, gender: 'Men' },
    { name: 'Leicester City', ovr: 75, star: 4, gender: 'Men' },

    //Serie A
    { name: 'Lombardia FC (Inter)', ovr: 84, star: 5, gender: 'Men'},
    { name: 'Milano (AC Milan)', ovr: 81, star: 4.5, gender: 'Men'},
    { name: 'Juventus', ovr: 80, star: 4.5, gender: 'Men' },
    { name: 'Bergamo Calcio (Atalanta)', ovr: '80', star: 4.5, gender: 'Men' },
    { name: 'Roma', ovr: 79, star: 4.5, gender: 'Men' },
    { name: 'Latium (Lazio)', ovr: 79, star: 4.5, gender: 'Men' },
    { name: 'Napoli', ovr: 79, star: 4.5, gender: 'Men' },
    { name: 'Fiorentina', ovr: 77, star: 4, gender: 'Men' },

    //La Liga
    { name: 'Real Madrid', ovr: 85, star: 5, gender: 'Men'},
    { name: 'FC Barcelona', ovr: 84, star: 5, gender: 'Men'},
    { name: 'Atletico Madrid', ovr: 82, star: 4.5, gender: 'Men'},
    { name: 'Athletic Club', ovr: 79, star: 4.5, gender: 'Men' },
    { name: 'Real Sociedad', ovr: 78, star: 4, gender: 'Men' },
    { name: 'Girona FC', ovr: 78, star: 4, gender: 'Men' },
    { name: 'Real Betis', ovr: 78, star: 4, gender: 'Men' },
    { name: 'Sevilla FC', ovr: 76, star: 4, gender: 'Men' },

    //Bundesliga
    { name: 'FC Bayern Munchen', ovr: 84, star: 5, gender: 'Men'},
    { name: 'Bayer 04 Leverkusen', ovr: 83, star: 5, gender: 'Men'},
    { name: 'Borussia Dortmund', ovr: 81, star: 4.5, gender: 'Men'},
    { name: 'RB Leipzig', ovr: 80, star: 4.5, gender: 'Men' },
    { name: 'VFL Wolfsburg', ovr: 77, star: 4, gender: 'Men' },

    //Ligue 1
    { name: 'Paris Saint-Germain', ovr: 83, star: 5, gender: 'Men'},
    { name: 'Olympique Lyonnais', ovr: 78, star: 4, gender: 'Men' },
    { name: 'Olympique de Marseille', ovr: 78, star: 4, gender: 'Men' },

    //Super Lig
    { name: 'Fenerbahce SK', ovr: 80, star: 4.5, gender: 'Men' },
    { name: 'Galatasaray SK', ovr: 79, star: 4.5, gender: 'Men' },

    //Primira Liga
    { name: 'SL Benfica', ovr: 79, star: 4.5, gender: 'Men' },
    { name: 'Sporting CP', ovr: 79, star: 4.5, gender: 'Men' },
    { name: 'FC Porto', ovr: 76, star: 4, gender: 'Men' },

    //Eredivisie
    { name: 'PSV', ovr: 78, star: 4, gender: 'Men' },
    { name: 'Ajax', ovr: 76, star: 4, gender: 'Men' },

    //Saudi
    { name: 'Al Hilal', ovr: 77, star: 4, gender: 'Men' },
    { name: 'Al Nassr', ovr: 76, star: 4, gender: 'Men' },
    { name: 'Al Ittihad', ovr: 74, star: 3.5, gender: 'Men' },

    //Championship
    { name: 'Leeds United', ovr: 74, star: 3.5, gender: 'Men' },
    { name: 'Burnley', ovr: 74, star: 3.5, gender: 'Men' },
    { name: 'Luton Town', ovr: 72, star: 3.5, gender: 'Men' },
    { name: 'Sheffield United', ovr: 73, star: 3.5, gender: 'Men' },
    { name: 'Norwich City', ovr: 70, star: 3, gender: 'Men' },
    { name: 'Middlesbrough', ovr: 72, star: 3.5, gender: 'Men' },
    { name: 'Sunderland', ovr: 72, star: 3.5, gender: 'Men' },
    { name: 'West Bromwich Albion', ovr: 71, star: 3.5, gender: 'Men' },
    { name: 'Cardiff City', ovr: 70, star: 3, gender: 'Men' },

    // Major League Soccer
    { name: 'Inter Miami', ovr: 73, star: 3.5, gender: 'Men' },
    { name: 'Los Angeles FC', ovr: 71, star: 3.5, gender: 'Men' },
    { name: 'LA Galaxy', ovr: 71, star: 3.5, gender: 'Men' },

    // international teams
    {name: 'England', ovr: 85, star: '', gender: 'International'},
    {name: 'Portugal', ovr: 83, star: '', gender: 'International'},
    {name: 'France', ovr: 85, star: '', gender: 'International'},
    {name: 'Germany', ovr: 84, star: '', gender: 'International'},
    {name: 'Spain', ovr: 84, star: '', gender: 'International'},
    {name: 'Netherlands', ovr: 83, star: '', gender: 'International'},
    {name: 'Argentina', ovr: 83, star: '', gender: 'International'},
    {name: 'Italy', ovr: 82, star: '', gender: 'International'},

    //women teams
    {name: 'Chelsea', ovr: '85', star: '', gender: 'Women'},
    {name: 'Arsenal', ovr: '', star: '', gender: 'Women'},
    {name: 'Manchester United', ovr: '', star: '', gender: 'Women'},
    {name: 'Manchester City', ovr: '', star: '', gender: 'Women'},
    {name: 'FC Barcelona', ovr: '', star: '', gender: 'Women'},
    {name: 'Olympique Lyonnais', ovr: '', star: '', gender: 'Women'},
    {name: 'FC Bayern Munchen', ovr: '', star: '', gender: 'Women'},
    {name: 'Real Madrid', ovr: '', star: '', gender: 'Women'},
    {name: 'VFL Wolfsburg', ovr: '', star: '', gender: 'Women'},
    {name: 'Paris Saint-Germain', ovr: '', star: '', gender: 'Women'}
];

const teamsFC26 = [
    // Premier League
    { name: 'Manchester City', ovr: 84, star: 5, gender: 'Men' },
    { name: 'Liverpool', ovr: 85, star: 5, gender: 'Men' },
    { name: 'Arsenal', ovr: 84, star: 5, gender: 'Men' },
    { name: 'Tottenham Hotspur', ovr: 81, star: 4.5, gender: 'Men' },
    { name: 'Aston Villa', ovr: 80, star: 4.5, gender: 'Men' },
    { name: 'Newcastle United', ovr: 81, star: 4.5, gender: 'Men' },
    { name: 'Chelsea', ovr: 80, star: 4.5, gender: 'Men' },
    { name: 'Manchester United', ovr: 80, star: 4.5, gender: 'Men' },
    { name: 'West Ham United', ovr: 77, star: 4, gender: 'Men' },
    { name: 'Crystal Palace', ovr: 79, star: 4.5, gender: 'Men' },
    { name: 'Brighton & Hove Albion', ovr: 78, star: 4, gender: 'Men' },
    { name: 'Nottingham Forest', ovr: 79, star: 4.5, gender: 'Men' },
    { name: 'Fulham FC', ovr: 77, star: 4, gender: 'Men' },
    { name: 'Brentford', ovr: 77, star: 4, gender: 'Men' },
    { name: 'Everton', ovr: 77, star: 4, gender: 'Men' },
    { name: 'Wolverhampton Wanderers', ovr: 76, star: 4, gender: 'Men' },
    { name: 'AFC Bournemouth', ovr: 78, star: 4, gender: 'Men' },
    { name: 'Sunderland', ovr: 76, star: 4, gender: 'Men' },
    { name: 'Leeds United', ovr: 76, star: 4, gender: 'Men' },
    { name: 'Burnley', ovr: 75, star: 4, gender: 'Men' },

    // Serie A
    { name: 'Lombardia FC (Inter)', ovr: 84, star: 5, gender: 'Men'},
    { name: 'Milano (AC Milan)', ovr: 80, star: 4.5, gender: 'Men'},
    { name: 'Juventus', ovr: 80, star: 4.5, gender: 'Men' },
    { name: 'Bergamo Calcio (Atalanta)', ovr: 79, star: 4.5, gender: 'Men' },
    { name: 'Roma', ovr: 80, star: 4.5, gender: 'Men' },
    { name: 'Latium (Lazio)', ovr: 79, star: 4.5, gender: 'Men' },
    { name: 'Napoli', ovr: 81, star: 4.5, gender: 'Men' },
    { name: 'Fiorentina', ovr: 77, star: 4, gender: 'Men' },

    // La Liga
    { name: 'Real Madrid', ovr: 85, star: 5, gender: 'Men'},
    { name: 'FC Barcelona', ovr: 85, star: 5, gender: 'Men'},
    { name: 'Atletico Madrid', ovr: 82, star: 4.5, gender: 'Men'},
    { name: 'Athletic Club', ovr: 80, star: 4.5, gender: 'Men' },
    { name: 'Real Sociedad', ovr: 78, star: 4, gender: 'Men' },
    { name: 'Girona FC', ovr: 77, star: 4, gender: 'Men' },
    { name: 'Real Betis', ovr: 79, star: 4.5, gender: 'Men' },
    { name: 'Sevilla FC', ovr: 76, star: 4, gender: 'Men' },

    // Bundesliga
    { name: 'FC Bayern Munchen', ovr: 84, star: 5, gender: 'Men'},
    { name: 'Bayer 04 Leverkusen', ovr: 79, star: 4.5, gender: 'Men'},
    { name: 'Borussia Dortmund', ovr: 81, star: 4.5, gender: 'Men'},
    { name: 'RB Leipzig', ovr: 78, star: 4, gender: 'Men' },
    { name: 'VFL Wolfsburg', ovr: 77, star: 4, gender: 'Men' },

    // Ligue 1
    { name: 'Paris Saint-Germain', ovr: 84, star: 5, gender: 'Men'},
    { name: 'Olympique Lyonnais', ovr: 76, star: 4, gender: 'Men' },
    { name: 'Olympique de Marseille', ovr: 79, star: 4.5, gender: 'Men' },
    { name: 'AS Monaco', ovr: 78, star: 4, gender: 'Men' },
    { name: 'Lille OSC', ovr: 76, star: 4, gender: 'Men' },

    // Super Lig
    { name: 'Fenerbahce SK', ovr: 79, star: 4.5, gender: 'Men' },
    { name: 'Galatasaray SK', ovr: 80, star: 4.5, gender: 'Men' },

    // Primeira Liga
    { name: 'SL Benfica', ovr: 78, star: 4, gender: 'Men' },
    { name: 'Sporting CP', ovr: 79, star: 4.5, gender: 'Men' },
    { name: 'FC Porto', ovr: 77, star: 4, gender: 'Men' },

    // Eredivisie
    { name: 'PSV', ovr: 77, star: 4, gender: 'Men' },
    { name: 'Ajax', ovr: 75, star: 4, gender: 'Men' },

    // Saudi
    { name: 'Al Hilal', ovr: 77, star: 4, gender: 'Men' },
    { name: 'Al Nassr', ovr: 76, star: 4, gender: 'Men' },
    { name: 'Al Ittihad', ovr: 76, star: 4, gender: 'Men' },

    // Championship
    { name: 'Leicester City', ovr: 73, star: 3.5, gender: 'Men' },
    { name: 'Ipswich Town', ovr: 73, star: 3.5, gender: 'Men' },
    { name: 'Sheffield United', ovr: 72, star: 3.5, gender: 'Men' },
    { name: 'Norwich City', ovr: 70, star: 3, gender: 'Men' },
    { name: 'Middlesbrough', ovr: 71, star: 3.5, gender: 'Men' },
    { name: 'West Bromwich Albion', ovr: 71, star: 3.5, gender: 'Men' },
    { name: 'Wrexham', ovr: 71, star: 3.5, gender: 'Men' },
    { name: 'Southampton', ovr: 72, star: 3.5, gender: 'Men' },
    { name: 'Birmingham City', ovr: 71, star: 3.5, gender: 'Men' },
    { name: 'Coventry City', ovr: 71, star: 3.5, gender: 'Men' },

    // Major League Soccer
    { name: 'Inter Miami', ovr: 72, star: 3.5, gender: 'Men' },
    { name: 'Los Angeles FC', ovr: 71, star: 3.5, gender: 'Men' },
    { name: 'LA Galaxy', ovr: 70, star: 3, gender: 'Men' },

    // International teams
    {name: 'England', ovr: 84, star: null, gender: 'International'},
    {name: 'Portugal', ovr: 84, star: null, gender: 'International'},
    {name: 'France', ovr: 85, star: null, gender: 'International'},
    {name: 'Germany', ovr: 83, star: null, gender: 'International'},
    {name: 'Spain', ovr: 85, star: null, gender: 'International'},
    {name: 'Netherlands', ovr: 83, star: null, gender: 'International'},
    {name: 'Argentina', ovr: 83, star: null, gender: 'International'},
    {name: 'Italy', ovr: 83, star: null, gender: 'International'},

    // Women teams
    {name: 'Chelsea', ovr: null, star: null, gender: 'Women'},
    {name: 'Arsenal', ovr: null, star: null, gender: 'Women'},
    {name: 'Manchester United', ovr: null, star: null, gender: 'Women'},
    {name: 'Manchester City', ovr: null, star: null, gender: 'Women'},
    {name: 'FC Barcelona', ovr: null, star: null, gender: 'Women'},
    {name: 'Olympique Lyonnais', ovr: null, star: null, gender: 'Women'},
    {name: 'FC Bayern Munchen', ovr: null, star: null, gender: 'Women'},
    {name: 'Real Madrid', ovr: null, star: null, gender: 'Women'},
    {name: 'VFL Wolfsburg', ovr: null, star: null, gender: 'Women'},
    {name: 'Paris Saint-Germain', ovr: null, star: null, gender: 'Women'}

]

// {name: '',ovr: , star: }

window.teamSetFC25 = teamsFC25.map(team => ({
    ...team,
    image: team.name.replace(/[^a-zA-Z0-9]/g, '') + '.png'
  }));

  window.teamSetFC26 = teamsFC26.map(team => ({
    ...team,
    image: team.name.replace(/[^a-zA-Z0-9]/g, '') + '.png'
  }));


 