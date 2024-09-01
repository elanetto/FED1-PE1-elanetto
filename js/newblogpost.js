document.addEventListener('DOMContentLoaded', () => {
    // Set the username in the welcome message
    const username = localStorage.getItem("username");
    document.getElementById('welcome-username').innerHTML = "&nbsp;" + (username ? JSON.parse(username) : "Guest");
    const cleanedUsername = username.replace(/"/g, '').trim();

    // Image preview handling
    const blogBildeInput = document.getElementById('blog-bilde-input');
    const testBlogBildeBtn = document.getElementById('test-blog-bilde-btn');
    const blogBildePreview = document.querySelector('.blog-image-preview');

    testBlogBildeBtn.addEventListener('click', function(event) {
        event.preventDefault();
        if (blogBildeInput.value) {
            blogBildePreview.src = blogBildeInput.value;
            console.log('Blogg-bilde endret');
        } else {
            console.log('Ingen bilde-URL angitt');
        }
    });

    // Retrieve and clean up the token
    let token = localStorage.getItem("access_token");
    
    if (token) {
        token = token.replace(/"/g, '').trim();
        console.log("Cleaned access token: " + token);
        
        document.getElementById('submit-blogpost-btn').addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default form submission

            const titleInput = document.getElementById('blog-title').value;
            const imageInput = document.getElementById('blog-bilde-input').value;
            const bodyInput = document.getElementById('blog-content').value;
            const tagInput = document.getElementById('blog-tag').value;

            if (!tagInput) {
                alert('Velg en kategori');
                return;
            }

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + token);

            const raw = JSON.stringify({
                "title": titleInput,
                "body": bodyInput,
                "tags": [tagInput],
                "media": {
                    "url": imageInput
                }
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const apiLink = "https://v2.api.noroff.dev/blog/posts/" + cleanedUsername + "/";

            // Make the API request
            fetch(apiLink, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json(); // Handle JSON response
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .then((result) => {
                    console.log(result);

                    // Save necessary data to localStorage
                    const postId = result.data.id; // Assuming result.data contains the new post ID
                    localStorage.setItem('selectedPostId', postId); // Set the ID for the next page
                    localStorage.setItem('title', titleInput);
                    localStorage.setItem('body', bodyInput);
                    localStorage.setItem('tags', tagInput);
                    localStorage.setItem('blog_image', imageInput);

                    // Redirect to the blogpost page
                    window.location.href = 'blogpost.html';
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Det oppsto en feil ved publisering.');
                });
        });
    } else {
        alert('Token ikke funnet. Vennligst logg inn på nytt.');
    }
});
