document.addEventListener('DOMContentLoaded', function () {
    // Fetch local storage data
    const username = JSON.parse(localStorage.getItem("username"));
    const email = JSON.parse(localStorage.getItem("email"));
    const avatar = JSON.parse(localStorage.getItem("avatar_url"));
    const banner = JSON.parse(localStorage.getItem("banner_url"));
    const token = JSON.parse(localStorage.getItem("access_token"));

    console.log("username: " + username);
    console.log("email: " + email);
    console.log("avatar: " + avatar);
    console.log("banner: " + banner);
    console.log("token: " + token);

    // Add username and email to HTML DOM
    document.querySelector('.brukernavn').innerHTML = "&nbsp;" + username;
    document.querySelector('.brukernavn-body').innerHTML = "&nbsp;" + username;
    document.querySelector('.user-email').innerHTML = "&nbsp;" + email;

    // Add avatar-url from local storage
    const avatarImageEl = document.querySelector('.profile-image-circle');
    avatarImageEl.style.backgroundImage = `url(${avatar})`;

    // Add banner-url from local storage
    const bannerImageEl = document.querySelector('.bg-image-my-account');
    bannerImageEl.style.backgroundImage = `url(${banner})`;

    // Log out from the user account
    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', function () {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/account/login.html';
    });

    // Make it possible to paste link to save a new profile picture
    const profilePictureInput = document.getElementById('profile-picture-input');
    const profilePicture = document.getElementById('profile-picture');
    const profilePictureButton = document.getElementById('profile-picture-button');

    profilePictureButton.addEventListener('click', function (event) {
        event.preventDefault();
        const newAvatarUrl = profilePictureInput.value;

        // Update the profile picture preview
        profilePicture.src = newAvatarUrl;
        console.log('Profile picture changed');

        // Send the new avatar URL to the server
        const user = {
            avatar: {
                url: newAvatarUrl
            }
        };

        fetch('https://v2.api.noroff.dev/social/profiles/elanetto', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Correct header for token
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    console.log('Profile picture updated:', data);
                    localStorage.setItem('avatar_url', newAvatarUrl); // Save the new avatar URL
                } else {
                    console.log('Error: No data returned');
                }
            })
            .catch(error => {
                console.error('Error updating profile picture:', error);
                alert('Noe gikk galt, prøv igjen senere.');
            });
    });

    // Make it possible to paste link to save a new banner picture
    const bannerPictureInput = document.getElementById('banner-picture-input');
    const bannerPicture = document.getElementById('banner-picture');
    const bannerPictureButton = document.getElementById('banner-picture-button');

    bannerPictureButton.addEventListener('click', function (event) {
        event.preventDefault();
        const newBannerUrl = bannerPictureInput.value;

        // Update the banner picture preview
        bannerPicture.src = newBannerUrl;
        console.log('Banner picture changed');

        // Save the new banner URL to local storage
        localStorage.setItem('banner_url', newBannerUrl);
    });

    // Make it possible to change the username
    const changeUsernameInput = document.getElementById('change-username-input');
    const changeUsernameButton = document.getElementById('change-username-button');
    const loggedInUser = document.getElementById('logged-in-user');

    changeUsernameButton.addEventListener('click', function (event) {
        event.preventDefault();
        const newUsername = changeUsernameInput.value;

        // Update the username display
        loggedInUser.innerHTML = `Logged in as: ${newUsername}`;
        console.log('Username changed');

        // Optionally, you could send this change to the server as well
    });

    // Make it possible to change the user password
    const changePasswordInput = document.getElementById('change-password-input');
    const changePasswordButton = document.getElementById('change-password-button');

    changePasswordButton.addEventListener('click', function (event) {
        event.preventDefault();
        const newPassword = changePasswordInput.value;

        // Change password logic here
        console.log('Password changed');
        // Optionally, send this new password to the server
    });
});
