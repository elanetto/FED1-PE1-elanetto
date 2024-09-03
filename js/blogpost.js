document.addEventListener('DOMContentLoaded', function() {
    // const username = localStorage.getItem("username");
    // const cleanedUsername = username.replace(/"/g, '').trim();
    const blogId = localStorage.getItem("selectedPostId");

    const apiLink = "https://v2.api.noroff.dev/blog/posts/Anette/";

    // Function to load the blog post by ID
    function loadBlogPost(blogId) {
        const fetchUrl = apiLink + blogId;
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
                console.log("This is the blog ID: " + blogId);

                // Accessing and storing other data
                localStorage.setItem("selectedPostId", blogId);
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
    }

    // Check if blogId is in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const blogIdFromUrl = urlParams.get('blogId');

    if (blogIdFromUrl) {
        // Load blog post from URL parameter
        console.log("Loading blog post from URL parameter: " + blogIdFromUrl);
        loadBlogPost(blogIdFromUrl);
    } else {
        // Fallback to local storage if no URL parameter is provided
        const selectedPostId = localStorage.getItem('selectedPostId');
        if (selectedPostId) {
            console.log("Loading blog post from local storage: " + selectedPostId);
            loadBlogPost(selectedPostId);
        } else {
            console.error("No blog post ID found in the URL or local storage.");
            alert("No blog post ID provided.");
        }
    }
});

// Other code for image fullscreen view, copy link button, etc.
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
