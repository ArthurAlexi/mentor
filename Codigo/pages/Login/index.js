let database = {};
let currentUser = {};

// Creates a initial database with mock data
const initialDatabase = {
    users: [
        {
            id: 1,
            email: 'hesdras@mentor.com.br',
            password: btoa('01234'),
            type: 'Admin',
            firstName: 'Hesdras',
            lastName: 'Ferreira'
        },
        {
            id: 2,
            email: 'arthur@mentor.com.br',
            password: btoa('56789'),
            type: 'Admin',
            firstName: 'Arthur',
            lastName: 'Alexi'
        },
        {
            id: 3,
            email: 'johndoe@gmail.com',
            password: btoa('10111'),
            type: 'Investor',
            firstName: 'John',
            lastName: 'Doe',
            investments: [
                {
                    asset: 'Ethereum',
                    price: 4345.97,
                    date: '2019-10-11'
                },
                {
                    asset: 'Ethereum',
                    price: 3545.54,
                    date: '2018-10-11'
                }
            ]
        }
    ]
};

// Get localStorage data
const databaseFromLS = localStorage.getItem('database');

if (!databaseFromLS) {
    database = initialDatabase;

    // Send the initial database to localStorage
    localStorage.setItem('database', JSON.stringify(initialDatabase));
} else {
    database = JSON.parse(databaseFromLS);
}

// Triggers for the sign-in and sign-up forms
loginForm.addEventListener('submit', processLogin);
signUpForm.addEventListener('submit', processSignUp);

// Process the login form inputs
function processLogin(event) {
    event.preventDefault();

    givenEmail = floatingInput.value;
    givenPassword = floatingPassword.value;

    isUser = checkIfUserExists(givenEmail, givenPassword);

    sessionStorage.setItem('status', 'loggedIn');

    if (isUser) location.href = '../Dashboard/index.html';
    return false;
}

// Checks if the user exists on the database and sends it's data to sessionStorage
function checkIfUserExists(givenEmail, givenPassword) {
    for (let i = 0; i < database.users.length; i++) {
        let user = database.users[i];

        if (givenEmail == user.email && givenPassword == atob(user.password)) {
            currentUser.email = user.email;
            currentUser.firstName = user.firstName;
            currentUser.id = user.id;

            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            return true;
        }
    }

    feedbackMessage.innerHTML = 'E-mail ou senha inválidos.';
    feedbackMessage.style.display = 'block';
    return false;
}

// Process the signup form inputs and sends user's data to localStorage
function processSignUp(event) {
    event.preventDefault();

    givenFirstName = signupFirstName.value;
    givenLastName = signupLastName.value;
    givenEmail = signupEmail.value;
    givenPassword = signupPassword.value;

    addUser(givenFirstName, givenLastName, givenEmail, givenPassword);

    $('#staticBackdrop').modal('hide');
    $('#staticBackdrop').data(null);
    alert('Você foi cadastrado com sucesso :)');
}

function addUser(givenFirstName, givenLastName, givenEmail, givenPassword) {
    nextID = database.users.length + 1;

    let newUser = {
        id: nextID,
        email: givenEmail,
        password: btoa(givenPassword),
        type: 'Investor',
        firstName: givenFirstName,
        lastName: givenLastName
    };

    database.users.push(newUser);

    localStorage.setItem('database', JSON.stringify(database));
}
