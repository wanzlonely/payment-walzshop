// ==== LOGIKA UNTUK LOADER ====
// window.addEventListener('load', ...) berarti "tunggu sampai SEMUA aset
// (gambar, css, font) selesai di-download, BARU jalankan kodenya".
// Ini bagus untuk halaman utama agar semua gambar (logo, qris) siap.
window.addEventListener('load', () => {
    // 1. Cari elemen loader-wrapper di HTML
    const loaderWrapper = document.getElementById('loader-wrapper');
    // 2. Tambahkan kelas CSS 'hidden'. Di loader.css, kelas .hidden
    //    akan membuatnya transparan (fade out) dan menghilang.
    loaderWrapper.classList.add('hidden');
});
// ==== AKHIR LOGIKA LOADER ====

// document.addEventListener("DOMContentLoaded", ...) berarti "jangan tunggu gambar,
// jalankan kode ini segera setelah struktur HTML-nya siap".
document.addEventListener("DOMContentLoaded", function() {

    // ==== LOGIKA ACCORDION (PERBAIKAN BUG 3: OTOMATIS MENUTUP) ====
    // 1. Ambil SEMUA tombol accordion yang ada di halaman
    var acc = document.getElementsByClassName("accordion");

    // 2. Loop (ulangi) untuk setiap tombol yang ditemukan
    for (var i = 0; i < acc.length; i++) {
        // 3. Tambahkan "pendengar" klik ke setiap tombol
        acc[i].addEventListener("click", function() {
            
            // --- INI ADALAH BAGIAN PERBAIKAN BUG 3 ---
            // 4. Sebelum membuka yang baru, kita tutup dulu SEMUA panel lain
            var allAccordions = document.getElementsByClassName('accordion');
            for (var j = 0; j < allAccordions.length; j++) {
                // 5. Cek: "jika tombol ini BUKAN tombol yang SAYA KLIK (this),
                //    DAN tombol ini sedang 'active' (terbuka)"
                if (this !== allAccordions[j] && allAccordions[j].classList.contains('active')) {
                    // 6. Hapus kelas 'active' (menghilangkan style)
                    allAccordions[j].classList.remove('active');
                    // 7. Ambil panel di bawahnya dan tutup (set max-height ke null)
                    var panelToClose = allAccordions[j].nextElementSibling;
                    panelToClose.style.maxHeight = null;
                }
            }
            // --- AKHIR PERBAIKAN BUG 3 ---

            // 8. Sekarang, baru kita urus tombol yang TADI DIKLIK
            //    Toggle (nyalakan/matikan) kelas 'active' pada tombol yang diklik
            this.classList.toggle("active");
            
            // 9. Ambil panel yang ada tepat di bawah tombol ini
            var panel = this.nextElementSibling;
            
            // 10. Cek: Jika panel sedang terbuka (punya maxHeight),
            if (panel.style.maxHeight) {
                // 11. ...maka tutup (set ke null).
                panel.style.maxHeight = null;
            } else {
                // 12. ...jika sedang tertutup, buka (set maxHeight sesuai tinggi kontennya)
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }

    // ==== LOGIKA TOMBOL COPY ====
    // 1. Ambil SEMUA tombol yang punya kelas 'copy-btn'
    var copyButtons = document.getElementsByClassName("copy-btn");
    for (var i = 0; i < copyButtons.length; i++) {
        // 2. Tambahkan "pendengar" klik
        copyButtons[i].addEventListener("click", function(e) {
            // 3. PENTING: Mencegah event "klik" ini menyebar ke atas (ke accordion).
            //    Tanpa ini, mengklik "Copy" akan dianggap mengklik accordion,
            //    sehingga panelnya akan tertutup.
            e.stopPropagation(); 
            
            // 4. Ambil ID target (misal 'dana-number') dari atribut 'data-target'
            var targetId = this.getAttribute("data-target");
            // 5. Cari elemen berdasarkan ID itu
            var targetElement = document.getElementById(targetId);
            // 6. Ambil teks (nomor) di dalam elemen itu
            var textToCopy = targetElement.innerText;

            // 7. Gunakan API Clipboard modern untuk menyalin teks
            navigator.clipboard.writeText(textToCopy).then(() => {
                // 8. Jika BERHASIL:
                var originalText = this.innerHTML; // Simpan teks asli tombol
                this.innerHTML = '<i class="fa-solid fa-check"></i> Copied!'; // Ubah teks tombol
                // 9. Kembalikan teks tombol ke semula setelah 2 detik
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            }).catch(err => {
                // 10. Jika GAGAL (misal di browser lama):
                console.error('Gagal menyalin teks: ', err);
            });
        });
    }

    // ==== LOGIKA TOMBOL PERBESAR QRIS (PERBAIKAN BUG 1) ====
    // 1. Ambil satu tombol spesifik (action-btn di dalam qris-card)
    var perbesarQrisBtn = document.querySelector(".qris-card .action-btn");
    if (perbesarQrisBtn) { // Cek apakah tombolnya ada
        // 2. Tambahkan "pendengar" klik
        perbesarQrisBtn.addEventListener("click", function(e) {
            // 3. (Sama seperti tombol copy) Hentikan event agar panel tidak tertutup
            e.stopPropagation(); 
            
            // 4. Buat elemen 'div' baru secara virtual (di memori)
            var overlay = document.createElement('div');
            // 5. Beri style agar 'div' ini menutupi seluruh layar
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)'; // Hitam transparan
            overlay.style.display = 'flex'; // Agar gambar di tengah
            overlay.style.justifyContent = 'center'; // Tengah horizontal
            overlay.style.alignItems = 'center';     // Tengah vertikal
            overlay.style.zIndex = '10000'; // Pastikan di atas segalanya
            overlay.style.cursor = 'pointer'; // Kursor jadi tangan

            // 6. Ambil gambar QRIS yang ada di halaman
            var qrisImg = document.querySelector(".qris-image");
            // 7. DUPLIKAT (clone) gambar tersebut
            var imgClone = qrisImg.cloneNode();
            // 8. Beri style pada DUPLIKAT-nya agar terlihat besar
            imgClone.style.width = '90%';
            imgClone.style.maxWidth = '400px';
            imgClone.style.maxHeight = '90vh';
            imgClone.style.objectFit = 'contain';

            // 9. Masukkan gambar DUPLIKAT ke dalam overlay
            overlay.appendChild(imgClone);
            
            // 10. Tambahkan "pendengar" klik PADA OVERLAY itu sendiri
            overlay.addEventListener('click', function() {
                // 11. Jika overlay diklik, HAPUS overlay dari halaman
                document.body.removeChild(overlay);
            });

            // 12. Terakhir, tambahkan overlay yang sudah jadi ini ke 'body' HTML
            document.body.appendChild(overlay);
        });
    }

});

// ==== FITUR KEAMANAN: NONAKTIFKAN KLIK KANAN ====
// 1. Tambahkan "pendengar" untuk event 'contextmenu' (klik kanan)
// 2. 'event.preventDefault()' artinya "batalkan aksi default"
//    (aksi default-nya adalah memunculkan menu klik kanan)
document.addEventListener('contextmenu', event => event.preventDefault());
