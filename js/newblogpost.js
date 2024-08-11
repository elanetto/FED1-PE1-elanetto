// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set the username in the welcome message
    const username = localStorage.getItem("username");
    if (username) {
        document.getElementById('welcome-username').innerHTML = "&nbsp;" + JSON.parse(username);
    }

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

    // Handle form submission
    document.getElementById('submit-blogpost-btn').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Fetch the access token
        const token = localStorage.getItem("access_token");
        if (!token) {
            console.error("Ingen tilgangstoken funnet.");
            alert("Vennligst logg inn på nytt.");
            return;
        }

        console.log("Test! This is the access token: " + token);

        // Collect form data
        const titleInput = document.getElementById('blog-title').value;
        const imageInput = document.getElementById('blog-bilde-input').value;
        const bodyInput = document.getElementById('blog-content').value;
        const tagInput = document.getElementById('blog-tag').value;

        // Check if a tag is selected
        if (!tagInput) {
            alert('Velg en kategori');
            return;
        }

        // Prepare headers and body for the API request
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const raw = JSON.stringify({
            "title": titleInput,
            "body": bodyInput,
            "tags": [tagInput],
            "media": {
                "url": imageInput,
            }
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // Make the API request
        fetch("https://v2.api.noroff.dev/blog/posts/elanetto", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Expect JSON response
                } else {
                    throw new Error('Det oppsto en feil ved publisering.');
                }
            })
            .then((result) => {
                // Log the response to check its structure
                console.log("API Response:", result);

                // Save necessary data to localStorage
                const responseData = result.data;
                localStorage.setItem('title', titleInput);
                localStorage.setItem('body', bodyInput);
                localStorage.setItem('tags', tagInput);
                localStorage.setItem('blog_image', imageInput);
                localStorage.setItem('blog_id', responseData.id); // Assuming the id is in `data.id`

                // Redirect to the blogpost page
                window.location.href = `blogpost.html?id=${responseData.id}`;
            })
            .catch((error) => {
                console.error("Error:", error);
                alert('Det oppsto en feil ved publisering.');
            });
    });

    // Optional: Clear form fields after successful submission
    function clearFormFields() {
        document.getElementById('blog-title').value = '';
        document.getElementById('blog-bilde-input').value = '';
        document.getElementById('blog-content').value = '';
        document.getElementById('blog-tag').value = '';
    }
});
