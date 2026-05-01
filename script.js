const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const scrollProgress = document.getElementById('scrollProgress');
const ageCounter = document.getElementById('ageCounter');

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

function updateThemeLabel() {
    if (!themeToggle) {
        return;
    }

    const currentTheme = html.getAttribute('data-theme');
    themeToggle.setAttribute('aria-pressed', String(currentTheme === 'dark'));
    themeToggle.querySelector('.theme-label').textContent = currentTheme === 'dark' ? 'light' : 'dark';
}

updateThemeLabel();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
        updateThemeLabel();
    });
}

function updateScrollProgress() {
    if (!scrollProgress) {
        return;
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const percentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    scrollProgress.style.width = `${Math.min(percentage, 100)}%`;
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

function updateAgeCounter() {
    if (!ageCounter) {
        return;
    }

    const birthDate = new Date(ageCounter.dataset.birthdate);
    const now = new Date();
    const years = (now - birthDate) / (1000 * 60 * 60 * 24 * 365.2425);

    ageCounter.textContent = years.toFixed(9);
}

updateAgeCounter();
setInterval(updateAgeCounter, 100);
