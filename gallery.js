document.addEventListener("DOMContentLoaded", () => {
    const items = Array.from(document.querySelectorAll('.gallery-item'));
    const filterButtons = Array.from(document.querySelectorAll('.filter-button'));

    // Modal
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');

    // ===== FILTR =====
    function filterItems(category) {
        items.forEach(item => {
            const itemCategory = item.dataset.category || '';
            item.style.display = (category === 'all' || itemCategory === category) ? '' : 'none';
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // aktywacja klasy active
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.filter;
            filterItems(category);
        });
    });

    // ===== MODAL =====
    function openModal(item) {
        const description = item.dataset.description || '';
        const video = item.dataset.video || '';

        modalContent.innerHTML = `
            <div class="modal-description">${description}</div>
            ${video ? `<iframe width="100%" height="300" src="${video}" frameborder="0" allowfullscreen></iframe>` : ''}
        `;
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
        modalContent.innerHTML = '';
    }

    items.forEach(item => item.addEventListener('click', () => openModal(item)));

    modalClose.addEventListener('click', closeModal);
    window.addEventListener('click', e => { if(e.target === modal) closeModal(); });
});
