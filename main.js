/* ============================================================
   آستین — scroll animations
   ============================================================ */

(function () {
  "use strict";

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = Number(entry.target.dataset.delay || 0);
          setTimeout(() => entry.target.classList.add("visible"), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document
    .querySelectorAll(
      ".intro p, .app-card, .phone-mock, .tl-item, .stat-item, .kiosk-visual"
    )
    .forEach((el, i) => {
      el.dataset.delay = (i % 5) * 80;
      observer.observe(el);
    });
})();