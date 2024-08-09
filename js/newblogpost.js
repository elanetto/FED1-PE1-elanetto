console.log('Her skal du kunne skrive en ny bloggpost');

const username = localStorage.getItem("username");
document.getElementById('welcome-username').innerHTML = "&nbsp;" + JSON.parse(username);

const blogBildeInput = document.getElementById('blog-bilde-input');
const testBlogBildeBtn = document.getElementById('test-blog-bilde-btn');
const blogBildePreview = document.querySelector('.blog-image-preview');

testBlogBildeBtn.addEventListener('click', function(event) {
    event.preventDefault();
    blogBildePreview.src = blogBildeInput.value;
    console.log('Blogg-bilde endret');
});

