document.addEventListener('DOMContentLoaded', function () {
    const myBlogPosts = document.getElementById('my-blog-posts');

    const userId = localStorage.getItem('username');
    const cleanedUserId = userId ? userId.trim().replace(/^"|"$/g, '') : null; // Clean up if needed

    if (!cleanedUserId) {
        console.error('User ID is missing.');
        return;
    }

    fetch(`https://v2.api.noroff.dev/blog/posts/${cleanedUserId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((response) => {
            console.log('API Response:', response); // Log the entire response

            const posts = response.data || []; // Access the 'data' property from the response
            if (!Array.isArray(posts)) {
                throw new Error('Data format is incorrect');
            }

            posts.forEach((post) => {
                const postId = post.id; // Get the ID of the post
                const title = post.title || 'No title';
                const image = post.media.url || '';

                const postElement = document.createElement('div');
                postElement.classList.add('blog-post');

                postElement.innerHTML = `
                    <div class="blog-post-preview" data-post-id="${postId}">
                        <div class="blog-admin-buttons">
                            <button class="mini-button edit-button"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button class="mini-button delete-button"><i class="fa-solid fa-trash"></i></button>
                        </div>
                        ${image ? `<img src="${image}" alt="${title}">` : ''}
                        <h2>${title}</h2>
                    </div>
                `;

                // Add click event listener to the entire post preview element to view the blog post
                postElement.querySelector('.blog-post-preview').addEventListener('click', function () {
                    localStorage.setItem('selectedPostId', postId);
                    window.location.href = '../post/blogpost.html'; // Redirect to the blog post page
                });

                // Add click event listener to the edit button
                const editButton = postElement.querySelector('.edit-button');
                editButton.addEventListener('click', function (event) {
                    event.stopPropagation(); // Prevent the general post click event from triggering
                    localStorage.setItem('selectedPostId', postId);
                    window.location.href = '../post/edit.html'; // Redirect to the edit page
                });

                // You can add a similar event listener for the delete button if needed

                myBlogPosts.appendChild(postElement);
            });
        })
        .catch((error) => {
            console.error('Fetch error: ', error);
            errorMessage.style.display = 'block';
        });
});
