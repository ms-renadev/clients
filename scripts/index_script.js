
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
  });

  function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('open');
  }

  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  }));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
