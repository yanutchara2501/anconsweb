// Portfolio: category filter + lightbox for project.html
(function () {
  var root = document.querySelector('[data-portfolio]');
  if (!root) return;

  var filters = root.querySelectorAll('.portfolio-filter');
  var items = Array.prototype.slice.call(root.querySelectorAll('.portfolio-item'));

  // Show how many works each category has
  filters.forEach(function (btn) {
    var cat = btn.getAttribute('data-filter');
    var n = cat === 'all' ? items.length : items.filter(function (it) { return it.getAttribute('data-cat') === cat; }).length;
    var badge = document.createElement('span');
    badge.className = 'count';
    badge.textContent = n;
    btn.appendChild(badge);
  });

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-filter');
      filters.forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      items.forEach(function (it) {
        it.hidden = !(cat === 'all' || it.getAttribute('data-cat') === cat);
      });
    });
  });

  // Lightbox
  var dlg = document.getElementById('portfolio-lightbox');
  if (!dlg || typeof dlg.showModal !== 'function') return;
  var img = dlg.querySelector('img');
  var title = dlg.querySelector('figcaption strong');
  var sub = dlg.querySelector('figcaption span');
  var current = 0;

  function visible() {
    return items.filter(function (it) { return !it.hidden; });
  }

  function show(it) {
    var thumb = it.querySelector('img');
    img.src = thumb.getAttribute('src');
    img.alt = thumb.getAttribute('alt');
    title.textContent = it.querySelector('.portfolio-title').textContent + ' · ' + it.querySelector('.portfolio-title-th').textContent;
    sub.textContent = it.querySelector('.portfolio-place').textContent;
  }

  function step(d) {
    var list = visible();
    current = (current + d + list.length) % list.length;
    show(list[current]);
  }

  items.forEach(function (it) {
    it.querySelector('.portfolio-card').addEventListener('click', function () {
      current = visible().indexOf(it);
      show(it);
      dlg.showModal();
    });
  });

  dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
  dlg.querySelector('.lb-prev').addEventListener('click', function () { step(-1); });
  dlg.querySelector('.lb-next').addEventListener('click', function () { step(1); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();
