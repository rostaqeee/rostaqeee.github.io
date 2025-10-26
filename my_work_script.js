document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const heroSection = document.getElementById('hero');

    // === Scroll Animations ===
    const animatedElements = document.querySelectorAll('.scroll-animate');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));

    // === Smooth scroll for navigation links ===
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // === Update footer year ===
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // === Header hide on scroll ===
    let lastScrollY = window.scrollY;
    const handleHeaderScroll = () => {
        const currentScrollY = window.scrollY;
        let heroBottom = heroSection ? heroSection.offsetTop + heroSection.offsetHeight : 0;

        if (currentScrollY > heroBottom && currentScrollY > 50) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleHeaderScroll);
    window.addEventListener('resize', handleHeaderScroll);

    console.log("Portfolio script loaded and animations initialized.");
});


// === Video Controls ===
document.querySelectorAll('.video-container').forEach(container => {
    const video = container.querySelector('.myVideo');
    const btn = container.querySelector('.playPauseBtn');
    let hideTimeout;

    // 🔊 Start muted for autoplay safety, then enable audio on user tap
    video.muted = true;
    video.volume = 0.1; // Low volume to avoid loud surprises

    function toggleVideo() {
        if (video.paused) {
            pauseAllOtherVideos(video);

            // 🔊 iOS fix: allow audio once user interacts
            video.muted = false;
            video.play().catch(err => console.log("Playback failed:", err));

            btn.classList.remove('play');
            btn.classList.add('pause');
            fadeOutTriangle();
        } else {
            video.pause();
            btn.classList.remove('pause');
            btn.classList.add('play');
            showTriangle();
        }
    }

    function fadeOutTriangle() {
        btn.style.opacity = 0.6;
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            btn.style.opacity = 0;
        }, 300);
    }

    function showTriangle() {
        clearTimeout(hideTimeout);
        btn.style.opacity = 0.6;
    }

    // Pause all other videos except current one
    function pauseAllOtherVideos(currentVideo) {
        document.querySelectorAll('.myVideo').forEach(v => {
            if (v !== currentVideo && !v.paused) {
                v.pause();
                const otherBtn = v.closest('.video-container').querySelector('.playPauseBtn');
                otherBtn.classList.remove('pause');
                otherBtn.classList.add('play');
                otherBtn.style.opacity = 0.6;
                clearTimeout(hideTimeout);
            }
        });
    }

    // === Event listeners ===
    video.addEventListener('click', toggleVideo);
    btn.addEventListener('click', toggleVideo);

    video.addEventListener('ended', () => {
        btn.classList.remove('pause');
        btn.classList.add('play');
        showTriangle();
    });
});
