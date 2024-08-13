// carousel.js
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('carousel');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const dotsContainer = document.getElementById('dots-container');

    // Fetch the latest blog posts
    fetch('https://v2.api.noroff.dev/blog/posts/elanetto')
        .then(response => response.json())
        .then(data => {
            const posts = data.data.slice(0, 3); // Get the three latest posts
            if (posts.length === 0) {
                console.error('No posts available.');
                return;
            }

            // Add carousel items
            posts.forEach(post => {
                const carouselItem = document.createElement('a');
                carouselItem.classList.add('carousel-item');
                carouselItem.href = `./post.html?id=${post.id}`; // Adjust URL for individual post

                const img = document.createElement('img');
                img.src = post.media.url;
                img.alt = post.title;

                const title = document.createElement('div');
                title.classList.add('carousel-title');
                title.textContent = post.title;

                carouselItem.appendChild(img);
                carouselItem.appendChild(title);
                carousel.appendChild(carouselItem);
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
