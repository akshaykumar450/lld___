import fs from 'fs';
import https from 'https';
import path from 'path';

// Using a guaranteed direct link from Wikipedia/Wikimedia which doesn't require complex User-Agent spoofing 
// if handled correctly.
const url = "https://upload.wikimedia.org/wikipedia/commons/8/87/Clair_de_lune_%28Claude_Debussy%29_Suite_bergamasque.ogg";

const dest = path.join(process.cwd(), "public", "audio", "gymnopedie.mp3"); // Saving as .mp3 filename but it is ogg. I should check extension support.
// Browsers support OGG. Let's save it as .ogg to be correct.

const destOgg = path.join(process.cwd(), "public", "audio", "clairdelune.ogg");

// Ensure directory exists
const dir = path.dirname(destOgg);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const file = fs.createWriteStream(destOgg);

// Simple header
const options = {
    headers: {
        'User-Agent': 'Wget/1.20.3 (linux-gnu)'
    }
};

console.log("Downloading to:", destOgg);

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
    fs.unlink(destOgg, () => { });
    console.error("Error:", err.message);
});
