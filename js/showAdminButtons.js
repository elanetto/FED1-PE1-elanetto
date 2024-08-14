document.addEventListener('DOMContentLoaded', function () {
    // Check if the user is logged in
    const authToken = localStorage.getItem('access_token');

    if (authToken) {
        // User is logged in, so add the admin buttons
        const adminButtonsContainer = document.getElementById('admin-buttons-container');
        adminButtonsContainer.innerHTML = `
            <div class="blog-admin-buttons">
                <button class="mini-button edit-button"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="mini-button delete-button"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        const userId = localStorage.getItem('username');
        const cleanedUserId = userId ? userId.trim().replace(/^"|"$/g, '') : null; // Clean up if needed

        const postId = localStorage.getItem('selectedPostId');
        const cleanedPostId = postId ? postId.trim().replace(/^"|"$/g, '') : null;

        const token = localStorage.getItem('access_token');
        const cleanedToken = token ? token.trim().replace(/^"|"$/g, '') : null;

        // Add event listeners for the buttons (optional)
        const editButton = document.querySelector('.edit-button');
        const deleteButton = document.querySelector('.delete-button');

        // Add click event listener to the edit button
        editButton.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent the general post click event from triggering
            localStorage.setItem('selectedPostId', cleanedPostId);
            window.location.href = '../post/edit.html'; // Redirect to the edit page
        });

        deleteButton.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent the general post click event from triggering

            if (confirm('Er du sikker på at du vil slette dette innlegget?')) {
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
                    return response.json();
                })
                .then(result => {
                    console.log('Post deleted successfully:', result);
                    // Refresh the page to reflect changes
                    location.reload();
                })
                .catch(error => {
                    console.error('Error deleting post:', error);
                });
            }
        });
    }
});