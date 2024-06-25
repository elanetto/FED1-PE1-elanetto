

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
            username: username,
            email: email,
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

            // check if user already exists in API database and show error message
            if (data.error) {
                errorMessage.style.display = 'block';
                errorMessage.innerHTML = data.message;
                console.log(data.message);
                return;
            }

            if (data.user) {
                localStorage.setItem('username', data.user.username);
                localStorage.setItem('email', data.user.email);
                window.location.href = 'login.html';
            }

        } catch (error) {
            console.log(error);
            errorMessage.style.display = 'block';
            errorMessage.innerHTML = 'Noe gikk galt, prøv igjen senere.';
        }
        
        document.getElementById('register-form').reset();
    });
});
