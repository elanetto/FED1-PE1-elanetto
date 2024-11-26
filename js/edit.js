document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the post ID and username from local storage
    const postId = localStorage.getItem('selectedPostId');
    const cleanedPostId = postId ? postId.trim().replace(/^"|"$/g, '') : null;
    const username = localStorage.getItem('username');
    const cleanedUsername = username ? username.trim().replace(/^"|"$/g, '') : null;

    if (!postId || !cleanedUsername) {
        console.error('Post ID or Username is missing.');
        return;
    }

    // Add username and email to HTML DOM
    const brukernavnElement = document.querySelectorAll('#welcome-username-edit-page');
    brukernavnElement.forEach(el => el.innerHTML = "&nbsp;" + cleanedUsername);

    // Fetch the blog post data from the API
    fetch(`https://v2.api.noroff.dev/blog/posts/${cleanedUsername}/${cleanedPostId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch the blog post data');
            }
            return response.json();
        })
        .then(data => {

            // Populate the form fields with the fetched data
            document.getElementById('blog-title-edit-page').value = data.data.title || '';
            document.getElementById('blog-bilde-input-edit-page').value = data.data.media.url || '';
            document.querySelector('.blog-image-preview').src = data.data.media.url || '';

            // Set the last used tag text
            const lastTag = data.data.tags && data.data.tags[0] ? data.data.tags[0] : 'No tag selected';
            document.getElementById('last-tag-text').textContent = lastTag;

            // Set the selected option in the dropdown
            const tagSelect = document.getElementById('blog-tag-edit-page');
            tagSelect.value = lastTag; // Set the dropdown to the last used tag

            document.getElementById('blog-content-edit-page').value = data.data.body || '';
        })
        .catch(error => {
            console.error('Error fetching post data:', error);
        });

    // Handle image preview on image link input change
    document.getElementById('blog-bilde-input-edit-page').addEventListener('input', function () {
        const imageUrl = document.getElementById('blog-bilde-input-edit-page').value;
        document.querySelector('.blog-image-preview').src = imageUrl;
    });

    // Handle form submission
    document.getElementById('new-blogpost-form-edit-page').addEventListener('submit', function (event) {
        event.preventDefault();

        // Collect updated data from form fields
        const updatedTitle = document.getElementById('blog-title-edit-page').value.trim();
        const updatedImage = document.getElementById('blog-bilde-input-edit-page').value.trim();
        const updatedTag = document.getElementById('blog-tag-edit-page').value.trim();
        const updatedContent = document.getElementById('blog-content-edit-page').value.trim();

        // Prepare the data to send in the PUT request
        const updatedPostData = {
            title: updatedTitle,
            body: updatedContent,
            tags: [updatedTag],
            media: {
                url: updatedImage,
                alt: updatedTitle
            }
        };

        // Set up the request options
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = localStorage.getItem('access_token');
        const cleanedToken = token ? token.trim().replace(/^"|"$/g, '') : null;
        myHeaders.append("Authorization", "Bearer " + cleanedToken);

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(updatedPostData),
            redirect: 'follow'
        };

        // Send the PUT request to update the blog post
        fetch(`https://v2.api.noroff.dev/blog/posts/${cleanedUsername}/${cleanedPostId}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update the blog post');
                }
                return response.json();
            })
            .then(result => {
                // Optionally redirect or inform the user of success
                window.location.href = './blogpost.html'; // Redirect to blog home after editing
            })
            .catch(error => {
                console.error('Error updating post:', error);
            });
    });

    // Handle delete post action
const deleteButton = document.querySelector('.edit-page-delete-button');
deleteButton.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent the general post click event from triggering

    if (confirm('Er du sikker på at du vil slette dette innlegget? Posten vil bli slettet, og du vil bli sent tilbake til Din Profil om du klikker OK.')) {
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
            window.location.href = '../account/myaccount.html';
        })
        .catch(error => {
            console.error('Error deleting post:', error);
        });
    }
});

});
