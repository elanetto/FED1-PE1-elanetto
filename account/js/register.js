// Make use of the register form and the API to register new user

// set variables

// input
const username = document.getElementById('username');
const registerEmail = document.getElementById('email-register');
const registerPassword = document.getElementById('password-register');

// button
const registerButton = document.getElementById('register-btn');

// save username input when someone writes in the input field

username.addEventListener('input', function() {
    localStorage.setItem('username', username.value);
}
);

// save registerEmail input when someone writes in the input field

registerEmail.addEventListener('input', function() {
    localStorage.setItem('registerEmail', registerEmail.value);
}   
);

// save registerPassword input when someone writes in the input field

registerPassword.addEventListener('input', function() {
    localStorage.setItem('registerPassword', registerPassword.value);
}   
);

// register new user

registerButton.addEventListener('click', function() {
    let user = {
        username: username.value,
        email: registerEmail.value,
        password: registerPassword.value
    };

    fetch('https://api.chucknorris.io/jokes/random', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}   
);

