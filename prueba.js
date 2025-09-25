
  const carousel = document.getElementById('carousel');
  const track = carousel.querySelector('.track');
  const slides = [...carousel.querySelectorAll('.slide')];
  const dots = [...carousel.querySelectorAll('.dots button')];

  let current = 0;

  function goTo(i){
    if (i < 0 || i >= slides.length) return;
    current = i;
    track.style.transform = `translateX(-${i * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[i]?.classList.add('active');
  }

  // Click en los botones 1,2,3,5
  dots.forEach(btn => {
    btn.addEventListener('click', () => goTo(Number(btn.dataset.slide)));
  });

  // Teclas ← → para navegar
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goTo(Math.min(current + 1, slides.length - 1));
    if (e.key === 'ArrowLeft')  goTo(Math.max(current - 1, 0));
  });

  // Swipe básico en pantallas táctiles
  let startX = null;
  track.addEventListener('touchstart', (e) => startX = e.touches[0].clientX, {passive:true});
  track.addEventListener('touchend', (e) => {
    if (startX == null) return;
    const endX = (e.changedTouches[0] || {}).clientX ?? startX;
    const dx = endX - startX;
    if (Math.abs(dx) > 40){
      if (dx < 0) goTo(Math.min(current + 1, slides.length - 1));
      else        goTo(Math.max(current - 1, 0));
    }
    startX = null;
  });

  // Arranque
  goTo(0);

