document.addEventListener('DOMContentLoaded', function () {
    const myBlogPosts = document.getElementById('my-blog-posts');
    const errorMessage = document.getElementById('error-message');

    if (!myBlogPosts || !errorMessage) {
        console.error('Required elements are missing.');
        return;
    }

    // Example hardcoded data
    const examplePosts = [
        {
            title: { rendered: 'Sample Blog Post 1' },
            content: { rendered: 'This is a sample blog post content.' },
            featured_media_src_url: 'https://via.placeholder.com/150',
            date: '2024-08-11T00:00:00',
            tags: [ 'tag1', 'tag2' ],
            categories: [ 'category1', 'category2' ]
        }
    ];

    examplePosts.forEach((post) => {
        const title = post.title?.rendered || 'No title';
        const body = post.content?.rendered || 'No content';
        const image = post.featured_media_src_url || '';
        const date = new Date(post.date).toLocaleDateString() || 'No date';
        const tags = (post.tags || []).join(', ') || 'No tags';
        const categories = (post.categories || []).join(', ') || 'No categories';

        const postElement = document.createElement('div');
        postElement.classList.add('blog-post');

        postElement.innerHTML = `
            <h2>${title}</h2>
            ${image ? `<img src="${image}" alt="${title}">` : ''}
            <p>${body}</p>
            <p>Date: ${date}</p>
            <p>Tags: ${tags}</p>
            <p>Categories: ${categories}</p>
        `;

        myBlogPosts.appendChild(postElement);
    });
});
