document.addEventListener('DOMContentLoaded', function() {
    const showPasswordBtn = document.getElementById("show-password-login");
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('password-login');
    const loginButton = document.getElementById('login-btn');
    const errorMessageLogin = document.getElementById('login-error');

    if (!showPasswordBtn || !loginEmail || !loginPassword || !loginButton || !errorMessageLogin) {
        console.error('One or more required elements are missing.');
        return;
    }

    function showPassword() {
        const passwordInput = document.getElementById("password-login");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            showPasswordBtn.querySelector('.fa-eye-slash').classList.add('hide');
            showPasswordBtn.querySelector('.fa-eye').classList.remove('hide');
        } else {
            passwordInput.type = "password";
            showPasswordBtn.querySelector('.fa-eye-slash').classList.remove('hide');
            showPasswordBtn.querySelector('.fa-eye').classList.add('hide');
        }
    }

    showPasswordBtn.addEventListener("click", showPassword);

    loginButton.addEventListener('click', async function(event) {
        event.preventDefault();

        const email = loginEmail.value.trim();
        const password = loginPassword.value.trim();

        if (email.length === 0 || password.length === 0) {
            errorMessageLogin.textContent = 'Epost eller passord mangler';
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
                window.location.href = 'https://elanetto.github.io/FED1-PE1-elanetto/account/myaccount.html';
            } else {
                errorMessageLogin.textContent = data.errors[0]?.message || 'Feil brukernavn eller passord';
                errorMessageLogin.style.display = 'block';
            }
        } catch (error) {
            console.error('Det skjedde en feil under innloggingen', error);
            errorMessageLogin.textContent = 'Det skjedde en feil under innloggingen';
            errorMessageLogin.style.display = 'block';
        }
    });
});
