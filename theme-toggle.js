(function () {
    var toggle = document.querySelector('[data-action="toggle-theme"]');
    var html = document.documentElement;
    var stored = localStorage.getItem('theme');

    if (stored) {
        html.setAttribute('data-theme', stored);
    }

    toggle.addEventListener('click', function () {
        var current = html.getAttribute('data-theme');
        var next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
})();
