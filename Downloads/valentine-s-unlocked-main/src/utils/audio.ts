// Procedural Audio Utility using Web Audio API
// No external assets required. Just pure sine waves and noise.

let audioCtx: AudioContext | null = null;

const getCtx = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }
    return audioCtx;
};

// 1. Simple Click (UI interactions)
export const playClick = () => {
    try {
        const ctx = getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);

        // Increased volume from 0.1 to 0.3
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
        console.error("Audio playback failed:", e);
    }
};

export const initAudio = () => {
    const ctx = getCtx();
    if (ctx.state === "suspended") {
        ctx.resume().then(() => console.log("AudioContext resumed by user interaction"));
    }
};

// 2. Success Chime (Positive feedback)
export const playSuccess = () => {
    const ctx = getCtx();

    [440, 554, 659].forEach((freq, i) => { // A major chord
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.frequency.value = freq;
        osc.type = "sine";

        gain.gain.setValueAtTime(0, ctx.currentTime + (i * 0.1));
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + (i * 0.1) + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (i * 0.1) + 1.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + (i * 0.1));
        osc.stop(ctx.currentTime + (i * 0.1) + 1.5);
    });
};

// 3. Magic/Sparkle (For Potion, Result reveals)
export const playMagic = () => {
    const ctx = getCtx();
    const now = ctx.currentTime;

    // Play a series of high distinct random notes
    for (let i = 0; i < 15; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.frequency.setValueAtTime(800 + Math.random() * 1200, now + (i * 0.05));
        osc.type = "sine";

        gain.gain.setValueAtTime(0.05, now + (i * 0.05));
        gain.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.05) + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + (i * 0.05));
        osc.stop(now + (i * 0.05) + 0.3);
    }
};

// 4. Tick (For Wheel spin)
export const playTick = () => {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.value = 800; // Woodblock-ish
    osc.type = "square";

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    // Low pass filter to make it thud-like
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1000;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
};

// 5. Swoosh (Card flip)
export const playSwoosh = () => {
    const ctx = getCtx();
    const osc = ctx.createOscillator(); // Use noise if possible, but osc slide works for now
    const gain = ctx.createGain();

    // White noise buffer would be better, but frequency slide works as a "whoosh"
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.2);
    osc.type = "triangle";

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.1);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
};

// 6. Crunch/Break (Fortune Cookie / Pot Break)
export const playShatter = () => {
    const ctx = getCtx();
    const t = ctx.currentTime;

    // 1. Initial Impact (Thud)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.1);

    oscGain.gain.setValueAtTime(0.5, t);
    oscGain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.1);

    // 2. High Frequency Shaoow/Crack (Noise)
    const bufferSize = ctx.sampleRate * 0.3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        // High pass noise
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.8, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);

    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(1000, t);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(t);
};

// 6b. Cookie Crumble (Softer debris)
export const playCrumble = () => {
    const ctx = getCtx();
    const t = ctx.currentTime;

    // Series of small clicks
    for (let i = 0; i < 5; i++) {
        const time = t + (Math.random() * 0.1);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.frequency.value = 2000 + Math.random() * 1000;
        osc.type = "triangle";

        gain.gain.setValueAtTime(0.05, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + 0.05);
    }
};

// 7. Hum (Scanner)
export const playHum = (duration: number = 2) => {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + duration);
    osc.type = "sawtooth";

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + duration - 0.1);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 400;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
};

// 8. Key Click (Typing)
export const playKeyClick = () => {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.type = "sine";

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
};

// -----------------------------------------------------
// ATMOSPHERIC SOUNDS (Rain & Thunder)
// -----------------------------------------------------

// Using reliable open-source audio assets
const RAIN_SOUNDS = {
    drizzle: "https://actions.google.com/sounds/v1/weather/light_rain.ogg",
    rain: "https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg",
    storm: "https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg" // Fallback to heavy rain as base
};

const THUNDER_SOUNDS = [
    "https://actions.google.com/sounds/v1/weather/thunder_crack.ogg",
    "https://actions.google.com/sounds/v1/weather/rolling_thunder.ogg"
];

let rainAudio: HTMLAudioElement | null = null;
let currentIntensity = 0;

export const startRain = (intensity: number) => {
    // If already playing the correct intensity, do nothing
    if (rainAudio && !rainAudio.paused && currentIntensity === intensity) return;

    stopRain(); // Stop previous track

    let url = "";
    let maxVol = 0.5;

    if (intensity === 1) {
        url = RAIN_SOUNDS.drizzle;
        maxVol = 0.3;
    } else if (intensity === 2) {
        url = RAIN_SOUNDS.rain;
        maxVol = 0.5;
    } else {
        url = RAIN_SOUNDS.storm;
        maxVol = 0.8; // Louder for storm
    }

    rainAudio = new Audio(url);
    rainAudio.loop = true;
    rainAudio.volume = 0; // Start silent for fade-in

    rainAudio.play().catch(e => console.error("Audio play failed:", e));

    // Fade in
    let vol = 0;
    const fade = setInterval(() => {
        if (!rainAudio) { clearInterval(fade); return; }
        vol += 0.05;
        if (vol >= maxVol) {
            vol = maxVol;
            clearInterval(fade);
        }
        rainAudio.volume = vol;
    }, 100);

    currentIntensity = intensity;
};

export const stopRain = () => {
    if (rainAudio) {
        const audio = rainAudio;
        // Fade out
        let vol = audio.volume;
        const fade = setInterval(() => {
            if (vol > 0.05) {
                vol -= 0.05;
                audio.volume = vol;
            } else {
                audio.volume = 0;
                audio.pause();
                clearInterval(fade);
            }
        }, 50);
        rainAudio = null;
        currentIntensity = 0;
    }
};

export const playThunder = () => {
    const url = THUNDER_SOUNDS[Math.floor(Math.random() * THUNDER_SOUNDS.length)];
    const thunder = new Audio(url);
    thunder.volume = 0.6;
    thunder.play().catch(e => console.error("Thunder failed:", e));
};
