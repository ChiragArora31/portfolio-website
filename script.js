// ===== Theme Toggle Functionality =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Get saved theme from localStorage or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

// Update navbar background based on theme
function updateNavbarTheme() {
    const navbar = document.querySelector('.navbar');
    const currentTheme = html.getAttribute('data-theme');

    if (currentTheme === 'light') {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    }
}

// Initialize navbar theme
updateNavbarTheme();

// Theme toggle event listener
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateNavbarTheme();
    });
}

// ===== Scroll Handlers (Combined for Performance) =====
const navbar = document.querySelector('.navbar');
const scrollProgress = document.getElementById('scrollProgress');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const currentTheme = html.getAttribute('data-theme');

    // Update navbar background on scroll
    if (currentScroll > 50) {
        if (currentTheme === 'light') {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
        }
        navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.1)';
    } else {
        if (currentTheme === 'light') {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        }
        navbar.style.boxShadow = 'none';
    }

    // Update scroll progress bar
    const scrollTop = currentScroll || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    if (scrollProgress) {
        scrollProgress.style.width = scrollPercentage + '%';
    }

    lastScroll = currentScroll;
});

// ===== Intersection Observer for Fade-in Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.blog-card, .project-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ===== Update navbar on theme change =====
// Listen for theme changes and update navbar accordingly
const themeObserver = new MutationObserver(() => {
    updateNavbarTheme();
});

themeObserver.observe(html, {
    attributes: true,
    attributeFilter: ['data-theme']
});

// ===== Console Message =====
console.log('%c👋 Hello! Thanks for checking out my portfolio.', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
console.log('%cWant to see the code? Check out the repository!', 'color: #94a3b8; font-size: 12px;');
