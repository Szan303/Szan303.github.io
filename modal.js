document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const body = document.body;

    // Tworzymy overlay oraz modal
    const overlay = document.createElement('div');
    overlay.id = 'modal-overlay';
    Object.assign(overlay.style, {
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        background: 'rgba(0,0,0,0.7)',
        display: 'none', justifyContent: 'center', alignItems: 'center',
        zIndex: 1000
    });

    const modal = document.createElement('div');
    modal.id = 'modal';
    Object.assign(modal.style, {
        background: 'var(--surface)', borderRadius: 'var(--radius)',
        maxWidth: '90%', maxHeight: '90%', overflowY: 'auto',
        position: 'relative', padding: '1rem'
    });

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✖';
    Object.assign(closeBtn.style, {
        position: 'absolute', top: '8px', right: '8px',
        background: 'none', border: 'none', color: 'var(--text)',
        fontSize: '1.5rem', cursor: 'pointer'
    });

    modal.appendChild(closeBtn);
    overlay.appendChild(modal);
    body.appendChild(overlay);

    // Otwarcie modal na klik zdjęcia
    gallery.addEventListener('click', e => {
        const item = e.target.closest('.gallery-item');
        if (!item) return;

        const imgSrc = item.querySelector('img').src;
        const title  = item.querySelector('h4').textContent;
        const desc   = item.dataset.description || 'Brak opisu.';
        const video  = item.dataset.video; // np. "https://www.youtube.com/embed/VIDEO_ID"

        // Wyczyść modal i dołącz przycisk zamykania
        modal.innerHTML = '';
        modal.appendChild(closeBtn);

        // Nagłówek
        const h2 = document.createElement('h2');
        h2.textContent = title;
        h2.style.color = 'var(--accent)';
        modal.appendChild(h2);

        // Obrazek
        const img = document.createElement('img');
        img.src = imgSrc;
        Object.assign(img.style, { width: '100%', borderRadius: 'var(--radius)', marginBottom: '1rem' });
        modal.appendChild(img);

        // Opis
        const p = document.createElement('p');
        p.innerHTML = desc;               // <-- pozwala na <br> i inne tagi HTML
        p.style.color = 'var(--text)';
        modal.appendChild(p);

        // Ładowanie wideo lub przycisk do dodania
        if (video) {
            const iframe = document.createElement('iframe');
            iframe.src = video;
            Object.assign(iframe, {
                width: '560', height: '315', frameBorder: '0',
                allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                allowFullscreen: true
            });
            Object.assign(iframe.style, { width: '100%', maxWidth: '560px', margin: '1rem auto', display: 'block' });
            modal.appendChild(iframe);

        } else {
            const btn = document.createElement('button');
            btn.textContent = 'Dodaj wideo';
            Object.assign(btn.style, {
                marginTop: '1rem', padding: '0.5rem 1rem',
                background: 'var(--accent)', color: 'var(--bg)',
                border: 'none', borderRadius: 'var(--radius)', cursor: 'pointer'
            });
            btn.addEventListener('click', () => {
                const url = prompt('Wklej URL filmu YouTube (embed lub link):');
                if (!url) return;
                const embed = url.includes('embed/')
                    ? url
                    : url.replace('watch?v=', 'embed/');
                const iframe = document.createElement('iframe');
                iframe.src = embed;
                Object.assign(iframe, {
                    width: '560', height: '315', frameBorder: '0',
                    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                    allowFullscreen: true
                });
                Object.assign(iframe.style, { width: '100%', maxWidth: '560px', margin: '1rem auto', display: 'block' });
                modal.appendChild(iframe);
                btn.remove();
            });
            modal.appendChild(btn);
        }

        overlay.style.display = 'flex';
        body.style.overflow = 'hidden';
    });

    // Zamknięcie modal
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeModal();
    });

    function closeModal() {
        overlay.style.display = 'none';
        body.style.overflow = '';
    }
});