// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Zakładam, że każdy element otwierający modal ma klasę .js-open-modal
    // i atrybut data-modal-content z HTML-em lub tekstem, który chcemy pokazać.
    const triggers = document.querySelectorAll('.js-open-modal')

    triggers.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            const html = btn.getAttribute('data-modal-content') || '<p>Brak zawartości</p>'
            window.openModal(html)
        })
    })
})