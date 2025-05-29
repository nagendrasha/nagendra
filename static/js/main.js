// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize project filtering on the projects page
    initProjectFilters();
    
    // Initialize project search functionality
    initProjectSearch();
    
    // Add smooth scrolling for anchor links
    initSmoothScroll();
    
    // Add animation to elements when they come into view
    initScrollAnimations();
    
    // Initialize form validation
    initFormValidation();
});

// Project filtering functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            const projectItems = document.querySelectorAll('.project-item');
            
            projectItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Project search functionality
function initProjectSearch() {
    const searchInput = document.getElementById('projectSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('keyup', function() {
        const searchValue = this.value.toLowerCase();
        const projectItems = document.querySelectorAll('.project-item');
        
        projectItems.forEach(item => {
            const title = item.querySelector('.card-title').textContent.toLowerCase();
            const description = item.querySelector('.card-text').textContent.toLowerCase();
            
            if (title.includes(searchValue) || description.includes(searchValue)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed navbar
                behavior: 'smooth'
            });
        });
    });
}

// Add animation to elements when they come into view
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Form validation for contact form
function initFormValidation() {
    const contactForm = document.querySelector('form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Get form fields
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Validate name
        if (nameInput && nameInput.value.trim() === '') {
            showError(nameInput, 'Please enter your name');
            isValid = false;
        } else if (nameInput) {
            removeError(nameInput);
        }
        
        // Validate email
        if (emailInput && emailInput.value.trim() === '') {
            showError(emailInput, 'Please enter your email');
            isValid = false;
        } else if (emailInput && !isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else if (emailInput) {
            removeError(emailInput);
        }
        
        // Validate message
        if (messageInput && messageInput.value.trim() === '') {
            showError(messageInput, 'Please enter your message');
            isValid = false;
        } else if (messageInput) {
            removeError(messageInput);
        }
        
        // If form is not valid, prevent submission
        if (!isValid) {
            e.preventDefault();
        }
    });
}

// Helper function to show error message
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.invalid-feedback') || document.createElement('div');
    
    errorElement.className = 'invalid-feedback';
    errorElement.textContent = message;
    
    if (!formGroup.querySelector('.invalid-feedback')) {
        formGroup.appendChild(errorElement);
    }
    
    input.classList.add('is-invalid');
}

// Helper function to remove error message
function removeError(input) {
    input.classList.remove('is-invalid');
    const errorElement = input.parentElement.querySelector('.invalid-feedback');
    if (errorElement) {
        errorElement.remove();
    }
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}