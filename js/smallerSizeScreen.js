
const dropdownButton = document.getElementById('dropdown-bars');
const dropdownMenu = document.querySelector('.dropdown-content');

dropdownButton.addEventListener('click', function () {
    if (dropdownMenu.style.display === 'block'){
        dropdownMenu.style.display = 'none';
    }else {
        dropdownMenu.style.display = 'block';
    }
});



