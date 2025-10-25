document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const heroSection = document.getElementById('hero'); // Get the hero section
    // const mobileBreakpoint = 768; // This is no longer needed for this specific function

    // Scroll Animations
    const animatedElements = document.querySelectorAll('.scroll-animate');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation to save resources
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate position considering sticky header height
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Optional: Update active link state
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Update current year in footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Header hide on scroll logic (now applies to all resolutions)
    let lastScrollY = window.scrollY;
    const handleHeaderScroll = () => { // Renamed from handleMobileHeaderScroll
        // if (window.innerWidth <= mobileBreakpoint) { // Condition removed
            const currentScrollY = window.scrollY;
            let heroBottom = 0;
            if (heroSection) {
                heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            }

            // Hide header if scrolled past the bottom of the hero section
            if (currentScrollY > heroBottom && currentScrollY > 50) { // Added a small threshold (e.g., 50px) to prevent hiding on initial tiny scrolls
                header.classList.add('header-hidden'); // Renamed class
            } else {
                header.classList.remove('header-hidden'); // Renamed class
            }
            lastScrollY = currentScrollY;
        // } else { // This else block is no longer needed
            // Ensure header is visible on desktop if class was somehow applied
            // header.classList.remove('header-hidden-mobile');
        // }
    };

    window.addEventListener('scroll', handleHeaderScroll); // Updated function name
    window.addEventListener('resize', handleHeaderScroll); // Re-check on resize, updated function name

    console.log("Portfolio script loaded and animations initialized.");

    
});