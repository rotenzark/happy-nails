/* PLUMBING_V 2 — Bespoke Studio · meccanica invisibile canonica.
   Copiato dal canone Agenzia/Toolkit/boilerplate/plumbing.js e adattato nella sola
   costante SITE. Il codice-FIRMA di questo sito sta in fondo, sotto il
   marcatore di fine plumbing. */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO ══════════ */
  var SITE = {
    slug: 'happy-nails',
    /* Il numero pubblicato è un mobile, ma non è dichiarato come WhatsApp:
       resta un tel: e basta. */
    whatsapp: { number: '', message: '', ids: [] },
    /* Orari dalla scheda ATTIVA («& Skin Care»), l'unica con recensioni
       fresche, listino e prenotazione. La scheda vecchia da 1.086
       recensioni ne dichiara altri: non si mescolano. */
    hours: {
      0: [['08:30', '19:30']],
      1: [['09:00', '20:30']],
      2: [['09:00', '21:30']],
      3: [['09:00', '20:30']],
      4: [['09:00', '20:30']],
      5: [['09:00', '20:30']],
      6: [['09:00', '20:30']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1400,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 760,
    EN: {
      'nav.sett': 'Opening hours', 'nav.serv': 'What we do', 'nav.team': 'The team',
      'nav.voci': 'Reviews', 'nav.dove': 'Find us',

      'hero.occhiello': 'Via Ponale 6 · Milan, M5 Ponale',
      'hero.t1': 'Seven days', 'hero.t2': 'a week.', 'hero.t3': 'Sundays from 8:30.',
      'hero.p': 'Half an hour earlier than any other day. Because Sunday is when people have time — and almost everyone around here is shut.',
      'hero.cta1': 'See the week', 'hero.cta2': '+39 328 040 8215',

      'alt.logo': 'The Happy Nails Centro Estetico logo',
      'sett.h': 'The whole week',
      'sett.p': 'Each bar is the stretch we are open. Sunday starts furthest to the left, Tuesday runs furthest to the right.',
      'g.lun': 'Monday', 'g.mar': 'Tuesday', 'g.mer': 'Wednesday', 'g.gio': 'Thursday',
      'g.ven': 'Friday', 'g.sab': 'Saturday', 'g.dom': 'Sunday',

      'serv.h': 'Two trades under one sign',
      'serv.p': 'Nails on one side, advanced beauty on the other: laser, Brazilian wax, lash extensions. Ten families of treatments in all.',
      'serv.u': 'Nails', 'serv.e': 'Beauty',
      'c.ped': 'pedicure', 'c.man': 'manicure', 'c.ric': 'extensions and overlays',
      'c.cig': 'lash extensions', 'c.mas': 'massage', 'c.tru': 'make-up', 'c.uomo': 'men’s treatments',
      'p.a': 'Gel polish, feet', 'p.b': 'Medical spa pedicure', 'p.c': 'Gel polish pedicure',
      'p.d': 'Gel polish manicure and pedicure',
      'p.e': 'Laser hair removal, face and body', 'p.f': 'Waxing, face and body',
      'p.g': 'Brazilian wax', 'p.h': 'Deep cleansing facial',
      'p.da1': 'from 25 €', 'p.da2': 'from 25 €', 'p.da3': 'from 36 €', 'p.da4': 'from 63 €',
      'p.da5': 'from 1 €', 'p.da6': 'from 3 €', 'p.su': 'on request', 'p.su2': 'on request',
      'serv.coda': 'We work with <strong>ProNails</strong>. Cash, credit card or debit card. Italian and English spoken.',

      'team.h': 'The team',
      'team.sub': 'Six people, and reviewers call them by name.',
      'pe.su1': 'from 75 reviews', 'pe.su2': 'from 73 reviews', 'pe.su3': 'from 73 reviews',
      'pe.su4': 'from 67 reviews', 'pe.su5': 'from 33 reviews', 'pe.su6': 'from 12 reviews',

      'voci.h': 'What people write',
      'voci.sub': 'from more than 400 verified reviews, with new ones every week.',

      'dove.h': 'Where we are',
      'dove.mezzi': 'Metro <strong>M5 Ponale</strong>, plus several bus stops near the salon.',
      'dove.mappa': 'Open in Maps',

      'foot.nota': 'Demonstration site built by Bespoke Studio.',
      'bar.tel': 'Call', 'bar.ore': 'Hours',
    },
  };
  /* ═════════════════════════════════════ */

  /* ---------- WhatsApp wiring ---------- */
  if (SITE.whatsapp.number) {
    var waHref = 'https://wa.me/' + SITE.whatsapp.number + '?text=' +
      encodeURIComponent(SITE.whatsapp.message);
    SITE.whatsapp.ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.href = waHref; el.target = '_blank'; el.rel = 'noopener'; }
    });
  }

  /* ---------- GSAP: registrazione IMMEDIATA + reveal + watchdog ---------- */
  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll(SITE.revealSelector);
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) {
      if (hasST) {
        els.forEach(function (el) {
          ScrollTrigger.getAll().forEach(function (st) {
            if (st.trigger === el && !st.progress) st.kill();
          });
        });
      }
      gsap.set(els, { opacity: 1, y: 0, x: 0 });
    }
  }
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray(SITE.revealSelector).forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  } else {
    if ('IntersectionObserver' in window && !reducedMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add(SITE.inViewClass); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(SITE.revealSelector).forEach(function (el) { io.observe(el); });
    } else {
      showAllReveals();
    }
  }

  /* ---------- intro skippabile ---------- */
  var intro = document.getElementById(SITE.introId);
  /* ⚠️ L'hook si legge AL MOMENTO DELLA CHIAMATA: il codice-firma sta sotto
     il marcatore di fine plumbing e assegna window.bespokeHeroEntrance DOPO
     questa riga. Catturarlo per valore congelava la funzione vuota e l'hero
     restava a opacity 0 sul live. (20/7/2026 — fix riportato nel canone.) */
  function heroEntrance() {
    if (typeof window.bespokeHeroEntrance === 'function') window.bespokeHeroEntrance();
  }
  function hideIntro() {
    if (!intro) return;
    var el = intro; intro = null;
    el.classList.add('hide');
    setTimeout(function () { el.remove(); }, 700);
    heroEntrance();
  }
  function killIntroNow() {
    if (!intro) return;
    var el = intro; intro = null;
    el.remove();
    heroEntrance();
  }
  if (reducedMotion || !intro) {
    if (intro) { intro.remove(); intro = null; }
    heroEntrance();
  } else {
    setTimeout(hideIntro, SITE.introDuration);
    setTimeout(hideIntro, 6000);
    intro.addEventListener('click', hideIntro);
  }

  /* ---------- burger menu ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () {
      nav.classList.remove('nav-open');
      burger.setAttribute('aria-expanded', 'false');
      if (lastFocus) { lastFocus.focus(); lastFocus = null; }
    };
    var openNav = function () {
      if (typeof killIntroNow === 'function') killIntroNow();
      lastFocus = document.activeElement;
      nav.classList.add('nav-open');
      burger.setAttribute('aria-expanded', 'true');
      var first = nav.querySelector('a, button');
      if (first) first.focus();
    };
    burger.addEventListener('click', function () {
      nav.classList.contains('nav-open') ? closeNav() : openNav();
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > SITE.breakpointMenu) closeNav();
    });
  }

  /* ---------- lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) {
      lightboxImg.src = src; lightboxImg.alt = alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    };
    var closeLb = function () {
      lightbox.hidden = true; lightboxImg.src = '';
      document.body.style.overflow = '';
      if (opener) { opener.focus(); opener = null; }
    };
    document.querySelectorAll('[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        opener = btn;
        var img = btn.querySelector('img');
        openLb(btn.getAttribute('data-full'), img ? img.alt : '');
      });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lightbox.hidden) closeLb();
    });
  }

  /* ---------- orari dinamici Europe/Rome ---------- */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
      });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var get = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[get('weekday')], mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }
  var toMin = function (hm) {
    var a = hm.split(':');
    return parseInt(a[0], 10) * 60 + parseInt(a[1], 10);
  };
  var fmt = function (m) {
    m = m % 1440;
    return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2);
  };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function hoursState() {
    var now = romeNow();
    var wins = SITE.hours[now.day] || [];
    for (var i = 0; i < wins.length; i++) {
      var s = toMin(wins[i][0]), e = toMin(wins[i][1]);
      if (now.mins >= s && now.mins < Math.min(e, 1440)) {
        return { open: true, day: now.day, closesAt: fmt(e) };
      }
    }
    var prev = (now.day + 6) % 7;
    var pw = SITE.hours[prev] || [];
    for (var j = 0; j < pw.length; j++) {
      var pe = toMin(pw[j][1]);
      if (pe > 1440 && now.mins < pe - 1440) {
        return { open: true, day: prev, closesAt: fmt(pe) };
      }
    }
    for (var k = 0; k < wins.length; k++) {
      if (now.mins < toMin(wins[k][0])) {
        return { open: false, day: now.day, opensToday: fmt(toMin(wins[k][0])) };
      }
    }
    for (var d = 1; d <= 7; d++) {
      var nd = (now.day + d) % 7;
      var nw = SITE.hours[nd] || [];
      if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) };
    }
    return { open: false, day: now.day };
  }

  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId);
    var st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) {
      row.classList.toggle(SITE.todayClass,
        parseInt(row.getAttribute('data-day'), 10) === st.day);
    });
    if (!el) return;
    var en = root.lang === 'en';
    var txt;
    if (st.open) {
      txt = (en ? 'Open now' : 'Aperto ora') + ' · ' + (en ? 'closes at ' : 'chiude alle ') + st.closesAt;
    } else if (st.opensToday) {
      txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    } else if (st.opensAt !== undefined) {
      txt = (en ? 'Closed · opens ' + DAYS_EN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DAYS_IT[st.opensDay] + ' alle ') + st.opensAt;
    } else {
      txt = en ? 'Closed' : 'Chiuso';
    }
    el.textContent = txt;
  }
  renderHours();
  setInterval(renderHours, 60000);

  /* ---------- i18n overlay ---------- */
  var originals = {};
  var I18N_ATTRS = [
    ['data-i18n', null],
    ['data-i18n-aria', 'aria-label'],
    ['data-i18n-alt', 'alt'],
    ['data-i18n-placeholder', 'placeholder'],
    ['data-i18n-title', 'title'],
  ];
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr);
        var store = originals[dattr];
        /* innerHTML, non textContent: il markup interno (<strong>, <br>)
           deve sopravvivere al passaggio EN→IT. La flotta lavorava già
           così; il boilerplate canonico era rimasto indietro ed è stato
           riallineato il 20/7/2026 partendo da qui. */
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      setLang(root.lang === 'en' ? 'it' : 'en');
    });
  }
  try {
    if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en');
  } catch (e) {}

  /* ---------- action-bar mobile ---------- */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () {
      actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ══════════ FINE PLUMBING — da qui solo il codice-firma ══════════ */

  /* ═══ FIRMA 1 — l'entrata del titolo ═══
     Elementi-FIRMA: NON portano .reveal (regola anti-flash). */
  var righe = document.querySelectorAll('#heroTitolo .riga');
  if (hasGsap && !reducedMotion && righe.length) {
    gsap.set(righe, { opacity: 0, yPercent: 40 });
    window.bespokeHeroEntrance = function () {
      gsap.to(righe, { opacity: 1, yPercent: 0, duration: 0.85, ease: 'power3.out', stagger: 0.12 });
    };
    if (!document.getElementById(SITE.introId)) window.bespokeHeroEntrance();
  }

  /* ═══ FIRMA 2 — la settimana come sette barre orarie ═══
     Ogni barra è posizionata sulla scala 8→22 in base agli attributi
     data-da / data-a: la domenica comincia più a sinistra (8:30) e il
     martedì finisce più a destra (21:30). Non è decorazione, è il
     grafico dei loro orari reali.
     Fallback: senza JS le barre restano piene al 55% via CSS e gli
     orari sono comunque scritti in chiaro accanto a ogni riga. */
  var SCALA_DA = 8, SCALA_A = 22;
  var barre = Array.prototype.slice.call(document.querySelectorAll('.g-barra'));
  var grafico = document.getElementById('grafico');

  function collocaBarre(anima) {
    barre.forEach(function (el, i) {
      var da = parseFloat(el.getAttribute('data-da'));
      var a = parseFloat(el.getAttribute('data-a'));
      var span = SCALA_A - SCALA_DA;
      var left = ((da - SCALA_DA) / span) * 100;
      var width = ((a - da) / span) * 100;
      el.style.left = left + '%';
      if (anima && hasGsap && !reducedMotion) {
        gsap.fromTo(el, { width: '0%' }, {
          width: width + '%', duration: 0.9, ease: 'power3.out', delay: i * 0.07,
          immediateRender: false,
        });
      } else {
        el.style.width = width + '%';
      }
    });
  }

  if (hasST && !reducedMotion && grafico && barre.length) {
    collocaBarre(false);
    barre.forEach(function (el) { el.style.width = '0%'; });
    ScrollTrigger.create({
      trigger: grafico, start: 'top 80%', once: true,
      onEnter: function () { collocaBarre(true); },
    });
    /* rete di sicurezza: il grafico è il contenuto principale, non può
       restare vuoto se il trigger non scatta */
    setTimeout(function () {
      var prima = barre[0];
      if (prima && parseFloat(getComputedStyle(prima).width) < 4) collocaBarre(false);
    }, 2500);
  } else {
    collocaBarre(false);
  }
})();
