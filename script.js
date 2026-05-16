// ── Loader ──
window.addEventListener('load', () => {
    document.getElementById('loader-wrapper').classList.add('hidden');
});

document.addEventListener('DOMContentLoaded', function () {

    // ── Accordion ──
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(btn => {
        btn.addEventListener('click', function () {
            const isActive = this.classList.contains('active');
            // close all
            accordions.forEach(b => {
                b.classList.remove('active');
                const p = b.nextElementSibling;
                if (p && p.classList.contains('panel')) p.style.maxHeight = null;
            });
            // open clicked (if was closed)
            if (!isActive) {
                this.classList.add('active');
                const panel = this.nextElementSibling;
                if (panel && panel.classList.contains('panel')) {
                    panel.style.maxHeight = panel.scrollHeight + 'px';
                }
            }
        });
    });

    // ── Copy buttons ──
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const target = document.getElementById(this.dataset.target);
            if (!target) return;
            navigator.clipboard.writeText(target.innerText).then(() => {
                const orig = this.innerHTML;
                this.innerHTML = '<i class="fa-solid fa-check"></i> Tersalin!';
                this.classList.add('copied');
                setTimeout(() => {
                    this.innerHTML = orig;
                    this.classList.remove('copied');
                }, 2000);
            });
        });
    });

    // ── QRIS overlay ──
    const overlay = document.getElementById('qris-overlay');
    const expandBtn = document.getElementById('qris-expand-btn');

    if (expandBtn && overlay) {
        expandBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        overlay.addEventListener('click', function () {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        });
    }

    // ── Staggered animation on accordion items ──
    accordions.forEach((btn, i) => {
        btn.style.animationDelay = (0.08 + i * 0.06) + 's';
    });

});

// Disable right-click
document.addEventListener('contextmenu', e => e.preventDefault());
