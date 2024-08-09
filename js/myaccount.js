

// fetch local storage data
const username = localStorage.getItem("username")
const email = localStorage.getItem("email");
const avatar = localStorage.getItem("avatar_url");
const banner = localStorage.getItem("banner_url");
const token = localStorage.getItem("access_token");

console.log("username: " + username)
console.log("email: " + email)
console.log(avatar)
console.log(banner)
console.log(token)

// Add username and email to html DOM
document.querySelector('.brukernavn').innerHTML =  "&nbsp;" + JSON.parse(username);
document.querySelector('.brukernavn-body').innerHTML =  "&nbsp;" + JSON.parse(username);
document.querySelector('.user-email').innerHTML = "&nbsp;" + JSON.parse(email);

// add avatar-url from local storage
const avatarImageEl = document.querySelector('.profile-image-circle')
avatarImageEl.style.backgroundImage = `url(${JSON.parse(localStorage.avatar)})`

// add banner-url from local storage
const bannerImageEl = document.querySelector('.bg-image-my-account');
bannerImageEl.style.backgroundImage = `url(${JSON.parse(localStorage.banner)})`



// Log out from the user account:
const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', function() {
    sessionStorage.clear();
    window.location.href = '/account/login.html';
}
);

// Make it possible to paste link to save a new profile picture:
const profilePicture = document.getElementById('profile-picture');
const profilePictureButton = document.getElementById('profile-picture-button');

// profilePictureButton.addEventListener('click', function(event) {
//     event.preventDefault();
//     profilePicture.src = profilePictureInput.value;
//     console.log('Profile picture changed');
// }
// );

profilePictureButton.addEventListener('click', function(event) {
    event.preventDefault();
    event.changeAvatar();

    const profilePictureInput = document.getElementById('profile-picture-input').value;

    const user = {
        avatar: {
            url: profilePictureInput,
        }
    };

    try {
        const response = fetch('https://v2.api.noroff.dev/social/profiles/elanetto', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Token': token
            },
            body: JSON.stringify(user)
        });

        const data = response.json();
        console.log(data);

        if (response.ok) {
            console.log('Profilbilde endret');
            localStorage.setItem('avatar', profilePictureInput);
        }
   
    } catch (error) {
        console.log(error);
        console.log('Noe gikk galt, prøv igjen senere.');
    }

    // create a function to change avatar url. 
    // idea: use access token and/or useremail from local storage to access
    // check out blog POST to check if qw can use that API to add to the user?
    // Use PostMan to test!
});

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

// Make it possible to change the username:
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