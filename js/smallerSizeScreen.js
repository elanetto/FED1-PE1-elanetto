
const dropdownButton = document.getElementById('dropdown-bars');
const dropdownMenu = document.querySelector('.dropdown-content');
const dropdownMenuItems = document.querySelectorAll('.dropdown-list-item');

dropdownButton.addEventListener('click', function () {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});



