async function loadURL() {
    const url = document.getElementById('urlInput').value;
    if (url) {
        try {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
            const data = await response.json();
            const html = data.contents;
            
            // Inject HTML into iframe
            const iframe = document.getElementById('htmlFrame');
            iframe.srcdoc = html;

            // Extract and display MP3 links
            extractMP3Links(html, url);
        } catch (error) {
            alert('Failed to fetch the URL. Please check the URL and try again.');
        }
    } else {
        alert('Please enter a valid URL');
    }
}

function extractMP3Links(html, baseUrl) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const mp3Links = doc.querySelectorAll('a[href$=".mp3"]');
    const mp3ListDiv = document.getElementById('mp3List');
    mp3ListDiv.innerHTML = '<h2>MP3 Files:</h2><ul>';

    if (mp3Links.length > 0) {
        mp3Links.forEach(link => {
            const mp3Url = new URL(link.getAttribute('href'), baseUrl).href;
            const li = document.createElement('li');

            const audio = document.createElement('audio');
            audio.controls = true;
            audio.src = mp3Url;

            const a = document.createElement('a');
            a.href = mp3Url;
            a.textContent = 'Download';
            a.download = mp3Url.split('/').pop();

            li.appendChild(audio);
            li.appendChild(a);
            li.innerHTML += `<a href="${mp3Url}" target="_blank">${mp3Url}</a>`;
            mp3ListDiv.querySelector('ul').appendChild(li);
        });
    } else {
        mp3ListDiv.innerHTML += '<p>No MP3 files found.</p>';
    }
}
        });
    } else {
        mp3ListDiv.innerHTML += '<p>No MP3 files found.</p>';
    }
}
