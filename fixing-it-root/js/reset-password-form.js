// reset-password-form.js

document.addEventListener('DOMContentLoaded', function() {
    const resetPasswordButton = document.getElementById('reset-password-btn');
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');
    const errorMessageResetPassword = document.getElementById('reset-password-error');

    if (!resetPasswordButton || !newPassword || !confirmPassword || !errorMessageResetPassword) {
        console.error('One or more required elements are missing.');
        return;
    }

    resetPasswordButton.addEventListener('click', async function(event) {
        event.preventDefault();

        const password = newPassword.value.trim();
        const confirmPasswordValue = confirmPassword.value.trim();

        if (password.length === 0) {
            errorMessageResetPassword.textContent = 'Passord mangler';
            errorMessageResetPassword.style.display = 'block';
            return;
        }

        if (password !== confirmPasswordValue) {
            errorMessageResetPassword.textContent = 'Passordene stemmer ikke overens';
            errorMessageResetPassword.style.display = 'block';
            return;
        }

        const token = new URLSearchParams(window.location.search).get('token');

        try {
            const response = await fetch('https://v2.api.noroff.dev/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token, password: password })
            });

            if (response.ok) {
                alert('Passordet er tilbakestilt. Du kan nå logge inn med ditt nye passord.');
                window.location.href = 'login.html';
            } else {
                const data = await response.json();
                errorMessageResetPassword.textContent = data.errors[0]?.message || 'Noe gikk galt. Vennligst prøv igjen senere';
                errorMessageResetPassword.style.display = 'block';
            }
        } catch (error) {
            console.error('Det skjedde en feil under tilbakestilling av passordet', error);
            errorMessageResetPassword.textContent = 'Det skjedde en feil under tilbakestilling av passordet';
            errorMessageResetPassword.style.display = 'block';
        }
    });
});
