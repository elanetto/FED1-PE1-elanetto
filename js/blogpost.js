document.addEventListener('DOMContentLoaded', function() {

    const blogID = localStorage.getItem("id");
    const selectedPostId = localStorage.getItem('selectedPostId');

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };
    
    fetch("https://v2.api.noroff.dev/blog/posts/elanetto/" + selectedPostId, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((result) => {
            const data = result.data;
            
            // Logging the blog ID to the console
            const blogId = data.id;
            console.log("This is the blog ID: " + blogId);

            // Accessing other data
            const title = data.title;
            const body = data.body;
            const tags = data.tags;
            const blogImage = data.media.url;
            const author = data.author.name;
            const publishedDateOfBlog = data.created;
            const authorAvatar = data.author.avatar.url;
            
            // Storing data in localStorage
            localStorage.setItem("blog_id", blogId);
            localStorage.setItem("title", title);
            localStorage.setItem("body", body);
            localStorage.setItem("tags", tags);
            localStorage.setItem("blog_image", blogImage);
            localStorage.setItem("author", author);
            localStorage.setItem("published_date", publishedDateOfBlog);
            localStorage.setItem("author_avatar", authorAvatar);
            
            // Update the published date in the DOM
            const blogPublishedDate = document.querySelector('.blog-published-date');
            blogPublishedDate.innerHTML = new Date(publishedDateOfBlog).toLocaleDateString();

            const blogImageEl = document.querySelector('.blogpost-image');
            blogImageEl.src = blogImage;

            const blogTitleEl = document.querySelector('.blogpost-title');
            blogTitleEl.innerHTML = title;

            const blogBodyEl = document.querySelector('#blog-content');
            blogBodyEl.innerHTML = body;

            const blogTagsEl = document.querySelector('.blogpost-category');
            blogTagsEl.innerHTML = tags;

            const authorEl = document.querySelector('.blogpost-author');
            authorEl.innerHTML = author;

            const authorAvatarEl = document.querySelector('.author-avatar');
            authorAvatarEl.src = authorAvatar;
        })
        .catch((error) => {
            console.error("Fetch error: ", error);
        });
});

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('blogId');

    if (blogId) {
        loadBlogPost(blogId);
    } else {
        // Load a default blog post or handle the case where no blogId is provided
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const blogImage = document.querySelector('.blogpost-image');
    const fullscreenView = document.getElementById('fullscreen-image-view');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const closeFullscreenImage = document.getElementById('close-fullscreen-image');

    blogImage.addEventListener('click', function() {
        fullscreenImage.src = blogImage.src;
        fullscreenView.style.display = 'flex';
    });

    closeFullscreenImage.addEventListener('click', function() {
        fullscreenView.style.display = 'none';
    });

    fullscreenView.addEventListener('click', function(event) {
        if (event.target === fullscreenView) {
            fullscreenView.style.display = 'none';
        }
    });
});

document.getElementById('copy-link-btn').addEventListener('click', () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
        alert('Du har kopiert linken til blogginnlegget!');
    }).catch(error => {
        console.error('Could not copy text:', error);
    });
});