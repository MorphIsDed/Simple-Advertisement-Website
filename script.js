// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

// Smooth Scroll for older browsers (optional)
const smoothScroll = (target, duration) => {
    const targetEl = document.querySelector(target);
    const targetPosition = targetEl.getBoundingClientRect().top - 60;
    const startPosition = window.pageYOffset;
    let startTime = null;

    const ease = (t, b, c, d) => {
        t /= d/2;
        if(t <1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) -1) + b;
    }

    const animation = currentTime => {
        if(startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0, run);
        if(timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        smoothScroll(this.getAttribute('href'), 1000);
        // Close the mobile menu after clicking
        if(navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        }
    });
});

// Scroll Progress Bar
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Initialize Swiper.js for Testimonials
const swiper = new Swiper('.swiper-container', {
    loop: true,
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    // Change icon
    themeToggle.innerHTML = body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Form Validation

// Select the form and its input elements
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Create error message elements
const createErrorMessage = (input, message) => {
    let error = input.parentElement.querySelector('.error-message');
    if (!error) {
        error = document.createElement('small');
        error.classList.add('error-message');
        input.parentElement.appendChild(error);
    }
    error.innerText = message;
    input.classList.add('invalid');
}

const clearErrorMessage = (input) => {
    let error = input.parentElement.querySelector('.error-message');
    if (error) {
        error.innerText = '';
    }
    input.classList.remove('invalid');
}

// Validate Name
const validateName = () => {
    const nameValue = nameInput.value.trim();
    if (nameValue === '') {
        createErrorMessage(nameInput, 'Name is required.');
        return false;
    } else if (nameValue.length < 2) {
        createErrorMessage(nameInput, 'Name must be at least 2 characters.');
        return false;
    } else {
        clearErrorMessage(nameInput);
        return true;
    }
}

// Validate Email
const validateEmail = () => {
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === '') {
        createErrorMessage(emailInput, 'Email is required.');
        return false;
    } else if (!emailRegex.test(emailValue)) {
        createErrorMessage(emailInput, 'Please enter a valid email address.');
        return false;
    } else {
        clearErrorMessage(emailInput);
        return true;
    }
}

// Validate Message
const validateMessage = () => {
    const messageValue = messageInput.value.trim();
    if (messageValue === '') {
        createErrorMessage(messageInput, 'Message is required.');
        return false;
    } else if (messageValue.length < 10) {
        createErrorMessage(messageInput, 'Message must be at least 10 characters.');
        return false;
    } else {
        clearErrorMessage(messageInput);
        return true;
    }
}

// Add event listeners for real-time validation
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);

// Handle form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
        // For demonstration, we'll just log the values
        console.log('Form Submitted:', {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        });
        alert('Thank you for your message! We will get back to you shortly.');

        // Reset the form and clear any error messages
        contactForm.reset();
        clearErrorMessage(nameInput);
        clearErrorMessage(emailInput);
        clearErrorMessage(messageInput);
    } else {
        // Focus the first invalid input
        const firstInvalid = document.querySelector('.invalid');
        if (firstInvalid) {
            firstInvalid.focus();
        }
    }
});