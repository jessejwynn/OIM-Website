document.addEventListener('DOMContentLoaded', function() {
    // Hero menu elements
    const heroMenuToggle = document.querySelector('.hero .menu-toggle');
    const heroMenuOverlay = document.querySelector('.menu-overlay');
    const heroMenuLinks = document.querySelectorAll('.menu-overlay .menu-items a, .menu-overlay .menu-group a');

    // Floating menu elements
    const floatingMenuToggle = document.querySelector('.floating-menu-toggle');
    const floatingMenuOverlay = document.querySelector('.floating-menu-overlay');
    const floatingMenuLinks = document.querySelectorAll('.floating-menu-overlay .menu-items a, .floating-menu-overlay .menu-group a');

    // Hero menu functions
    function toggleHeroMenu() {
        heroMenuOverlay.classList.toggle('active');
        document.body.style.overflow = heroMenuOverlay.classList.contains('active') ? 'hidden' : '';
    }

    function closeHeroMenu() {
        heroMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Floating menu functions
    function toggleFloatingMenu() {
        floatingMenuOverlay.classList.toggle('active');
        document.body.style.overflow = floatingMenuOverlay.classList.contains('active') ? 'hidden' : '';
    }

    function closeFloatingMenu() {
        floatingMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Hero menu event listeners
    if (heroMenuToggle && heroMenuOverlay) {
        heroMenuToggle.addEventListener('click', toggleHeroMenu);
        
        heroMenuLinks.forEach(link => {
            link.addEventListener('click', closeHeroMenu);
        });

        heroMenuOverlay.addEventListener('click', function(e) {
            if (e.target === heroMenuOverlay) {
                toggleHeroMenu();
            }
        });
    }

    // Floating menu event listeners
    if (floatingMenuToggle && floatingMenuOverlay) {
        floatingMenuToggle.addEventListener('click', toggleFloatingMenu);
        
        floatingMenuLinks.forEach(link => {
            link.addEventListener('click', closeFloatingMenu);
        });

        floatingMenuOverlay.addEventListener('click', function(e) {
            if (e.target === floatingMenuOverlay) {
                toggleFloatingMenu();
            }
        });
    }

    // Close menus on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (heroMenuOverlay && heroMenuOverlay.classList.contains('active')) {
                toggleHeroMenu();
            }
            if (floatingMenuOverlay && floatingMenuOverlay.classList.contains('active')) {
                toggleFloatingMenu();
            }
        }
    });
});