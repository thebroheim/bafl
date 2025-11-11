      fetch("/header.html")
        .then(response => response.text())
        .then(data => {
          document.getElementById("header").innerHTML = data;
        });

console.log('Are we hitting this?')

  
  

  document.addEventListener('click', (e) => {
    console.log(e.target)
    if(e.target.classList == "hamburger"){
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.getElementById('hamburger');
    navLinks.classList.toggle('show');
  }});