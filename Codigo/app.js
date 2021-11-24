function checkAuth() {
    if (sessionStorage.getItem('status') == null) {
        location.replace('../Login/index.html');
        sessionStorage.setItem('status', 'loggedOff');
        sessionStorage.setItem('currentUser', null);
    }
}

addEventListener('load', checkAuth);
