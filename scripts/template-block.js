import { loadCSS } from './aem.js';

/**
 * Shared template-literal + named-slot engine for hybrid EDS blocks.
 *
 * DA block rows are positional — no key column. The engine splits rows into
 * leading fields, a collection region, and trailing fields by reading the
 * template's own marker structure.
 *
 * Template attribute API:
 *   data-field    — standalone whole-row field; filled from the matching
 *                   leading or trailing DA row's single cell (by position)
 *   data-group    — fixed item with baked-in chrome (e.g. SVG icon); its inner
 *                   [data-slot] children are filled positionally from the
 *                   matching collection row's cells
 *   data-repeat   — variable-length item; cloned once per collection row; each
 *                   clone's inner [data-slot] children filled positionally
 *   data-slot     — inner item part, used only inside data-group / data-repeat
 *
 * The lazy design-system stylesheet is loaded once, by convention from
 * styles/theme.css. Rename that one path below if your project differs.
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
 * Used for table-like row reveals (e.g. a hero live-app mock).
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
 * Fill a template element with content from a DA cell div.
 *
 * Dispatch rules:
 *   <img>  → replaced with the authored <picture> or <img> from the cell
 *   <a>    → href + text copied from the authored link; template classes kept
 *   other  → children replaced with cloned child nodes from the cell
 *
 * Used for both data-field elements (outer fields) and data-slot elements
 * (inner item parts inside data-group / data-repeat).
 *
 * @param {Element} slotEl    - template element to fill
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

// Stored once; all subsequent awaits on this promise resolve instantly.
let themeCSSPromise = null;

/**
 * Render a block from an inline HTML template string.
 *
 * DA rows are positional — no key column. The engine partitions the block's rows
 * into three regions by counting the template's own markers:
 *   leading fields  → first L rows, one cell each (standalone content)
 *   collection rows → middle rows, one per group/repeat item
 *   trailing fields → last T rows, one cell each (content after the items)
 *
 * Async so callers (block decorate functions) can await it — EDS will not
 * show the section until decorate() resolves, guaranteeing theme.css is
 * applied before any content is visible (zero CLS from lazy CSS load).
 *
 * @param {Element} block        - the block element (div.name.block)
 * @param {string}  templateHTML - verbatim source markup with slot markers
 */
export async function renderTemplate(block, templateHTML) {
  if (!themeCSSPromise) {
    document.documentElement.classList.add('js');
    themeCSSPromise = loadCSS(`${window.hlx.codeBasePath}/styles/theme.css`);
  }
  await themeCSSPromise;

  const tpl = document.createElement('template');
  tpl.innerHTML = templateHTML;
  const frag = tpl.content;

  // Collect markers in document order
  const fields = [...frag.querySelectorAll('[data-field]')];
  const repeatEl = frag.querySelector('[data-repeat]');
  const groups = [...frag.querySelectorAll('[data-group]')];
  const collectionStart = repeatEl ?? groups[0] ?? null;
  const collectionEnd = repeatEl ?? (groups.length ? groups[groups.length - 1] : null);

  // Split fields into leading (before collection) and trailing (after collection)
  const leadingFields = fields.filter((f) => {
    if (!collectionStart) return true;
    // DOCUMENT_POSITION_PRECEDING (2): f appears before collectionStart
    // eslint-disable-next-line no-bitwise
    return !!(collectionStart.compareDocumentPosition(f) & Node.DOCUMENT_POSITION_PRECEDING);
  });
  const trailingFields = fields.filter((f) => {
    if (!collectionEnd) return false;
    // DOCUMENT_POSITION_FOLLOWING (4): f appears after collectionEnd
    // eslint-disable-next-line no-bitwise
    return !!(collectionEnd.compareDocumentPosition(f) & Node.DOCUMENT_POSITION_FOLLOWING);
  });

  // Partition DA rows to match the three template regions
  const rows = [...block.children];
  const L = leadingFields.length;
  const T = trailingFields.length;
  const leadingRows = rows.slice(0, L);
  const trailingRows = T > 0 ? rows.slice(rows.length - T) : [];
  const collectionRows = rows.slice(L, T > 0 ? rows.length - T : rows.length);

  // Fill leading fields (one cell per row, matched by position)
  leadingFields.forEach((fieldEl, i) => {
    fieldEl.removeAttribute('data-field');
    const row = leadingRows[i];
    if (row?.children[0]) fillSlot(fieldEl, row.children[0]);
  });

  // Fill trailing fields
  trailingFields.forEach((fieldEl, i) => {
    fieldEl.removeAttribute('data-field');
    const row = trailingRows[i];
    if (row?.children[0]) fillSlot(fieldEl, row.children[0]);
  });

  // Fill collection: repeat (variable-length) or groups (fixed count)
  if (repeatEl) {
    collectionRows.forEach((row) => {
      const cells = [...row.children];
      const clone = repeatEl.cloneNode(true);
      clone.removeAttribute('data-repeat');
      [...clone.querySelectorAll('[data-slot]')].forEach((slotEl, i) => {
        if (cells[i]) fillSlot(slotEl, cells[i]);
        else slotEl.removeAttribute('data-slot');
      });
      repeatEl.before(clone);
    });
    repeatEl.remove();
  } else {
    groups.forEach((groupEl, i) => {
      groupEl.removeAttribute('data-group');
      const cells = collectionRows[i] ? [...collectionRows[i].children] : [];
      [...groupEl.querySelectorAll('[data-slot]')].forEach((slotEl, j) => {
        if (cells[j]) fillSlot(slotEl, cells[j]);
        else slotEl.removeAttribute('data-slot');
      });
    });
  }

  block.replaceChildren(frag);
  observeReveals(block);
}
