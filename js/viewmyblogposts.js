document.addEventListener('DOMContentLoaded', function () {
    const myBlogPosts = document.getElementById('my-blog-posts');
    
    const username = localStorage.getItem("username");
    const cleanedUsername = username.replace(/"/g, '').trim();

    const apiLink = "https://v2.api.noroff.dev/blog/posts/" + cleanedUsername + "/";

    const token = localStorage.getItem("access_token");
    const cleanedToken = token ? token.trim().replace(/^"|"$/g, '') : null;

    if (!cleanedUsername) {
        console.error('User ID is missing.');
        return;
    }

    fetch(apiLink)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((response) => {

            const posts = response.data || []; // Access the 'data' property from the response
            if (!Array.isArray(posts)) {
                throw new Error('Data format is incorrect');
            }

            posts.forEach((post) => {
                const postId = post.id;
                const cleanedPostId = postId ? postId.trim().replace(/^"|"$/g, '') : null;
                const title = post.title || 'No title';
                const image = (post.media && post.media.url) || ''; // Ensure media exists

                const postElement = document.createElement('div');
                postElement.classList.add('blog-post');

                postElement.innerHTML = `
                    <div class="blog-post-preview" data-post-id="${cleanedPostId}">
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
                    localStorage.setItem('selectedPostId', cleanedPostId);
                    window.location.href = '../post/blogpost.html'; // Redirect to the blog post page
                });

                // Add click event listener to the edit button
                const editButton = postElement.querySelector('.edit-button');
                editButton.addEventListener('click', function (event) {
                    event.stopPropagation(); // Prevent the general post click event from triggering
                    localStorage.setItem('selectedPostId', cleanedPostId);
                    window.location.href = '../post/edit.html'; // Redirect to the edit page
                });

                // Add click event listener to the delete button
                const deleteButton = postElement.querySelector('.delete-button');
                deleteButton.addEventListener('click', function (event) {
                    event.stopPropagation(); // Prevent the general post click event from triggering
                
                    if (confirm('Er du sikker på at du vil slette dette innlegget? Posten vil bli slettet om du klikker OK.')) {
                        // If the user confirms, proceed with deletion
                        fetch(`https://v2.api.noroff.dev/blog/posts/${cleanedUserId}/${cleanedPostId}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${cleanedToken}`
                            }
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to delete the blog post');
                            }
                            // Only parse the response if it's not a 204 No Content
                            if (response.status !== 204) {
                                return response.json();
                            }
                            return null; // Return null for 204 responses
                        })
                        .then(result => {
                            // Refresh the page to reflect changes
                            location.reload();
                        })
                        .catch(error => {
                            console.error('Error deleting post:', error);
                        });
                    }
                });

                myBlogPosts.appendChild(postElement);
            });
        })
        .catch((error) => {
            console.error('Fetch error: ', error);
            // Optionally display an error message
        });
});
