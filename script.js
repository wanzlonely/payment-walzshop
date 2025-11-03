// Floating hint
const hint=document.getElementById('testiHint');
if(hint){
  window.addEventListener('load',()=>{
    setTimeout(()=>{hint.classList.add('show');},600);
    setTimeout(()=>{hint.classList.remove('show');},2800);
  });
}

// Accordion logic
const cards=document.querySelectorAll('.card-head');
cards.forEach(btn=>{
  btn.addEventListener('click',()=>{
    const target=document.getElementById(btn.dataset.target);
    const open=target.classList.contains('open');
    document.querySelectorAll('.card-body.open').forEach(e=>e.classList.remove('open'));
    if(!open) target.classList.add('open');
  });
});

// Copy nomor
const copy=(id)=>{
  const val=document.getElementById(id)?.innerText||"";
  if(val){
    navigator.clipboard.writeText(val);
    showToast("Nomor berhasil disalin!");
  }
};
document.getElementById('copyDana')?.addEventListener('click',()=>copy('danaNum'));
document.getElementById('copyGopay')?.addEventListener('click',()=>copy('gopayNum'));

// Toast notif
function showToast(msg){
  let toast=document.getElementById('toast');
  if(!toast){
    toast=document.createElement('div');
    toast.id='toast';
    toast.className='toast';
    document.body.appendChild(toast);
  }
  toast.innerText=msg;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2000);
}

// ==== TESTIMONI PAGE ====
const grid=document.getElementById('testiGrid');
if(grid){
  const dino=document.querySelector('.loading-overlay');
  const perPage=9;
  const images=Array(100).fill(false);
  let page=1;
  const render=()=>{
    grid.innerHTML='';
    const start=(page-1)*perPage;
    const end=start+perPage;
    const slice=images.slice(start,end);
    slice.forEach((src,i)=>{
      const card=document.createElement('div');
      card.className='testi-card';
      if(src && src!=='false'){
        const img=document.createElement('img');
        img.src=src;
        img.className='testi-img';
        card.appendChild(img);
      }else{
        const ph=document.createElement('div');
        ph.className='placeholder-inner';
        ph.innerText='Belum ada testimoni';
        card.appendChild(ph);
      }
      grid.appendChild(card);
    });
    document.getElementById('pageInfo').innerText=`Halaman ${page}`;
    document.getElementById('prevBtn').disabled=page===1;
    document.getElementById('nextBtn').disabled=end>=images.length;
  };
  document.getElementById('prevBtn').onclick=()=>{if(page>1){page--;render();}};
  document.getElementById('nextBtn').onclick=()=>{if(page*perPage<images.length){page++;render();}};
  window.addEventListener('load',()=>{
    setTimeout(()=>{
      dino.classList.remove('show');
      render();
    },1800);
  });
}