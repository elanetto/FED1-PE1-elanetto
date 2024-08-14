document.addEventListener('DOMContentLoaded', function () {
    // Fetch local storage data
    const username = localStorage.getItem('username');
    const cleanedUsername = username ? username.trim().replace(/^"|"$/g, '') : null;
    
    const email = localStorage.getItem("email");
    const cleanedEmail = email ? email.trim().replace(/^"|"$/g, '') : null;

    const avatar = localStorage.getItem("avatar_url");
    const banner = localStorage.getItem("banner_url");

    const token = localStorage.getItem("access_token");
    const cleanedToken = token ? token.trim().replace(/^"|"$/g, '') : null;

    // Add username and email to HTML DOM
    const brukernavnElements = document.querySelectorAll('.brukernavn, .brukernavn-body');
    brukernavnElements.forEach(el => el.innerHTML = "&nbsp;" + cleanedUsername);

    const userEmailElement = document.querySelector('.user-email');
    if (userEmailElement) {
        userEmailElement.innerHTML = "&nbsp;" + cleanedEmail;
    }

    // Add avatar-url from local storage
    const avatarImageEl = document.querySelector('.profile-image-circle');
    if (avatarImageEl && avatar) {
        avatarImageEl.style.backgroundImage = `url(${avatar})`;
    }

    // Add banner-url from local storage
    const bannerImageEl = document.querySelector('.bg-image-my-account');
    if (bannerImageEl && banner) {
        bannerImageEl.style.backgroundImage = `url(${banner})`;
    }

    // Log out from the user account
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = '../index.html';
        });
    }

    // Helper function to fetch the API key
    function fetchApiKey() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + cleanedToken);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow"
        };

        return fetch("https://v2.api.noroff.dev/auth/create-api-key", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`API key request failed: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then((result) => {
                console.log('API Key Fetch Result:', result); // Log the full result
                return result.data.key; // Adjusted to match the correct structure
            })
            .catch((error) => {
                console.error('Error fetching API key:', error);
                return null;
            });
    }

    // Make it possible to paste link to save a new profile picture
    const profilePictureInput = document.getElementById('profile-picture-input');
    const profilePictureButton = document.getElementById('profile-picture-button');

    if (profilePictureInput && profilePictureButton) {
        profilePictureButton.addEventListener('click', function (event) {
            event.preventDefault();
            const newAvatarUrl = profilePictureInput.value;

            // Fetch the API key
            fetchApiKey().then(apiKey => {
                if (apiKey) {
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("X-Noroff-API-Key", apiKey);
                    myHeaders.append("Authorization", "Bearer " + cleanedToken);

                    const raw = JSON.stringify({
                        "avatar": {
                            "url": newAvatarUrl,
                            "alt": "Avatar"
                        }
                    });

                    const requestOptions = {
                        method: "PUT",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow"
                    };

                    fetch(`https://v2.api.noroff.dev/social/profiles/${cleanedUsername}`, requestOptions)
                        .then((response) => response.text())
                        .then((result) => {
                            console.log('Profile picture changed:', result);
                            localStorage.setItem('avatar_url', newAvatarUrl);
                            alert('Profilbildet ditt er endret :)');
                            location.reload(); // Reload the page after successful update
                        })
                        .catch((error) => console.error(error));
                } else {
                    alert('Unable to fetch API key.');
                }
            });
        });
    }

    // Make it possible to paste link to save a new banner picture
    const bannerPictureInput = document.getElementById('banner-picture-input');
    const bannerPictureButton = document.getElementById('banner-picture-button');

    if (bannerPictureInput && bannerPictureButton) {
        bannerPictureButton.addEventListener('click', function (event) {
            event.preventDefault();
            const newBannerUrl = bannerPictureInput.value;

            // Fetch the API key
            fetchApiKey().then(apiKey => {
                if (apiKey) {
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("X-Noroff-API-Key", apiKey);
                    myHeaders.append("Authorization", "Bearer " + cleanedToken);

                    const raw = JSON.stringify({
                        "banner": {
                            "url": newBannerUrl,
                            "alt": "Banner"
                        }
                    });

                    const requestOptions = {
                        method: "PUT",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow"
                    };

                    fetch(`https://v2.api.noroff.dev/social/profiles/${cleanedUsername}`, requestOptions)
                        .then((response) => response.text())
                        .then((result) => {
                            console.log('Banner picture changed:', result);
                            localStorage.setItem('banner_url', newBannerUrl);
                            alert('Profilbanneret ditt er endret :)');
                            location.reload(); // Reload the page after successful update
                        })
                        .catch((error) => console.error(error));
                } else {
                    alert('Unable to fetch API key.');
                }
            });
        });
    }
});
