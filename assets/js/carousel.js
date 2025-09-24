// Carousel functionality for navigation background
document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Set first slide as active
    slides[0].classList.add('active');
    
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
});