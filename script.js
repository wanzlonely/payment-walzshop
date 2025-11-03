// script.js — logic for testimoni.html (all data inside here)
// Features: 100 slots (string URL or false), pagination, loading dinosaurus, anti-copy protections

(function(){
  const perPage = 9; // 3x3 grid
  // ====== 100 slots: put URL string to enable, or false to keep placeholder ======
  const testimonials = [
    // example active few, rest false (you can replace any false with actual URL)
    "https://via.placeholder.com/900x460.png?text=Testimoni+1",
    "https://via.placeholder.com/900x460.png?text=Testimoni+2",
    "https://via.placeholder.com/900x460.png?text=Testimoni+3",
    false,false,false,false,false,false,false,
    false,false,false,false,false,false,false,false,false,false,false,
    false,false,false,false,false,false,false,false,false,false,
    false,false,false,false,false,false,false,false,false,false,
    false,false,false,false,false,false,false,false,false,false,
    false,false,false,false,false,false,false,false,false,false,
    false,false,false,false,false,false,false,false,false,false,
    false,false,false,false,false,false,false,false,false,false,
    false,false,false,false,false,false,false,false,false,false,
    false,false,false,false,false,false,false,false,false,"https://via.placeholder.com/900x460.png?text=Testimoni+100"
  ];
  // pad/limit to exactly 100 slots
  while(testimonials.length < 100) testimonials.push(false);
  if(testimonials.length > 100) testimonials.length = 100;

  const grid = document.getElementById('grid');
  const pageIndicator = document.getElementById('pageIndicator');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const toast = document.getElementById('toast');
  const loadingOverlay = document.getElementById('loadingOverlay');

  let currentPage = 1;
  const totalPages = Math.max(1, Math.ceil(testimonials.length / perPage));

  // show loading overlay with dinosaurus animation
  function showLoading(){
    if(loadingOverlay){
      loadingOverlay.setAttribute('aria-hidden','false');
      loadingOverlay.classList.add('show');
    }
  }
  function hideLoading(){
    if(loadingOverlay){
      loadingOverlay.classList.remove('show');
      loadingOverlay.setAttribute('aria-hidden','true');
    }
  }

  // simple toast
  let toastTimer;
  function showToast(msg){
    clearTimeout(toastTimer);
    toast.textContent = '✔︎ ' + msg;
    toast.classList.add('show');
    toast.setAttribute('aria-hidden','false');
    toastTimer = setTimeout(()=> { toast.classList.remove('show'); toast.setAttribute('aria-hidden','true'); }, 1400);
  }

  // render page (simulate small fetch delay to show dino)
  function renderPage(page){
    currentPage = Math.min(Math.max(1, page), totalPages);
    const start = (currentPage - 1) * perPage;
    const end = Math.min(testimonials.length, start + perPage);

    // show loading dino for minimum 700ms to look cool
    showLoading();

    // small timeout to simulate "loading" (and let dino walk)
    setTimeout(()=> {
      grid.innerHTML = '';
      for(let i = start; i < end; i++){
        const slot = testimonials[i];
        const card = document.createElement('article');
        card.className = 'testi-card';

        if(slot && typeof slot === 'string'){
          const imgWrap = document.createElement('div');
          imgWrap.className = 'img-wrap';

          const img = document.createElement('img');
          img.className = 'testi-img';
          img.src = slot;
          img.alt = 'Testimoni ' + (i+1);
          img.draggable = false;

          const overlay = document.createElement('div');
          overlay.className = 'img-overlay';
          overlay.title = 'Testimoni WALZSHOP';

          imgWrap.appendChild(img);
          imgWrap.appendChild(overlay);
          card.appendChild(imgWrap);

          const caption = document.createElement('div');
          caption.className = 'caption';
          caption.textContent = ''; // optional
          card.appendChild(caption);

          // protections
          img.addEventListener('contextmenu', e => e.preventDefault());
          overlay.addEventListener('contextmenu', e => e.preventDefault());
          img.addEventListener('dragstart', e => e.preventDefault());

        } else {
          card.classList.add('placeholder');
          const inner = document.createElement('div');
          inner.className = 'placeholder-inner';
          inner.textContent = 'Belum ada testimoni';
          card.appendChild(inner);
        }

        grid.appendChild(card);
      }

      pageIndicator.textContent = 'Page ' + currentPage + ' / ' + totalPages;
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage === totalPages;

      // hide loading after content placed, allow small fade
      setTimeout(()=> {
        hideLoading();
        // scroll grid into view
        const top = document.querySelector('.testi-hero').offsetTop;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }, 240);
    }, 700);
  }

  prevBtn.addEventListener('click', () => renderPage(currentPage - 1));
  nextBtn.addEventListener('click', () => renderPage(currentPage + 1));

  // initial render
  document.addEventListener('DOMContentLoaded', ()=> {
    // protections global
    document.addEventListener('contextmenu', function(e){ e.preventDefault(); }, {passive:false});
    document.addEventListener('keydown', function(e){
      if (e.key === 'F12' ||
          (e.ctrlKey && e.key.toLowerCase() === 'u') ||
          (e.ctrlKey && e.key.toLowerCase() === 's') ||
          (e.ctrlKey && e.key.toLowerCase() === 'p') ||
          (e.ctrlKey && e.shiftKey && (e.key.toLowerCase() === 'i' || e.key.toLowerCase() === 'c'))
         ) { e.preventDefault(); showToast('Action disabled'); return false; }
    }, {passive:false});
    document.addEventListener('auxclick', e => { if (e.button === 1) e.preventDefault(); });

    // kick off render
    renderPage(1);
  });

  // expose a small helper to update slot from console if needed
  window.WALZ_updateSlot = function(index, urlOrFalse){ if(index>=0 && index<testimonials.length){ testimonials[index]=urlOrFalse; showToast('Slot updated'); } };

})();