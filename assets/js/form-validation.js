document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const requiredFields = form.querySelectorAll('[required]');

    // Remove the required attribute but keep track of which fields are mandatory
    requiredFields.forEach(field => {
        field.removeAttribute('required');
        field.dataset.required = 'true';
    });

    // Add custom validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        let firstInvalidField = null;

        requiredFields.forEach(field => {
            const formGroup = field.closest('.form-group');
            
            // Remove any existing error messages
            const existingError = formGroup.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            if (!field.value.trim()) {
                isValid = false;
                if (!firstInvalidField) firstInvalidField = field;
                
                // Add error styling
                field.style.borderBottom = '2px solid #ff6b6b';
                
                // Create error message
                const errorSpan = document.createElement('span');
                errorSpan.className = 'error-message';
                errorSpan.style.color = '#ff6b6b';
                errorSpan.style.fontSize = '0.8rem';
                errorSpan.style.display = 'block';
                errorSpan.style.marginTop = '5px';
                errorSpan.textContent = 'This field is required';
                formGroup.appendChild(errorSpan);
            } else {
                // Remove error styling if field is valid
                field.style.borderBottom = 'none';
            }
        });

        if (isValid) {
            // If all validations pass, submit the form
            form.submit();
        } else if (firstInvalidField) {
            // Smooth scroll to first invalid field
            firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    // Remove error styling and message when user starts typing
    requiredFields.forEach(field => {
        field.addEventListener('input', function() {
            const formGroup = field.closest('.form-group');
            const errorMessage = formGroup.querySelector('.error-message');
            
            if (errorMessage) {
                errorMessage.remove();
            }
            field.style.borderBottom = 'none';
        });
    });
});