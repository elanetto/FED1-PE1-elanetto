document.addEventListener('DOMContentLoaded', function () {
    // Fetch local storage data
    const username = localStorage.getItem('username');
    const cleanedUsername = username ? username.trim().replace(/^"|"$/g, '') : null; // Clean up if needed
    
    const email = localStorage.getItem("email");
    const cleanedEmail = email ? email.trim().replace(/^"|"$/g, '') : null; // Clean up if needed

    const avatar = localStorage.getItem("avatar_url");
    const banner = localStorage.getItem("banner_url");
    const token = localStorage.getItem("access_token");

    console.log("username: " + username);
    console.log("email: " + email);
    console.log("avatar: " + avatar);
    console.log("banner: " + banner);
    console.log("token: " + token);

    // Add username and email to HTML DOM
    const brukernavnElements = document.querySelectorAll('.brukernavn, .brukernavn-body');
    brukernavnElements.forEach(el => el.innerHTML = "&nbsp;" + cleanedUsername);

    const userEmailElement = document.querySelector('.user-email');
    if (userEmailElement) {
        userEmailElement.innerHTML = "&nbsp;" + cleanedEmail;
    }

    // Add avatar-url from local storage
    const avatarImageEl = document.querySelector('.profile-image-circle');
    if (avatarImageEl) {
        avatarImageEl.style.backgroundImage = `url(${avatar})`;
    } else {
        console.warn('Avatar element not found.');
    }

    // Add banner-url from local storage
    const bannerImageEl = document.querySelector('.bg-image-my-account');
    if (bannerImageEl) {
        bannerImageEl.style.backgroundImage = `url(${banner})`;
    } else {
        console.warn('Banner element not found.');
    }

    // Log out from the user account
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = '/account/login.html';
        });
    } else {
        console.warn('Logout button not found.');
    }

    // Make it possible to paste link to save a new profile picture
    const profilePictureInput = document.getElementById('profile-picture-input');
    const profilePicture = document.getElementById('profile-picture');
    const profilePictureButton = document.getElementById('profile-picture-button');

    if (profilePictureInput && profilePicture && profilePictureButton) {
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

                        // Reload the page to reflect changes
                        location.reload();
                    } else {
                        console.log('Error: No data returned');
                    }
                })
                .catch(error => {
                    console.error('Error updating profile picture:', error);
                    alert('Noe gikk galt, prøv igjen senere.');
                });
        });
    } else {
        console.warn('Profile picture elements not found.');
    }

    // Make it possible to paste link to save a new banner picture
    const bannerPictureInput = document.getElementById('banner-picture-input');
    const bannerPicture = document.getElementById('banner-picture');
    const bannerPictureButton = document.getElementById('banner-picture-button');

    if (bannerPictureInput && bannerPicture && bannerPictureButton) {
        bannerPictureButton.addEventListener('click', function (event) {
            event.preventDefault();
            const newBannerUrl = bannerPictureInput.value;

            // Update the banner picture preview
            bannerPicture.src = newBannerUrl;
            console.log('Banner picture changed');

            // Save the new banner URL to local storage
            localStorage.setItem('banner_url', newBannerUrl);

            // Reload the page to reflect changes
            location.reload();
        });
    } else {
        console.warn('Banner picture elements not found.');
    }

});
