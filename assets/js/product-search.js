// Product search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('product-search');
    const productCards = document.querySelectorAll('.product-card');
    const noResults = document.getElementById('no-results');
    
    if (!searchInput || !productCards.length) return;
    
    // Search function
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;
        
        productCards.forEach(card => {
            const name = card.getAttribute('data-name').toLowerCase();
            const description = card.getAttribute('data-description').toLowerCase();
            const category = card.getAttribute('data-category').toLowerCase();
            
            const isVisible = searchTerm === '' || 
                             name.includes(searchTerm) || 
                             description.includes(searchTerm) ||
                             category.includes(searchTerm);
            
            if (isVisible) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        if (visibleCount === 0 && searchTerm !== '') {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }
    
    // Add event listener for real-time search
    searchInput.addEventListener('input', filterProducts);
    
    // Add event listener for Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            filterProducts();
        }
    });
    
    // Clear search when clicking the search icon (optional enhancement)
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            if (searchInput.value) {
                searchInput.value = '';
                filterProducts();
                searchInput.focus();
            }
        });
    }
});

// Optional: Add smooth animations for cards appearing/disappearing
function addSearchAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        .product-card {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .product-card[style*="display: none"] {
            opacity: 0;
            transform: scale(0.95);
        }
        
        .product-card[style*="display: flex"] {
            opacity: 1;
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);
}

// Initialize animations
document.addEventListener('DOMContentLoaded', addSearchAnimations);