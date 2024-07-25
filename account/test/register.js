// show password code from https://www.w3schools.com/howto/howto_js_toggle_password.asp
const showPasswordBtn = document.getElementById("show-password");

function showPassword() {
    const passwordInput = document.getElementById("password-register");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
};

// Toggle eye icon when clicking on it:
const eyeContainerEl = document.querySelector('.eye-container');

eyeContainerEl.addEventListener("click", () => {
    for (let i = 0; i < eyeContainerEl.children.length; i++) {
        eyeContainerEl.children[i].classList.toggle("hide");
    }
    showPassword();
});

// Register new user & check if input is OK:
document.addEventListener('DOMContentLoaded', function () {
    const errorMessage = document.getElementById('register-error');
    const registerBtn = document.getElementById('register-btn');

    registerBtn.addEventListener('click', async function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email-register').value;
        const password = document.getElementById('password-register').value;

        errorMessage.style.display = 'none';

        if (username.length < 2 || email.length < 2 || password.length < 2) {
            errorMessage.style.display = 'block';
            errorMessage.innerHTML = '* Vennligst fyll inn alle feltene *';
            return;
        }

        if (password.length < 9) {
            errorMessage.innerHTML = 'Passordet må inneholde mer enn 9 tegn.';
            errorMessage.style.display = 'block';
            return;
        }

        if (password.length > 20) {
            errorMessage.innerHTML = 'Passordet må inneholde mindre enn 20 tegn.';
            errorMessage.style.display = 'block';
            return;
        }

        if (!email.includes('@stud.noroff.no')) {
            errorMessage.innerHTML = 'Eposten må slutte med @stud.noroff.no.';
            errorMessage.style.display = 'block';
            return;
        }

        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            errorMessage.innerHTML = 'Brukernavnet kan kun inneholde bokstaver og tall.';
            errorMessage.style.display = 'block';
            return;
        }

        const user = {
            username: username,
            email: email,
            password: password,
            avatar: 'https://github.com/elanetto/FED1-PE1-elanetto/blob/main/assets/images/user/avatar-user-default.png?raw=true',
            banner: 'https://github.com/elanetto/FED1-PE1-elanetto/blob/main/assets/images/200kb-images/kewater_view-01.jpg?raw=true'
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
            console.log(data);

            // check if user already exists in API database and show error message
            if (data.errors) {
                errorMessage.style.display = 'block';
                errorMessage.innerHTML = data.errors.map(error => error.message).join(', ');
                console.log(data.errors);
                return;
            }

            // Send to login-page when user is made
            if (data.user) {
                localStorage.setItem('username', data.user.username);
                localStorage.setItem('email', data.user.email);
                localStorage.setItem('password', data.user.password);
                localStorage.setItem('avatar', data.user.avatar);
                localStorage.setItem('banner', data.user.banner);
                window.location.href = 'login.html';
            }

        } catch (error) {
            console.log(error);
            errorMessage.style.display = 'block';
            errorMessage.innerHTML = 'Noe gikk galt, prøv igjen senere.';
        }

        // Check if form exists before trying to reset it
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.reset();
        }
    });
});
