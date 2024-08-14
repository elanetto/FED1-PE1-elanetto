document.addEventListener('DOMContentLoaded', function () {
    const postsPerPage = 12; // Number of posts to display per page
    let currentPage = 1;
    let allPosts = [];

    // Function to fetch all blog posts
    function fetchAllBlogPosts() {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("https://v2.api.noroff.dev/blog/posts/elanetto", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((response) => {
                console.log('API Response:', response);
                allPosts = response.data || []; // Store all posts
                displayPostsForCurrentPage();
                updatePaginationControls();
            })
            .catch((error) => {
                console.error('Fetch error: ', error);
            });
    }

    // Function to display the posts for the current page
    function displayPostsForCurrentPage() {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const postsToShow = allPosts.slice(startIndex, endIndex);

        const blogPostsContainer = document.getElementById('blog-posts');
        blogPostsContainer.innerHTML = ''; // Clear previous posts

        postsToShow.forEach((post) => {
            const postId = post.id;
                const cleanedPostId = postId ? postId.trim().replace(/^"|"$/g, '') : null;
                const title = post.title || 'No title';
                const image = (post.media && post.media.url) || ''; // Ensure media exists

                const postElement = document.createElement('div');
                postElement.classList.add('blog-post');

                postElement.innerHTML = `
                    <div class="blog-post-preview" data-post-id="${cleanedPostId}">
                        ${image ? `<img src="${image}" alt="${title}">` : ''}
                        <h2 class="h2-new-size">${title}</h2>
                    </div>
                `;

                // Add click event listener to the entire post preview element to view the blog post
                postElement.querySelector('.blog-post-preview').addEventListener('click', function () {
                    localStorage.setItem('selectedPostId', cleanedPostId);
                    window.location.href = '../post/blogpost.html'; // Redirect to the blog post page
                });

            blogPostsContainer.appendChild(postElement);
        });
    }

    // Function to update pagination controls
    function updatePaginationControls() {
        const totalPages = Math.ceil(allPosts.length / postsPerPage);
        const paginationContainer = document.getElementById('pagination-controls');
        paginationContainer.innerHTML = ''; // Clear existing controls

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.innerText = i;
            if (i === currentPage) {
                pageButton.classList.add('active');
            }

            pageButton.addEventListener('click', () => {
                currentPage = i;
                displayPostsForCurrentPage();
            });

            paginationContainer.appendChild(pageButton);
        }
    }

    // Initialize and load all posts
    fetchAllBlogPosts();
});
