document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;

    // 1. Load the saved theme from local storage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        toggle.checked = true; // Make sure the switch looks "ON"
    }

    // 2. Listen for the toggle change
    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
});