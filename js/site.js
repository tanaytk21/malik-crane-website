/* ==========================================================================
   Malik Crane Services — shared site chrome
   Injects the header and footer into every page so the nav lives in one file.
   No fetch() is used, so this works when opening the pages straight off disk
   (file://) as well as over http.
   ========================================================================== */

(function () {
  'use strict';

  var NAV = [
    { label: 'Home',          href: 'index.html',     key: 'home' },
    { label: 'About Us',      href: 'about.html',     key: 'about' },
    { label: 'Our Products',  href: 'products.html',  key: 'products' },
    { label: 'Portfolio Page', href: 'portfolio.html', key: 'portfolio' },
    { label: 'Blog',          href: 'blog.html',      key: 'blog' }
  ];

  var ADDRESS = 'Amar Industrial Estate, Building No 7, CST Road, Kolivery Village, ' +
                'MMRDA Area, Kalina, Santacruz East, Mumbai, Maharashtra 400098, India';

  /* Exact coordinates of the office, supplied by the owner. Using lat/lng
     rather than the address string stops Google guessing — it geocodes the
     Kalina/MMRDA address to the wrong building. */
  var MAP_QUERY = '19.0718907,72.8663181';

  var COMPANY = {
    name: 'Malik Crane Services Private Limited',
    tagline: 'Lifting Your Projects Higher',
    address: ADDRESS,
    email: 'contact@malikcrane.com',
    phone: '+91 7942637031',
    phoneHref: '+917942637031',
    // The button says "Get directions", so route straight into navigation.
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(MAP_QUERY),
    // Keyless Google Maps embed. loading="lazy" keeps it off the critical path.
    mapEmbed: 'https://www.google.com/maps?q=' + encodeURIComponent(MAP_QUERY) + '&z=17&output=embed',
    facebook: 'https://www.facebook.com/malikcraneservices/',
    // Company root rather than the /about/ tab, so the icon lands on the page itself
    linkedin: 'https://www.linkedin.com/company/malik-crane-services-private-limited/'
  };

  /* Inline icons — the Wix originals were watermarked stock files. */
  var ICON = {
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3 6 9 7 9-7"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5H16.7V4.6A22 22 0 0 0 14.3 4.5c-2.4 0-4 1.45-4 4.1v2.3H7.6V14h2.7v8Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.94 8.5v10.5H3.5V8.5Zm.23-3.2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM9.5 8.5h3.3v1.45a3.6 3.6 0 0 1 3.24-1.72c2.35 0 4.06 1.5 4.06 4.8V19h-3.44v-5.4c0-1.4-.5-2.35-1.75-2.35-.96 0-1.5.64-1.75 1.26-.09.22-.11.53-.11.85V19H9.5Z"/></svg>'
  };

  function currentKey() {
    var explicit = document.body.getAttribute('data-page');
    if (explicit) return explicit;
    var file = window.location.pathname.split('/').pop() || 'index.html';
    for (var i = 0; i < NAV.length; i++) {
      if (NAV[i].href === file) return NAV[i].key;
    }
    return 'home';
  }

  function headerHTML(active) {
    var items = NAV.map(function (item) {
      var current = item.key === active ? ' aria-current="page"' : '';
      return '<li><a class="nav__link" href="' + item.href + '"' + current + '>' + item.label + '</a></li>';
    }).join('');

    return '' +
      '<header class="site-header">' +
        '<div class="wrap site-header__inner">' +
          '<a class="logo" href="index.html" aria-label="' + COMPANY.name + ' — home">' +
            '<img class="logo__mark" src="images/logo-monogram.png" alt="" width="167" height="137">' +
            '<img src="images/logo-wordmark.png" alt="Malik Crane Services Pvt. Ltd." width="500" height="99">' +
          '</a>' +
          '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">' +
            '<span></span><span></span><span></span>' +
            '<span class="visually-hidden">Menu</span>' +
          '</button>' +
          '<nav class="nav" id="primary-nav" aria-label="Primary">' +
            '<ul class="nav__list">' + items + '</ul>' +
          '</nav>' +
        '</div>' +
      '</header>';
  }

  function footerHTML() {
    return '' +
      '<footer class="site-footer">' +
        '<div class="wrap">' +
          '<div class="footer__grid">' +

            '<div>' +
              '<h2 class="footer__heading">Contact</h2>' +
              '<p class="footer__address">' + COMPANY.address + '</p>' +
              '<p class="contact-line">' + ICON.mail +
                '<a href="mailto:' + COMPANY.email + '">' + COMPANY.email + '</a></p>' +
              '<p class="contact-line">' + ICON.phone +
                '<a href="tel:' + COMPANY.phoneHref + '">' + COMPANY.phone + '</a></p>' +
              '<div class="footer__map">' +
                '<iframe src="' + COMPANY.mapEmbed + '" title="Map showing the Malik Crane Services office in Kalina, Mumbai" ' +
                  'loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>' +
              '</div>' +
              '<a class="map-link" href="' + COMPANY.mapsUrl + '" target="_blank" rel="noopener">' +
                ICON.pin + 'Get directions</a>' +
            '</div>' +

            '<div>' +
              '<img src="images/logo-wordmark.png" alt="Malik Crane Services Pvt. Ltd." width="500" height="99" style="max-width:220px">' +
              '<p class="footer__tagline">' + COMPANY.tagline + '</p>' +
            '</div>' +

            '<div>' +
              '<h2 class="footer__heading">Follow Us</h2>' +
              '<div class="socials">' +
                '<a href="' + COMPANY.facebook + '" target="_blank" rel="noopener"' +
                  ' aria-label="Malik Crane Services on Facebook">' + ICON.facebook + '</a>' +
                '<a href="' + COMPANY.linkedin + '" target="_blank" rel="noopener"' +
                  ' aria-label="Malik Crane Services on LinkedIn">' + ICON.linkedin + '</a>' +
              '</div>' +
            '</div>' +

          '</div>' +

          '<p class="footer__wordmark">MALIK CRANE</p>' +

          '<div class="footer__legal">' +
            '<p>&copy; ' + new Date().getFullYear() + ' ' + COMPANY.name + '. All rights reserved.</p>' +
            '<p><a href="privacy.html">Privacy Policy</a> | <a href="terms.html">Terms of Service</a></p>' +
          '</div>' +
        '</div>' +
      '</footer>';
  }

  function wireMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('primary-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.setAttribute('data-open', String(!open));
    });

    // Close the panel on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.setAttribute('aria-expanded', 'false');
        nav.setAttribute('data-open', 'false');
        toggle.focus();
      }
    });
  }

  /* Carousels.
     With [data-autoplay] the track becomes a continuous marquee: the items are
     duplicated once, the strip drifts left forever, and the scroll position
     wraps by exactly one set so the loop is seamless. It pauses on hover.
     Without the attribute it's a plain arrow-driven scroll-snap carousel. */
  function wireCarousels() {
    var SPEED = 0.6; // pixels per frame — roughly 36px/second at 60fps

    document.querySelectorAll('.carousel').forEach(function (carousel) {
      var track = carousel.querySelector('.carousel__track');
      var prev = carousel.querySelector('.carousel__btn--prev');
      var next = carousel.querySelector('.carousel__btn--next');
      if (!track || !prev || !next) return;

      var autoplay = carousel.hasAttribute('data-autoplay');

      function step() {
        var item = track.querySelector('.carousel__item');
        return item ? item.getBoundingClientRect().width + 16 : 260;
      }

      prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
      next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });

      if (!autoplay) {
        // Static carousel: grey the arrows out at either end.
        var sync = function () {
          prev.disabled = track.scrollLeft <= 2;
          next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
        };
        track.addEventListener('scroll', sync, { passive: true });
        window.addEventListener('resize', sync);
        sync();
        return;
      }

      // --- marquee -----------------------------------------------------
      // Duplicate the run of items so there is always something to scroll into.
      var originals = Array.prototype.slice.call(track.children);
      originals.forEach(function (node) {
        var clone = node.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.querySelectorAll('img').forEach(function (img) { img.setAttribute('alt', ''); });
        track.appendChild(clone);
      });

      track.classList.add('is-marquee'); // turns off scroll-snap
      carousel.classList.add('has-marquee');

      var hovering = false;
      var frame = null;
      var firstClone = track.children[originals.length];

      /* Distance from the first original to its clone — exactly one loop
         period, gaps included. Using scrollWidth/2 would be half a gap short
         and show a small jump on every wrap. */
      function loopWidth() {
        if (!firstClone) return track.scrollWidth / 2;
        return firstClone.offsetLeft - originals[0].offsetLeft;
      }

      function frameStep() {
        if (!hovering && !document.hidden) {
          track.scrollLeft += SPEED;
          var w = loopWidth();
          if (w > 0 && track.scrollLeft >= w) track.scrollLeft -= w;
        }
        frame = window.requestAnimationFrame(frameStep);
      }

      carousel.addEventListener('mouseenter', function () { hovering = true; });
      carousel.addEventListener('mouseleave', function () { hovering = false; });

      if (!frame) frame = window.requestAnimationFrame(frameStep);
    });
  }

  /* Cursor spotlight.
     Writes the pointer position, relative to each card's own box, onto that
     card as --gx/--gy. Per-card rather than one global viewport coordinate,
     because a scaled or rotated card re-anchors a fixed background to itself.
     Only cards currently on screen are touched, and updates are collapsed to
     one per frame. */
  function wireSpotlight() {
    var cards = document.querySelectorAll(
      '.panel, .stat, .trust, .uc__row, .panel__media figure');
    if (!cards.length) return;

    // Pointer-driven, so skip devices that only report coarse input
    if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;

    var px = 0, py = 0, queued = false;

    function paint() {
      queued = false;
      var vh = window.innerHeight;

      cards.forEach(function (el) {
        var box = el.getBoundingClientRect();
        if (box.bottom < -200 || box.top > vh + 200) return;   // off screen
        el.style.setProperty('--gx', (px - box.left).toFixed(1) + 'px');
        el.style.setProperty('--gy', (py - box.top).toFixed(1) + 'px');
      });
    }

    window.addEventListener('pointermove', function (e) {
      px = e.clientX;
      py = e.clientY;
      if (!queued) { queued = true; window.requestAnimationFrame(paint); }
    }, { passive: true });
  }

  /* Lightbox for the carousel photos.
     The marquee clones its items, so clicks are handled by delegation and the
     clicked tile is matched back to the canonical list by its image path —
     that way a clone opens the right photo and the counter still reads 8. */
  function wireLightbox() {
    var items = Array.prototype.slice.call(
      document.querySelectorAll('.carousel__item[data-full]:not([aria-hidden="true"])'));
    if (!items.length) return;

    var box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Photo viewer');
    box.setAttribute('data-open', 'false');
    box.innerHTML =
      '<button class="lightbox__btn lightbox__btn--close" type="button" aria-label="Close">' +
        '<svg viewBox="0 0 24 24" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
      '</button>' +
      '<button class="lightbox__btn lightbox__btn--prev" type="button" aria-label="Previous photo">' +
        '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>' +
      '</button>' +
      '<button class="lightbox__btn lightbox__btn--next" type="button" aria-label="Next photo">' +
        '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>' +
      '</button>' +
      '<figure class="lightbox__figure">' +
        '<img class="lightbox__img" alt="">' +
        '<figcaption class="lightbox__caption"></figcaption>' +
      '</figure>';
    document.body.appendChild(box);

    var img = box.querySelector('.lightbox__img');
    var cap = box.querySelector('.lightbox__caption');
    var btnClose = box.querySelector('.lightbox__btn--close');
    var btnPrev = box.querySelector('.lightbox__btn--prev');
    var btnNext = box.querySelector('.lightbox__btn--next');

    var current = 0;
    var opener = null;

    function show(i) {
      current = (i + items.length) % items.length;      // wrap at both ends
      var tile = items[current];
      var thumb = tile.querySelector('img');
      var label = tile.querySelector('.carousel__label');

      img.src = tile.getAttribute('data-full') || (thumb ? thumb.src : '');
      img.alt = thumb ? thumb.alt : '';
      cap.innerHTML = (label ? label.textContent : '') +
        '<span class="lightbox__count">' + (current + 1) + ' of ' + items.length + '</span>';
    }

    function open(i, from) {
      opener = from || null;
      show(i);
      box.setAttribute('data-open', 'true');
      document.documentElement.classList.add('has-lightbox');
      btnClose.focus();
    }

    function close() {
      box.setAttribute('data-open', 'false');
      document.documentElement.classList.remove('has-lightbox');
      if (opener) { opener.focus(); opener = null; }
    }

    // Delegated so cloned tiles work too
    document.addEventListener('click', function (e) {
      var tile = e.target.closest ? e.target.closest('.carousel__item[data-full]') : null;
      if (!tile) return;
      var path = tile.getAttribute('data-full');
      var i = 0;
      for (var n = 0; n < items.length; n++) {
        if (items[n].getAttribute('data-full') === path) { i = n; break; }
      }
      open(i, tile);
    });

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', function () { show(current - 1); });
    btnNext.addEventListener('click', function () { show(current + 1); });

    // Clicking the backdrop closes; clicking the photo itself does not
    box.addEventListener('click', function (e) {
      if (e.target === box) close();
    });

    document.addEventListener('keydown', function (e) {
      if (box.getAttribute('data-open') !== 'true') return;
      if (e.key === 'Escape') { close(); }
      else if (e.key === 'ArrowLeft') { show(current - 1); }
      else if (e.key === 'ArrowRight') { show(current + 1); }
      else if (e.key === 'Tab') {
        // keep focus inside the dialog while it is open
        var focusable = [btnClose, btnPrev, btnNext];
        var at = focusable.indexOf(document.activeElement);
        e.preventDefault();
        var step = e.shiftKey ? -1 : 1;
        focusable[(at + step + focusable.length) % focusable.length].focus();
      }
    });
  }

  /* Hover treatment for the call-to-action buttons.
     A dot grows to fill the button while the label slides out and a second
     label slides in behind an arrow. The original content is kept as the
     visible label; the incoming copy is aria-hidden so nothing is announced
     twice. */
  function wireButtons() {
    var ARROW =
      '<svg class="btn__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"' +
      ' stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M5 12h14M13 6l6 6-6 6"/></svg>';

    document.querySelectorAll('.btn').forEach(function (btn) {
      if (btn.querySelector('.btn__label')) return;      // already wired

      // Ignore any screen-reader-only note when building the incoming copy
      var note = btn.querySelector('.visually-hidden');
      var label = btn.textContent;
      if (note) label = label.replace(note.textContent, '');
      label = label.replace(/\s+/g, ' ').trim();

      btn.innerHTML =
        '<span class="btn__label">' + btn.innerHTML + '</span>' +
        '<span class="btn__hover" aria-hidden="true">' + label + ARROW + '</span>' +
        '<span class="btn__dot" aria-hidden="true"></span>';
      btn.classList.add('btn--fx');
    });
  }

  function init() {
    var headerSlot = document.getElementById('site-header');
    var footerSlot = document.getElementById('site-footer');

    if (headerSlot) headerSlot.outerHTML = headerHTML(currentKey());
    if (footerSlot) footerSlot.outerHTML = footerHTML();

    wireButtons();      // before anything measures layout
    wireMobileNav();
    wireCarousels();
    wireSpotlight();
    wireLightbox();   // after wireCarousels, so cloned tiles are already present
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
