import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const resp = await fetch('/fragments/wheelercat/header.html');
  if (!resp.ok) return;
  block.innerHTML = await resp.text();

  // Burger toggle for mobile
  const burger = block.querySelector('.burger');
  const nav = block.querySelector('.main-nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open', !expanded);
    });
  }

  // Utility strip "More" menu keyboard support
  const moreBtn = block.querySelector('.utility-strip__more-trigger');
  if (moreBtn) {
    moreBtn.addEventListener('click', () => {
      const expanded = moreBtn.getAttribute('aria-expanded') === 'true';
      moreBtn.setAttribute('aria-expanded', String(!expanded));
    });
    // Dismiss when focus leaves the more menu
    const moreContainer = moreBtn.closest('.utility-strip__more');
    if (moreContainer) {
      moreContainer.addEventListener('focusout', (e) => {
        if (!moreContainer.contains(e.relatedTarget)) {
          moreBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }
}

export { loadFragment };
