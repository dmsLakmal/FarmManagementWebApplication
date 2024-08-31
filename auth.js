// pre-stored user data
const preStoredUsers = [
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'user123' }
];

function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    const user = preStoredUsers.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'index.html';
    } else {
        document.getElementById('loginError').innerText = 'Invalid username or password';
    }
}

function handleLogout() {
    const logoutLink = document.querySelector('.dropdown-content a[href="#"]');

    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault(); 

            localStorage.removeItem('isLoggedIn');

            window.location.href = 'login.html';
        });
    }
}

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn && window.location.pathname !== '/login.html') {
        window.location.href = 'login.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    handleLogout();
});
