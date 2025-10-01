import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {

  const tabsBlock = block; //.querySelector(".tabs.block");
  //const tabsBlock = document.querySelector('.tabs.block');
  if (!tabsBlock) return;

  const groups = Array.from(tabsBlock.querySelectorAll(':scope > div'));
  if (groups.length === 0) return;

  const tabList = document.createElement('div');
  tabList.className = 'tab-list';

  const groupName = 'tabs-' + Math.random().toString(36).substr(2, 5);

  groups.forEach((group, index) => {
    const labelEl = group.querySelector(':scope > div:first-child');
    if (!labelEl) return;

    const inputId = `${groupName}-tab-${index}`;

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = groupName;
    input.id = inputId;
    if (index === 0) input.checked = true;

    const label = document.createElement('label');
    label.setAttribute('for', inputId);
    label.textContent = labelEl.textContent.trim();

    tabList.appendChild(input);
    tabList.appendChild(label);
  });

  tabsBlock.insertBefore(tabList, tabsBlock.firstChild);





//   /* change to ul, li */
//   const ul = document.createElement('ul');
//   [...block.children].forEach((row) => {
//     const li = document.createElement('li');
//     moveInstrumentation(row, li);
//     while (row.firstElementChild) li.append(row.firstElementChild);
//     [...li.children].forEach((div) => {
//       if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
//       else div.className = 'cards-card-body';
//     });
//     ul.append(li);
//   });
//   ul.querySelectorAll('picture > img').forEach((img) => {
//     const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
//     moveInstrumentation(img, optimizedPic.querySelector('img'));
//     img.closest('picture').replaceWith(optimizedPic);
//   });
//   block.textContent = '';
//   block.append(ul);
}
