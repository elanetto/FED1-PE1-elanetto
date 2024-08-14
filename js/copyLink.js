// copyLink.js

// Function to generate the shareable link
function generateShareableLink() {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('blogId') || localStorage.getItem('selectedPostId');

    if (blogId) {
        const shareableUrl = window.location.origin + window.location.pathname + "?blogId=" + blogId;
        return shareableUrl;
    } else {
        console.error('No blog ID available to create a shareable link.');
        return null;
    }
}

// Function to copy the link to the clipboard
function copyLinkToClipboard() {
    const shareableUrl = generateShareableLink();

    if (shareableUrl) {
        navigator.clipboard.writeText(shareableUrl).then(() => {
            alert('Du har kopiert linken til blogginnlegget!');
        }).catch(error => {
            console.error('Could not copy text:', error);
        });
    } else {
        alert('Could not generate a shareable link.');
    }
}

// Event listener for the copy-link button
document.addEventListener('DOMContentLoaded', function() {
    const copyLinkBtn = document.getElementById('copy-link-btn');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', copyLinkToClipboard);
    } else {
        console.error('Copy-link button not found.');
    }
});
