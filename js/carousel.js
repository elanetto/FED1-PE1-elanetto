document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('carousel');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const dotsContainer = document.getElementById('dots-container');

    // Fetch the latest blog posts
    fetch("https://v2.api.noroff.dev/blog/posts/Anette/")
        .then(response => response.json())
        .then(data => {
            const posts = data.data.slice(0, 3); // Get the three latest posts
            if (posts.length === 0) {
                console.error('No posts available.');
                return;
            }

            // Add carousel items
            posts.forEach(post => {
                const postId = post.id;
                const cleanedPostId = postId ? postId.trim().replace(/^"|"$/g, '') : null;
                const titleFromPost = post.title || 'No title';
                const imageFromPost = (post.media && post.media.url) || ''; // Ensure media exists

                console.log('Post ID:', cleanedPostId);
                console.log('Post Title:', titleFromPost);
                console.log('Post Image:', imageFromPost);

                const postElement = document.createElement('div');
                postElement.classList.add('carousel-slide');

                postElement.innerHTML = `
                    <div class="carousel-content">
                        <div class="carousel-image">
                            <div class="carousel-post-title">
                                <h2 class="h2-new-size carousel-title">${titleFromPost}</h2>
                            </div>
                        </div>
                    </div>
                `;

                // Reference the carousel-image element within the current postElement
                const bgImage = postElement.querySelector('.carousel-image');
                if (bgImage && imageFromPost) {
                    bgImage.style.backgroundImage = `url(${imageFromPost})`;
                }

                // Add click event listener to the entire post preview element to view the blog post
                postElement.querySelector('.carousel-content').addEventListener('click', function () {
                    localStorage.setItem('selectedPostId', cleanedPostId);
                    window.location.href = 'post/blogpost.html'; // Redirect to the blog post page
                });

                carousel.appendChild(postElement);
            });

            // Add dots
            posts.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateCarousel();
                });
                dotsContainer.appendChild(dot);
            });

            let currentIndex = 0;
            const totalItems = posts.length;

            function updateCarousel() {
                const offset = -currentIndex * 100;
                carousel.style.transform = `translateX(${offset}%)`;

                // Update dots
                const dots = document.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }

            function showNext() {
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarousel();
            }

            function showPrev() {
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                updateCarousel();
            }

            nextButton.addEventListener('click', showNext);
            prevButton.addEventListener('click', showPrev);

            // Initialize position
            updateCarousel();
        })
        .catch(error => {
            console.error('Error fetching blog posts:', error);
        });
});
