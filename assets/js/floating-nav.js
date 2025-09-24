document.addEventListener('DOMContentLoaded', function() {
    let lastScrollTop = 0;
    const floatingNav = document.querySelector('.floating-navbar');
    const mainNav = document.querySelector('.hero header') || document.querySelector('.vebro-navbar');
    const mainNavHeight = mainNav.offsetHeight;
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const mainNavBottom = mainNav.getBoundingClientRect().bottom;
        const scrollingUp = scrollTop < lastScrollTop;

        // Show floating navbar when:
        // 1. We've scrolled past the main navbar
        // 2. We're scrolling up
        if (mainNavBottom < 0) {
            if (scrollingUp) {
                floatingNav.classList.add('visible');
            } else {
                floatingNav.classList.remove('visible');
            }
        } else {
            floatingNav.classList.remove('visible');
        }
        
        lastScrollTop = scrollTop;
    }

    // Throttle scroll event for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial check
    handleScroll();
});
