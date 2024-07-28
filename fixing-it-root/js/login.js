document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-btn');
    const errorMessageLogin = document.getElementById('login-error');

    loginButton.addEventListener('click', async function(event) {
        event.preventDefault();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        if (!email || !password) {
            errorMessageLogin.textContent = 'Epost og passord må fylles ut';
            errorMessageLogin.style.display = 'block';
            return;
        }

        const user = {
            email: email,
            password: password
        };

        try {
            const response = await fetch('https://v2.api.noroff.dev/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const data = await response.json();
            console.log(data); // Log response for debugging

            if (response.ok) {
                const accessToken = data.data.accessToken;
                const username = data.data.name;
                sessionStorage.setItem('accessToken', accessToken);
                sessionStorage.setItem('username', username);
                console.log('Innlogging vellykket');
                window.location.href = 'https://elanetto.github.io/FED1-PE1-elanetto/account/myaccount.html';
            } else {
                errorMessageLogin.textContent = 'Feil epost eller passord';
                errorMessageLogin.style.display = 'block';
            }
        } catch (error) {
            console.error('Det skjedde en feil under innloggingen', error);
            errorMessageLogin.textContent = 'Det skjedde en feil under innloggingen';
            errorMessageLogin.style.display = 'block';
        }
    });
});
