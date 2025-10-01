// Enhanced carousel functionality with improved navigation
document.addEventListener('DOMContentLoaded', function() {
    // Get all carousels on the page
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(function(carousel) {
        const slides = carousel.querySelectorAll('.carousel__location1, .carousel__location2');
        const dots = carousel.querySelectorAll('.carousel__navigation-button');
        let currentIndex = 0;
        
        // Function to update active dot styling
        function updateActiveDot() {
            dots.forEach((dot, index) => {
                // Remove any previous active class or styling
                dot.classList.remove('active');
                
                // Add active class to current dot
                if (index === currentIndex) {
                    dot.classList.add('active');
                }
            });
        }
        
        // Attach click handlers to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default hash navigation
                
                // Update current index
                currentIndex = index;
                
                // Update active dot
                updateActiveDot();
                
                // Prevent page from scrolling to top
                window.scrollTo(window.scrollX, window.scrollY);
                
                // Remove any added hash from URL
                if (history.pushState) {
                    history.pushState('', document.title, window.location.pathname + window.location.search);
                }
                
                // Scroll carousel to the corresponding slide using scrollIntoView
                if (slides[index]) {
                    slides[index].scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'start'
                    });
                }
            });
        });
        
        // Initialize active dot
        updateActiveDot();
    });
    
    // Add special handling for location carousel if it exists
    const locationSlides = document.querySelectorAll('.location-slide');
    const locationDots = document.querySelectorAll('.nav-dot');
    
    if (locationSlides.length > 0 && locationDots.length > 0) {
        locationDots.forEach((dot, index) => {
            dot.addEventListener('click', function(e) {
                // Hide all slides
                locationSlides.forEach(slide => {
                    slide.style.display = 'none';
                    slide.classList.remove('active');
                });
                
                // Show selected slide
                locationSlides[index].style.display = 'block';
                locationSlides[index].classList.add('active');
                
                // Update dot styling
                locationDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                
                // Prevent default behavior
                e.preventDefault();
            });
        });
    }
});