document.addEventListener('DOMContentLoaded', function() {
    const loginEmail = document.getElementById('email-login');
    const loginButton = document.getElementById('login-btn');
    const errorMessageLogin = document.getElementById('login-error');
    const forgotPasswordLink = document.getElementById('forgot-password-link'); // Assuming this is defined somewhere in your full HTML
    const loginPassword = document.getElementById('password-login');
    const showPasswordBtn = document.getElementById('show-password-login');

    // Ensure all required elements are found
    if (!loginEmail || !loginButton || !errorMessageLogin || !loginPassword || !showPasswordBtn) {
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
            console.log("hello!");

            if (response.ok) {
                const accessToken = JSON.stringify(data.data.accessToken);
                const username = JSON.stringify(data.data.name);
                const avatar = JSON.stringify(data.data.avatar.url);
                const banner = JSON.stringify(data.data.banner.url);
                const userEmail = JSON.stringify(data.data.email);
                
                localStorage.setItem("access_token", accessToken);
                localStorage.setItem("name", username);
                localStorage.setItem("avatar", avatar);
                localStorage.setItem("banner", banner);
                localStorage.setItem("email", userEmail);

                // localStorage.setItem("access_token", JSON.stringify(result.data.accessToken));
                // localStorage.setItem("user", JSON.stringify(result.data.name));
                // localStorage.setItem("user_email", result.data.email);
                // localStorage.setItem("avatar", result.data.avatar.url);
                // localStorage.setItem("banner", result.data.banner.url);
                console.log('Innlogging vellykket');
                window.location.href = '../account/myaccount.html';
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
});
