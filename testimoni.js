// ==== LOGIKA UNTUK LOADER (PERBAIKAN BUG 2: LOADER MACET) ====
// Di halaman ini, kita pakai 'DOMContentLoaded', BUKAN 'load'.
// 'DOMContentLoaded' = "jalankan segera setelah HTML siap".
// KENAPA? Karena halaman ini mungkin memuat 100 gambar. Jika kita pakai 'load',
// loader akan macet menunggu 100 gambar selesai di-download.
// Dengan 'DOMContentLoaded', loader akan hilang duluan, dan gambar-gambar
// akan muncul belakangan (itu tidak masalah).
document.addEventListener('DOMContentLoaded', () => {
    const loaderWrapper = document.getElementById('loader-wrapper');
    loaderWrapper.classList.add('hidden');
});
// ==== AKHIR LOGIKA LOADER ====


// Ini adalah listener kedua yang menjalankan semua fungsi utama halaman
document.addEventListener("DOMContentLoaded", function() {

    // ================================================================
    // ===== DI SINI TEMPAT ANDA MENGISI LINK GAMBAR TESTIMONI =====
    // ================================================================
    // Ini adalah "Array" (daftar) dari semua link gambar Anda.
    // PENTING: Pastikan setiap link diapit tanda kutip " "
    // DAN diakhiri dengan KOMA (,)
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
        "https://files.catbox.moe/7ytgjf.jpg?text=Testi+12",
        "https://files.catbox.moe/ge8727.jpg?text=Testi+13",
        "https://files.catbox.moe/epfi8x.jpg?text=Testi+14",
        "https://files.catbox.moe/ygmcje.png?text=Testi+15",
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
        // Anda bisa tambahkan link baru di sini
    ];
    // ================================================================

    // Ambil elemen HTML tempat kita akan menaruh gambar
    const gridContainer = document.getElementById("testimoni-grid");
    // Ambil elemen HTML tempat kita menaruh tombol navigasi (1 / 12)
    const paginationControls = document.getElementById("pagination-controls");

    // === PENGATURAN PAGINASI (HALAMAN) ===
    // Atur berapa gambar yang tampil dalam satu halaman
    const itemsPerPage = 9; 
    // Halaman saat ini (dimulai dari 1)
    let currentPage = 1;
    // Hitung total halaman yang dibutuhkan.
    // Math.ceil() = "bulatkan ke atas"
    // (Contoh: 25 gambar / 9 per halaman = 2.77 -> dibulatkan jadi 3 halaman)
    const totalPages = Math.ceil(testimonialImageLinks.length / itemsPerPage);

    // Ini adalah FUNGSI UTAMA untuk menampilkan gambar
    function displayTestimonials(page) {
        // 1. Setiap kali fungsi dipanggil, KOSONGKAN dulu grid-nya
        gridContainer.innerHTML = "";

        // 2. Pastikan nomor halaman tidak kurang dari 1 atau lebih dari total
        page = Math.max(1, Math.min(page, totalPages));
        currentPage = page; // Simpan halaman saat ini

        // 3. Hitung indeks (urutan) gambar
        const startIndex = (page - 1) * itemsPerPage; // (Halaman 2 - 1) * 9 = 9
        const endIndex = Math.min(startIndex + itemsPerPage, testimonialImageLinks.length); // 9 + 9 = 18

        // 4. Ambil hanya data gambar untuk halaman ini (misal, gambar ke 9-18)
        const pageItems = testimonialImageLinks.slice(startIndex, endIndex);

        // 5. Cek apakah ada gambar untuk halaman ini
        if (pageItems.length > 0) {
            // 6. Loop untuk setiap link gambar di 'pageItems'
            pageItems.forEach(link => {
                // 7. Buat 'div' baru untuk kartu
                const card = document.createElement("div");
                card.className = "testimoni-card";
                
                // 8. FITUR KEAMANAN: Set gambar sebagai background-image
                //    Ini membuat orang tidak bisa "klik kanan > save image"
                card.style.backgroundImage = `url('${link}')`;

                // 9. Cek apakah link gambar valid (tidak error)
                const img = new Image(); // Buat gambar virtual
                img.src = link;
                img.onerror = function() {
                    // 10. Jika gambar GAGAL dimuat (link rusak/error)
                    card.innerHTML = `<div class="placeholder">Gambar Error</div>`;
                    card.style.backgroundImage = 'none'; // Hapus background
                };

                // 11. Masukkan kartu yang sudah jadi ke grid
                gridContainer.appendChild(card);
            });
        } else {
             // 12. Jika tidak ada testimoni sama sekali
             gridContainer.innerHTML = "<p>Belum ada testimoni.</p>";
        }

        // 13. Setelah gambar tampil, update tombol navigasi (misal: "2 / 12")
        setupPaginationControls();
    }

    // Ini FUNGSI untuk MEMBUAT TOMBOL navigasi (Previous / Next)
    function setupPaginationControls() {
        // 1. Kosongkan dulu tombol navigasi yang lama
        paginationControls.innerHTML = "";

        // 2. Buat tombol "Previous" (<)
        const prevButton = document.createElement("button");
        prevButton.innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;
        // 3. Nonaktifkan tombol jika kita ada di halaman pertama
        prevButton.disabled = (currentPage === 1);
        // 4. Saat diklik, panggil ulang fungsi displayTestimonials untuk halaman sebelumnya
        prevButton.addEventListener("click", () => displayTestimonials(currentPage - 1));
        paginationControls.appendChild(prevButton);

        // 5. Buat teks "Halaman X / Y"
        const pageInfo = document.createElement("span");
        pageInfo.className = "page-number";
        const displayTotalPages = Math.max(1, totalPages); // Pastikan minimal 1 halaman
        pageInfo.textContent = `${currentPage} / ${displayTotalPages}`;
        paginationControls.appendChild(pageInfo);

        // 6. Buat tombol "Next" (>)
        const nextButton = document.createElement("button");
        nextButton.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;
        // 7. Nonaktifkan tombol jika kita ada di halaman terakhir
        nextButton.disabled = (currentPage === totalPages || totalPages === 0);
        // 8. Saat diklik, panggil ulang fungsi displayTestimonials untuk halaman berikutnya
        nextButton.addEventListener("click", () => displayTestimonials(currentPage + 1));
        paginationControls.appendChild(nextButton);
    }

    // === PERTAMA KALI HALAMAN DIBUKA ===
    // 1. Cek apakah ada link di dalam daftar
    if (testimonialImageLinks.length > 0) {
        // 2. Jika ada, panggil fungsi untuk menampilkan Halaman 1
        displayTestimonials(1);
    } else {
        // 3. Jika daftar kosong, tampilkan pesan
        gridContainer.innerHTML = "<p>Belum ada testimoni untuk ditampilkan.</p>";
        paginationControls.style.display = 'none'; // Sembunyikan navigasi
    }
});

// Fitur Keamanan: Nonaktifkan klik kanan di halaman ini
document.addEventListener('contextmenu', event => event.preventDefault());
