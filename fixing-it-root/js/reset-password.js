// reset-password.js

document.addEventListener('DOMContentLoaded', function() {
    const resetPasswordButton = document.getElementById('reset-password-btn');
    const resetPasswordEmail = document.getElementById('reset-password-email');
    const errorMessageResetPassword = document.getElementById('reset-password-error');

    if (!resetPasswordButton || !resetPasswordEmail || !errorMessageResetPassword) {
        console.error('One or more required elements are missing.');
        return;
    }

    resetPasswordButton.addEventListener('click', async function(event) {
        event.preventDefault();

        const email = resetPasswordEmail.value.trim();

        if (!validateEmail(email)) {
            errorMessageResetPassword.textContent = 'Ugyldig e-postadresse';
            errorMessageResetPassword.style.display = 'block';
            return;
        }

        try {
            const response = await fetch('https://v2.api.noroff.dev/auth/request-reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });

            if (response.ok) {
                alert('En e-post er sendt til deg med instruksjoner for tilbakestilling av passord.');
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
