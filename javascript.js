$(document).ready(function () {
    // === Základné elementy ===
    const $header = $('header');
    const $heroSection = $('#hero');
    const $navLinks = $('nav ul li a[href^="#"]');

    // === Scroll Animations pomocou IntersectionObserver ===
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('visible'); // pridá triedu pre animáciu
                // Optional: observer.unobserve(entry.target); // ak chceš pozorovať len raz
            }
        });
    }, { threshold: 0.1 });

    // Pridanie observeru na všetky elementy s triedou .scroll-animate
    $('.scroll-animate').each(function () {
        observer.observe(this);
    });

    // === Plynulé skrolovanie pri kliknutí na navigačné odkazy ===
    $navLinks.on('click', function (e) {
        e.preventDefault(); // Zamedzí štandardnému skrolovaniu
        const targetId = $(this).attr('href');
        const $targetElement = $(targetId);

        if ($targetElement.length) {
            const headerOffset = $header.outerHeight(); // výška headera
            const offsetPosition = $targetElement.offset().top - headerOffset;

            // Animácia skrolovania na cieľovú sekciu
            $('html, body').animate({
                scrollTop: offsetPosition
            }, 600); // 600 ms

            // Označenie aktívneho odkazu v navigácii
            $navLinks.removeClass('active');
            $(this).addClass('active');
        }
    });

    // === Skrytie headera pri skrolovaní nadol (mimo hero sekcie) ===
    let lastScrollY = $(window).scrollTop();

    const handleHeaderScroll = () => {
        const currentScrollY = $(window).scrollTop();
        let heroBottom = 0;

        if ($heroSection.length) {
            heroBottom = $heroSection.offset().top + $heroSection.outerHeight();
        }

        // Skryje header ak sme pod hero sekciou a zároveň skrolujeme
        if (currentScrollY > heroBottom && currentScrollY > 50) {
            $header.addClass('header-hidden');
        } else {
            $header.removeClass('header-hidden');
        }

        lastScrollY = currentScrollY;
    };

    // Spustenie pri skrolovaní alebo zmene veľkosti okna
    $(window).on('scroll resize', handleHeaderScroll);

    // Log pre overenie načítania
    console.log("Portfolio script loaded and animations initialized (jQuery version).");
});

// === Galéria / slider sekcia ===
const initGallerySlider = () => {
    const $slider = $('.slider');
    const $images = $('.slider img');
    const $prevBtn = $('.prev');
    const $nextBtn = $('.next');
    
    // Ak chýbajú niektoré prvky, slider sa neinicializuje
    if (!$slider.length || !$images.length || !$prevBtn.length || !$nextBtn.length) return;
    
    let currentIndex = 0;

    // Posun slidera na aktuálny index
    const updateSlider = () => {
        const imageWidth = $images.eq(0).outerWidth(); // dynamická šírka
        $slider.css('transform', `translateX(-${currentIndex * imageWidth}px)`);
    };

    // Predchádzajúci obrázok
    $prevBtn.on('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : $images.length - 1;
        updateSlider();
    });

    // Nasledujúci obrázok
    $nextBtn.on('click', () => {
        currentIndex = (currentIndex < $images.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    // Prispôsobenie pri zmene veľkosti okna
    $(window).on('resize', updateSlider);

    updateSlider(); // Inicializácia pozície
};

// Inicializácia slidera po načítaní dokumentu
$(document).ready(initGallerySlider);
