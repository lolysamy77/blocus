(function() {
  function inject() {
    if (document.getElementById('mobile-menu')) return;
    const topbar = document.getElementById('topbar');
    if (!topbar) return;
    const nav = document.getElementById('nav');
    if (!nav) return;

    const btn = document.createElement('button');
    btn.className = 'menu-toggle';
    btn.setAttribute('aria-label', 'Ouvrir le menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    nav.appendChild(btn);

    const menu = document.createElement('div');
    menu.id = 'mobile-menu';
    const header = document.createElement('div');
    header.id = 'mobile-menu-header';
    const title = document.createElement('h2');
    title.textContent = 'Menu';
    const close = document.createElement('button');
    close.id = 'mobile-menu-close';
    close.setAttribute('aria-label', 'Fermer le menu');
    close.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    header.appendChild(title);
    header.appendChild(close);
    menu.appendChild(header);

    const links = document.createElement('div');
    links.id = 'mobile-menu-links';
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(a => {
      if (a.classList.contains('marque')) return;
      const clone = a.cloneNode(true);
      links.appendChild(clone);
    });
    menu.appendChild(links);
    document.body.appendChild(menu);

    function openMenu() {
      menu.classList.add('open');
      document.body.classList.add('menu-open');
      btn.setAttribute('aria-expanded', 'true');
    }
    function closeMenu() {
      menu.classList.remove('open');
      document.body.classList.remove('menu-open');
      btn.setAttribute('aria-expanded', 'false');
    }
    btn.addEventListener('click', openMenu);
    close.addEventListener('click', closeMenu);
    menu.addEventListener('click', e => { if (e.target === menu) closeMenu(); });
    links.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
