// Rockimals "today" page (website spec 036): plays each hero loop only while
// it is on screen, and never when the visitor prefers reduced motion. Without
// this script the loops' still posters show. No tracking.
(() => {
  const videos = [...document.querySelectorAll('[data-rockimals-today-loop]')];
  if (!videos.length || !('IntersectionObserver' in window)) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const visible = new Set();

  const sync = () => {
    for (const video of videos) {
      if (!reduce.matches && visible.has(video)) {
        video.play()?.catch(() => { /* autoplay refused: the poster stays */ });
      } else if (!video.paused) {
        video.pause();
      }
    }
  };

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    }
    sync();
  }, { threshold: 0.25 });
  videos.forEach((video) => observer.observe(video));
  reduce.addEventListener?.('change', sync);
})();
