document.addEventListener('DOMContentLoaded', function() {
    const showPasswordBtn = document.getElementById("show-password-login");
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('password-login');
    const loginButton = document.getElementById('login-btn');
    const errorMessageLogin = document.getElementById('login-error');
    const forgotPasswordLink = document.getElementById('forgot-password-link');

    if (!showPasswordBtn || !loginEmail || !loginPassword || !loginButton || !errorMessageLogin || !forgotPasswordLink) {
        console.error('One or more required elements are missing.');
        return;
    }

    function showPassword() {
        if (loginPassword.type === "password") {
            loginPassword.type = "text";
            showPasswordBtn.querySelector('.fa-eye-slash').classList.add('hide');
            showPasswordBtn.querySelector('.fa-eye').classList.remove('hide');
        } else {
            loginPassword.type = "password";
            showPasswordBtn.querySelector('.fa-eye-slash').classList.remove('hide');
            showPasswordBtn.querySelector('.fa-eye').classList.add('hide');
        }
    }

    showPasswordBtn.addEventListener("click", showPassword);

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    loginButton.addEventListener('click', async function(event) {
        event.preventDefault();

        const email = loginEmail.value.trim();
        const password = loginPassword.value.trim();

        if (!validateEmail(email)) {
            errorMessageLogin.textContent = 'Ugyldig e-postadresse';
            errorMessageLogin.style.display = 'block';
            console.log('Ugyldig e-postadresse');
            return;
        }

        if (password.length === 0) {
            errorMessageLogin.textContent = 'Passord mangler';
            errorMessageLogin.style.display = 'block';
            console.log('Passord mangler');
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
                errorMessageLogin.textContent = data.errors[0]?.message || 'Feil brukernavn eller passord';
                console.log('Feil brukernavn eller passord');
                errorMessageLogin.style.display = 'block';
            }
        } catch (error) {
            console.error('Det skjedde en feil under innloggingen', error);
            errorMessageLogin.textContent = 'Det skjedde en feil under innloggingen';
            console.log('Det skjedde en feil under innloggingen');
            errorMessageLogin.style.display = 'block';
        }
    });

    forgotPasswordLink.addEventListener('click', async function(event) {
        event.preventDefault();

        const email = prompt('Vennligst oppgi din e-postadresse for å tilbakestille passordet:');
        
        if (email && validateEmail(email)) {
            try {
                const response = await fetch('https://v2.api.noroff.dev/auth/forgot-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email })
                });

                const data = await response.json();
                console.log(data); // Log response for debugging

                if (response.ok) {
                    alert('En e-post for tilbakestilling av passord har blitt sendt.');
                } else {
                    alert('Noe gikk galt. Vennligst prøv igjen senere.');
                }
            } catch (error) {
                console.error('Det skjedde en feil under forespørselen om å tilbakestille passordet', error);
                alert('Det skjedde en feil under forespørselen om å tilbakestille passordet.');
            }
        } else {
            alert('Vennligst oppgi en gyldig e-postadresse.');
        }
    });
});
