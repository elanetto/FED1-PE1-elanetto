// Set the username in the welcome message
const username = localStorage.getItem("username");
document.getElementById('welcome-username').innerHTML = "&nbsp;" + JSON.parse(username);

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

    const token = localStorage.getItem("access_token");
    console.log("This is the token: " + token);

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
    myHeaders.append("Authorization", "Bearer " + token);

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
      .then((response) => response.text())
      .then((result) => {
          console.log(result);
          alert('Blogginnlegget er publisert!');
      })
      .catch((error) => {
          console.error(error);
          alert('Det oppsto en feil ved publisering.');
      });
});
