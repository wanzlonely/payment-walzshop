// Loader
document.addEventListener('DOMContentLoaded', () => {
    const loaderWrapper = document.getElementById('loader-wrapper');
    if (loaderWrapper) loaderWrapper.classList.add('hidden');
});

document.addEventListener("DOMContentLoaded", function () {

    // ================================================================
    // DAFTAR LINK GAMBAR TESTIMONI — ISI DI SINI
    // ================================================================
    const testimonialImageLinks = [
        "https://files.catbox.moe/r5fm53.jpg",
        "https://files.catbox.moe/lzoaua.jpg",
        "https://files.catbox.moe/o8a2z5.jpg",
        "https://files.catbox.moe/x6cq8m.jpg",
        "https://files.catbox.moe/zh5fka.jpg",
        "https://files.catbox.moe/li8vsg.jpg",
        "https://files.catbox.moe/5du1cx.jpg",
        "https://files.catbox.moe/rwrjmt.jpg",
        "https://files.catbox.moe/53ty1u.jpg",
        "https://files.catbox.moe/msg2pq.jpg",
        "https://files.catbox.moe/43o1v6.jpg",
        "https://files.catbox.moe/7ytgjf.jpg",
        "https://files.catbox.moe/ge8727.jpg",
        "https://files.catbox.moe/epfi8x.jpg",
        "https://files.catbox.moe/zese4v.jpg",
        "https://files.catbox.moe/te50p9.jpg",
        "https://files.catbox.moe/4oizrl.jpg",
        "https://files.catbox.moe/rvjsn5.jpg",
        "https://files.catbox.moe/ygmcje.png",
        // Tambah link baru di sini:
    ];
    // ================================================================

    const gridContainer      = document.getElementById("testimoni-grid");
    const paginationControls = document.getElementById("pagination-controls");

    const itemsPerPage  = 9;
    let   currentPage   = 1;
    const totalPages    = Math.ceil(testimonialImageLinks.length / itemsPerPage);

    function displayTestimonials(page) {
        gridContainer.innerHTML = "";
        page        = Math.max(1, Math.min(page, totalPages || 1));
        currentPage = page;

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex   = Math.min(startIndex + itemsPerPage, testimonialImageLinks.length);
        const pageItems  = testimonialImageLinks.slice(startIndex, endIndex);

        if (pageItems.length > 0) {
            pageItems.forEach((link, idx) => {
                const card = document.createElement("div");
                card.className = "testimoni-card";
                card.style.animationDelay = (idx * 0.04) + 's';

                // Use background-image for security (no right-click save)
                card.style.backgroundImage = `url('${link}')`;

                const img   = new Image();
                img.src     = link;
                img.onerror = function () {
                    card.innerHTML =
                        `<div class="placeholder">
                            <i class="fa-solid fa-image-slash"></i>
                            <span>Gambar tidak tersedia</span>
                        </div>`;
                    card.style.backgroundImage = 'none';
                };

                gridContainer.appendChild(card);
            });
        } else {
            gridContainer.innerHTML =
                `<p style="color:rgba(226,232,248,0.4);font-size:0.85rem;text-align:center;grid-column:1/-1;padding:40px 0;">
                    Belum ada testimoni untuk ditampilkan.
                </p>`;
        }

        setupPaginationControls();
    }

    function setupPaginationControls() {
        paginationControls.innerHTML = "";

        const prevBtn     = document.createElement("button");
        prevBtn.innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;
        prevBtn.disabled  = (currentPage === 1);
        prevBtn.addEventListener("click", () => {
            displayTestimonials(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationControls.appendChild(prevBtn);

        const pageInfo       = document.createElement("span");
        pageInfo.className   = "page-number";
        pageInfo.textContent = `${currentPage} / ${Math.max(1, totalPages)}`;
        paginationControls.appendChild(pageInfo);

        const nextBtn     = document.createElement("button");
        nextBtn.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;
        nextBtn.disabled  = (currentPage === totalPages || totalPages === 0);
        nextBtn.addEventListener("click", () => {
            displayTestimonials(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationControls.appendChild(nextBtn);
    }

    if (testimonialImageLinks.length > 0) {
        displayTestimonials(1);
    } else {
        gridContainer.innerHTML =
            `<p style="color:rgba(226,232,248,0.4);font-size:0.85rem;grid-column:1/-1;padding:40px 0;text-align:center;">
                Belum ada testimoni untuk ditampilkan.
            </p>`;
        paginationControls.style.display = 'none';
    }
});

// Disable right-click
document.addEventListener('contextmenu', e => e.preventDefault());
