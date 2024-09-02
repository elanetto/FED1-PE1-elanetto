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
// with the only difference being the href value of the userLink element. 
// The href value is changed from "/account/myaccount.html" to 
// "../account/myaccount.html". This change is necessary because the "showUserLink.js" 
// script is used in the "index.html" file, which is located in the root directory. 
// However, the "myaccount.html" file is located in the "account" directory. 
// Therefore, the relative path to the "myaccount.html" file should include the "../" 
// to move up one directory level before accessing the "account" directory. 
// This change ensures that the user is redirected to the correct page when 
// clicking on the "Min Bruker" link in the navigation bar.