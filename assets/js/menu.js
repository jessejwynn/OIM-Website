document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-items a, .menu-group a');

    function toggleMenu() {
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Toggle menu
    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking menu items
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    menuOverlay.addEventListener('click', function(e) {
        if (e.target === menuOverlay) {
            toggleMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            toggleMenu();
        }
    });
});