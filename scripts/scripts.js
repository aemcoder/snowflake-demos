import {
  decorateBlocks,
  decorateIcons,
  decorateSections,
  decorateTemplateAndTheme,
  loadCSS,
  loadFooter,
  loadHeader,
  loadSection,
  loadSections,
  sampleRUM,
  setup,
  waitForFirstImage,
} from './aem.js';

/**
 * Turn bare links into styled buttons when they are the sole child of a <p>
 * (matches the EDS convention for CTAs in default content).
 */
function decorateButtons(main) {
  main.querySelectorAll('a').forEach((a) => {
    const up = a.parentElement;
    if (!up) return;
    const twoup = up.parentElement;
    if (
      up.childNodes.length === 1
      && (up.tagName === 'P' || up.tagName === 'DIV')
      && twoup?.classList.contains('default-content-wrapper')
    ) {
      a.className = 'button primary';
      up.classList.add('button-container');
    }
  });
}

/**
 * Auto-blocking: add fragment blocks for any links to /fragments/ paths.
 */
function buildAutoBlocks() {
  // no auto-blocks for this conversion
}

/**
 * Decorate the main element: sections, blocks, buttons.
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }
}

async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  if (hash) {
    const el = document.getElementById(hash.substring(1));
    if (el) el.scrollIntoView();
  }

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
}

function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
}

async function loadPage() {
  await setup();
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
