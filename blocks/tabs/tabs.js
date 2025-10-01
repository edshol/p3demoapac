import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {

  const tabsBlock = block; //.querySelector(".tabs.block");

//  const tabsBlock = document.querySelector('.tabs.block');
  if (!tabsBlock) return;

  // ラベル一覧を収集
  const groups = Array.from(tabsBlock.querySelectorAll(':scope > div'));
  if (groups.length === 0) return;

  // tab-list を作成
  const tabList = document.createElement('div');
  tabList.className = 'tab-list';
  tabList.setAttribute('role', 'tablist');

  groups.forEach((group, index) => {
    const label = group.querySelector(':scope > div:first-child');
    if (!label) return;

    const button = document.createElement('button');
    button.className = 'tabs-tab';
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    button.textContent = label.textContent.trim();

    tabList.appendChild(button);
  });

  // tabs.block の最初に挿入
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
