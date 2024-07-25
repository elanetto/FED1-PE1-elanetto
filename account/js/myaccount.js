// Use this code from API https://v2.api.noroff.dev/auth/login to open a login account page: 

// {
//   "data": {
//     "name": "KHbgk8CoU9Ri28R_8fGE",
//     "email": "user@example.com",
//     "bio": "string",
//     "avatar": {
//       "url": "string",
//       "alt": ""
//     },
//     "banner": {
//       "url": "string",
//       "alt": ""
//     },
//     "venueManager": true
//   },
//   "meta": {}
// }

// fetch local storage data
const username = localStorage.getItem('username');
const email = localStorage.getItem('email');
const password = localStorage.getItem('password');
const avatar = localStorage.getItem('avatar');
const banner = localStorage.getItem('banner');


// Log in to a registered user account, and display the user name on the page.:

const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');
const errorMessageLogin = document.getElementById('login-error');

loginButton.addEventListener('click', async function(event) {
    event.preventDefault();

    const email = loginEmail.value;
    const password = loginPassword.value;

    const user = {
        email: email,
        password: password
    };

    if (email.length === 0 || password.length === 0) {
        console.log('Epost eller passord mangler');
        errorMessageLogin.style.display = 'block';
        return;
    }

    try {
        const response = await fetch('https://v2.api.noroff.dev/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            const accessToken = data.data.accessToken;
            const username = data.data.name;
            loggedInUser.innerHTML = `Logged in as: ${username}`;
        }
    } catch(error) {
        console.error('Error logging in', error);
    }
}   
);

// fetch user information from local storage
const user = {
    username: username,
    email: email,
    password: password,
    avatar: avatar,
    banner: banner
};

// Log out from the user account:

const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', function() {
    sessionStorage.clear();
    window.location.href = '/account/login.html';
}
);

// Make it possible to paste link to save a new profile picture:

const profilePictureInput = document.getElementById('profile-picture-input');
const profilePicture = document.getElementById('profile-picture');
const profilePictureButton = document.getElementById('profile-picture-button');

profilePictureButton.addEventListener('click', function(event) {
    event.preventDefault();
    profilePicture.src = profilePictureInput.value;
    console.log('Profile picture changed');
}
);

// Make it possible to paste link to save a new banner picture:

const bannerPictureInput = document.getElementById('banner-picture-input');
const bannerPicture = document.getElementById('banner-picture');
const bannerPictureButton = document.getElementById('banner-picture-button');

bannerPictureButton.addEventListener('click', function(event) {
    event.preventDefault();
    bannerPicture.src = bannerPictureInput.value;
    console.log('Banner picture changed');
}
);

// Make it possible to change the user name:

const changeUsernameInput = document.getElementById('change-username-input');
const changeUsernameButton = document.getElementById('change-username-button');
const loggedInUser = document.getElementById('logged-in-user');

changeUsernameButton.addEventListener('click', function(event) {
    event.preventDefault();
    loggedInUser.innerHTML = `Logged in as: ${changeUsernameInput.value}`;
    console.log('Username changed');
}
);

// Make it possible to change the user password:

const changePasswordInput = document.getElementById('change-password-input');
const changePasswordButton = document.getElementById('change-password-button');

changePasswordButton.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('Password changed');
}
);