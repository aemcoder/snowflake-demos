import { renderTemplate } from '../../scripts/template-block.js';

const TEMPLATE = `
<div class="wrap">
  <div class="brand-row">
    <div class="brand-tile" data-repeat><span data-slot></span></div>
  </div>
</div>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
