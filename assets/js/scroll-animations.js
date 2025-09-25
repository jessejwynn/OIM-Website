document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Alternative function for partial visibility (more flexible)
    function isElementPartiallyInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        
        // Element is visible if its top is above bottom of viewport and its bottom is below top of viewport
        return elementTop < windowHeight && elementBottom > 0;
    }

    // Function to animate elements when they come into view
    function animateOnScroll() {
        // Animate glass cards (slide up)
        const glassCards = document.querySelectorAll('.glass-card');
        glassCards.forEach(card => {
            if (isElementPartiallyInViewport(card) && !card.classList.contains('animate-in')) {
                // Add a small delay for staggered animation if multiple cards
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, 100);
            }
        });

        // Animate section headers (slide from left)
        const sectionHeaders = document.querySelectorAll('h2, .section-title, .section-header');
        sectionHeaders.forEach((header, index) => {
            if (isElementPartiallyInViewport(header) && !header.classList.contains('animate-in')) {
                // Staggered delay for multiple headers
                setTimeout(() => {
                    header.classList.add('animate-in');
                }, index * 150);
            }
        });
    }

    // Add scroll event listener with throttling for better performance
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                animateOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', onScroll);
    
    // Check on page load in case elements are already in view
    animateOnScroll();
});