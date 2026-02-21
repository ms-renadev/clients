
  // Nav scroll shadow
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
  });

  // Mobile menu
  function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('open');
  }
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  }));

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Filter rooms
  function filterRooms(filter, btn) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cards = document.querySelectorAll('.room-card');
    let sharedVisible = 0, privateVisible = 0;

    cards.forEach(card => {
      const tags = card.dataset.tags || '';
      const type = card.dataset.type || '';
      let show = false;

      if (filter === 'all') {
        show = true;
      } else if (filter === 'available') {
        show = card.dataset.status === 'available';
      } else if (filter === 'shared') {
        show = type === 'shared';
      } else if (filter === 'private') {
        show = type === 'private';
      } else if (filter === 'aircon') {
        show = tags.includes('aircon');
      }

      card.style.display = show ? '' : 'none';
      if (show) {
        if (type === 'shared') sharedVisible++;
        if (type === 'private') privateVisible++;
      }
    });

    // Show/hide group labels
    const groupShared = document.getElementById('group-shared');
    const groupPrivate = document.getElementById('group-private');
    groupShared.style.display = sharedVisible > 0 ? '' : 'none';
    groupPrivate.style.display = privateVisible > 0 ? '' : 'none';

    // Update counts
    document.getElementById('count-shared').textContent = sharedVisible + ' room' + (sharedVisible !== 1 ? 's' : '');
    document.getElementById('count-private').textContent = privateVisible + ' room' + (privateVisible !== 1 ? 's' : '');

    // Empty state
    const emptyState = document.getElementById('emptyState');
    const totalVisible = sharedVisible + privateVisible;
    emptyState.classList.toggle('visible', totalVisible === 0);
  }
