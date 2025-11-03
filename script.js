(function () {
  /* toast helper */
  function showToast(msg) {
    let t = document.getElementById("toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      t.className = "toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 1400);
  }

  /* Loader control - cinematic 1.2s */
  const globalLoader = document.getElementById("globalLoader");
  const appShell = document.getElementById("appShell");
  const testiShell = document.getElementById("testiShell");

  function hideInitialLoader() {
    const min = 1200; // 1.2s
    setTimeout(() => {
      if (globalLoader) globalLoader.classList.remove("show");
      if (appShell) appShell.style.opacity = "1";
      if (testiShell) testiShell.style.opacity = "1";
      // reveal cards with stagger slide-in
      document
        .querySelectorAll(".card")
        .forEach((c, i) => setTimeout(() => c.classList.add("show"), 120 + i * 80));
    }, min);
  }

  window.addEventListener("load", hideInitialLoader);

  /* accordion */
  document.querySelectorAll(".card-head").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.target;
      const panel = document.getElementById(id);
      if (!panel) return;
      const isOpen = panel.classList.contains("open");
      document.querySelectorAll(".card-body.open").forEach((p) => p.classList.remove("open"));
      document.querySelectorAll(".card-head[aria-expanded='true']").forEach((h) =>
        h.setAttribute("aria-expanded", "false")
      );
      if (!isOpen) {
        panel.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") btn.click();
    });
  });

  /* copy number */
  async function copyText(id, label) {
    const el = document.getElementById(id);
    if (!el) return showToast("Tidak ada nomor");
    const txt = el.textContent.trim();
    try {
      await navigator.clipboard.writeText(txt);
      showToast(label + " tersalin");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = txt;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        showToast(label + " tersalin");
      } catch {
        showToast("Gagal menyalin");
      }
      document.body.removeChild(ta);
    }
  }
  document.getElementById("copyDana")?.addEventListener("click", () => copyText("danaNum", "Nomor DANA"));
  document.getElementById("copyGopay")?.addEventListener("click", () => copyText("gopayNum", "Nomor GOPAY"));

  /* hint bubble */
  const hint = document.getElementById("testiHint");
  if (hint) {
    setTimeout(() => hint.classList.add("show"), 700);
    setTimeout(() => hint.classList.remove("show"), 3200);
  }

  /* QRIS modal enlarge */
  document.getElementById("openQ")?.addEventListener("click", () => {
    const src = document.querySelector(".qris")?.src || "";
    const overlay = document.createElement("div");
    overlay.className = "modal";
    overlay.innerHTML =
      '<div class="modal-card"><img src="' +
      src +
      '" style="max-width:92vw;max-height:84vh;border-radius:10px;"><button class="btn close">Tutup</button></div>';
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
    overlay.querySelector(".close").addEventListener("click", () => {
      document.body.removeChild(overlay);
      document.body.style.overflow = "auto";
    });
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        document.body.removeChild(overlay);
        document.body.style.overflow = "auto";
      }
    });
  });

  /* TESTIMONI logic */
  (function () {
    const grid = document.getElementById("testiGrid");
    if (!grid) return;
    const loading = document.getElementById("globalLoader");
    const perPage = 9;
    const testimonials = Array(100).fill(false); // put URLs to show images
    let page = 1;
    const totalPages = Math.ceil(testimonials.length / perPage);
    const pageInfo = document.getElementById("pageInfo");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const testiShellLocal = document.getElementById("testiShell");
    const backFab = document.getElementById("backFab");

    function render() {
      grid.innerHTML = "";
      const start = (page - 1) * perPage;
      const end = Math.min(testimonials.length, start + perPage);
      for (let i = start; i < end; i++) {
        const slot = testimonials[i];
        const card = document.createElement("div");
        card.className = "testi-card";
        if (slot && typeof slot === "string") {
          const img = document.createElement("img");
          img.className = "testi-img";
          img.src = slot;
          img.alt = "Testimoni " + (i + 1);
          img.addEventListener("contextmenu", (e) => e.preventDefault());
          img.addEventListener("dragstart", (e) => e.preventDefault());
          card.appendChild(img);
        } else {
          const ph = document.createElement("div");
          ph.className = "placeholder-inner";
          ph.textContent = "Belum ada testimoni";
          card.appendChild(ph);
          card.classList.add("placeholder");
        }
        grid.appendChild(card);
      }
      pageInfo.textContent = "Page " + page + " / " + totalPages;
      prevBtn.disabled = page === 1;
      nextBtn.disabled = page === totalPages;
    }

    function showLoaderThenRender() {
      if (loading) loading.classList.add("show");
      setTimeout(() => {
        render();
        if (loading) loading.classList.remove("show");
        if (testiShellLocal) testiShellLocal.style.opacity = "1";
        window.scrollTo({ top: document.querySelector(".testi-hero")?.offsetTop || 0, behavior: "smooth" });
      }, 1200);
    }

    prevBtn.addEventListener("click", () => {
      if (page > 1) {
        page--;
        showLoaderThenRender();
      }
    });
    nextBtn.addEventListener("click", () => {
      if (page < totalPages) {
        page++;
        showLoaderThenRender();
      }
    });

    backFab?.addEventListener("click", () => {
      window.location.href = "index.html";
    });

    window.addEventListener("load", () => {
      showLoaderThenRender();
    });

    document.addEventListener("contextmenu", (e) => e.preventDefault());
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.key.toLowerCase() === "u") ||
        (e.ctrlKey && e.shiftKey && (e.key.toLowerCase() === "i" || e.key.toLowerCase() === "c"))
      ) {
        e.preventDefault();
        showToast("Action disabled");
      }
    });
  })();
})();