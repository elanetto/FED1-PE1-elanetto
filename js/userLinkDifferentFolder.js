document.addEventListener('DOMContentLoaded', function () {
    // Check if the user is logged in
    const authToken = localStorage.getItem('access_token');

    if (authToken) {
        // User is logged in, so add the "Min Bruker" link to the nav bar
        const navLinks = document.querySelector('.navigation-list');
        const userLink = document.createElement('a');
        userLink.href = "../account/myaccount.html";
        userLink.innerHTML = '<li><i class="fa-solid fa-user"></i> Min Bruker</li>';
        navLinks.appendChild(userLink);
    }
});

// This document is basically a copy of "showUserLink.js" 
// It needed to be two different coded links to the user account page,
// because the sites were in different folders.