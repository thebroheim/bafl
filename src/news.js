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

  const container = document.getElementById("news-container");
  const navContatiner =document.getElementById("newsNav")

  newsArticles.sort((a,b) => {
    return b.articleid - a.articleid 
  })
  
  newsArticles.forEach(article => {
    const div = document.createElement("div");
    const divNav = document.createElement("divNav");
    div.className = "news-article";

    if (article.publish == "FALSE"){
      return
    }

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

const container = document.getElementById("news-container");
const navContatiner =document.getElementById("newsNav")

  function showNav() {
    navContatiner.style.display = 
      navContatiner.style.display === 'flex' ? 'none':'flex';
    
  }

document.addEventListener("DOMContentLoaded", () => {
  init();
});