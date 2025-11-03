// File: script.js

// ==== LOGIKA UNTUK LOADER ====
// Menunggu semua konten (gambar, css, dll) dimuat penuh
window.addEventListener('load', () => {
    const loaderWrapper = document.getElementById('loader-wrapper');
    // Tambahkan class 'hidden' untuk memicu transisi fade-out
    loaderWrapper.classList.add('hidden');
});
// ==== AKHIR LOGIKA LOADER ====


document.addEventListener("DOMContentLoaded", function() {

    // Logika untuk Accordion
    var acc = document.getElementsByClassName("accordion");
    for (var i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            /* Toggle antara menambah/menghapus class "active" */
            this.classList.toggle("active");

            /* Toggle antara menyembunyikan dan menampilkan panel */
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }

    // Logika untuk Tombol Copy
    var copyButtons = document.getElementsByClassName("copy-btn");
    for (var i = 0; i < copyButtons.length; i++) {
        copyButtons[i].addEventListener("click", function() {
            var targetId = this.getAttribute("data-target");
            var targetElement = document.getElementById(targetId);
            var textToCopy = targetElement.innerText;

            // Menggunakan API Clipboard modern
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Berhasil di-copy
                var originalText = this.innerHTML;
                this.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                
                // Kembali ke teks semula setelah 2 detik
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);

            }).catch(err => {
                console.error('Gagal menyalin teks: ', err);
                alert('Gagal menyalin nomor.');
            });
        });
    }
});

// Fitur Keamanan: Nonaktifkan klik kanan di halaman ini
document.addEventListener('contextmenu', event => event.preventDefault());
