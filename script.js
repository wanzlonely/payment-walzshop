// ── Loader ──
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader-wrapper').classList.add('hidden');
    }, 400);
});

document.addEventListener('DOMContentLoaded', function () {

    // ══════════════════════════════════════
    // PARTICLE CANVAS
    // ══════════════════════════════════════
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W, H, particles = [];

        function resize() {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }

        resize();
        window.addEventListener('resize', resize);

        const COLORS = ['rgba(0,212,255,', 'rgba(139,92,246,', 'rgba(244,114,182,'];

        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                r: Math.random() * 1.2 + 0.3,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                alpha: Math.random() * 0.4 + 0.1,
            });
        }

        function draw() {
            ctx.clearRect(0, 0, W, H);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color + p.alpha + ')';
                ctx.fill();
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = W;
                if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H;
                if (p.y > H) p.y = 0;
            });
            requestAnimationFrame(draw);
        }
        draw();
    }

    // ══════════════════════════════════════
    // PAYMENT TABS
    // ══════════════════════════════════════
    const ptabs   = document.querySelectorAll('.ptab');
    const ppanels = document.querySelectorAll('.pay-panel');

    ptabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.target;
            const isActive = tab.classList.contains('active');

            // Close all
            ptabs.forEach(t => t.classList.remove('active'));
            ppanels.forEach(p => p.classList.remove('active'));

            // If it wasn't active, open it; if it was active, leave it closed (toggle)
            if (!isActive) {
                tab.classList.add('active');
                const panel = document.getElementById(target);
                if (panel) panel.classList.add('active');
            }
        });
    });

    // ══════════════════════════════════════
    // COPY BUTTONS
    // ══════════════════════════════════════
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
            }).catch(() => {
                // Fallback for browsers without clipboard API
                const el = document.createElement('textarea');
                el.value = target.innerText;
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
                const orig = this.innerHTML;
                this.innerHTML = '<i class="fa-solid fa-check"></i> Tersalin!';
                this.classList.add('copied');
                setTimeout(() => { this.innerHTML = orig; this.classList.remove('copied'); }, 2000);
            });
        });
    });

    // ══════════════════════════════════════
    // QRIS OVERLAY
    // ══════════════════════════════════════
    const overlay   = document.getElementById('qris-overlay');
    const expandBtn = document.getElementById('qris-expand-btn');

    if (expandBtn && overlay) {
        expandBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
        overlay.addEventListener('click', function () {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // ══════════════════════════════════════
    // STAGGERED ENTRANCE ANIMATION
    // ══════════════════════════════════════
    const animated = document.querySelectorAll('.svc-card, .product-item');
    animated.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`;
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 300 + i * 40);
    });

});

// Disable right-click
document.addEventListener('contextmenu', e => e.preventDefault());
