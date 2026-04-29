const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const navbar = document.querySelector('.navbar');
const scrollProgress = document.getElementById('scrollProgress');
const revealItems = document.querySelectorAll('.reveal');
const tabs = document.querySelectorAll('.tab');
const year = document.getElementById('year');

if (year) {
    year.textContent = String(new Date().getFullYear());
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
html.setAttribute('data-theme', initialTheme);

function updateThemeState(theme) {
    if (!themeToggle) {
        return;
    }

    const isLight = theme === 'light';
    themeToggle.setAttribute('aria-pressed', String(isLight));
}

updateThemeState(initialTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeState(next);
    });
}

let ticking = false;

function handleScroll() {
    if (ticking) {
        return;
    }

    ticking = true;

    requestAnimationFrame(() => {
        const currentScroll = window.scrollY || window.pageYOffset;

        if (navbar) {
            navbar.classList.toggle('scrolled', currentScroll > 12);
        }

        if (scrollProgress) {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const percent = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0;
            scrollProgress.style.width = `${Math.min(percent, 100)}%`;
        }

        ticking = false;
    });
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const delay = Number(entry.target.dataset.delay || 0);
            entry.target.style.transitionDelay = `${delay}ms`;
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
        });
    }, {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px'
    });

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
}

function activateTab(targetId) {
    const panels = document.querySelectorAll('.console-panel');

    tabs.forEach((tab) => {
        const isActive = tab.dataset.target === targetId;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
    });

    panels.forEach((panel) => {
        const isActive = panel.id === targetId;
        panel.classList.toggle('is-active', isActive);
        panel.hidden = !isActive;
    });
}

tabs.forEach((tab) => {
    tab.addEventListener('click', () => activateTab(tab.dataset.target));
});

if (!reduceMotion) {
    window.addEventListener('pointermove', (event) => {
        const x = (event.clientX / window.innerWidth) * 100;
        const y = (event.clientY / window.innerHeight) * 100;
        html.style.setProperty('--glow-x', `${x}%`);
        html.style.setProperty('--glow-y', `${y}%`);
    }, { passive: true });
}
