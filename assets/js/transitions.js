document.addEventListener('DOMContentLoaded', function() {
    // Function to handle smooth page transitions
    function handlePageTransitions() {
        const links = document.querySelectorAll('a[href^="/"]'); // Select all internal links
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                // Only handle internal links to other pages
                if (this.pathname === window.location.pathname) return;
                
                e.preventDefault(); // Prevent immediate navigation
                
                const targetUrl = this.href;
                document.body.classList.add('fade-out');
                
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 300); // Match this with the CSS transition duration
            });
        });
    }

    // Handle browser back button
    if (window.performance && window.performance.navigation.type === 2) {
        document.body.classList.remove('fade-out');
    }

    // Initialize transitions
    handlePageTransitions();

    // Remove fade-out class when page loads
    window.addEventListener('pageshow', function() {
        document.body.classList.remove('fade-out');
    });
});