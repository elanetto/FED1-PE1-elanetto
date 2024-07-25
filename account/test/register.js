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

            if (data.errors) {
                errorMessage.style.display = 'block';
                errorMessage.innerHTML = data.errors.map(error => error.message).join('<br>');
                console.log(data.errors);
                return;
            }

            if (data.email) {
                localStorage.setItem('username', data.name);
                localStorage.setItem('email', data.email);
                localStorage.setItem('avatar', data.avatar.url);
                localStorage.setItem('banner', data.banner.url);
                window.location.href = 'login.html';
            }

        } catch (error) {
            console.log(error);
            errorMessage.style.display = 'block';
            errorMessage.innerHTML = 'Noe gikk galt, prøv igjen senere.';
        }

        document.querySelector('.register-form').reset();
    });
});
