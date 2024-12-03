
// Function to extract the domain name from a URL
function getDomainName(url) {
    try {
        const domain = new URL(url).hostname;
        return domain.replace(/^www\./, ''); // Remove "www."
    } catch (error) {
        console.error('Invalid URL:', error);
        return 'Unknown Website';
    }
}

// Get the current active tab's URL
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
        const currentTab = tabs[0];
        const websiteName = getDomainName(currentTab.url);
        // Update the DOM with the website name
        document.getElementById('website-name').textContent = websiteName;
    } else {
        document.getElementById('website-name').textContent = 'No active tab found.';
    }
});
document.addEventListener("DOMContentLoaded", () => {
    // Get references to DOM elements
    const uploadButton = document.getElementById("uploadButton");
    const fileInput = document.getElementById("fileInput");
    const pdfTitle = document.getElementById("pdfTitle");
    // const summaryDiv = document.getElementById("summary");

    // const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";
    // const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + GEMINI_API_KEY;

    if (uploadButton && fileInput && pdfTitle) {
        // Add event listener for button click
        uploadButton.addEventListener("click", () => {
            fileInput.click();
        });

        // Add event listener for file input change
        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                const fileName = file.name; // Get the name of the file
                pdfTitle.textContent = `Reading: ${fileName}`; // Display the file name
                console.log(`File selected: ${fileName}`); // Log the file name for debugging
            } else {
                pdfTitle.textContent = "No file uploaded yet.";
            }
        });
    } else {
        console.error("One or more DOM elements are missing.");
    }
});
