let counter = 0

function loginScreen() {
    counter += 1 
    if (counter ==5){
        console.log('We are at 5')
        let login = document.getElementById('adminLink')
        login.style.display = 'flex'
    } 


}

function checkLogin(){
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    if (username == 'thebroheim' && password == 'test123'){
        console.log('We are in')
        let adminLink = document.getElementById('adminLink')
        adminLink.style.visibility = 'visible';
    } else {
        alert('Invalid login credentials')
    }
}