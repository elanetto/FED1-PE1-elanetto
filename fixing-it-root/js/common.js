// common.js

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

async function checkEmailExists(email) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/auth/check-email?email=${encodeURIComponent(email)}`);
        const data = await response.json();
        return data.exists;
    } catch (error) {
        console.error('Det skjedde en feil under sjekking av e-posten', error);
        return false;
    }
}
