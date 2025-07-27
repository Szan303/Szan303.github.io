const input = document.getElementById('search');
const items = Array.from(document.querySelectorAll('.gallery-item'));

if (!input || items.length === 0) {
    console.warn('search.js: Brak #search lub .gallery-item w DOM');
} else {
    input.addEventListener('input', e => {
        const query = e.target.value.trim().toLowerCase();
        items.forEach(item => {
            const title = item.querySelector('h4')?.textContent.toLowerCase() || '';
            item.style.display = title.includes(query) ? '' : 'none';
        });
    });
}
