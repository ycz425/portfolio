document.getElementById('year').textContent = new Date().getFullYear();

const projectLinks = document.querySelectorAll('.project-nav-link');
const projectCards = document.querySelectorAll('.project-card[id]');
let scrollLocked = false;
let unlockTimer;

function setActiveProject(id) {
  projectLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
  });
}

projectLinks.forEach((link) => {
  link.addEventListener('click', () => {
    setActiveProject(link.getAttribute('href').slice(1));
    scrollLocked = true;
    const unlock = () => {
      scrollLocked = false;
      window.removeEventListener('scrollend', unlock);
      clearTimeout(unlockTimer);
    };
    window.addEventListener('scrollend', unlock);
    clearTimeout(unlockTimer);
    unlockTimer = setTimeout(unlock, 1500);
  });
});

if ('IntersectionObserver' in window && projectCards.length) {
  const observer = new IntersectionObserver((entries) => {
    if (scrollLocked) return;
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveProject(entry.target.id);
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  projectCards.forEach((card) => observer.observe(card));
}

const projectNav = document.querySelector('.project-nav');
const projectSection = document.getElementById('project');
if (projectNav && projectSection && 'IntersectionObserver' in window) {
  new IntersectionObserver((entries) => {
    entries.forEach((entry) => projectNav.classList.toggle('visible', entry.isIntersecting));
  }, { rootMargin: '-20% 0px -20% 0px' }).observe(projectSection);
}
