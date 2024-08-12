document.addEventListener('DOMContentLoaded', function() {
    const blogID = localStorage.getItem("id");
    const selectedPostId = localStorage.getItem('selectedPostId');
    console.log("Selected Post ID:", selectedPostId);

    const fetchUrl = "https://v2.api.noroff.dev/blog/posts/elanetto/" + selectedPostId;
    console.log("Fetch URL:", fetchUrl);

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(fetchUrl, requestOptions)
        .then((response) => {
            if (!response.ok) {
                console.error("Network response was not ok:", response.status);
                if (response.status === 404) {
                    alert("The requested blog post was not found.");
                }
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((result) => {
            const data = result.data;
            if (!data) {
                console.error("No data returned in response");
                return;
            }

            // Logging the blog ID to the console
            const blogId = data.id;
            console.log("This is the blog ID: " + selectedPostId);

            // Accessing and storing other data
            localStorage.setItem("blog_id", blogId);
            localStorage.setItem("title", data.title);
            localStorage.setItem("body", data.body);
            localStorage.setItem("tags", data.tags);
            localStorage.setItem("blog_image", data.media.url);
            localStorage.setItem("author", data.author.name);
            localStorage.setItem("published_date", data.created);
            localStorage.setItem("author_avatar", data.author.avatar.url);

            // Update the published date in the DOM
            document.querySelector('.blog-published-date').innerHTML = new Date(data.created).toLocaleDateString();
            document.querySelector('.blogpost-image').src = data.media.url;
            document.querySelector('.blogpost-title').innerHTML = data.title;
            document.querySelector('#blog-content').innerHTML = data.body;
            document.querySelector('.blogpost-category').innerHTML = data.tags;
            document.querySelector('.blogpost-author').innerHTML = data.author.name;
            document.querySelector('.author-avatar').src = data.author.avatar.url;
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

    fetch("https://v2.api.noroff.dev/blog/posts/elanetto/" + selectedPostId, requestOptions)
    .then((response) => {
        if (!response.ok) {
            console.error("Network response was not ok:", response.status);
            if (response.status === 404) {
                alert("The requested blog post was not found.");
            }
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((result) => {
        // Your code to handle the result
    })
    .catch((error) => {
        console.error("Fetch error: ", error);
    });

});
