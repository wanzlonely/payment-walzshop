(function(){
  /* --- Toast helper --- */
  function showToast(msg){
    let t = document.getElementById('toast');
    if(!t){ t = document.createElement('div'); t.id='toast'; t.className='toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(()=> t.classList.remove('show'), 1600);
  }

  /* --- Accordion (index) --- */
  document.querySelectorAll('.card-head').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const tgt = btn.dataset.target;
      const panel = document.getElementById(tgt);
      if(!panel) return;
      const open = panel.classList.contains('open');
      document.querySelectorAll('.card-body.open').forEach(p => p.classList.remove('open'));
      if(!open) panel.classList.add('open');
    });
  });

  /* --- Copy buttons --- */
  const copyText = async (id, label)=>{
    const el = document.getElementById(id);
    if(!el) return showToast('Tidak ada nomor');
    const txt = el.textContent.trim();
    try{
      await navigator.clipboard.writeText(txt);
      showToast(label + ' tersalin');
    }catch{
      // fallback
      const ta = document.createElement('textarea');
      ta.value = txt; document.body.appendChild(ta); ta.select();
      try{ document.execCommand('copy'); showToast(label + ' tersalin'); }catch{ showToast('Gagal menyalin'); }
      document.body.removeChild(ta);
    }
  };
  document.getElementById('copyDana')?.addEventListener('click', ()=> copyText('danaNum','Nomor DANA'));
  document.getElementById('copyGopay')?.addEventListener('click', ()=> copyText('gopayNum','Nomor GOPAY'));

  /* --- Hint bubble animation (index) --- */
  const hint = document.getElementById('testiHint');
  if(hint){
    window.addEventListener('load', ()=>{
      setTimeout(()=> hint.classList.add('show'), 700);
      setTimeout(()=> hint.classList.remove('show'), 3200);
    });
  }

  /* --- Modal QRIS enlarge (index) --- */
  const openQ = document.getElementById('openQ');
  if(openQ){
    openQ.addEventListener('click', ()=>{
      const overlay = document.createElement('div');
      overlay.className = 'modal';
      overlay.innerHTML = `<div class="modal-card"><img src="${document.querySelector('.qris')?.src || ''}" style="max-width:92vw;max-height:84vh;border-radius:10px;"><button class="btn close">Tutup</button></div>`;
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
      overlay.querySelector('.close').addEventListener('click', ()=>{ document.body.removeChild(overlay); document.body.style.overflow='auto'; });
      overlay.addEventListener('click', (e)=> { if(e.target === overlay){ document.body.removeChild(overlay); document.body.style.overflow='auto'; }});
    });
  }

  /* --- TESTIMONI PAGE LOGIC --- */
  const grid = document.getElementById('testiGrid');
  if(grid){
    const loading = document.getElementById('loadingOverlay');
    const perPage = 9;
    // 100 slots default (false = placeholder). Replace any false with image URL to show real testi.
    const testimonials = [
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
    while(testimonials.length < 100) testimonials.push(false);
    if(testimonials.length > 100) testimonials.length = 100;

    let page = 1;
    const totalPages = Math.ceil(testimonials.length / perPage);
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function render(){
      grid.innerHTML = '';
      const start = (page-1)*perPage;
      const end = Math.min(testimonials.length, start+perPage);
      for(let i=start;i<end;i++){
        const slot = testimonials[i];
        const card = document.createElement('div');
        card.className = 'testi-card';
        if(slot && typeof slot === 'string'){
          const img = document.createElement('img');
          img.className = 'testi-img';
          img.src = slot;
          img.alt = 'Testimoni '+(i+1);
          card.appendChild(img);
          // protection
          img.addEventListener('contextmenu', e=> e.preventDefault());
          img.addEventListener('dragstart', e=> e.preventDefault());
        } else {
          const ph = document.createElement('div');
          ph.className = 'placeholder-inner';
          ph.textContent = 'Belum ada testimoni';
          card.appendChild(ph);
          card.classList.add('placeholder');
        }
        grid.appendChild(card);
      }
      pageInfo.textContent = `Page ${page} / ${totalPages}`;
      prevBtn.disabled = page === 1;
      nextBtn.disabled = page === totalPages;
    }

    prevBtn.addEventListener('click', ()=>{ if(page>1){ page--; showLoadingThenRender(); }});
    nextBtn.addEventListener('click', ()=>{ if(page<totalPages){ page++; showLoadingThenRender(); }});

    function showLoadingThenRender(){
      if(loading){ loading.classList.add('show'); }
      // ensure loader visible at least 700ms
      setTimeout(()=> {
        render();
        if(loading){ loading.classList.remove('show'); }
        window.scrollTo({ top: document.querySelector('.testi-hero')?.offsetTop || 0, behavior: 'smooth' });
      }, 800);
    }

    // initial
    window.addEventListener('load', ()=> {
      showLoadingThenRender();
    });

    // basic anti-inspect measures (soft)
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', e => {
      if(e.key === 'F12' || (e.ctrlKey && e.key.toLowerCase() === 'u') || (e.ctrlKey && e.shiftKey && (e.key.toLowerCase()==='i' || e.key.toLowerCase()==='c'))){
        e.preventDefault();
        showToast('Action disabled');
      }
    });
  }

})();
