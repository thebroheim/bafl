function convertToObjects(values) {
  const headers = values[0];

  return values.slice(1).map(row => {
    let obj = {};

    headers.forEach((key, i) => {
      const val = row[i];

      // Convert numbers that come in as strings
      obj[key] = (typeof val === "string" && val.trim() !== "" && !isNaN(val))
        ? Number(val)
        : val;
    });

    return obj;
  });
}

let newsArticles = []

async function loadData() {
  const res = await fetch("/.netlify/functions/getNews");
  const batch = await res.json();

  // The batch contains 6 valueRanges
  const [
    newsRes,
  ] = batch.valueRanges;

  newsArticles = convertToObjects(newsRes.values);

}

async function init() {
  await loadData();

  console.log(newsArticles)

  const container = document.getElementById("news-container");
  const navContatiner =document.getElementById("newsNav")
  
  newsArticles.forEach(article => {
    const div = document.createElement("div");
    const divNav = document.createElement("divNav");
    div.className = "news-article";

    if(article.prefix && article.prefix2){
          divNav.innerHTML = `
          <a href="#${article.season}${article.week}">${article.prefix} ${article.season} ${article.prefix2} ${article.week}</a>`
          
          div.innerHTML = `
            <h2 id=${article.season}${article.week}>${article.prefix} ${article.season} ${article.prefix2} ${article.week}</h2>
            <p><em>Published on: ${article.date}</em></p>
            <p>Author: ${article.author}</p>
            <p>${article.summary}</p>
            
          `;
    } else {
          divNav.innerHTML = `
          <a href="#${article.season}${article.week}">Season ${article.season} Week ${article.week}</a>`
          
          div.innerHTML = `
            <h2 id=${article.season}${article.week}>Season ${article.season} Week ${article.week}</h2>
            <p><em>Published on: ${article.date}</em></p>
            <p>Author: ${article.author}</p>
            <p>${article.summary}</p>
            
          `;
    }


  
    container.appendChild(div);
    navContatiner.appendChild(divNav);
// 


  });



}



// const newsArticles = [
//     // {
//     //     season:"",
//     //     week: "",
//     //     date: "",
//     //     summary: ``,
//     //     author: "Alex Villani"
//     // },

//         {
//         prefix: " ",
//         season:"2025",
//         prefix2: " ",
//         week: "Wrap Up",
//         date: "December 19",
//         summary: `Well, it’s finally here — the end of the year and the end of Season 11 of the BAFL. Before recapping the excitement that was the finals series, I’d like to reflect on the year as a whole: the uncommon highs, the record lows, and the memories made along the way.
// <br><br>
// On February 14th, I published the very first BAFL Times — and yes, I also had a date on Valentine’s Day. Everything was really coming up Milhouse. From there, I went on to create 25 articles that the BAFL family learned to dread on a weekly basis. Each one was packed with the best moments of the week, and occasionally involved scraping the absolute bottom of the barrel for those tiny hits of magic. But today, I want to share some of my favourite moments from throughout the year.
// <br><br>
// This season saw a whopping 26 different players take part and etch their names into Brendan’s spreadsheet forever. We also witnessed the sad departures of quite a few players — with an odd correlation between joining the BAFL and leaving the company shortly after. Commissioners might need to have a look into that one.
// <br><br>
// Justin was a weekly highlight, getting rinsed on a regular basis but always keeping his head held high. Lei managed to quit during the very first week of a new season. My dear cousin Oscar did the same thing much later into the season, fully aware of his circumstances. Oscar S beat Dan once, then promptly vanished from the BAFL entirely. John and David both claimed Division 2 titles before making shock exits, while Elliot remains a long-forgotten Division 1 member from seasons past.

// Looking at the results from this year, we had five unique division champions, with Sam going back-to-back thanks to some assistance from Bass in the Misc tournaments. The highs of the season saw Sam finally dethroned as BAFL Champion — even if it was Dan who took the crown (we take what we can get). Ricardo finally recorded his first-ever victory after 30+ attempts. I won my first-ever final after six tries, and Yasin claimed top spot in Division 2 after starting the year barely knowing how to spell FIFA.
// <br><br>
// Of course, no season is complete without its lows. Dru somehow made a Division 1 final at the start of the year, only to finish mid-table in Division 2 by the end — that’s got to be tanking for first-round picks. Ricardo’s 14–0 loss wasn’t a great look either, especially considering he’s only scored 16 goals in total across his entire BAFL career. Lachlan had a memorable Season 10 moment as well, declaring he’d quit the BAFL if he lost a single Division 2 match… before immediately losing his first one.
// <br><br>
// But enough of the sadness — it’s time to talk about the inaugural BAFL Times Awards.
// <br><br>
// For the end-of-year awards, I’ve created four unique categories that definitely won’t carry over into next year — but let’s pretend they will. The awards are: Biggest Upset, Funniest Moment, Craziest Stat, and Best Player.
// <br><br>
// **Biggest Upset of the Year** goes to Brent, with his unbelievable 4–3 victory over Sam. The result sent shockwaves through the BAFL, proving that Sam is, in fact, human — and also apparently Brent’s bitch.
// <br><br>
// **Funniest Moment of the Year** was incredibly hard to decide. Nominees included Manjeeve unplugging his controller to avoid a 12–0 defeat to Dan, Dan’s famous “F**k you, Alex” quote after I torched him, and Brent blaming a video game player’s appendage for an offside call. But the crown has to go to one moment above all others: the BALF Times article written by Manjeeve himself. The shockingly authentic, clearly *not* AI-assisted piece from Mr Sookram takes the cake as the funniest BAFL moment of the year.
// <br><br>
// **Craziest Stat of the Year** doesn’t really have much competition. Ricardo takes this one comfortably, finishing with a goal difference of -118 — over 70 goals worse than the next closest contender. An outstanding and frankly impressive achievement.
// <br><br>
// Finally, **Best Player of the Year**. We’ll split this one between divisions. Dan and Sam both topped the year with one title each, but with a strong finish to the season, Sam is our Division 1 Best Player for 2025. Division 2 was a tougher call, but Yasin takes the honour with a first-place finish in Season 11 and a near-finals run in Season 10.
// <br><br>
// And that’s it from me. I hope you’ve enjoyed my weekly dribble. Shoutout to ChatGPT for cleaning up and killing many trees in the process of reading the atrocities I claim as journalism. Another shoutout to Manjeeve for making the BAFL Times look far better than it ever deserved to be.
// <br><br>
// On to next year — bigger and betterer things?`,
//         author: "Alex Villani"
//     },

//         {
//         season:"11",
//         week: "9/10",
//         date: "December 18",
//         summary: `We’ve finally made it to the end. After 78 matches filled with controversy, laughter, crying, and ragebaiting, the finals of Season 11 are here. Welcome back to the BAFL Times.
// <br><br>
// Going into finals, I didn’t exactly have the best record — as in, I’d never won one before. But surely that was about to change, right? I couldn’t imagine Dan actually putting up a fight… oh.
// <br><br>
// Dan and I went to battle downstairs in the first qualifying final. Dan’s Barcelona seemed to be no match for my Lombardia up until about the 12th minute. Then Dan tore me apart. I couldn’t penetrate his defence, or his midfield, or his attack. He ran out a 3–0 winner, setting up a date with Sam on Tuesday.
// <br><br>
// Sam and Dan then took part in what felt like a dress rehearsal for the final. The evenly matched duo took to the TV, with Sam jumping out to a fast start and holding Dan at arm’s length for most of the match. Dan mounted a comeback in the final 20 minutes, but it was unfortunately too little, too late. Sam secured a 3–2 victory and booked his spot in yet another BAFL final.
// <br><br>
// Oh look — the battle to see who gets to play me: Brent vs Lachy. The matchup heated up early as Brent pulled the almighty Real Madrid, a team boasting 28 wins across the seasons. Lachy lucked into PSG, which evened the playing field slightly. Lachy struck first with an early goal, but Brent wasn’t to be outdone and fired back to keep things close. However, with the pressure of the crowd mounting, Lachy went on a tear, scoring six goals with PSG to knock Brent out of the finals in a 6–2 win. This felt like giving someone the answer key and then watching them hand it directly to the exam supervisor.
// <br><br>
// In the lower semi — no, that’s not my THIS JOKE HAS BEEN REMOVED. I was still searching for my first-ever BAFL finals win. Lachy was never going to be an easy task, especially after pulling Real Madrid, bringing the total number of times I’ve faced them in finals to four. This time, though, I refused to be denied. I took Bayern to a 3–1 lead midway through the match. Unfortunately, I conceded two late goals — and nearly a third — sending the game to penalties. I had a chance to win it, but Lachy saved my shot. As the PTSD of losing yet another final washed over me, I somehow found it in myself to save Lachy’s final penalty, FINALLY securing my first BAFL finals win. A rematch with Dan awaited.
// <br><br>
// Winner plays Sam. Dan and I returned to the downstairs TV for the third time this season as I looked to break a long-awaited drought. Using Man City, I took an early lead thanks to a Haaland banger from outside the box. Dan equalised soon after, rendering all my hard work meaningless. He then went ahead 2–1 with the game still finely balanced. Disaster struck when I took Dan down in the box (got full ball btw), conceding a crucial penalty that extended his lead to 3–1. I couldn’t recover, and before long my season was over, setting up a rematch of the Season 10 final.
// <br><br>
// The final had arrived. Lachlan was sick once again, but Dan and Sam were primed and ready for what promised to be an epic clash. Somehow, they managed to pull the exact same teams Dan and I had used earlier (an 11% chance, by the way) — totally not rigged. Dan struck first, but Sam held firm, equalising before taking a 2–1 lead. Then came a monster goal from Dan that stunned all seven of Sam’s defenders, tying the match in the 70th minute. With some fancy footwork, Sam broke through Dan’s defence to score a late goal. With time remaining, it was still anyone’s game — until Sam resorted to passing around the back, drawing boos from the crowd.
// <br><br>
// The final whistle blew on a mammoth season, with Sam claiming his second title of the year, much to the disappointment of the BAFL faithful. Sam couldn’t beat me, but Dan beat me three times — so you decide who the real winner is.
// <br><br>
// Till next time, this has been the BAFL Times.`,
//         author: "Alex Villani"
//     },

//         {
//         season:"11",
//         week: "8",
//         date: "December 8",
//         summary: `Still more games? Far out. At least it's only five games this week — same pay for half the work. Sounds eerily similar to my own job. Anyway… welcome back to the BAFL Times.
// <br><br>
// Monday saw Dan take on Lachy downstairs. If Lachy won by 15 goals, he would’ve jumped me into 3rd spot. He started off well by conceding the first goal and then crashing out in typical Lachy fashion as he went down 2–1, which secured and set in stone the top four for Division 1. Bass and Ricardo finished off the day, with the Basstronaut in full flight as he tore Ricardo apart in a 5–1 victory. Special mention to Ricardo for not finishing bottom this time around!
// <br><br>
// On Tuesday we kicked things off with an absolute cracker — actually, a double cracker. Wait, that might need to be cleared by the commissioner. Anyway, Lachlan and Brent headed to the downstairs TV to duke it out in what ended up being a close match. With Lachlan needing a four-goal win to secure a finals spot, he instead decided to gift Brent a penalty after taking a 1–0 lead. Talk about charity work. Despite the 3–1 victory, Lachlan was knocked out of the finals!
// Jude and Yasin then fought out what was arguably the most anticipated match of the season: 1st vs 2nd, with a win securing top spot for either player. Jude fought hard but ultimately lost out to Yasin, who claimed his maiden BAFL crown as he topped Division 2!
// <br><br>
// Dru and Matthew wrapped up the regular season in style. In what has been a disappointing season for the once-3rd-place Division 1 finisher — #neverforget — Dru won his final match using Ronny and the gang from Portugal to finish Division 2 with a 4–1 win.
// <br><br>
// On to the finals we go!`,
//         author: "Alex Villani"
//     },

//         {
//         season:"11",
//         week: "7",
//         date: "November 28",
//         summary: `Jeez, Week 7 and we still have regular season matches to go? Far out. I get why people lose interest in this league. Anyway, welcome back to the BAFL Times!
// <br><br>
// Monday began with heavy controversy, with Lachlan’s PC exploding at the sheer thought of hosting a match between Matthew and Ricardo. Their combined talent forced his PC into a complete shutdown and reset, effectively demoting him back to Junior QA. This match was pushed to Tuesday.
// However, we still had a match to get through: Brendan vs Nick. It was a battle of the newcomers, with Nick scoring his first ever BAFL win over Brendan, 2–1, in a heroic display. Welcome to the league, Nick!
// <br><br>
// Tuesday we finally got the match we’ve all been waiting for — that’s right, Ricardo vs Matthew! Playing once again on Lachlan’s PC (now being held together with tape), Matthew got the big win, 4–2.
// Meanwhile, we had the battle of the corrupt Commissioners themselves: Lachlan vs Sam. At the Thailander lunch meet pre-match, Sam vowed not to concede or let Lachlan near the goals. He backed it up by going into halftime locked at 2–2. Unfortunately for Lachlan, Sam then decided he might actually need to win the match, turned up the heat, and took it 7–2.
// <br><br>
// I swear every time Kelvin plays me, he imagines his crush is watching or something. Because when he took on Brent on Wednesday, he lost again! Seriously, something must be in the Big Ant water in the UI department. Alas, Brent picked up a crucial win that further cemented his spot in the top 5.
// Dru and Jude took on the feature match upstairs in what promised to be high quality. However, ASADA might need to investigate Jude’s performance, as he destroyed Dru 7–1 — that’s pure anger right there. It rockets him into 2nd place, just behind Yasin, and still with a massive shot at the Div 2 Medal.
// <br><br>
// To cap off the week, I took on Manjeeve. In a bit of a dead rubber, I decided to throw every skill move I had at him (ball rolls). I took him apart in a convincing 5–2 win, cementing myself in 3rd place on the table.
// Gus and Nick played upstairs in an interesting spectacle — Nick, fresh off his maiden win, carried the momentum into his final match, as they settled for a 0–0 draw to close out their seasons.`,
//         author: "Alex Villani"
//     },
//     {
//         season:"11",
//         week: "5/6 (so close...)",
//         date: "November 20",
//         summary: `Welcome, welcome! I'm writing this week’s entry at 4:30am on Cricket 26 release day! QA Lead? Yeah — lead us to a disrupted sleep schedule. But more importantly, BAFL was had, and BAFL we shall talk about!
// <br><br>
// Oh yeah, I didn’t write last week. Pure hatred for what I do and a severe lack of motivation were the main causes. Basically, I lost to Kelvin — no biggy. Manjeeve conceded 17 goals in two games — slight biggy. Oscar left the company?? — big biggy. I mean not from a productive stand point, but THATS MY COUSIN MAN!!
// <br><br>
// Alright, on with the week. We began with Lachlan vs Manjeeve: the battle of the absolute gutter-end of Div 1. I had to flip their controllers pre-match because they were holding them sideways (typical). Also keep in mind, Manjeeve beat Kelvin, who beat me, so he should have no problem beating Lachl— oh. He lost 5–2. Jeez, what even is this season sometimes?
// <br><br>
// Ooh, here we go: a great matchup with Bass and Gus. I would usually rag on Bass, but he is sitting 15 feet from me at 4:30am and he did have to play against Real Madrid, so in a Top 10 Football Respects moment, congrats on only losing 2–1, Bass!
// <br><br>
// Tuesday offered us a triple treat because Lachlan thought we were behind schedule (still on Cairns time). Dan and Sam to start off — wow oh wow. With Portugal and Argentina, simply orgasmic. Wait, can I even say that? Do I even have an editor? Do reporters speak in the third person this much?
// <br><br>
// Anyway, back to the match. It was close and high quality… then I left and Sam scored 5 goals (my bad). A convincing win that puts Sam back on top of Div 1 — FFS. Jude missed an opportunity to sit second on the table as he drew with Matthew. His aspirations for Div 1 glory seems on the backburner as he attempts to be Producer on basically every Big Ant game ever. #priorities Oh look at that — I also played against Lachy. The raging bull himself. I call him that because he nearly put his fist through my poor desk after going down 3–2 against my 10 men LOL. But he managed to claw it back to a 3–3 draw, keeping us both in finals contention.
// <br><br>
// Finally: I wasn’t / am not / was?? here for Wednesday’s games — I forget what tense I’m supposed to write this in. Anyway, Wednesday happened. Bass vs Dru and Yasin vs Gus. What a set of Div 2 matchups… shame no one really likes Div 2 apart from the players themselves. Yasin, as always, only shows up in big-time matches. Playing as his beloved Chelsea, he took the challenge to Gus in a 2–1 victory and — if you can believe it — put himself on top of Div 2!
// <br><br>
// Bass and Dru played a hugely decisive match downstairs, with Bass coming away with a massive win, putting himself back up to 4th with a real chance at promotion still looming large.
// <br><br>
// Hang on a sec — it’s Thursday and I’m not even here to write about the BAFL? Looks like Sam Harvey (GOAT) will have to take over… enjoy!
// <br><br>
// Sam Harvey, BAFL Commissioner here. <br>
// Ricardo met Brendan in a match where both players needed points to get some space from the wooden spoon of Div 2. Both claimed they deserved to win. Fittingly, the result was a 1-1 draw. Leaving Nick at 0 points as he tries his hardest to expand his kitchen utensils drawer.
// Downstairs, 
// <br><br>
// Lachlan faced Kelvin in the classic match up that is Real Betis vs Al Hilal. Lachlan proved too good and secured a 2-0 win. Placing himself comfortably in the middle of the table with 2 matches to play, which gives him the slimmest of chances to attain a 4th place finish. `,
//         author: "Alex Villani"
//     },

//   {
//         season:"11",
//         week: "4",
//         date: "November 7",
//         summary: `It was a short week for the BAFL. Public holidays, rowdy parties, commissioners not being in the state — and that was just Tuesday. Welcome back to the BAFL Times.
// <br><br>
// You’d think for a shortened week I’d talk about more matches. HAHAHA. Oh yeah, sure, why not. We kicked off the week with Alex vs Dan… ah, maybe we shouldn’t talk about this. For once, I can actually blame Sam for one of my losses. He made Dan and me play with the exact same teams as I narrowly lost 1–0 (4.6 expected goals to me, by the way). Jude and Nick put the punters into a panic with a very close match until the 80th minute, when Jude realised he might actually need some goal difference this season — winning 6–1.
// <br><br>
// I want to issue a formal apology to Kelvin, as I was kinda the reason he lost to Sam on Wednesday. After holding an early 1–0 lead, I berated Sam about his poor season, which inspired an MJ-like performance (Michael Jordan, not that Genshin player) as he swept past for a 3–1 victory. Yasin stood his ground against Brendan with a huge 9–1 victory (his biggest yet in the BAFL) as Division 2 edges towards an insane finish. Bass, also keen not to miss the victory bus, took a big scalp by beating Matthew 6–0! I didn’t see the match, but he said he was playing like prime Hashtag Harry (respect to those who get that reference).
// <br><br>
// To finish off the week? Wow, already? Jeez, lucky I’m not getting paid by the paragraph. Wait — I’m not getting paid at all. Typical. Anyway, Lachlan and Oscar took their battle downstairs, with Lachlan previously having the wood on Oscar (had to get that line cleared). Oscar, however, went against the script to keep his unbeaten run in the BAFL alive. I wonder how he’ll go in the finals!! Dru and Nick wrapped up the week for the BAFL. Dru took an interesting approach by sitting 90 degrees to the monitor, giving himself about 10% eyesight for the whole match. That’s pure confidence in your own ability — and he showed it too, winning 3–1 and rocketing to the top of Div 2.`,
//         author: "Alex Villani"
//     },

//  {
//         season:"11",
//         week: "3",
//         date: "October 31",
//         summary: `Hey, guess what! BAFL Times is here this week — even after I tweeted about cancelling it. I feel like a real journo, just doing a full 180 after ten minutes. Welcome back to the BAFL Times.
// <br><br>
// We had a big international matchup to start off Week 3, with Brent and Dan kicking things off. With some insane crossing manoeuvres (I had to triple-check the spelling on that), Brent took an early lead. However, Dan — in his refusal to give up his crown to the French — smoked them with the Dutch (get it?). He walked away with a 2–1 victory.
// <br><br>
// Oh boy, huge news guys. Sam is finally mid at FIFA! It only took 11 seasons and about 15 miscellaneous tournaments, but we finally got there. After conceding a goal in the first 15 seconds, I picked up the pace to equalise in the 70th minute, then took the lead in the 90th — not before shouting an aura-losing “I JUST BEAT SAM!” to an empty UI department. Feels good. My head hasn’t been this inflated in years (according to my doctor).
// <br><br>
// Guess I better talk about my cousin, otherwise he’ll concuss me like he did last week. But credit where it’s due — he proved why he’s in Div 1 with a big win over Kelvin. Kelvin’s still clearly finding his feet in Division 1, as Oscar helped himself to a filthy rainbow-flick-over-the-keeper goal. Just nasty stuff in a close 4–3 victory. I’ll also quickly mention Gus, who claimed his third victim and returned to the top of the table once again with a 3–1 win over Matthew. Good to see Div 2 is having a close season… right, Bass?
// <br><br>
// To cap off the shortened week, let’s talk about Dru and Ricardo — one of the most verbally scathing rivalries in the BAFL. Ricardo, fresh off his maiden victory, decided to pass around the back for 95% of the match. That’s integrity at its finest! However, Dru wasn’t having it and took his chances well with a 4–1 victory — just 11 goals short of the record he swore to break. Ah well, next season I guess. I mean, I’m sorry Dru, I didn’t mean that you’ll stay in Div 2. I’m sorry. Don’t break me!`,
//         author: "Alex Villani"
//     },

//    {
//         season:"11",
//         week: "2",
//         date: "October 24",
//         summary: `This edition of the BAFL Times will be a much shorter, more comprehensive one. I’ve been told by the men in charge that I should only cover the best matches of the week.
// <br><br>
// Thank you for reading the BAFL Times.
// <br><br>
// I’m kidding, guys! How else am I going to burn precious company time? Welcome back to the BAFL Times (for real this time). To keep things fair—and potentially lift the standard of the BAFL—I’ll talk about one match per day. So, keep those matches interesting!
// <br><br>
// Oh Monday, what to choose... oh, definitely Yasin’s match. Gee whiz, what a reaction! Bass, fresh off his maiden BAFL win, went head-to-head with the BAFL’s Nick Kyrgios (only good when he wants to be). A super-tight match was locked at 0-0 between Ronny’s Portugal and that teeny-weeny bloke from Argentina. A late winner from Yasin provoked a huge fist pump and a “come on!” reaction the likes of which the BAFL is very unfamiliar with. We all hope that passion continues!
// <br><br>
// Tuesday—and what? Yasin again? I wanted to talk about the Sam vs Lachy matchup, but Yasin is in such good form that surely nothing could go wrong, right? WRONG! Matthew took a huge scalp, proving his worth with a 1-0 win, rocketing himself up to 2nd on the table. A massive result! I know I’m only supposed to talk about one match per day, but a historic moment occurred in Division 2. Mr Ricardo himself broke a 23-match winless streak as he stumbled over the line against freshman Nick, 1-0. The BAFL commends Ricardo’s determination—because lord knows I would’ve given up three seasons ago!
// <br><br>
// Kelvin and Lachy took centre stage on Wednesday, in what looked to be one of the most decisive matches in Division 1 so far. Lachy, after being gifted Leverkusen, crashed out in typical Lachy fashion—almost opting for a forfeit before the match even began. I witnessed this game in between Fall Guys rounds (I didn’t win), but a close encounter saw Lachy score late to secure a 2-1 win over Kelvin, which could pay dividends later in the season.
// <br><br>
// Just to keep the commissioner happy, I’ll write about his match. That’s a complete lie—it’s only because Manjeeve lost 9-2. Sam’s dominance using women’s teams continues (no correlation, he promises). I think I made this joke in 2024, but Manjeeve bad with women? Standard. With this and Lachlan’s loss, the two newly promoted players to Division 1 sit stone motherless last. LOL.
// <br><br>
// Finally, a gifted entry into the BAFL Times with only a single match being played on Friday: the battle of the Lachlans. While I was scoffing down my $9.95 treat box from KFC, the Lachlans did battle as the downstairs UI team crashed out, having their space occupied a full five out of five days this week. A very close match with a late winner from Lachy gave him a 3-1 win, pushing him into a finals spot on the table. A great week all around for the BAFL!`,
//         author: "Alex Villani"
//     },

//       {
//         season:"11",
//         week: "1",
//         date: "October 17",
//         summary: `BAFL Times Season 11 - Week 1 

// It's the biggest, it's the baddest, it's the most competitive. No, it's not the race to be my girlfriend. It's the grand return of the BAFL — welcome to Season 11!
// <br><br>
// After a short absence and an amazing holiday, I took great pleasure in removing Manjeeve from the BAFL author roster and replacing him with myself full-time. My apologies once more.
// <br><br>
// Monday saw a total of 5 out of 18 BAFL members show up — a new record! That meant options were slim, but very exciting. I kicked off the season myself against long-time rival and newly promoted Lachlan. I absolutely tore that man apart — like, seriously... you'd think he’d have some sort of momentum after finishing top of Div 2. I haven’t seen this much of a skill gap since I got dropped to the floaties group at Swim School. A new recruit made his BAFL debut: Mr. Steal Your BAFL Rankings Idea himself, Brendan. Brendan gave Jude a run for his money early, as Jude began to sweat at 0–0 in the 80th minute with Brendan still asking which button was shoot. A late goal secured a tight 1–0 victory for Jude.
// <br><br>
// Tuesday saw yet another debutant, Gus Stone, as he faced off against the still-winless Ricardo. Gus showed plenty of gusto (Hamish and Andy shoutout) by demolishing Ricardo 10–0. Yet another long season awaits Ricardo, it seems. Heading downstairs, we were met with an unexpected game between Sam and Oscar. A nil-all draw was the surprising result — I haven’t seen such a lack of scoring since my mate went 0 for 37 at Levels Nightclub last year.
// <br><br>
// Oh look, it’s Alex saving the BAFL yet again. Two games in three days — just happy to play my part. This was a revenge match for Season 10’s semi-final as Brent and I took centre stage downstairs. Using my Isak-fuelled Newcastle United, a big 8–3 win came through as I shot up to the top of the Div 1 table. Geez, writing about your own wins is awesome, isn’t it, Manjeeve? Wait, what? Another first gamer? Nick started off his BAFL campaign against ELO farmer Bass. Looking to snatch an easy victory, Bass was caught off guard in what turned out to be a tough struggle. However, he managed to pull through, getting his first-ever BAFL season win 5–1.
// <br><br>
// We had a huge return with Kelvin making his first BAFL appearance since Season 8! He was met with the reigning champion — the man who stopped the Sam three-peat, the man who beat Sam 4–1 (alright, I think Sam’s clicked off). A tight comeback match ended in a 2–0 victory to Dan. Pundits are looking forward to what Kelvin has in store moving forward. To finish off, Jude ponied up yet again to verse the in-form Gus. A close match sat at 2–2 for the majority, but Gus proved his worth late with a 4–2 victory. In my incredibly humble opinion, if I were one of Bass, Dru, or Yasin... I’d be shitting myself.
// <br><br>
// Super late addition to the BAFL Times, because Sam decided to be greedy and play on a Friday. I was busy sipping my Piña Coladas when I was called into action to review the Dru and Brendan matchup. Dru decided to take a nap until halftime, while Brendan was still studying the FC25 manual. After the half, Dru decided to kick more goals than Ricardo has in his entire BAFL career, cruising to an 8–0 win.`,
//         author: "Alex Villani"
//     },

//         {
//         season:"10",
//         week: "9",
//         date: "August 29 <br><br> FINALS WEEK 2",
//         summary: `Hi, MJ here… Well this is awkward it’s not Alex. After 2 weeks of waiting for the final matches he got fed up and left the country. Game got postponed probably because another kid broke the PS5 again. Well after weeks of waiting, our commissioner finally swallowed his pride, ego and joy to make the executive decision of moving the final matches upstairs. 
// With that said, Welcome to Season 10 Finals!
// <br><br>
// Wednesday came for the second qualifying final: Dan vs Brent. Well let’s just say the game started with technical controller problem because of Lachlan’s pc (He totally rigged the div 2 games “I’m totally not salty about that medal”). 
// Hey I had to be the hero and get it fixed. Brent was the crowd favourite given it’s his home advantage. Alas he fell very short, Dan’s Barcelona showed Brent’s Leverkusen who’s the boss, with triumphing 7-1 win. 
// This solidified Dan’s spot to proceed into the Final versing Sam.
// <br><br>
// Oh! It’s Thursday already! You know what that means… GYG day.. uh no.. I meant Finals. 
// The PS5 is still nowhere to be seen. Gone just like Alex’s Ex. Oh well upstairs game it is. Dan was blessed by the BALF gods and got Real Madrid! The crowd was big and the cheer were loud. Sam started strong scoring the first goal. Without wasting time Dan responded quickly to that with a goal. Sam losing his cool when defending gave away a penalty to Dan and the latter made a meal of it. Oufff this was only the first half. 
// <br><br>
// The second half Dan dominated the match and scored another 2 goal (2+2 is 4 quick mafs). Sam could barely get any shot in (only 2 to be exact). Rumours were he was trying to play like Man Utd and he did so successfully. The crowd was in awe, shocked and could not believe what was happening. Dan was victorious with a final score of 4-1. He is the new Champion of Season 10 BALF, preventing Sam from getting his 3rd Consecutive BALF championship in a row streak. 
// With that Season 10 comes to a close! Hope you all enjoyed this season.`,
//         author: "Manjeeve Sookram (MJ)"
//     },

//        {
//         season:"10",
//         week: "8",
//         date: "August 15<br><br> FINALS Week 1",
//         summary: `Hi, my name is Alex. You may remember me from such articles as 'BAFL Times Week 2' and 'Failing: An Addiction'. I am very very very very very very upset. Why you might ask? I don't wanna talk about it. Welcome to the finals...
// <br><br>
// Boom, here we are — the promotion match: Jude vs Manjeeve. If I had it my way, I’d relegate them both. What a spectacle this was… or lack thereof, am I right? 
// Manjeeve got off to a flying start with an early goal, while Jude decided to give Manjeeve’s goalie some target practice — and by some, I mean deadass 10 shots. A 2-1 result kept things close, but Manjeeve managed to sneak out of Division 2 for the first time ever, leaving Jude to wallow as he drafts the termination notice for Manjeeve.

// <br><br>
// Tuesday rolled around and… oh, Real Madrid again? Yeah, hilarious. What an awesome, balanced, and totally fair team. Dru and Lachy took center stage for the Division 1 relegation match. 
// Expectations were high downstairs, but quickly evaporated as Lachy tore Dru apart 7-0 — finally setting up the Lachy vs Manjeeve showdown in Division 1 we’ve all been waiting for.
// <br><br>
// The first qualifying match saw the two mucky-mucks of the BAFL — Dan vs Sam (apparently I can’t say heavyweights anymore because of fat-shaming). 
// It was a tight-fought match, with Sam underperforming by his usual lofty standards (and ego), as Dan looked to pounce on the opportunity. 
// But Sam held his nerve late, grabbing a 1-0 win and stumbling into yet another BAFL Final. Who will dethrone him? Me, right?
// <br><br>
// Thursday. My match. Brent, off a win against Sam and in fine form, came up against me — the industry plant. As I sat at my desk, I was informed I’d once again be playing against Real Madrid. Seriously. 
// Every. Time. I’m always the victim! Determined to break the curse, I immediately conceded two goals. But the comeback was on — I scraped back two of my own with Chelsea to force penalties. 
// Having never lost a BAFL shootout, I decided to throw it… out of pure sportsmanship, of course. Brent walked away with the win, and my BAFL Finals record now sits at 0-5. On to next week, I guess. Sobs.`,
//         author: "Alex Villani"
//     },


//      {
//         season:"10",
//         week: "7",
//         date: "August 8",
//         summary: `Hi, it's me again. Collingwood just lost to the Hawks and I'm reallyyyy not in the mood to write this. Full hate speech rant incoming, and Manjeeve and Bass are on my radars. Welcome back to the BAFL times.
//                   <br><br>
//                   We began the week with Dan pulling out of his match against Oscar — not the first time, mind you. Something has to come from the commissioner… I dunno, maybe give me an extra win or something? I filled in, of course. Felt like Volkanovski stepping in on short notice — except unlike him, I didn’t get my head caved in by a Dagestani. I took Lachy to the cleaners in a match that both gave Bass a chance at survival and kept my cousin out of the relegation battle. Just call me Mother Teresa. Ricardo then shocked the BAFL world (okay, small suburb) by actually putting up a fight for once. Jude failed to capitalise, and Ricardo secured his first BAFL point with a 3–3 draw.
//                   <br><br>
//                   Tuesday, we finally got the Dan v Oscar showdown we were supposedly all craving — though let’s be honest, no one really cared. The real highlight was Ben and Matthew’s season finale. With nothing on the line, they went all out. Punches thrown, insults hurled, and Matthew walked away 3–1. What a scrap, lads. Oh right — back to Division 1, if I must. Oscar shocked everyone by taking an early lead, but Dan fired up, booting the next four. Despite a late Oscar rally, Dan held on for a 4–3 win.
//                   <br><br>
//                   Right, if for some reason you’re standing — grab a seat. We’ve made it to Wednesday. For context, Manjeeve was 6–0 going into this match. Notice my use of was. A win would have secured him automatic promotion. Standing in his way was BAFL debutant Yasin, who delivered the biggest choke since Melbourne a couple weeks ago… and it wasn’t him choking. With his unmatched aura-farming ability, Yasin tore Manjeeve apart 6–3, knocking him to second place and putting promotion in jeopardy. We also had a top-of-the-table clash between Dan and Sam. Yes, Dan played twice in a row — I couldn’t believe it either. It was a tough battle, maybe even a preview of the Division 1 final. I say maybe, because obviously I’m winning the whole thing. Sam walked away with a 3–1 win and the Division 1 top spot.
//                   <br><br>
//                  If you thought Wednesday was peak BAFL, wait for Thursday. I forgot to order lunch — embarrassing, I know. Oh, and Lachlan (allegedly) picked his own team before confirming his match. Poor Jade had to endure a Real Madrid onslaught as the totally-not-corrupt commissioner racked up a 12–2 win. Someone investigate this man. With that, Lachlan secured automatic promotion over Manjeeve. And then… the final match of the season. Bass vs Dru. A win for Bass would keep him alive, a loss would drop him straight to Division 2. Being the philanthropist he is, Bass decided to “meet in the middle” with a draw to keep Dru in Division 1. Oh wait… that actually relegated Bass. Turns out he’s just bad at maths. Poor Bass. Finals incoming!`,
//         author: "Alex Villani"
//     },
    
//     {
//       season:"10",
//       week: "6",
//       date: "August 1",
//       summary: `A massive week for the BAFL, a full 5 days of matches, a perfect 10 as we prepare for the final week of season matches. The BAFL fans had to cancel their dinner plans in anticipation.
//                   <br><br>
//                   Monday kicked off with some decisive clashes. Bass faced off against Oscar, who was feeling overly confident and believed he could win with just nine men. 
//                   Embracing his French roots, Bass put up a serious fight. Oscar scraped through with a draw — just barely. Meanwhile, Yasin continued his fairytale BAFL debut, smashing Matthew 4-1 and keeping his promotion hopes alive. 
//                   What an inspiration that man is!
//                   <br><br>
//                   Tuesday brought one of the week’s most anticipated matchups: Brent vs. Lachy. The old allies — Germany and Italy — went head-to-head. Brent’s Germany emerged victorious, flexing a superior squadron. Lachy, in full Mussolini mode, retaliated by launching his controller into the downstairs TV. 
//                   Division 2 wasn’t short on action either. Unbeaten Manjeeve faced his rival Jude in a top-of-the-table clash. With full sigma rizz energy, Manjeeve crushed Jude 4-1, keeping his unbeaten streak alive and planting one hand firmly on the promotion medal.
//                   <br><br>
//                   Wednesday belonged to Portugal. RONNNYYYYYY SUIIIIIII. Ricardo went hunting for his first BAFL win… and fell short again. Even with France, it wasn’t enough — though to be fair, he did put Mbappé in goal. 
//                   Ben capitalized with a 2-1 win. Bass returned once more, as Sam — clearly still punishing him for going on holiday — scheduled him every second day. 
//                   Bass threw the kitchen sink at Dan (pretty sure that’s against BAFL rules), but Dan clung on for a 2-1 win.
//                   <br><br>
//                   With so many international teams this week, the BAFL is starting to look like a desperate man’s Tinder location settings. Thursday opened with Yasin continuing his dream run against Jade. 
//                   Channeling the power of the paella, his Spain dismantled Jade’s England 3-1. It was the BAFL version of the Anglo-Spanish War (1625–1630). Lachy also faced Dru downstairs, having finally retrieved his controller from the plasma. 
//                   He let loose, taking down the season 9 finalist 5-3.
//                   <br><br>
//                   Friday. We made it. You ready? Let’s go. Wait — another international matchup? At this point, just call us NATO. 
//                   Lachlan took on Matthew’s Portugal, but even the GOAT Bruno Fernandes couldn’t stop Lachlan's goal-hungry rampage, ending in a brutal 10-2 loss (shoutout to the Peninsular War). 
//                   To close out the week, Bass faced Brent in a match with huge implications — Brent chasing finals, Bass avoiding relegation. 
//                   A tight contest unfolded (or so I’m told — I was writing the rest of this recap with the match happening behind me). Brent clinched it 2-1, setting up a mouthwatering Dru vs. Bass clash next week.`,
//       author: "Alex Villani"
//     },

//     {
//       season: "10",
//       week: "5",
//       date: "July 25",
//       summary: `Hey, remember me? I went missing for a week — caught deep in the Big Ant grind. Late hours, drama, stress — it had it all. 
//                 I earned a day in lieu, which I’m now spending writing this article. 
//                 You just can’t win sometimes.
//                 <br><br>

//                 It was a rough week for the BAFL commissioners. Most participants were either on leave or struck down with a severe case of Manjeevitis. 
//                 However, on Monday, the Battle of the Bottom saw some life as Yasin took on Ricardo. 
//                 Neither had secured a BAFL win yet, but Yasin channelled his inner Hollow Hero and took Ricardo out with a 3-1 win. 
//                 I also played — not that it matters — but I made Dru pay full price for knocking me out of last season’s tournament by DESTROYING him 3-2 (granted, if the match had gone on two more minutes, I probably would’ve lost).
//                 <br><br>

//                 Oh look, it’s me again — saving the BAFL once more by actually turning up to work (looking at you, Lachlan). 
//                 After Sam spent 20 minutes assigning tactics to each player individually, we finally got underway. I lost. 
//                 Moving on. Elsewhere, Jude faced Ben in a surprisingly close encounter. 
//                 Spectators believe it was because Jude spent too much time admiring the Chelsea Women (court hearing next Monday), but he still walked away with a 3-0 victory.
//                 <br><br>

//                 Manjeeve’s unbeaten run continued with a huge 6-0 win. He claims his victories have nothing to do with harassing co-workers into playing during their precious lunch and afternoon breaks — jury’s still out on that. 
//                 In Division 1, Oscar took on Brent in a decisive match that could influence the all-important 4th place finish. (Because let’s be honest, I’m not dropping below 3rd. Smh.) 
//                 It was close, but Oscar walked away with the chocolates, 2-1.
//                 <br><br>

//                 Thursday marked the long-awaited return of Lachlan from his hiatus, and what a return it was. He faced Ricardo in what turned out to be a record-breaking 14-0 hammering. 
//                 Clearly, Lachlan is coping well with the Destiny raid fail. Lachlan now sits just one game behind Manjeeve for the automatic promotion spot — the division is really heating up. 
//                 To cap off the week, Lachy took on Dan. After dodging BAFL challenges all week, Dan finally showed his hand — and what a hand it was. Lachy, being the gentleman he is, welcomed Dan back by losing 4-0. And they say chivalry is dead, huh?`,
//       author: "Alex Villani"
//     },

//     {
//       season: "10",
//       week: "3",
//       date: "July 11",
//       summary: `I'm here later than usual, something about a Rugby League release. I didn't play this week in the BAFL so not much point in reading but Sam's forcing my hand. 
//                     Welcome back to the BAFL Times.
//                     <br><br>
//                     We started the week with some big wins in both Division 1 and Division 2. Sam — who suspiciously seems to have played every match this season with a women’s team — tore Bass apart with a 4-1 victory. 
//                     Meanwhile, Manjeeve continued his insane run of form, dismantling Ben with a massive 9-0 win to keep his spot firmly at the top of the Division 2 table.
//                     <br><br>
//                     Tuesday kicked off with the battle of old enemies — not Dru and Brent, but England vs Germany. The match was tight until half-time, but much like the Germans, Dru couldn't finish strong as Brent stormed to a 5-2 victory (or invaded, depending on your historical perspective). 
//                     Upstairs, Jade tried to carry last week’s momentum into their clash against Matthew, but fell short. Matthew's looking like a dark horse in the BAFL — and not just because of his luxurious hairstyle.
//                     <br><br>
//                     The war theme continued on Wednesday with a Falklands-esque showdown between Lachy and Oscar. Big up the penguins! Oscar, desperately needing a win, delivered a real edge-of-your-seat performance. 
//                     And by edge of your seat, I mean I nearly hurled the chair at the downstairs TV. Pure rubbish football — but Oscar scraped a 3-2 win for his first ever BAFL victory, keeping his season alive. 
//                     In other history-making news, Ben defeated Yasin, leaving only Ricardo and Yasin without a BAFL win. (I reallyyyy can't wait for that matchup).
//                     <br><br>
//                     To cap off the week, Dan pulled out of his match against yours truly. Some would say it was fear — and by "some," I mean me (most probably had Dan tipped to win). 
//                     Sam and Dru stepped up for a spontaneous rematch of last year's final. Unfortunately, Sam still hasn’t recovered from his Brent loss and took it out on Dru with a brutal 6-0 win.
//                     <br><br>
//                     Finally, Manjeeve was back again, this time facing Ricardo. Ricardo, ever the showman, promised to be as loud and obnoxious as possible to throw Manjeeve off. 
//                     It backfired spectacularly. Manjeeve cruised to a 7-0 win — and according to him, it should’ve been 12.`,
//       author: "Alex Villani"
//     },

//     {
//         season:"10",
//         week: "2",
//         date: "July 4",
//         summary: `I'm back yet again, and—like always—I'm writing this when I’m supposed to be working. I think the best work gets done when there's no pressure. 
//                     That’s probably why my audience is shrinking by the week. Anyway, here are eight match summaries no one asked for!
//                     <br><br>
//                     We kicked things off Monday with a couple of ‘uge clashes, lads. Bass and Lachy went head-to-head in a fiery encounter. 
//                     I say fiery because Lachy deadass screamed four times while I was trying to concentrate on my Infinite Craft session. 
//                     Pissed me right off. Still, he scraped out a 4-3 win. Lachlan, attempting to reinvent himself after his hilarious loss to Manjeeve last week, looked shaky early on—down 2-1 at halftime against Yasin. 
//                     I don’t know what they put in the water at QA, but Lachlan came home strong, winning 6-2.
//                     <br><br>
//                     Tuesday was a monumental occasion: Brent vs. Sam. Brent’s odds were heavily stacked against him—think “me finding a wife on my Europe holiday in September” kind of odds (send me money). 
//                     Somehow, Brent broke Sam’s year-long streak with an inspirational 4-3 victory, cementing his place in BAFL history. Matthew finally got to play his match this time around. 
//                     I saw him blocking the door at 12:55 to stop Jude from playing, but Jude was far too strong. He broke in and channelled his rage into a 6-1 smashing.
//                     <br><br>
//                     Wednesday was drenched in controversy as Lachlan and Jude had to play twice in one week—mainly due to Manjeeve being sick every second day (gotta trick the disease, I guess). 
//                     Jude entered as the heavy favourite, but vintage Lachlan (think season 8—I didn’t check) returned with a bang, thumping Jude 6-1 and rocketing to the top of Division 2. 
//                     Sam’s PC was once again called into duty, but it clearly wasn’t used to high-quality FIFA gameplay, as the game crashed halfway through Dru and Dan’s match. 
//                     They resumed at the 3:30 break, with Dan riding the momentum to a dominant 7-0 win.
//                     <br><br>
//                     Finally, Thursday brought a historic debut win for Jade, smashing Ricardo 4-0. It only took Jade two matches to record a BAFL win. 
//                     Meanwhile, Ricardo is now on a 17-match losing streak—but I respect a man who always comes back for more. Back in Division 1, it was cousin vs. cousin, the Battle of the Dutch—Ajax vs. PSV. 
//                     It was scrappy, and after taking a 3-1 lead late, and Oscar calling me a !@#$ in an otherwise peaceful downstairs office, I walked away with a 3-2 win!`,
//         author: "Alex Villani"
//     },

//     {
//         season:"10",
//         week: "1",
//         date: "June 27",
//         summary: `Its back, bigger, betterer than everer. the BAFL returns and I am so excited for season X!. Ex? Well that's a funny story actually, I texted her Happy Birthday last week and haven't heard back, I wonder if....
//                     <br><br>
//                     The brand-new, improved BAFL kicked off Monday with a fresh mix of teams—this time featuring both Women’s and Men’s international squads. Right out of the gate, we got a taste of the new variety. 
//                     Sam and Lachy launched Division 1, with Lachy graciously welcoming Sam’s Manchester United Women’s side by conceding 10 goals. What a ladies’ man! 
//                     Yasin made his BAFL debut on Day 1, but it was Jude who stole the spotlight, making an early Division 2 statement with a commanding 5–0 win.
//                     <br><br>
//                     Tuesday opened with a clash between two familiar faces from the lower rungs of last season’s Division 2—Ricardo and Matthew. 
//                     Unfortunately, Ricardo forgot the very clear 12:55 rule, leaving poor Matthew twiddling his thumbs as the commission board handed him his first win. 
//                     At least Division 1 delivered, with Dan’s Lyon ripping through Chelsea. I’d say Brent’s Chelsea, but I don’t want to disrespect the badge—#AlwaysBlue.
//                     <br><br>
//                     Oh, would you look at that—it’s time to talk about my match! Of course I won. I had to after hyping myself up more than a Carlton fan welcoming a new coach. 
//                     Bass didn’t stand a chance, as I walked away with a smooth 2–0 victory. Now, if you think I’m full of myself, wait ‘til you hear this next one. 
//                     Lachlan faced Manjeeve in his opening match after boldly declaring in pre-season: “If I don’t go undefeated in this comp, I don’t deserve to be in the BAFL.” 
//                     He followed up this inspirational claim with a 4–3 loss. Surprisingly, Lachlan had no comments post-match.
//                     <br><br>
//                     Finally—jeez these articles drag on, don’t they?—we had a Division 2 debut clash between Ben and Jade. By the 76th minute, once they figured out what the pass button was, the action truly began. 
//                     A 1–1 draw couldn’t separate them, but it’s clear, exciting battles lie ahead. To wrap up the week, Oscar made his BAFL debut against Dru in what promised to be an exciting encounter. 
//                     Unfortunately, Dru doesn’t believe in fairytale—beginnings or endings—as he cruised to a 3–0 win to kick off his campaign in style. Upon asking for an explanation Oscar provided me with words 
//                     I couldn't even repeat to myself in the mirror. `,
//         author: "Alex Villani"
//     },
//     {
//       season:"9",
//       week: "8",
//       date: "April 4 <br><br> FINALS Week 2",
//       summary: `And just like that, another BAFL season has come to a dramatic close. A season filled with controversy, questionable tactics, and my personal suffering has officially wrapped up. But before I disappear into the abyss, let’s dive into the madness that was the BAFL Finals.
//                     <br><br>
//                     Monday saw a massive semi-final showdown: Alex vs. Dru. On paper, Alex was the favorite, but as we’ve learned many times in the BAFL, nothing goes to plan. Dru, rocking his now-iconic Real Madrid, managed to edge out a 1-0 victory in a match that had everything—tense build-up, incredible defensive efforts, and, of course, controversy. Alex played out of his skin, putting in a performance worthy of a final, but in classic BAFL fashion, the game was decided by a highly questionable penalty. Whether it was justified or not remains a heated debate (mostly in Alex’s head), but the result stood: Dru was through to the Grand Final
//                     <br><br>
//                     And so, the BAFL faithful (all 14 of them) gathered for the grand finale—Dru vs. Sam. Dru stuck with his battle-tested Real Madrid, while Sam was stuck with Tottenham, at least we can tell his code isn't scripted. But if there's one thing we know about Sam, it’s that he doesn’t lose finals. The match was an absolute nail-biter, with both players locked in a tight contest. Dru’s Madrid threw everything forward, but Sam’s tactical discipline and somehow reliable Spurs squad held firm. In the end, Sam got the crucial breakthrough and once again cemented his status as the BAFL champion. One off an illusive 3-peat, Sam remains the holder of all trophies.
//                     <br><br>
//                     And with that, the season is over. Tears were shed, controllers were definitely thrown, and I now have another invoice from head office for an unrelated post-match meltdown. Until next time, BAFL faithful—stay bitter!`,
//       author: "Alex Villani"
//     },

//     {
//       season:"9",
//       week: "7",
//       date: "March 20 <br><br> FINALS Week 1",
//       summary: `The BAFL Times is proud to present its first-ever finals edition! You know what that means—only one more article before I disappear into obscurity (until my much-anticipated sequel, The BAFL Times: The Quest for More Attention).
// <br><br>
// Finals week kicked off in typical BAFL fashion: controversy. Sam and Alex’s match was scheduled before Lachlan and Lachy W’s promotion clash, which I personally found outrageous—mainly because I was woefully unprepared after a weekend of… well, let's not get into that. Getting dealt the incredibly even Real Madrid, Sam (who really needs a handicap at this point) cruised to a dominant 5-1 victory, securing yet another final appearance. Meanwhile, I was found post-match sobbing over the PS5 console, for which I now have an invoice from head office to clean.
// <br><br>
// Tuesday's match was a battle for relegation and redemption. Brent, who went undefeated last season, followed it up by failing to win a single game all year. Bass, a fresh face in the BAFL, showed equal commitment to this strategy by also not winning a match all season. Ironically this match ended up being a draw, their game was tightly contested, culminating in a dramatic penalty shootout, where Brent emerged victorious to cling to his Division 1 spot. (Personally, I think they should both be relegated.)
// <br><br>
// Wednesday brought even more controversy, as Lachlan and Lachy W’s match was delayed again. I haven't seen this much fear since watching my lord and savior, Mason Cox, get shitmixed by Rory Lobb last Friday night. Thankfully, BAFL fans (all 14 of them) weren’t left disappointed, as Dan and Dru stepped up for the first elimination final. There must be something in the Real Madrid water because Dru shocked the league by sending Dan packing in a 3-2 thriller. I'm deadass, playing as Real Madrid this season has always guaranteed a win. This victory sets up a semi-final showdown between Dru and myself (you bet I'm putting tickets on myself).
// <br><br>
// Thursday delivered the most anticipated match of the week—the Lachlan Showdown. Both players were evenly matched, and the crowd was massive—much to the frustration of UI programmers who must be over us by now. Lachlan T took an early 2-0 lead, but with his back against the wall, Lachy W clawed one back before halftime. As the match intensified, Lachy W defied logic by repeatedly shooting with Haaland’s right foot (he’s left-footed), while Lachlan somehow managed to miss sweaty goals—seriously, how is that even possible? But nothing could prepare us for the ending. I’m not kidding—I’m still trying to process it. In a moment of absolute madness, Lachy W executed the bold strategy of slide tackling Lachlan’s keeper to score a 92nd-minute winner, securing his place in Division 1. A true fairytale ending to Week 1 of the BAFL Finals. And there's still so much more to come!
// <br><br>
// Finally we bid a sad fairwell to Justin as he departs back to his sacred land and thus ending his career on the BAFL. Justin, who came out of retirement to record inspirational wins against Manjeeve and Jude will forever warm our hearts. I'll personally miss the 3am phone calls to discuss the upcoming articles and the constant harassment for an early copy. We wish you well Justin!`,
//       author: "Alex Villani"
//     }, 

//     {
//       season:"9",
//       week: "6",
//       date: "March 21",
//       summary: `    It's the pre finals, last matches of regular season, penultimate uh week of the BAFL! Welcome back to the BAFL Times, we're nearly there I promise.
//                     <br><br>
//                     The week kicked off with a highly anticipated matchup between John and Lachlan. Lachlan was looking to secure his spot in the promotional playoffs. On the other hand John was playing for pure pride. But if you were an outsider looking in, you would've thought he was gonna get executed if he lost his match. I'm guessing Lachlan liked that narrative as he took John apart 5-0. Matthew and Ricardo rounded off their seasons with Matthew taking a convincing 4-1 to conclude his maiden BAFL season. Ricardo's goal of getting a win still aludes him, I haven't seen a dream snatched away this badly since I was told I couldn't be a doctor with a 54 ATAR.
//                     <br><br>
//                     Tuesday had a couple big matchups with El Classico taking place between Manjeeve and Jude. A win for Jude kept his playoff hopes alive as he dismantled the 'still on probation and probably wants to keep his job' Manjeeve 4-2. The other match featured none other than the man with a plan, trying to catch Sam if he can (me). I was gonna write something nice about Bass this week for taking the loss in his stride and being a good sport. But unfortunately he referred to me as Tom Morris during the week and after I calmed down from my 7 minute crashout I locked in to write this article. Dru also looking at you #PanthersFellOff.
//                     <br><br>
//                     Wednesday saw some huge controversy with the decisive matchup between Lachy W and Justin had to be postponed to Thursday. Sources close to me have reported that Lachy W was so frightened of Justin he demanded he stay home for the day out of pure fear. That may be some hyperbole from our on the floor journalism but thats all that we have. Fortunately another big matchup between Dru and Brent took place, with the winner going through to the Div 1 finals and the loser playing the relegation match. It was a tight contest with a late 90th minute offside preventing Brent from taking the lead sadly handing Dru the draw which was enough to see him home. Brent was heard blaming a 3rd leg for the offside, something he tells me he is all too familar with. 
//                     <br><br>
//                     To cap off the final match of the BAFL regular season, we had a highly anticipated matchup. A win for Lachy W put him into the playoffs for promotion but a loss or a draw would put Jude in the drivers seat. This was one of the few matches I've watched start to finish (I think I have ADHD idk) and my word it was definitely one the 'games of all time'. An early red card to Justin set the tone as Lachy W threw everything at this match, breaking the TV as he took the quote literally. A comfortable 3-0 victory set an all Lachlan matchup for a spot in the promise land, Division 1. 
//                     `,
//       author: "Alex Villani"
//     },

//     {
//       season:"9",
//       week: "5",
//       date: "March 14",
//       summary: `      Wow, what a week in football (soccer). Upsets... people actually getting upset at a workplace video game. There hasn't been this much angst amongst a group of men since I ran out of beer on Melbourne Cup day. Welcome back to the BAFL Times.
//                     <br><br>
//                     Due to the Labour Day weekend, I was rudely awoken on Tuesday by my mother running into my room yelling the upcoming matchups for this week. We had decisive matches up the wazoo as we began the week with John taking on Ricardo. Why is this decisive? Well John guaranteed his spot in Division 1 with a 5-0 win (he was probably already guaranteed, I just CBA doing the math). The other match between hahahaha... Lachlan and Manjeeve. Lachlan hahaha came into the match super confident predicting a 5-1 hahahaha win. He instead proved to the BAFL, pride always comes before a fall. Known as Bayer 04 'Never'Lusen, Lachlan ruined the mantra conceding a 3-2 loss to Manjeeve who hadn't had a win in over 3 weeks.
//                     <br><br>
//                     Wednesday saw a top of the table clash between Dan and Sam. Dan previously called the BAFL Times shit, and Sam is an arrogant twat sitting atop his Division 1 throne. So from my perspective I wanted both to break their thumbs on the finesse button. After my clear bias subsided I watched as Sam defeated Dan 4-0 who has now secured minor premier spot in Division 1. I didn't get to see much of Jude vs Matthew, probably talking to my many girlfriends (I'm in heavy denial) but Jude took a big 3-2 win in the end which was filled with 'bicycle kicks, rabonas and scorpions' and that was just the first goal. Cheers Dru for the rundown!
//                     <br><br>
//                     Thursday had some ripping matchups take place. Matthew took on Lachy W, Lachy rocked the proud team of Ed Sheeran as he decided to make Matthew his 'Galway Girl' (yep the jokes just write themselves) as he 'Shape of You'd' ahhh I ruined it. It was 2-0. Jude backed up for the second time in as many days with a very important mid table matchup against Justin. The retirement party might have to be put on hold as Justin ran away from Jude's Espanyol, more like EspanLOL am I right?? In a big 5-3 win that might get him a chance at promotion. I say 'might' because Lachlan and Sam really need to get their act together, it's week 5 and we still don't know how the Division 2 promotions work. Get a real commissioner in! Like Alex Vil......[This messaged has been removed]
//                      `,
//       author: "Alex Villani"
//     },

//     {
//       season:"9",
//       week: "4",
//       date: "March 7",
//       summary: `It’s Week 4, and I’ve already lost most of my passion for these articles. Losing motivation after just three weeks? Just call me Essendon. Welcome back to the BAFL Times.
//                 <br><br>
//                 The week kicked off with Matthew taking on Lachlan in a decisive matchup that could shape the final Division 2 standings. Lachlan put six goals past Matthew with Juventus—remember when Juventus were good? Yeah, me neither, and I’m Italian. Meanwhile, Dru faced off against Dan in the battle of the Double D’s (that joke had to be verified by the commissioners). Dan, playing as Shakhtar Donetsk—or Shakhar Donesk? Shakeher Doner? Yeah, that Ukrainian team—ran away with an 8-1 win. On the BAFL website, the scoreline looks like a guitar!
//                 <br><br>
//                 Tuesday saw Lachy W return with a big Wearne W (he told me to say that). A close 2-1 victory keeps his playoff hopes alive. Justin and Lachlan also squared off, with Justin playing as Real Sociedad—I wish I could find my real sociedad… that milk must’ve gone off by now. In a déjà vu performance, Lachlan put another six goals past his opponent to solidify a top-two spot.
//                 <br><br>
//                 On Wednesday, the BAFL Times’ very own secured a massive 3-1 win over Dan. Post-match, Dan was quoted saying, “F*** you, Alex,” and that the BAFL Times is shit. He also said this mere hours after interviewing my cousin—gonna be an awkward family reunion. Meanwhile, Manjeeve took on Justin in what was expected to be an easy win for Manjeeve. Oh, how wrong we were. But are we even surprised at this point? The biggest fall-off since Ben Simmons, I reckon. Justin, ever the sportsman, praised his opponent’s effort. Manjeeve, on the other hand, blamed FC 25’s coding for his loss. There’s an ironic joke about sports gaming companies in there somewhere.
//                 <br><br>
//                 Finally, Thursday marked the return of Bass after a brief layoff (blame the commissioners), but Dru had no interest in rolling out the red carpet, securing a hard-fought 3-2 victory. Manjeeve, desperate for redemption, had a chance to take down Division 2 leader John. He entered with confidence, ready to prove he was back in business. And by “business,” I mean MySpace. John walked away—well, more of a slow trot—with a dominant 6-1 win. The very real possibility of a wooden chopsticks finish still looms, but who knows? The BAFL is full of twists and turns!
//                `,
//       author: "Alex Villani"
//     },

//     {
//       season:"9",
//       week: "3",
//       date: "February 28",
//       summary: `          Read so nice, I had to do it thrice! Welcome back to the third installment of the BAFL Times, now featuring post-match interviews to give you an in-depth look at the emotional side of BAFL.
//                     <br><br>
//                     The week kicked off with a heated clash between Brent and Dan, with Dan emerging victorious in a dominant 4-0 win. It's worth noting that Brent went undefeated in Division 2 last season—a skill gap some might say is bigger than Freddie Mercury’s teeth. The battle of the undefeated saw John take on Justin, with John shooting down Justin’s Arsenal (haha, get it… because…).
//                     <br><br>
//                     Tuesday brought early controversy when Jude delayed his match to 3:30, only to back out altogether against Lachy W. Some speculated it was nerves, but given he was facing Lachy… well, that theory doesn’t really hold up. Fortunately John put his undefeated record on the line to beat Lachy 1-0. See Jude, nothing to worry about! The other match almost warrants a paragraph by itself, but I won't (something about HTML code says Sam). Lachlan tore Ricardo a new one by equalling the goal scoring record with a 13-0 win. Topped off with 25 shots, Ricardo probably would've had more success using the Be A Pro camera for his goalie as the man who originally set the record for the worst loss now has the joint record for the biggest win, swings and roundabouts ay?
//                     <br><br>
//                     Following his victory, Lachlan described himself as a “walking god” and an “aggressor with no mercy.” Yeah, he actually said that. I reckon Trump has fewer haters. Lachy also expressed confidence ahead of his upcoming match against Jude, accompanied by plenty of Lei noises throughout his game—long live the pshhhhhh, very cooool king.
//                     <br><br>
//                     Wednesday brought a top-of-the-table showdown between Sam and Alex in a high-class match. Despite averaging 10 goals per game in his last three outings, Alex was held to just three in a 5-3 loss. He was later seen bawling his eyes out aggressively at his desk. Oh wait… was I supposed to leave that part out? Sam called the match “hard-fought”—though he did finger quotations while saying it, so take that as you will. Meanwhile, Jude suffered an upset loss to Lachy W, who showed humility in victory by calling Jude “the easiest opponent” he’s ever faced. Good luck on the dole next week, Lachy! 
//                     <br><br>
//                     To wrap up the week, Jude had a shot at redemption against Ricardo—and he took it with both hands. A commanding 6-0 win restored his confidence, which he described as a “business as usual” performance. The final match of the week saw Manjeeve take on Matthew. I watched this one with my mouth wide open (not because I’m a mouth breather) but because I couldn’t believe what I was seeing. A 90th-minute winner from Matthew snatched victory away from Manjeeve, giving Matthew his first-ever BAFL win. Matthew credited the circle button for his success. Meanwhile, post-match, Manjeeve sounded eerily like my ex just before we broke up, assuring me that he was “fine” and that “everything is all good.” Thus ends a big week in the BAFL.
//                     <br><br>
//                     On to the next one!`,
//       author: "Alex Villani"
//     },

//     {
//       season:"9",
//       week: "2",
//       date: "February 21",
//       summary: `Welcome, one and all, to the BAFL Times: Week 2. Believe it or not, I’ve been renewed for a second edition. Much like the Brazilian national team, let’s dive right into it!
//                     <br/><br/>
//                     The week kicked off with a crucial Division One match between Sam and Dru. And let’s just say—I’ve seen wet paper bags put up a bigger fight than Dru (whose name, I must say, feels a bit misleading). A brutal 13-0 loss, tying the record for the biggest defeat, sent shockwaves through the BAFL and Big Ant communities, raising serious alarm bells. Meanwhile, John took on Jude, who, feeling confident in his job security, secured a win and extended his season to a perfect 2-0 start.
//                     <br/><br/>
//                     Tuesday featured the Battle of Italy (referring to the teams, not Brent himself—his ancestors were on the First Fleet, I think). The match ended in a dramatic draw after a 90th-minute equalizer from Brent shattered Bass’s hopes. #OnlyOneJester. Elsewhere, Justin faced off against Matthew in a 2-2 result, keeping Justin’s undefeated (redemption? comeback? unretired?) season alive. Remarkably, a record four Division 2 players remain unbeaten.
//                     <br/><br/>
//                     Wednesday was an emotional rollercoaster for the BAFL—not in a sad way, but because Lachy and Lachlan simply would not shhuuutt uuuupppp. You’d think they were football philosophers, but then again, here I am, writing articles about a workplace FIFA league. After polishing off some delightful noodles (courtesy of the generous Big Ant Studios), I was met with the horrific stench of Division 2 gameplay. The matchup drew a huge crowd, almost enough to bring back social distancing. Unfortunately, they were met with a 2-2 draw—where every goal came from turnovers—left neither Lachy W nor Lachlan with a win, but it did keep Lachy W’s undefeated streak alive and Lachlan firmly in Division 2, where many believe he belongs.
//                     <br/><br/>
//                     Finally, Thursday wrapped up the week with some intriguing matchups: Dru vs. Alex and Manjeeve vs. Ricardo. Manjeeve, who has been playing more games than my ex-girlfriend, put his Miyagi-like training to good use with a dominant 3-0 win over Ricardo. Meanwhile, Alex handed Dru another tough loss, this time 4-0, setting up a clash with Sam next week.
//                     <br/><br/>
//                     So, if you don’t hear from me next week... uh... it’s because... I...</p>
//             `,
//       author: "Alex Villani"
//     },

//     {
//       season:"9",
//       week: "1",
//       date: "February 14",
//       summary: `On the opening week of the 9th installment of the BAFL, we were treated to an exciting lineup of matches. The league welcomed some newcomers, including Bass and Matthew, while Justin made his return from a six-week retirement, claiming he was a changed man and ready for the season ahead. <br> <br>
//                     Before the season officially began, a one-off playoff match was held between Season 8 Division 2 winner Brent and the confident newcomer Bass to determine Bass’s placement for the upcoming season. After a hard-fought battle, Brent secured a 2-1 victory, convincing the commissioners that Bass was worthy of a spot in Division 1.
//                     <br><br>
//                     To start off the season we had the newbies spread their wings with defeats in their first ever matches. Although Bass proved his worth against Season 8 runner up Dan in a 3-2 loss. Lachlan who controversially went down to Division 2 despite some last minute punch-ons with the board. He was determined to prove the doubters wrong, he did so by losing to Jude 4-3. At least he'll keep his job... 
//                     <br><br>
//                     During the week, the BAFL was saddened at the sudden loss of Lei who decided to follow his work dreams to Sydney... sorry, his wife's work dreams to Sydney and bowed out of the tournament knowing full well prior he wouldn't be able to compete. Which is like meal prepping everyday then ordering Uber Eats after work anyways. We will forever miss you Lei, your win in Season 5 of the BAFL will never be forgotten (except when I had to fact check it) <br> <br>
//                     To conclude the week, we had some very interesting matchups including the highly anticipated Lachy W vs Manjeeve matchup and the Battle of the Bottom with Ricardo and Justin. Ricardo broke a run of 8 straight divison matches without a goal, by scoring 2 in a 2-2 draw with Justin, we are still yet to find a conclusion to the Battle of the Bottom. 
//                     <br><br>
//                     Fans gathered in their 10s for the matchup of Lachy W and Manjeeve, tempers flaired early with Manjeeve controversially playing a practice match prior to his actual match during lunchtime. The jury is still out on this and Lachy is still pissed. Getting back to the match, it was a proper snoozefest, no goals, no skill, no passion. It made the recent Superbowl look like the 1998 Bulls Season. 
//                     <br><br>
//                     To cap off the final match of the week we had Bass take on defending champion Sam in match 4. This match reminded me of Finding Nemo, where Bass was Nemo trying to find himself while also trying to find his Dad and in the end he did, his name was Sam Harvey. A 12-1 defeat spread speculation and sparred heavy critcism of the move to put Bass in Division 1, however time will tell as there is much to play for in Season 9.</p>
//             `,
//       author: "Alex Villani"
//     },

//   ];
  // Create news articles and nav bar
//   const container = document.getElementById("news-container");
//   const navContatiner =document.getElementById("newsNav")
  
//   newsArticles.forEach(article => {
//     const div = document.createElement("div");
//     const divNav = document.createElement("divNav");
//     div.className = "news-article";

//     if(article.prefix && article.prefix2){
//           divNav.innerHTML = `
//           <a href="#${article.season}${article.week}">${article.prefix} ${article.season} ${article.prefix2} ${article.week}</a>`
          
//           div.innerHTML = `
//             <h2 id=${article.season}${article.week}>${article.prefix} ${article.season} ${article.prefix2} ${article.week}</h2>
//             <p><em>Published on: ${article.date}</em></p>
//             <p>Author: ${article.author}</p>
//             <p>${article.summary}</p>
            
//           `;
//     } else {
//           divNav.innerHTML = `
//           <a href="#${article.season}${article.week}">Season ${article.season} Week ${article.week}</a>`
          
//           div.innerHTML = `
//             <h2 id=${article.season}${article.week}>Season ${article.season} Week ${article.week}</h2>
//             <p><em>Published on: ${article.date}</em></p>
//             <p>Author: ${article.author}</p>
//             <p>${article.summary}</p>
            
//           `;
//     }


  
//     container.appendChild(div);
//     navContatiner.appendChild(divNav);
// // 


//   });

  function showNav() {
    navContatiner.style.display = 
      navContatiner.style.display === 'flex' ? 'none':'flex';
    
  }