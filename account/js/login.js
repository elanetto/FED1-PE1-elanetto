

// show password code from https://www.w3schools.com/howto/howto_js_toggle_password.asp
const showPasswordBtn = document.getElementById("show-password-login");

function showPassword() {
    const passwordInput = document.getElementById("password-login");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
};

// Toggle eye icon when clicking on it:
const eyeContainerEl = document.querySelector('.eye-container')

eyeContainerEl.addEventListener("click", () => {
    for(let i=0; i<eyeContainerEl.children.length; i++){
    eyeContainerEl.children[i].classList.toggle("hide")
    }
});

const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');
const errorMessageLogin = document.getElementById('login-error');

loginButton.addEventListener('click', async function(event) {
    event.preventDefault();

    const email = loginEmail.value;
    const password = loginPassword.value;

    const user = {
        email: email,
        password: password
    };

    if (email.length === 0 || password.length === 0) {
        console.log('Epost eller passord mangler');
        errorMessageLogin.style.display = 'block';
        return;
    }

    try {
        const response = await fetch('https://v2.api.noroff.dev/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            const accessToken = data.data.accessToken;
            const username = data.data.name;
            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('username', username);
            window.location.href = '../post/index.html';
        } else {
            errorMessageLogin.textContent = data.message || 'Feil brukernavn eller passord';
            errorMessageLogin.style.display = 'block';
        }

    } catch (error) {
        console.error('Det skjedde en feil under innloggingen', error);
        errorMessageLogin.style.display = 'block';
    }
}
);