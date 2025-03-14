document.addEventListener('DOMContentLoaded', function() {
    const prefersColorSchema = window.matchMedia('(prefers-color-scheme: dark)');

    setTheme(prefersColorSchema.matches ? 'dark' : 'light');
    
    prefersColorSchema.addEventListener('change', e => {
        setTheme(e.matches ? 'dark' : 'light');
    });
});

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}