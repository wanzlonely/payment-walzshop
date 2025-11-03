// File: script.js

// ==== LOGIKA UNTUK LOADER ====
// Menunggu semua konten (gambar, css, dll) dimuat penuh
window.addEventListener('load', () => {
    const loaderWrapper = document.getElementById('loader-wrapper');
    // Tambahkan class 'hidden' untuk memicu transisi fade-out
    loaderWrapper.classList.add('hidden');
});
// ==== AKHIR LOGIKA LOADER ====

// Menunggu struktur HTML siap
document.addEventListener("DOMContentLoaded", function() {

    // Logika untuk Accordion (MEMPERBAIKI BUG 3)
    var acc = document.getElementsByClassName("accordion");
    for (var i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            // Tutup semua panel lain terlebih dahulu
            var allPanels = document.getElementsByClassName('panel');
            var allAccordions = document.getElementsByClassName('accordion');
            
            for (var j = 0; j < allAccordions.length; j++) {
                // Jika bukan panel yang diklik, dan sedang aktif, tutup panel itu
                if (this !== allAccordions[j] && allAccordions[j].classList.contains('active')) {
                    allAccordions[j].classList.remove('active');
                    var panelToClose = allAccordions[j].nextElementSibling;
                    panelToClose.style.maxHeight = null;
                }
            }

            // Sekarang, toggle panel yang baru saja diklik
            this.classList.toggle("active");
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
        copyButtons[i].addEventListener("click", function(e) {
            e.stopPropagation(); // Mencegah accordion tertutup saat tombol copy diklik
            var targetId = this.getAttribute("data-target");
            var targetElement = document.getElementById(targetId);
            var textToCopy = targetElement.innerText;

            navigator.clipboard.writeText(textToCopy).then(() => {
                var originalText = this.innerHTML;
                this.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Gagal menyalin teks: ', err);
            });
        });
    }

    // Logika untuk Tombol Perbesar Qris (MEMPERBAIKI BUG 1)
    var perbesarQrisBtn = document.querySelector(".qris-card .action-btn");
    if (perbesarQrisBtn) {
        perbesarQrisBtn.addEventListener("click", function(e) {
            e.stopPropagation(); // Mencegah accordion tertutup
            
            // Buat overlay
            var overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = '10000';
            overlay.style.cursor = 'pointer';

            // Ambil gambar qris
            var qrisImg = document.querySelector(".qris-image");
            var imgClone = qrisImg.cloneNode();
            imgClone.style.width = '90%';
            imgClone.style.maxWidth = '400px';
            imgClone.style.maxHeight = '90vh';
            imgClone.style.objectFit = 'contain';

            overlay.appendChild(imgClone);
            
            // Klik overlay untuk menutup
            overlay.addEventListener('click', function() {
                document.body.removeChild(overlay);
            });

            document.body.appendChild(overlay);
        });
    }

});

// Fitur Keamanan: Nonaktifkan klik kanan di halaman ini
document.addEventListener('contextmenu', event => event.preventDefault());
