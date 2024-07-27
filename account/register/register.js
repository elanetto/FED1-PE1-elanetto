document.addEventListener('DOMContentLoaded', function () {
    const errorMessage = document.getElementById('register-error');
    const successMessage = document.getElementById('register-success');
    const registerBtn = document.getElementById('register-btn');
    const showPasswordBtn = document.getElementById('show-password-register');
    const passwordInput = document.getElementById('password-register');

    if (!showPasswordBtn || !passwordInput) {
        console.error('Required elements for show-password functionality are missing.');
        return;
    }

    function showPassword() {
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

    registerBtn.addEventListener('click', async function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email-register').value;
        const password = passwordInput.value;

        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';

        // Input validation
        if (username.length < 2 || email.length < 2 || password.length < 2) {
            errorMessage.style.display = 'block';
            errorMessage.innerHTML = 'Alle feltene må fylles ut.';
            console.log('Alle feltene må fylles ut.');
            return;
        }

        if (password.length < 9) {
            errorMessage.innerHTML = 'Passordet må inneholde mer enn 9 tegn.';
            errorMessage.style.display = 'block';
            console.log('Passordet må inneholde mer enn 9 tegn.');
            return;
        }

        if (password.length > 20) {
            errorMessage.innerHTML = 'Passordet må inneholde mindre enn 20 tegn.';
            errorMessage.style.display = 'block';
            console.log('Passordet må inneholde mindre enn 20 tegn.');
            return;
        }

        if (!email.includes('@stud.noroff.no')) {
            errorMessage.innerHTML = 'Eposten må slutte med @stud.noroff.no.';
            errorMessage.style.display = 'block';
            console.log('Eposten må slutte med @stud.noroff.no.');
            return;
        }

        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            errorMessage.innerHTML = 'Brukernavnet kan kun inneholde bokstaver og tall.';
            errorMessage.style.display = 'block';
            console.log('Brukernavnet kan kun inneholde bokstaver og tall.');
            return;
        }

        const user = {
            name: username,
            email: email,
            bio: "Default bio",
            avatar: {
                url: 'https://github.com/elanetto/FED1-PE1-elanetto/blob/main/assets/images/user/avatar-user-default.png?raw=true',
                alt: "User Avatar"
            },
            banner: {
                url: 'https://github.com/elanetto/FED1-PE1-elanetto/blob/main/assets/images/200kb-images/kewater_view-01.jpg?raw=true',
                alt: "User Banner"
            },
            venueManager: true,
            password: password
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

            // Handle errors returned by the API
            if (data.errors) {
                console.log(data.errors)
                console.log(data.errors.map(error => error.message).join('<br>'));
                errorMessage.style.display = 'block';
                errorMessage.innerHTML = data.errors.map(error => error.message).join('<br>');
                console.log(data.errors);
                return;
            }

            // Redirect to login page if registration is successful
            if (data.email) {
                localStorage.setItem('username', data.name);
                localStorage.setItem('email', data.email);
                localStorage.setItem('avatar', data.avatar.url);
                localStorage.setItem('banner', data.banner.url);
                successMessage.style.display = 'block';
                console.log('Bruker registrert');

                // Redirect to login page after 3 seconds
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 3000);
            }

        } catch (error) {
            console.log(error);
            errorMessage.style.display = 'block';
            errorMessage.innerHTML = 'Noe gikk galt, prøv igjen senere.';
        }

        document.querySelector('.register-form').reset();
    });
});
