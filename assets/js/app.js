/* Atelier Volos — site logic.
   All content comes from assets/js/data.js. */
(function () {
  'use strict';
  var D = window.AV;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (t, c, h) {
    var n = document.createElement(t);
    if (c) n.className = c;
    if (h != null) n.innerHTML = h;
    return n;
  };
  var NB = '\u00A0';

  /* ─── helpers ─────────────────────────────────────────── */
  function money(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, NB) + NB + '₽';
  }
  function plural(n, one, few, many) {
    var m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
    return many;
  }
  function pad(n) { return 'p' + String(n).padStart(3, '0'); }
  function photo(n, w) { return 'assets/photo/' + pad(n) + '-' + (w || 620) + '.webp'; }

  /* ─── header & common links ─────────────────────────── */
  function wire() {
    var tel = 'tel:+' + D.phoneRaw;
    [['#footTel', tel, D.phone], ['#bookTel', tel, null]].forEach(function (a) {
      var n = $(a[0]); if (!n) return;
      n.href = a[1]; if (a[2]) n.textContent = a[2];
    });
    ['#footWa', '#dockWa'].forEach(function (s) { var n = $(s); if (n) n.href = D.wa; });
    var ftg = $('#footTg'); if (ftg) ftg.href = D.tg;
    var fm = $('#footMaps'); if (fm) fm.href = D.maps;
    var ar = $('#allReviews'); if (ar) ar.href = D.mapsReviews;
    var by = $('#bookYa'); if (by) by.href = D.booking;
    $('#footAddr').textContent = D.address;
    $('#footHours').textContent = D.hours;
    $('#footLegal').textContent = D.legal;
    $('#whereSub').textContent =
      D.landmark + '. ' + D.hours + '. Entrance from the street side, Atelier sign at the entrance.';
  }

  /* ─── hero: stats ───────────────────────────────────── */
  function heroStats() {
    var r = D.rating;
    var rows = [
      ['Yandex Maps', r.score, r.marks + ' ' + plural(r.marks, 'rating', 'ratings', 'ratings') + ', ' + r.reviews + ' ' + plural(r.reviews, 'review', 'reviews', 'reviews')],
      ['Award', '2026', '"' + r.award.replace(' 2026', '') + '" from Yandex Maps'],
      ['Hair', '40–75' + NB + 'cm', 'Premium Slavic hair'],
      ['Four Hands', '×2', 'Faster, no extra charge for speed'],
    ];
    var box = $('#heroStats');
    rows.forEach(function (r2) {
      var d = el('div');
      d.appendChild(el('dt', null, r2[0]));
      d.appendChild(el('dd', null, r2[1] + '<small>' + r2[2] + '</small>'));
      box.appendChild(d);
    });
  }

  /* ═══ CALCULATOR: tape + order sheet ═══════════════════ */
  var S = { cm: 50, grams: 150, strands: 120, tier: 'master', tress: 1, mode: 'capsule' };

  function lenRow() {
    for (var i = 0; i < D.lengths.length; i++) if (D.lengths[i].cm === S.cm) return D.lengths[i];
    return D.lengths[0];
  }
  function tierRow() {
    for (var i = 0; i < D.capsule.length; i++) if (D.capsule[i].id === S.tier) return D.capsule[i];
    return D.capsule[0];
  }
  function matSum() { return lenRow().per100 * S.grams / 100; }
  function workSum() {
    if (S.mode === 'hollywood') {
      var h = D.hollywood[S.tress - 1];
      return S.tier === 'top' ? h.top : h.master;
    }
    return tierRow().perStrand * S.strands;
  }

  function buildTape() {
    var nums = $('#tapeNums');
    D.lengths.forEach(function (l, i) {
      var s = el('span', null, l.cm);
      s.style.left = (i / (D.lengths.length - 1) * 100) + '%';
      s.dataset.cm = l.cm;
      nums.appendChild(s);
    });
  }
  function paintTape() {
    var min = 40, max = 75;
    var p = (S.cm - min) / (max - min) * 100;
    $('#tapeMark').style.left = p + '%';
    $('#tapeVal').textContent = S.cm + NB + 'cm';
    Array.prototype.forEach.call($('#tapeNums').children, function (s) {
      s.classList.toggle('is-on', +s.dataset.cm === S.cm);
    });
    var l = lenRow();
    $('#tapeNote').innerHTML =
      'Premium Slavic hair, length ' + S.cm + NB + 'cm — <b>' + money(l.per100) +
      ' per 100' + NB + 'g</b>. Hair is bought once and reused for several corrections.';
  }

  function paint() {
    var l = lenRow(), t = tierRow();
    $('#matRate').textContent = money(l.per100) + ' per 100' + NB + 'g';
    $('#gramsVal').textContent = S.grams + NB + 'g';
    $('#matSum').textContent = money(matSum());

    if (S.mode === 'capsule') {
      $('#workSub').textContent = 'capsule extensions';
      $('#workRate').textContent = money(t.perStrand) + ' per strand';
      $('#strandsVal').textContent = S.strands;
      $('#workFine').textContent = t.note;
    } else {
      $('#workSub').textContent = 'Hollywood technique';
      /* show full price ladder for selected tier — each additional weft is cheaper */
      $('#tressRate').textContent = D.hollywood.map(function (h) {
        return h.tress + ' — ' + money(S.tier === 'top' ? h.top : h.master).replace(/\u00A0₽$/, '');
      }).join(', ') + NB + '₽';
      $('#workFine').textContent =
        'Wefts are attached with thread, no capsules. Correction is cheaper than capsule.';
    }
    $('#workSum').textContent = money(workSum());

    var total = matSum() + workSum();
    $('#totalSum').textContent = money(total);

    var tm = $('#totalTime');
    if (S.mode === 'capsule') {
      var f = D.fourHands;
      var lo = Math.round(S.strands / f.rateMax * 60);
      var hi = Math.round(S.strands / f.rateMin * 60);
      tm.textContent = 'Four hands — ' + lo + '–' + hi + NB + 'min';
      tm.hidden = false;
    } else tm.hidden = true;

    var echo = $('#calcEcho');
    if (echo) echo.textContent = shortCalc();
    var msg = encodeURIComponent(calcMessage());
    $('#sendWa').href = D.wa + '?text=' + msg;
    $('#sendTg').dataset.text = calcMessage();
  }

  function shortCalc() {
    var a = [S.cm + ' cm', S.grams + ' g'];
    a.push(S.mode === 'capsule'
      ? S.strands + ' ' + plural(S.strands, 'strand', 'strands', 'strands')
      : S.tress + ' ' + plural(S.tress, 'weft', 'wefts', 'wefts'));
    a.push(tierRow().label.toLowerCase());
    return a.join(', ') + ' — ≈ ' + money(matSum() + workSum());
  }
  function calcMessage() {
    var what = S.mode === 'capsule' ? 'capsule extensions' : 'Hollywood extensions';
    var work = S.mode === 'capsule'
      ? S.strands + ' ' + plural(S.strands, 'strand', 'strands', 'strands')
      : S.tress + ' ' + plural(S.tress, 'weft', 'wefts', 'wefts');
    return 'Hello! I am writing from the website.\n' +
      'Interested in ' + what + ': length ' + S.cm + ' cm, about ' + S.grams + ' g of hair, ' +
      work + ', ' + tierRow().label.toLowerCase() + '.\n' +
      'According to your price list it came to about ' + money(matSum() + workSum()).replace(/\u00A0/g, ' ') +
      ' — hair ' + money(matSum()).replace(/\u00A0/g, ' ') +
      ' and work ' + money(workSum()).replace(/\u00A0/g, ' ') + '.\n' +
      'Did I calculate correctly? Can I book a free consultation?';
  }

  function merka() {
    buildTape();
    $('#tapeRange').addEventListener('input', function () {
      S.cm = +this.value; paintTape(); paint();
    });
    $('#grams').addEventListener('input', function () { S.grams = +this.value; paint(); });
    $('#strands').addEventListener('input', function () { S.strands = +this.value; paint(); });

    Array.prototype.forEach.call(document.querySelectorAll('.seg__b'), function (b) {
      b.addEventListener('click', function () {
        S.mode = b.dataset.mode;
        Array.prototype.forEach.call(document.querySelectorAll('.seg__b'), function (x) {
          var on = x === b;
          x.classList.toggle('is-on', on);
          x.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        $('#capsuleCtl').hidden = S.mode !== 'capsule';
        $('#hollyCtl').hidden = S.mode !== 'hollywood';
        paint();
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll('#pickTier .pick__b'), function (b) {
      b.addEventListener('click', function () {
        S.tier = b.dataset.tier;
        Array.prototype.forEach.call(document.querySelectorAll('#pickTier .pick__b'), function (x) {
          x.classList.toggle('is-on', x === b);
        });
        paint();
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll('#pickTress .pick__b'), function (b) {
      b.addEventListener('click', function () {
        S.tress = +b.dataset.tress;
        Array.prototype.forEach.call(document.querySelectorAll('#pickTress .pick__b'), function (x) {
          x.classList.toggle('is-on', x === b);
        });
        paint();
      });
    });
    $('#sendTg').addEventListener('click', function (e) {
      e.preventDefault();
      toTelegram(this.dataset.text);
    });
    paintTape(); paint();
  }

  /* Telegram via phone number doesn't accept pre-filled text — copy to clipboard */
  function toTelegram(text) {
    var open = function () { window.open(D.tg, '_blank', 'noopener'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        toast('Message copied — paste it into the chat');
        open();
      }, open);
    } else open();
  }
  function toast(msg) {
    var t = el('div', 'toast', msg);
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('is-in'); });
    setTimeout(function () { t.classList.remove('is-in'); setTimeout(function () { t.remove(); }, 400); }, 3200);
  }

  /* ─── techniques ────────────────────────────────────── */
  function methods() {
    var box = $('#methodsList');
    D.methods.forEach(function (m, i) {
      var a = el('article', 'method rise');
      a.innerHTML =
        '<img src="' + photo(m.photo, 1280) + '" alt="' + m.title + ' hair extensions at the studio" loading="lazy" decoding="async">' +
        '<div class="method__b">' +
        '<p class="method__n">Technique ' + (i + 1) + '</p>' +
        '<h3 class="method__t">' + m.title + '</h3>' +
        '<p class="method__lead">' + m.lead + '</p>' +
        '<p class="method__body">' + m.body + '</p>' +
        '<ul class="method__f">' + m.facts.map(function (f) {
          var p = f.split(' — ');
          return '<li><span>' + p[0] + '</span>' + (p[1] ? '<span>' + p[1] + '</span>' : '') + '</li>';
        }).join('') + '</ul></div>';
      box.appendChild(a);
    });
  }

  /* ─── gallery ───────────────────────────────────────── */
  var ALT = {
    works: 'Hair extension result at Atelier Volos studio',
    hair: 'Slavic hair bundle from the studio display',
    process: 'Master at work: hair extensions',
    studio: 'Interior of the studio on Deputatskaya in Sochi',
    care: 'Hair care products at the studio',
  };
  var flat = [], shown = 0, current = 'all', STEP = 16;

  function buildFlat() {
    flat = [];
    Object.keys(D.gallery).forEach(function (k) {
      D.gallery[k].forEach(function (n) { flat.push({ n: n, cat: k }); });
    });
    /* deterministic shuffle so 'All' is not grouped */
    flat.sort(function (a, b) { return ((a.n * 37) % 101) - ((b.n * 37) % 101); });
  }
  function list() {
    return current === 'all' ? flat : flat.filter(function (x) { return x.cat === current; });
  }
  function renderGrid(reset) {
    var g = $('#grid'), items = list();
    if (reset) { g.innerHTML = ''; shown = 0; }
    var next = items.slice(shown, shown + STEP);
    next.forEach(function (it) {
      var b = el('button');
      b.type = 'button';
      b.dataset.n = it.n;
      b.dataset.cat = it.cat;
      b.setAttribute('aria-label', 'Open photo enlarged');
      b.innerHTML = '<img src="' + photo(it.n) + '" alt="' + ALT[it.cat] + '" loading="lazy" decoding="async">';
      g.appendChild(b);
    });
    shown += next.length;
    $('#moreBtn').parentNode.style.display = shown >= items.length ? 'none' : 'flex';
    var left = items.length - shown;
    $('#moreBtn').textContent = 'Show more ' + Math.min(STEP, left);
  }
  function filters() {
    var box = $('#filters');
    var mk = function (key, label, n) {
      var b = el('button', key === 'all' ? 'is-on' : '', label + ' <span>' + n + '</span>');
      b.type = 'button';
      b.dataset.k = key;
      b.addEventListener('click', function () {
        current = key;
        Array.prototype.forEach.call(box.children, function (x) { x.classList.toggle('is-on', x === b); });
        renderGrid(true);
      });
      box.appendChild(b);
    };
    mk('all', 'All', flat.length);
    Object.keys(D.galleryLabels).forEach(function (k) {
      mk(k, D.galleryLabels[k], D.gallery[k].length);
    });
  }

  /* lightbox */
  var lbList = [], lbI = 0;
  function openLb(n) {
    lbList = list();
    lbI = 0;
    for (var i = 0; i < lbList.length; i++) if (lbList[i].n === n) { lbI = i; break; }
    $('#lb').hidden = false;
    document.body.style.overflow = 'hidden';
    showLb();
  }
  function showLb() {
    var it = lbList[lbI];
    $('#lbImg').src = photo(it.n, 1280);
    $('#lbImg').alt = ALT[it.cat];
    $('#lbCap').textContent = D.galleryLabels[it.cat] + ' · ' + (lbI + 1) + ' of ' + lbList.length;
  }
  function closeLb() {
    $('#lb').hidden = true;
    $('#lbImg').removeAttribute('src');
    document.body.style.overflow = '';
  }
  function step(d) { lbI = (lbI + d + lbList.length) % lbList.length; showLb(); }

  function gallery() {
    buildFlat(); filters(); renderGrid(true);
    var eb = document.querySelector('#works .eyebrow');
    if (eb) eb.textContent = flat.length + ' ' + plural(flat.length, 'shot', 'shots', 'shots') + ' from the studio';
    $('#moreBtn').addEventListener('click', function () { renderGrid(false); });
    $('#grid').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-n]');
      if (b) openLb(+b.dataset.n);
    });
    $('#lbX').addEventListener('click', closeLb);
    $('#lbP').addEventListener('click', function () { step(-1); });
    $('#lbN').addEventListener('click', function () { step(1); });
    $('#lb').addEventListener('click', function (e) { if (e.target === this) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if ($('#lb').hidden) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }

  /* ─── price & promos ────────────────────────────────── */
  function price() {
    var box = $('#priceList');
    D.price.forEach(function (g) {
      var s = el('section', 'pgroup rise');
      s.innerHTML = '<h3 class="pgroup__t">' + g.group + '</h3>' +
        g.items.map(function (it) {
          return '<div class="pitem"><div class="pitem__r">' +
            '<span class="pitem__n">' + it.n + '</span>' +
            '<i class="pitem__dots"></i>' +
            '<span class="pitem__p">' + it.p + '</span></div>' +
            (it.d ? '<p class="pitem__d">' + it.d + '</p>' : '') + '</div>';
        }).join('');
      box.appendChild(s);
    });
    var pl = $('#promosList');
    D.promos.forEach(function (p) {
      pl.appendChild(el('li', null, '<b>' + p.t + '</b><span>' + p.d + '</span>'));
    });
  }

  /* ─── reviews ───────────────────────────────────────── */
  function reviews() {
    var a = $('#aspects');
    D.rating.aspects.forEach(function (x) {
      var d = el('div', 'aspect rise');
      d.innerHTML =
        '<div class="aspect__r"><span class="aspect__n">' + x.name + '</span>' +
        '<span class="aspect__v"><b>' + x.pct + '%</b> · ' + x.n + ' ' +
        plural(x.n, 'review', 'reviews', 'reviews') + '</span></div>' +
        '<div class="aspect__bar"><i style="width:' + x.pct + '%"></i></div>';
      a.appendChild(d);
    });
    var box = $('#revsList');
    D.reviews.forEach(function (r) {
      var c = el('article', 'rev rise');
      c.innerHTML =
        '<div class="rev__h"><span class="rev__n">' + r.name + '</span>' +
        '<span class="rev__d">' + r.date + '</span></div>' +
        '<span class="rev__s" aria-label="Rating 5 out of 5">★★★★★</span>' +
        '<p class="rev__t">' + r.text + '</p>';
      box.appendChild(c);
    });
  }

  /* ─── studio, masters, location ─────────────────────── */
  function studio() {
    var c = $('#comforts');
    D.comforts.forEach(function (x) { c.appendChild(el('li', null, x)); });
    var m = $('#mastersList');
    D.masters.forEach(function (x) {
      m.appendChild(el('li', null,
        '<b>' + x.name + '</b><span>' + x.role + '</span>' + (x.note ? '<em>' + x.note + '</em>' : '')));
    });
    var pics = $('#studioPics');
    [73, 76, 29, 83, 34, 12, 43].forEach(function (n, i) {
      var img = el('img');
      img.src = photo(n, i === 0 ? 1280 : 620);
      img.alt = 'Interior of Atelier Volos studio on Deputatskaya';
      img.loading = 'lazy';
      img.decoding = 'async';
      pics.appendChild(img);
    });

    var caps = ['Deputatskaya Street', 'House from the street side', 'Passage along the building', 'Entrance and signage'];
    var w = $('#way');
    D.wayfinding.forEach(function (n, i) {
      var f = el('figure');
      f.innerHTML = '<img src="' + photo(n) + '" alt="' + caps[i] + ' — Atelier Volos, 10 Deputatskaya St." loading="lazy" decoding="async">' +
        '<figcaption>' + caps[i] + '</figcaption>';
      w.appendChild(f);
    });
  }

  /* ─── booking form ────────────────────────────────── */
  function bookMessage() {
    var name = ($('#fName').value || '').trim();
    var what = $('#fWhat').value;
    var when = ($('#fWhen').value || '').trim();
    var t = 'Hello! I am writing from the website.\n';
    if (name) t += 'My name is ' + name + '.\n';
    t += 'Interested in: ' + what + '.\n';
    if (when) t += 'Preferred time: ' + when + '.\n';
    if ($('#fCalc').checked) t += 'My estimate from the website: ' + shortCalc().replace(/\u00A0/g, ' ') + '.\n';
    t += 'Please let me know your availability.';
    return t;
  }
  function form() {
    $('#form').addEventListener('submit', function (e) {
      e.preventDefault();
      window.open(D.wa + '?text=' + encodeURIComponent(bookMessage()), '_blank', 'noopener');
    });
    $('#toTg').addEventListener('click', function (e) {
      e.preventDefault();
      toTelegram(bookMessage());
    });
  }

  /* ─── reveal sections ───────────────────────────────── */
  function rise() {
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(document.querySelectorAll('.rise'), function (n) { n.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });
    Array.prototype.forEach.call(document.querySelectorAll('.rise'), function (n) { io.observe(n); });
    /* fallback: if observer didn't trigger, still show */
    setTimeout(function () {
      Array.prototype.forEach.call(document.querySelectorAll('.rise:not(.is-in)'), function (n) {
        var r = n.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.5) n.classList.add('is-in');
      });
    }, 2500);
  }

  /* ─── init ──────────────────────────────────────────── */
  wire(); heroStats(); merka(); methods(); gallery(); price(); reviews(); studio(); form(); rise();
})();
