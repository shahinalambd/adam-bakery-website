(function () {
  var D = window.ADAM;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  root.classList.add('js');

  function store(k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem(k)); localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } }

  /* ---------------- language ---------------- */
  var T = {
    add: { en: 'Add to order', ar: 'أضف للطلب' },
    added: { en: 'Added to your order', ar: 'تمت الإضافة إلى طلبك' },
    inOrder: { en: 'In your order', ar: 'في طلبك' },
    empty: { en: 'Your order is empty.', ar: 'طلبك فارغ.' },
    browse: { en: 'Browse the menu', ar: 'تصفّح القائمة' },
    items: { en: 'items', ar: 'أصناف' },
    noResults: { en: 'No items match your search. Try another word.', ar: 'لا توجد أصناف مطابقة. جرّب كلمة أخرى.' },
    needName: { en: 'Enter your name so the bakery knows who the order is for.', ar: 'أدخل اسمك ليعرف المخبز صاحب الطلب.' },
    needItems: { en: 'Add at least one item first.', ar: 'أضف صنفاً واحداً على الأقل.' },
    demoSent: { en: 'Thanks! This is a portfolio demo, so no order was sent.', ar: 'شكراً! هذا موقع تجريبي، لذلك لم يتم إرسال أي طلب.' },
    pickup: { en: 'Pickup', ar: 'استلام' },
    delivery: { en: 'Delivery', ar: 'توصيل' },
    viewOrder: { en: 'View order', ar: 'عرض الطلب' },
    minus: { en: 'Remove one', ar: 'إنقاص واحد' },
    plus: { en: 'Add one', ar: 'إضافة واحد' }
  };
  var lang = store('adam-lang') || 'en';
  function t(k) { return T[k][lang]; }
  function nm(o) { return o[lang] || o.en; }

  function applyLang() {
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-ar]').forEach(function (el) {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      el.innerHTML = lang === 'ar' ? el.dataset.ar : el.dataset.en;
    });
    document.querySelectorAll('[data-ar-placeholder]').forEach(function (el) {
      if (el.dataset.enPlaceholder === undefined) el.dataset.enPlaceholder = el.placeholder;
      el.placeholder = lang === 'ar' ? el.dataset.arPlaceholder : el.dataset.enPlaceholder;
    });
    document.querySelectorAll('[data-ar-label]').forEach(function (el) {
      if (el.dataset.enLabel === undefined) el.dataset.enLabel = el.getAttribute('aria-label');
      el.setAttribute('aria-label', lang === 'ar' ? el.dataset.arLabel : el.dataset.enLabel);
    });
    if (document.body.dataset.titleAr) {
      if (!document.body.dataset.titleEn) document.body.dataset.titleEn = document.title;
      document.title = lang === 'ar' ? document.body.dataset.titleAr : document.body.dataset.titleEn;
    }
    renderAll();
  }
  document.querySelectorAll('.lang').forEach(function (b) {
    b.addEventListener('click', function () { lang = lang === 'en' ? 'ar' : 'en'; store('adam-lang', lang); applyLang(); });
  });

  /* ---------------- cart ---------------- */
  var cart = store('adam-cart') || {};
  function byId(id) { for (var i = 0; i < D.items.length; i++) if (D.items[i].id === id) return D.items[i]; }
  function count() { var n = 0; for (var k in cart) n += cart[k]; return n; }
  function setQty(id, q) {
    if (q <= 0) delete cart[id]; else cart[id] = Math.min(q, 99);
    store('adam-cart', cart);
    renderAll();
    document.querySelectorAll('.count').forEach(function (c) { c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); });
  }

  var toastEl = document.querySelector('.toast'), toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 1800);
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function cardHTML(it) {
    var q = cart[it.id] || 0;
    var ph = it.img
      ? '<div class="ph"><img src="assets/img/' + it.img + '.jpg" alt="' + esc(nm(it)) + '" loading="lazy">'
      : '<div class="ph none"><span class="letter" aria-hidden="true">' + esc(nm(it).charAt(0)) + '</span>';
    ph += (it.tag ? '<span class="tag">' + esc(nm(it.tag)) + '</span>' : '') + '</div>';
    var ctl = q
      ? '<button type="button" class="add-btn added" data-act="open">' + t('inOrder') + '</button>' +
        '<div class="qty"><button type="button" data-act="dec" data-id="' + it.id + '" aria-label="' + t('minus') + '">−</button><output aria-live="polite">' + q + '</output><button type="button" data-act="inc" data-id="' + it.id + '" aria-label="' + t('plus') + '">+</button></div>'
      : '<button type="button" class="add-btn" data-act="inc" data-id="' + it.id + '"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>' + t('add') + '</button>';
    return '<article class="card" data-name="' + esc((it.en + ' ' + it.ar).toLowerCase()) + '">' + ph +
      '<div class="body"><h3>' + esc(nm(it)) + '</h3><p>' + esc(lang === 'ar' ? it.dar : it.den) + '</p><div class="add">' + ctl + '</div></div></article>';
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]');
    if (!b) return;
    var id = b.dataset.id, act = b.dataset.act;
    if (act === 'inc') { var was = cart[id] || 0; setQty(id, was + 1); if (!was) toast(t('added')); }
    else if (act === 'dec') setQty(id, (cart[id] || 0) - 1);
    else if (act === 'open') openDrawer();
  });

  /* favourites rail (home) */
  function renderFavs() {
    var el = document.getElementById('favs'); if (!el) return;
    el.innerHTML = D.items.filter(function (i) { return i.fav; }).map(cardHTML).join('');
  }

  /* menu page */
  var query = '';
  function renderMenu() {
    var el = document.getElementById('menu-root'); if (!el) return;
    var html = '';
    D.categories.forEach(function (c) {
      var list = D.items.filter(function (i) { return i.cat === c.id; });
      html += '<section class="menu-sec" id="' + c.id + '" aria-labelledby="h-' + c.id + '"><div class="wrap"><h2 id="h-' + c.id + '">' + esc(nm(c)) + '</h2><p>' + esc(lang === 'ar' ? c.dar : c.den) + '</p><div class="grid">' + list.map(cardHTML).join('') + '</div></div></section>';
    });
    el.innerHTML = html;
    filterMenu();
  }
  function filterMenu() {
    var el = document.getElementById('menu-root'); if (!el) return;
    var q = query.trim().toLowerCase(), any = false;
    el.querySelectorAll('.menu-sec').forEach(function (sec) {
      var shown = 0;
      sec.querySelectorAll('.card').forEach(function (c) {
        var ok = !q || c.dataset.name.indexOf(q) > -1;
        c.style.display = ok ? '' : 'none'; if (ok) shown++;
      });
      sec.style.display = shown ? '' : 'none'; if (shown) any = true;
    });
    var em = document.querySelector('.empty');
    if (em) { em.style.display = any ? 'none' : 'block'; em.textContent = t('noResults'); }
  }
  var search = document.getElementById('menu-search');
  if (search) search.addEventListener('input', function () { query = search.value; filterMenu(); });

  var tabs = document.querySelector('.tabs');
  function renderTabs() {
    if (!tabs) return;
    tabs.innerHTML = D.categories.map(function (c, i) { return '<button type="button" data-cat="' + c.id + '" aria-pressed="' + (i === 0) + '">' + esc(nm(c)) + '</button>'; }).join('');
  }
  if (tabs) {
    tabs.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (search && search.value) { search.value = ''; query = ''; filterMenu(); }
      var sec = document.getElementById(b.dataset.cat);
      if (sec) sec.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    });
  }
  function spy() {
    if (!tabs) return;
    var secs = document.querySelectorAll('.menu-sec'), cur = null;
    secs.forEach(function (s) { if (s.getBoundingClientRect().top < 340) cur = s.id; });
    if (!cur && secs[0]) cur = secs[0].id;
    tabs.querySelectorAll('button').forEach(function (b) {
      var on = b.dataset.cat === cur;
      if ((b.getAttribute('aria-pressed') === 'true') !== on) {
        b.setAttribute('aria-pressed', on);
        if (on) b.scrollIntoView({ block: 'nearest', inline: 'center' });
      }
    });
  }

  /* drawer */
  var drawer = document.querySelector('.drawer'), scrim = document.querySelector('.scrim'), lastFocus;
  function openDrawer() {
    if (!drawer) return;
    lastFocus = document.activeElement;
    drawer.classList.add('open'); scrim.classList.add('open');
    drawer.removeAttribute('inert'); drawer.setAttribute('aria-hidden', 'false');
    setTimeout(function () { drawer.querySelector('.x').focus(); }, 50);
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open'); scrim.classList.remove('open');
    drawer.setAttribute('inert', ''); drawer.setAttribute('aria-hidden', 'true');
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll('[data-open-cart]').forEach(function (b) { b.addEventListener('click', openDrawer); });
  if (drawer) {
    drawer.querySelector('.x').addEventListener('click', closeDrawer);
    scrim.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer(); });
  }
  function renderDrawer() {
    var box = document.querySelector('.drawer .items'); if (!box) return;
    var ids = Object.keys(cart);
    if (!ids.length) {
      box.innerHTML = '<div class="empty-cart"><p>' + t('empty') + '</p><p><a href="menu.html">' + t('browse') + '</a></p></div>';
    } else {
      box.innerHTML = ids.map(function (id) {
        var it = byId(id); if (!it) return '';
        var pic = it.img ? '<img src="assets/img/' + it.img + '.jpg" alt="">' : '<span class="dot" aria-hidden="true"></span>';
        return '<div class="line">' + pic + '<span class="n">' + esc(nm(it)) + '</span><div class="qty"><button type="button" data-act="dec" data-id="' + id + '" aria-label="' + t('minus') + '">−</button><output>' + cart[id] + '</output><button type="button" data-act="inc" data-id="' + id + '" aria-label="' + t('plus') + '">+</button></div></div>';
      }).join('');
    }
    var sel = document.getElementById('branch');
    if (sel) {
      var v = sel.value || 'athaiba';
      sel.innerHTML = Object.keys(D.branches).map(function (k) { return '<option value="' + k + '">' + nm(D.branches[k]) + '</option>'; }).join('');
      sel.value = v;
    }
  }
  var form = document.getElementById('order-form');
  if (form) {
    var nameIn = form.querySelector('#cust-name');
    nameIn.addEventListener('input', function () { nameIn.setCustomValidity(''); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!count()) { toast(t('needItems')); return; }
      if (!nameIn.value.trim()) { nameIn.setCustomValidity(t('needName')); nameIn.reportValidity(); return; }
      // Portfolio demo: nothing is sent.
      closeDrawer();
      toast(t('demoSent'));
    });
  }

  function renderCounts() {
    var n = count();
    document.querySelectorAll('.count').forEach(function (c) { c.textContent = n; });
    var fab = document.querySelector('.fab');
    if (fab) fab.classList.toggle('show', n > 0);
  }

  function renderAll() { if (typeof heroLabel === 'function') heroLabel(); if (typeof renderMap === 'function') renderMap(); renderFavs(); renderTabs(); renderMenu(); renderDrawer(); renderCounts(); spy(); }

  /* ---------------- chrome ---------------- */
  var header = document.querySelector('.site-header');
  function onScroll() { if (header) header.classList.toggle('scrolled', scrollY > 8); spy(); }
  addEventListener('scroll', onScroll, { passive: true });

  var mt = document.querySelector('.menu-toggle'), links = document.getElementById('site-links');
  if (mt && links) {
    mt.addEventListener('click', function () { var o = links.classList.toggle('open'); mt.setAttribute('aria-expanded', o); });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) { links.classList.remove('open'); mt.setAttribute('aria-expanded', 'false'); } });
  }

  /* hero slideshow */
  var slides = document.querySelectorAll('.arch-frame img');
  if (slides.length > 1) {
    var cur = 0; slides[0].classList.add('active');
    if (!reduce) setInterval(function () {
      slides[cur].classList.remove('active'); cur = (cur + 1) % slides.length; slides[cur].classList.add('active');
      heroLabel();
    }, 4200);
  }
  function heroLabel() {
    var label = document.querySelector('.arch-label'); if (!label || !slides.length) return;
    var s = document.querySelector('.arch-frame img.active') || slides[0];
    var it = byId(s.dataset.item);
    if (it) { label.querySelector('b').textContent = nm(it); label.querySelector('img').src = s.src; }
  }


  /* location map tabs */
  var MAPQ = { athaiba: 'Adam+Bakery+Al+Athaiba+Muscat+Oman', mawaleh: 'Adam+Bakery+Al+Mawaleh+Muscat+Oman' };
  var mapBtns = document.querySelectorAll('[data-map]'), mapKey = 'athaiba';
  function renderMap() {
    var fr = document.getElementById('map-frame'); if (!fr) return;
    var br = D.branches[mapKey];
    var nameEl = document.getElementById('map-name');
    nameEl.textContent = lang === 'ar' ? 'فرع ' + br.ar : br.en + ' branch';
    var ph = document.getElementById('map-phone'); ph.textContent = br.display; ph.href = 'tel:+' + br.phone;
    document.getElementById('map-dir').href = 'https://www.google.com/maps/search/?api=1&query=' + MAPQ[mapKey].replace('+Oman', '');
    var src = 'https://maps.google.com/maps?q=' + MAPQ[mapKey] + '&z=15&output=embed';
    if (fr.getAttribute('src') !== src) fr.setAttribute('src', src);
    fr.title = 'Adam Bakery ' + br.en + ' on Google Maps';
    mapBtns.forEach(function (b) { b.setAttribute('aria-selected', b.dataset.map === mapKey); });
  }
  mapBtns.forEach(function (b) { b.addEventListener('click', function () { mapKey = b.dataset.map; renderMap(); }); });

  /* ticker loop */
  var tk = document.querySelector('.ticker ul');
  if (tk) Array.prototype.slice.call(tk.children).forEach(function (li) { var c = li.cloneNode(true); c.setAttribute('aria-hidden', 'true'); tk.appendChild(c); });

  /* rail arrows */
  document.querySelectorAll('[data-rail]').forEach(function (b) {
    b.addEventListener('click', function () {
      var r = document.getElementById('favs'); var dir = b.dataset.rail === 'next' ? 1 : -1;
      if (root.dir === 'rtl') dir *= -1;
      r.scrollBy({ left: dir * r.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' });
    });
  });

  /* reveal */
  var rv = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .12 });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('in'); });

  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  applyLang(); onScroll();
})();
