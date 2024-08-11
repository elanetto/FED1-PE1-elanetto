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
            const title = post.title || 'No title';
            const body = post.body || 'No content';
            const image = post.media.url || '';
            const date = new Date(post.created).toLocaleDateString() || 'No date';
            const tags = (post.tags || []).join(', ') || 'No tags';
            const categories = (post.categories || []).join(', ') || 'No categories';

            const postElement = document.createElement('div');
            postElement.classList.add('blog-post');

            postElement.innerHTML = `
                <div class="blog-post-preview">
                <div class="blog-admin-buttons">
                <button class="mini-button edit-button"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="mini-button delete-button"><i class="fa-solid fa-trash"></i></button>
                </div>
                ${image ? `<img src="${image}" alt="${title}">` : ''}
                <h2>${title}</h2>
                </div>
                `;

            myBlogPosts.appendChild(postElement);
        });
    })
    .catch((error) => {
        console.error('Fetch error: ', error);
        errorMessage.style.display = 'block';
    });

});
