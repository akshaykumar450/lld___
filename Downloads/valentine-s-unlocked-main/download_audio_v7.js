import fs from 'fs';
import https from 'https';
import path from 'path';

// SoundHelix test file (Reliable direct download)
const url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const dest = path.join(process.cwd(), "public", "audio", "gymnopedie.mp3"); // KEEPING SAME NAME to avoid changing code

const file = fs.createWriteStream(dest);

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
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
