import fs from 'fs';
import https from 'https';
import path from 'path';

// Wikimedia Commons OGG file (Verified URL from search)
const url = "https://upload.wikimedia.org/wikipedia/commons/8/87/Clair_de_lune_%28Claude_Debussy%29_Suite_bergamasque.ogg";

// We will save it as clairdelune.ogg to be precise
const dest = path.join(process.cwd(), "public", "audio", "clairdelune.ogg");

// Ensure directory exists
const dir = path.dirname(dest);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const file = fs.createWriteStream(dest);

// Header to behave like a browser
const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
};

console.log("Downloading to:", dest);

https.get(url, options, (response) => {
    if (response.statusCode === 301 || response.statusCode === 302) {
        console.log("Redirecting to:", response.headers.location);
        https.get(response.headers.location, options, (redirectResponse) => {
            redirectResponse.pipe(file);
        });
    } else {
        console.log("Status Code:", response.statusCode);
        response.pipe(file);
    }

    file.on('finish', () => {
        file.close();
        console.log("Download completed!");
    });
}).on('error', (err) => {
    fs.unlink(dest, () => { });
    console.error("Error:", err.message);
});
