      fetch("/header.html")
        .then(response => response.text())
        .then(data => {
          document.getElementById("header").innerHTML = data;
        });

console.log('Are we hitting this?')

  
  

  document.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.getElementById('hamburger');
    navLinks.classList.toggle('show');
  });