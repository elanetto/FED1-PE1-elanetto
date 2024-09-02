document.addEventListener('DOMContentLoaded', function () {
    // Check if the user is logged in
    const authToken = localStorage.getItem('access_token');

    if (authToken) {
        // User is logged in, so add the "Min Bruker" link to the nav bar - yes
        const navLinks = document.querySelector('.navigation-list');
        const userLink = document.createElement('a');
        userLink.href = "https://elanetto.github.io/FED1-PE1-elanetto/account/myaccount.html";
        userLink.innerHTML = '<li><i class="fa-solid fa-user"></i> Min Bruker</li>';
        navLinks.appendChild(userLink);
    }
});
