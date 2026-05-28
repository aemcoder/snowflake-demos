const BRANCHES = [
  'Salt Lake City (HQ)', 'Lindon', 'Sandy', 'Cedar City, UT', 'Ely',
  'Hurricane', 'Kaysville', 'Logan', 'Moab', 'Ogden',
  'Park City', 'Salina', 'Tooele', 'Vernal', 'West Valley',
];

export default function decorate(block) {
  const rows = [...block.children];

  // Row 0: eyebrow-band text
  const eyebrowBand = rows[0]?.textContent.trim() || 'FIND YOUR NEAREST BRANCH';

  // Row 1: proof paragraph (may have <strong> elements)
  const proofCell = rows[1]?.children[0];
  const proofHTML = proofCell?.innerHTML || '';

  block.textContent = '';

  const branchItems = BRANCHES.map(
    (city) => `<li><span class="icon icon-map-pin" aria-hidden="true"></span>${city}</li>`,
  ).join('');

  block.innerHTML = `
    <div class="locations__eyebrow-band">${eyebrowBand}</div>
    <div class="container">
      <p class="locations__proof">${proofHTML}</p>
      <ul class="branch-grid" aria-label="Wheeler Cat branch locations">
        ${branchItems}
      </ul>
      <p class="locations__more">Plus 3 additional locations &middot; <a href="/about/locations/">View all 18 branches</a></p>
    </div>
  `;
}
