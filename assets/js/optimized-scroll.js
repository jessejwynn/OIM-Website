/**
 * Optimized scroll handler - unified approach to reduce CPU usage
 * This file replaces the separate scroll handlers from floating-nav.js and scroll-animations.js
 */
document.addEventListener('DOMContentLoaded', function() {
    // Floating nav elements
    let lastScrollTop = 0;
    const floatingNav = document.querySelector('.floating-navbar');
    const mainNav = document.querySelector('.hero header') || document.querySelector('.vebro-navbar');
    const mainNavHeight = mainNav ? mainNav.offsetHeight : 0;
    
    // Variables to track if elements already have animations applied
    const animatedElements = new Set();
    const visibilityThreshold = 0.2; // 20% visibility threshold
    
    // Observer API for better performance than scroll events
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // For glass cards and section headers
            if ((entry.target.classList.contains('glass-card') || 
                 entry.target.tagName === 'H2' || 
                 entry.target.classList.contains('section-title') || 
                 entry.target.classList.contains('section-header')) && 
                !animatedElements.has(entry.target)) {
                
                if (entry.isIntersecting) {
                    // Add animation with slight delay
                    const delay = entry.target.classList.contains('glass-card') ? 100 : 
                                 (Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100);
                    
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                        animatedElements.add(entry.target);
                    }, delay);
                }
            }
        });
    }, {
        root: null, // viewport
        rootMargin: '0px',
        threshold: visibilityThreshold
    });
    
    // Get elements to observe
    document.querySelectorAll('.glass-card, h2, .section-title, .section-header').forEach(el => {
        observer.observe(el);
    });
    
    // For floating navbar - still needs scroll event
    // Using passive listener for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                if (mainNav) {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const mainNavBottom = mainNav.getBoundingClientRect().bottom;
                    const scrollingUp = scrollTop < lastScrollTop;
    
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
                ticking = false;
            });
            ticking = true;
        }
    }, {passive: true}); // Mark as passive for performance
    
    // Initial check for elements already in viewport
    if (mainNav) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const mainNavBottom = mainNav.getBoundingClientRect().bottom;
        if (mainNavBottom < 0) {
            floatingNav.classList.add('visible');
        }
    }
});