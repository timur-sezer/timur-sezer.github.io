document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const body = document.body;

    /* ---------- Theme toggle ---------- */
    const themeBtn = document.getElementById('themeToggle');
    const themeIcon = themeBtn.querySelector('i');
    const themeLabel = themeBtn.querySelector('span');

    const renderThemeBtn = () => {
        const dark = html.getAttribute('data-bs-theme') === 'dark';
        themeIcon.className = dark ? 'fa fa-sun me-1' : 'fa fa-moon me-1';
        themeLabel.textContent = dark ? 'Light mode' : 'Dark mode';
    };
    renderThemeBtn();

    themeBtn.addEventListener('click', () => {
        const next = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-bs-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
        renderThemeBtn();
    });

    /* ---------- Mobile menu ---------- */
    const menuBtn = document.getElementById('menuToggle');
    const setMenu = (open) => {
        body.classList.toggle('menu-open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.querySelector('i').className = open ? 'fa fa-xmark' : 'fa fa-bars';
    };
    menuBtn.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
    document.getElementById('sidebarBackdrop').addEventListener('click', () => setMenu(false));
    document.querySelectorAll('#sidebar .nav-link').forEach((a) =>
        a.addEventListener('click', () => setMenu(false))
    );
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

    /* ---------- Active nav link on scroll ---------- */
    const links = new Map(
        [...document.querySelectorAll('#sidebar .nav-link')].map((a) => [a.hash.slice(1), a])
    );
    const spy = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((a) => a.classList.remove('active'));
            links.get(entry.target.id)?.classList.add('active');
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

    /* ---------- Reveal + progress bars ---------- */
    const reveal = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            entry.target.querySelectorAll('.progress-bar[data-width]').forEach((bar) => {
                bar.style.width = bar.dataset.width + '%';
            });
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => reveal.observe(el));

    /* ---------- Back-to-top button ---------- */
    const toTop = document.getElementById('toTop');
    const onScroll = () => toTop.classList.toggle('show', window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    toTop.addEventListener('click', () => window.scrollTo({ top: 0 }));

    /* ---------- Typing effect ---------- */
    const typed = document.getElementById('typed');
    const words = ['Computer Vision', 'Robotics', 'UAV Systems', 'CAD Design'];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (typed && !reduced) {
        let w = 0, i = words[0].length, deleting = true;
        const tick = () => {
            let delay;
            if (deleting) {
                i--;
                delay = 45;
                if (i === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
            } else {
                i++;
                delay = 90;
                if (i === words[w].length) { deleting = true; delay = 1800; }
            }
            typed.textContent = words[w].slice(0, i);
            setTimeout(tick, delay);
        };
        setTimeout(tick, 2000);
    }

    /* ---------- Year ---------- */
    document.querySelectorAll('.year').forEach((el) => (el.textContent = new Date().getFullYear()));
});
