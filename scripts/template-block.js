import { loadCSS } from './aem.js';

/**
 * Shared template-literal + named-slot engine for hybrid EDS blocks.
 *
 * DA block rows are slot-keyed: the first cell of each row is the slot key,
 * remaining cells are the values.  Rows with the same key repeat.
 *
 * Template attribute API:
 *   data-slot="s"    — replaced with content from the singleton row keyed "s"
 *   data-repeat="r"  — cloned once per DA row keyed "r"; each clone's inner
 *                      [data-slot] elements are filled positionally from that
 *                      row's value cells
 *   data-group="g"   — node with a baked-in structure (e.g. unique SVG icon);
 *                      its inner [data-slot] elements are filled positionally
 *                      from the first DA row keyed "g"
 */

// ─── Observers (module-level singletons) ─────────────────────────────────────

let revealObserver;
let countupObserver;

function getRevealObserver() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('in');
          revealObserver.unobserve(e.target);
        });
      },
      { threshold: 0.15 },
    );
  }
  return revealObserver;
}

// ─── Behavior exports ─────────────────────────────────────────────────────────

/** Animate a count-up number from zero to its data-countup target. */
export function runCountup(el) {
  const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  const target = +el.dataset.countup;
  const pre = el.dataset.prefix || '';
  const suf = el.dataset.suffix || '';
  if (reduce) { el.textContent = pre + target + suf; return; }
  const dur = 1100;
  const t0 = performance.now();
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / dur);
    const ease = 1 - (1 - p) ** 3;
    el.textContent = pre + Math.round(target * ease) + suf;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function getCountupObserver() {
  if (!countupObserver) {
    countupObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          if (e.target.dataset.countup !== undefined) runCountup(e.target);
          if (e.target.tagName === 'I' && e.target.dataset.fill) {
            e.target.style.transform = `scaleX(${parseFloat(e.target.dataset.fill) / 100})`;
          }
          countupObserver.unobserve(e.target);
        });
      },
      { threshold: 0.3 },
    );
  }
  return countupObserver;
}

/** Start observing all .reveal elements inside scope for entrance animation. */
export function observeReveals(scope) {
  const obs = getRevealObserver();
  scope.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
}

/**
 * Reset all [data-countup] elements to "0" then start the scroll-triggered
 * count-up + bar-fill observer.  Call once per block after renderTemplate.
 */
export function initCountup(scope) {
  const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  if (!reduce) {
    scope.querySelectorAll('[data-countup]').forEach((el) => {
      el.textContent = `${el.dataset.prefix || ''}0${el.dataset.suffix || ''}`;
    });
  }
  const obs = getCountupObserver();
  scope.querySelectorAll('[data-countup], .bar i[data-fill]').forEach((el) => obs.observe(el));
}

/**
 * Stagger-animate .row elements inside scope with a cascade entrance.
 * Used for the hero live-app table rows.
 */
export function cascadeRows(scope) {
  const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  [...scope.querySelectorAll('.row')].forEach((r, i) => {
    if (reduce) { r.style.opacity = '1'; r.style.transform = 'none'; return; }
    r.animate(
      [
        { opacity: 0, transform: 'translateY(14px) rotateX(8deg)' },
        { opacity: 1, transform: 'none' },
      ],
      {
        duration: 600,
        delay: 300 + i * 120,
        easing: 'cubic-bezier(.25,.46,.45,.94)',
        fill: 'forwards',
      },
    );
  });
}

/**
 * Wire tab-switching for .tab buttons and .panel divs inside block.
 * Tabs use data-p attribute; panels use matching id="p-{value}".
 */
export function initTabs(block) {
  const tabs = [...block.querySelectorAll('.tab')];
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    tabs.forEach((t) => t.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');
    block.querySelectorAll('.panel').forEach((p) => p.classList.remove('on'));
    block.querySelector(`#p-${tab.dataset.p}`)?.classList.add('on');
  }));
}

// ─── Slot engine ──────────────────────────────────────────────────────────────

/**
 * Normalize a DA value cell: unwrap a lone child element so callers see the
 * actual content (e.g. <p> produced by wrapTextNodes, <ul>, <picture>, etc.).
 *
 * @param {Element} cell - a cell div from the DA row
 * @returns {Element} the sole child element, or the cell itself if 0 or 2+
 */
function normalizeCell(cell) {
  return cell.children.length === 1 ? cell.children[0] : cell;
}

/**
 * Fill a template slot element with content from a DA value cell.
 *
 * Dispatch rules:
 *   <img>  → replaced with the authored <picture> or <img> from the cell
 *   <a>    → href + text copied from the authored link; template classes kept
 *   other  → innerHTML set from the normalized cell content
 *
 * @param {Element} slotEl    - element bearing the data-slot attribute
 * @param {Element} valueCell - cell div from the DA row
 */
function fillSlot(slotEl, valueCell) {
  const content = normalizeCell(valueCell);
  slotEl.removeAttribute('data-slot');

  const { tagName } = slotEl;

  if (tagName === 'IMG') {
    const pic = content.querySelector('picture') ?? content.querySelector('img');
    if (pic) slotEl.replaceWith(pic.cloneNode(true));
    return;
  }

  if (tagName === 'A') {
    const authored = content.tagName === 'A' ? content : content.querySelector('a');
    if (authored) {
      slotEl.href = authored.getAttribute('href') ?? '#';
      slotEl.textContent = authored.textContent.trim();
    } else {
      slotEl.textContent = content.textContent.trim();
    }
    return;
  }

  slotEl.replaceChildren(...[...content.childNodes].map((n) => n.cloneNode(true)));
}

/**
 * Parse a block's DA rows into two maps for slot resolution.
 *
 * singletons  Map<key, firstValueCell>     used by standalone data-slot
 * repeats     Map<key, valueCells[][]>     used by data-repeat and data-group
 */
function parseRows(block) {
  const singletons = new Map();
  const repeats = new Map();
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (!cells.length) return;
    const key = cells[0].textContent.trim().toLowerCase();
    const valueCells = cells.slice(1);
    if (!singletons.has(key)) singletons.set(key, valueCells[0]);
    if (!repeats.has(key)) repeats.set(key, []);
    repeats.get(key).push(valueCells);
  });
  return { singletons, repeats };
}

/**
 * Render a block from an inline HTML template string.
 *
 * Processing order: data-repeat → data-group → data-slot (standalone).
 * All marker attributes are stripped from the final DOM.
 *
 * @param {Element} block        - the block element (div.name.block)
 * @param {string}  templateHTML - verbatim source markup with slot markers
 */
// Stored once; all subsequent awaits on this promise resolve instantly.
let knackCSSPromise = null;

/**
 * Render a block from an inline HTML template string.
 * Async so callers (block decorate functions) can await it — EDS will not
 * show the section until decorate() resolves, guaranteeing knack.css is
 * applied before any content is visible (zero CLS from lazy CSS load).
 */
export async function renderTemplate(block, templateHTML) {
  if (!knackCSSPromise) {
    document.documentElement.classList.add('js');
    knackCSSPromise = loadCSS(`${window.hlx.codeBasePath}/styles/knack.css`);
  }
  await knackCSSPromise;

  const { singletons, repeats } = parseRows(block);

  const tpl = document.createElement('template');
  tpl.innerHTML = templateHTML;
  const frag = tpl.content;

  // 1. data-repeat: clone once per matching DA row, fill inner slots positionally
  frag.querySelectorAll('[data-repeat]').forEach((repeatEl) => {
    const key = repeatEl.dataset.repeat.toLowerCase();
    (repeats.get(key) ?? []).forEach((valueCells) => {
      const clone = repeatEl.cloneNode(true);
      clone.removeAttribute('data-repeat');
      [...clone.querySelectorAll('[data-slot]')].forEach((slotEl, i) => {
        if (valueCells[i]) fillSlot(slotEl, valueCells[i]);
        else slotEl.removeAttribute('data-slot');
      });
      repeatEl.before(clone);
    });
    repeatEl.remove();
  });

  // 2. data-group: fixed node; fill inner slots positionally from first match
  frag.querySelectorAll('[data-group]').forEach((groupEl) => {
    const key = groupEl.dataset.group.toLowerCase();
    groupEl.removeAttribute('data-group');
    const valueCells = repeats.get(key)?.[0] ?? [];
    [...groupEl.querySelectorAll('[data-slot]')].forEach((slotEl, i) => {
      if (valueCells[i]) fillSlot(slotEl, valueCells[i]);
      else slotEl.removeAttribute('data-slot');
    });
  });

  // 3. data-slot (standalone): fill from singleton map by key name
  frag.querySelectorAll('[data-slot]').forEach((slotEl) => {
    const key = slotEl.dataset.slot.toLowerCase();
    const cell = singletons.get(key);
    if (cell) fillSlot(slotEl, cell);
    else slotEl.removeAttribute('data-slot');
  });

  block.replaceChildren(frag);
  observeReveals(block);
}
