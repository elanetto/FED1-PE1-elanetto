document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.getElementById('register-btn');
    const registerError = document.getElementById('register-error');

    registerButton.addEventListener('click', async function(event) {
        event.preventDefault();

        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const bio = document.getElementById('register-bio').value;
        const avatarUrl = document.getElementById('register-avatar-url').value;
        const avatarAlt = document.getElementById('register-avatar-alt').value;
        const bannerUrl = document.getElementById('register-banner-url').value;
        const bannerAlt = document.getElementById('register-banner-alt').value;
        const venueManager = document.getElementById('register-venue-manager').checked;

        const user = {
            name,
            email,
            password,
            bio,
            avatar: {
                url: avatarUrl,
                alt: avatarAlt
            },
            banner: {
                url: bannerUrl,
                alt: bannerAlt
            },
            venueManager
        };

        try {
            const response = await fetch('https://v2.api.noroff.dev/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful', data);
                // Redirect to login page or show success message
                window.location.href = 'https://elanetto.github.io/FED1-PE1-elanetto/login.html';
            } else {
                registerError.textContent = data.errors[0]?.message || 'Registration failed';
                registerError.style.display = 'block';
                console.log('Registration failed', data);
            }
        } catch (error) {
            console.error('Error during registration', error);
            registerError.textContent = 'An error occurred. Please try again.';
            registerError.style.display = 'block';
        }
    });
});
