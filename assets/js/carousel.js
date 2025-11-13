// Enhanced carousel functionality with improved navigation
document.addEventListener('DOMContentLoaded', function() {
    // Handle auto-slide carousels for Vebro page
    const vebroCarousel = document.querySelector('.carousel-container');
    if (vebroCarousel) {
        const vebroSlides = vebroCarousel.querySelectorAll('.carousel-slide');
        if (vebroSlides.length > 0) {
            let currentSlideIndex = 0;
            
            // Show first slide immediately
            vebroSlides[0].classList.add('active');
            
            // Function to advance to next slide
            function nextVebroSlide() {
                vebroSlides[currentSlideIndex].classList.remove('active');
                currentSlideIndex = (currentSlideIndex + 1) % vebroSlides.length;
                vebroSlides[currentSlideIndex].classList.add('active');
            }
            
            // Start auto-rotation
            setInterval(nextVebroSlide, 5000); // Change slides every 5 seconds
        }
    }

    // Main carousel navigation handler
    function initCarousel(carouselSelector, slideSelector) {
        const carousel = document.querySelector(carouselSelector);
        if (!carousel) return;

        const slides = carousel.querySelectorAll(slideSelector);
        const viewport = carousel.querySelector('.carousel__viewport');
        if (!slides.length || !viewport) return;

        let currentIndex = 0;

        // Function to navigate to specific slide
        function goToSlide(index) {
            if (index < 0 || index >= slides.length) return;
            
            currentIndex = index;
            const targetSlide = slides[index];
            
            // Smooth scroll to the target slide
            targetSlide.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });

            // Update navigation dots if they exist
            updateNavigationDots();
        }

        // Function to update navigation dots
        function updateNavigationDots() {
            const dots = carousel.querySelectorAll('.carousel__navigation-button');
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Handle arrow navigation
        const arrows = carousel.querySelectorAll('.carousel__arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                if (arrow.classList.contains('carousel__prev')) {
                    if (currentIndex > 0) {
                        goToSlide(currentIndex - 1);
                    }
                } else if (arrow.classList.contains('carousel__next')) {
                    if (currentIndex < slides.length - 1) {
                        goToSlide(currentIndex + 1);
                    }
                }
            });
        });

        // Handle dot navigation
        const dots = carousel.querySelectorAll('.carousel__navigation-button');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                goToSlide(index);
            });
        });

        // Initialize
        updateNavigationDots();
    }

    // Initialize product carousel
    initCarousel('.portrait-carousel', '.carousel__slide');
    
    // Initialize location carousel
    initCarousel('.locations-container .portrait-carousel', '.carousel__location1, .carousel__location2');

});