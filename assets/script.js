// Navegação responsiva, links de seção e pequenos ajustes de acessibilidade.
(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#menu-principal');
  const links = [...document.querySelectorAll('.nav-link')];
  if (!header || !toggle || !menu) return;
  const close = () => {
    header.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Abrir menu');
  };
  toggle.addEventListener('click', () => {
    const open = !header.classList.contains('menu-open');
    header.classList.toggle('menu-open',open);
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open ? 'Fechar menu' : 'Abrir menu');
  });
  links.forEach(a => a.addEventListener('click',close));
  document.addEventListener('keydown',e => { if(e.key === 'Escape') close(); });
  document.addEventListener('click',e => { if(!header.contains(e.target)) close(); });
  window.addEventListener('resize',() => { if(window.innerWidth > 970) close(); });
  if ('IntersectionObserver' in window) {
    const sections = [...document.querySelectorAll('main section[id]')];
    const observer = new IntersectionObserver(entries => {
      const seen = entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
      if (!seen.length) return;
      const id = '#' + seen[0].target.id;
      links.forEach(link => link.classList.toggle('active',link.getAttribute('href')===id));
    },{rootMargin:'-17% 0px -58% 0px',threshold:[0,.1,.5]});
    sections.forEach(section=>observer.observe(section));
  }
})();
