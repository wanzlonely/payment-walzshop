// File: testimoni.js

// ==== LOGIKA UNTUK LOADER (MEMPERBAIKI BUG 2) ====
// Ganti 'load' menjadi 'DOMContentLoaded'
// Ini akan menghilangkan loader saat STRUKTUR HALAMAN siap,
// tidak menunggu 100 gambar selesai di-load.
document.addEventListener('DOMContentLoaded', () => {
    const loaderWrapper = document.getElementById('loader-wrapper');
    // Tambahkan class 'hidden' untuk memicu transisi fade-out
    loaderWrapper.classList.add('hidden');
});
// ==== AKHIR LOGIKA LOADER ====


document.addEventListener("DOMContentLoaded", function() {

    // ================================================================
    // ===== DI SINI TEMPAT ANDA MENGISI 100 LINK GAMBAR TESTIMONI =====
    // ================================================================
    
    const testimonialImageLinks = [
        "https://files.catbox.moe/r5fm53.jpg?text=Testi+1",
        "https://files.catbox.moe/lzoaua.jpg?text=Testi+2",
        "https://files.catbox.moe/o8a2z5.jpg?text=Testi+3",
        "https://files.catbox.moe/x6cq8m.jpg?text=Testi+4",
        "https://files.catbox.moe/zh5fka.jpg?text=Testi+5",
        "https://files.catbox.moe/li8vsg.jpg?text=Testi+6",
        "https://files.catbox.moe/5du1cx.jpg?text=Testi+7",
        "https://files.catbox.moe/rwrjmt.jpg?text=Testi+8",
        "https://files.catbox.moe/53ty1u.jpg?text=Testi+9",
        "https://files.catbox.moe/msg2pq.jpg?text=Testi+10",
        "https://files.catbox.moe/43o1v6.jpg?text=Testi+11",
        "https://files.catbox.moe/7ytgjf.jpg?text=Testi+12"
 "https://files.catbox.moe/ygmcje.png?text=Testi+13",
        "https://link-gambar-anda.com?text=Testi+14",
        "https://link-gambar-anda.com?text=Testi+15",
        "https://link-gambar-anda.com?text=Testi+16",
        "https://link-gambar-anda.com?text=Testi+17",
        "https://link-gambar-anda.com?text=Testi+18",
        "https://link-gambar-anda.com?text=Testi+19",
        "https://link-gambar-anda.com?text=Testi+20",
        "https://link-gambar-anda.com?text=Testi+21",
        "https://link-gambar-anda.com?text=Testi+22",
        "https://link-gambar-anda.com?text=Testi+23",
        "https://link-gambar-anda.com?text=Testi+24", 
 "https://link-gambar-anda.com/testi13.jpg?text=Testi+25",
        // "https://link-gambar-anda.com/testi14.jpg",
    ];

    // ================================================================
    // ===== KODE PAGINASI (Sudah dimodifikasi untuk keamanan) =========
    // ================================================================

    const gridContainer = document.getElementById("testimoni-grid");
    const paginationControls = document.getElementById("pagination-controls");
    
    // Atur berapa item (poster) per halaman
    const itemsPerPage = 9; // Tampilkan 9 gambar per halaman
    let currentPage = 1;
    const totalPages = Math.ceil(testimonialImageLinks.length / itemsPerPage);

    function displayTestimonials(page) {
        // Kosongkan grid
        gridContainer.innerHTML = "";
        
        // Atur halaman saat ini
        page = Math.max(1, Math.min(page, totalPages));
        currentPage = page;

        // Hitung item awal dan akhir untuk halaman ini
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, testimonialImageLinks.length);

        // Ambil data untuk halaman ini
        const pageItems = testimonialImageLinks.slice(startIndex, endIndex);

        // Buat kartu untuk setiap item
        if (pageItems.length > 0) {
            pageItems.forEach(link => {
                // MODIFIKASI KEAMANAN: Buat <div>, bukan <img>
                const card = document.createElement("div");
                card.className = "testimoni-card";
                
                // Atur gambar sebagai background-image
                card.style.backgroundImage = `url('${link}')`;

                // Cek jika gambar error (tetap penting)
                const img = new Image();
                img.src = link;
                img.onerror = function() {
                    card.innerHTML = `<div class="placeholder">Gambar Error</div>`;
                    card.style.backgroundImage = 'none'; // Hapus background jika error
                };
                
                gridContainer.appendChild(card);
            });
        } else {
             gridContainer.innerHTML = "<p>Belum ada testimoni.</p>";
        }

        // Update tombol pagination
        setupPaginationControls();
    }

    function setupPaginationControls() {
        paginationControls.innerHTML = "";

        // Tombol "Previous"
        const prevButton = document.createElement("button");
        prevButton.innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;
        prevButton.disabled = (currentPage === 1);
        prevButton.addEventListener("click", () => displayTestimonials(currentPage - 1));
        paginationControls.appendChild(prevButton);

        // Tampilan Nomor Halaman (Contoh: "1 / 4")
        const pageInfo = document.createElement("span");
        pageInfo.className = "page-number";
        pageInfo.textContent = `${currentPage} / ${totalPages}`;
        paginationControls.appendChild(pageInfo);

        // Tombol "Next"
        const nextButton = document.createElement("button");
        nextButton.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;
        nextButton.disabled = (currentPage === totalPages);
        nextButton.addEventListener("click", () => displayTestimonials(currentPage + 1));
        paginationControls.appendChild(nextButton);
    }

    // Tampilkan halaman pertama saat dimuat
    if (testimonialImageLinks.length > 0) {
        displayTestimonials(1);
    } else {
        gridContainer.innerHTML = "<p>Belum ada testimoni untuk ditampilkan.</p>";
        paginationControls.style.display = 'none';
    }
});

// Fitur Keamanan: Nonaktifkan klik kanan di halaman ini
document.addEventListener('contextmenu', event => event.preventDefault());
