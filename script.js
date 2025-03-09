async function loadURL() {
    const url = document.getElementById('urlInput').value;
    if (url) {
        try {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
            const data = await response.json();
            const html = data.contents;
            const iframe = document.getElementById('htmlFrame');
            iframe.srcdoc = html;
        } catch (error) {
            alert('Failed to fetch the URL. Please check the URL and try again.');
        }
    } else {
        alert('Please enter a valid URL');
    }
}