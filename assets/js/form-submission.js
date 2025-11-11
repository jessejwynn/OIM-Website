document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[action*="formspree.io"]');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            const submitButton = form.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Create FormData object to handle all form data including files
            const formData = new FormData(form);
            
            // Submit form using fetch API
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success - show popup
                    showSuccessPopup();
                    // Reset form
                    form.reset();
                    // Clear file list if it exists
                    const fileList = document.getElementById('fileList');
                    if (fileList) {
                        fileList.innerHTML = '';
                    }
                    // Reset selected files array if it exists
                    if (typeof selectedFiles !== 'undefined') {
                        selectedFiles = [];
                    }
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showErrorPopup();
            })
            .finally(() => {
                // Restore button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }
});

function showSuccessPopup() {
    const popup = document.getElementById('success-popup');
    const overlay = document.getElementById('popup-overlay');
    
    if (popup && overlay) {
        overlay.style.display = 'flex';
        // Small delay for animation
        setTimeout(() => {
            overlay.classList.add('show');
            popup.classList.add('show');
        }, 10);
    }
}

function showErrorPopup() {
    const popup = document.getElementById('error-popup');
    const overlay = document.getElementById('popup-overlay');
    
    if (popup && overlay) {
        overlay.style.display = 'flex';
        // Small delay for animation
        setTimeout(() => {
            overlay.classList.add('show');
            popup.classList.add('show');
        }, 10);
    }
}

function closePopup() {
    const overlay = document.getElementById('popup-overlay');
    const successPopup = document.getElementById('success-popup');
    const errorPopup = document.getElementById('error-popup');
    
    if (overlay) {
        overlay.classList.remove('show');
        if (successPopup) successPopup.classList.remove('show');
        if (errorPopup) errorPopup.classList.remove('show');
        
        // Hide after animation completes
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }
}

// Close popup when clicking on overlay
document.addEventListener('click', function(e) {
    if (e.target.id === 'popup-overlay') {
        closePopup();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePopup();
    }
});