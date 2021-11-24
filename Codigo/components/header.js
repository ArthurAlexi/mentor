let userName = JSON.parse(sessionStorage.getItem('currentUser')).firstName;

let setLoggedOff = () => {
    sessionStorage.setItem('status', null);
    location.replace('../Login/index.html');
};

document.querySelector(
    '#header'
).innerHTML = `<nav class="navbar navbar-expand-lg navbar-light">
<div class="container">
    <a class="navbar-brand" href="index.html">
        <img
            src="../../assets/images/logo-mentor.svg"
            alt="Logo"
            height="40"
        />
    </a>
    <form class="container-fluid search">
        <div class="input-group search-field">
            <input
                type="text"
                class="form-control"
                placeholder="Busque uma criptomoeda ou token..."
                aria-label="Username"
                aria-describedby="basic-addon1"
            />
            <span
                class="input-group-text search-icon"
                id="basic-addon1"
                ><i class="bi bi-search"></i
            ></span>
        </div>
    </form>
    <div class="actions-right-header">
        <div class="user-buttons">
            <a href="#"><i class="bi bi-heart"></i></a
            ><a href="#"><i class="bi bi-bell"></i></a>
        </div>
        <div class="hello-message">
            Olá, <span class="user-name">${userName}!</span>
        </div>
        <div class="dropdown">
            <img
                class="user-avatar nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                src="../../assets/images/avatar.jpg"
                alt=""
            />
            <ul class="dropdown-menu account" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Conta</a></li>
              <li><a class="dropdown-item" href="#">Configurações</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#" onclick="setLoggedOff()">Sair</a></li>
            </ul>
        </div>
    </div>
</div>
</nav>`;
