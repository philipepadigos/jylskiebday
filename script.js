// ===== S BIRTHDAY WEBSITE - JAVASCRIPT =====

const videoSources = ['video1.mp4', 'video2.mp4', 'video3.mp4', 'video4.mp4', 'video5.mp4'];
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
let isMusicPlaying = false;
let introFinished = false;

// ===== INTRO SCREEN =====
function goToMain() {
    if (introFinished) return;
    introFinished = true;
    document.getElementById('intro-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.add('active');
    setTimeout(() => { toggleMusic(); }, 600);
}

// Auto-transition when intro video ends
document.getElementById('intro-video').addEventListener('ended', () => {
    if (!introFinished) goToMain();
});

// ===== MUSIC CONTROLS =====
function toggleMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicBtn.textContent = '▶';
    } else {
        bgMusic.play().catch(e => console.log('Autoplay blocked'));
        musicBtn.textContent = '⏸';
    }
    isMusicPlaying = !isMusicPlaying;
}

// ===== VIDEO OVERLAY =====
function openVideo(index) {
    // Pause background music
    bgMusic.pause();
    isMusicPlaying = false;
    musicBtn.textContent = '▶';

    const overlay = document.getElementById('video-overlay');
    const video = document.getElementById('overlay-video');
    video.src = videoSources[index];
    video.load();
    video.play();
    overlay.classList.add('active');
}

function closeVideo(e) {
    // Only close if clicking overlay background or close button
    if (e && e.target !== e.currentTarget && !e.target.classList.contains('close-btn')) return;

    const overlay = document.getElementById('video-overlay');
    const video = document.getElementById('overlay-video');
    video.pause();
    overlay.classList.remove('active');

    // Resume background music
    bgMusic.play().catch(e => {});
    isMusicPlaying = true;
    musicBtn.textContent = '⏸';
}

// ===== HANDLE BROWSER AUTOPLAY POLICY =====
document.addEventListener('DOMContentLoaded', () => {
    // Try to autoplay intro video (muted is required for autoplay)
    const introVideo = document.getElementById('intro-video');
    introVideo.play().catch(e => {
        console.log('Intro video autoplay blocked, user interaction needed');
    });
});
const introVideo = document.getElementById('intro-video');

// Try to play with sound
introVideo.play().catch(() => {
    // If blocked, wait for user to click "Open" button, then unmute
    document.querySelector('.next-btn').addEventListener('click', () => {
        introVideo.muted = false;
        introVideo.play();
    }, { once: true });
});