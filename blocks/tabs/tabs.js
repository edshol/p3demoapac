import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {

  const tabsBlock = block; //.querySelector(".tabs.block");
  //const tabsBlock = document.querySelector('.tabs.block');
  if (!tabsBlock) return;

  const groups = Array.from(tabsBlock.querySelectorAll(':scope > div'));
  if (groups.length === 0) return;

  const labelsContainer = document.createElement('div');
  labelsContainer.className = 'tab-labels';

  const contentsContainer = document.createElement('div');
  contentsContainer.className = 'tab-contents';

  groups.forEach((group, index) => {
    const labelEl = group.querySelector(':scope > div:nth-child(1)');
    const contentEl = group.querySelector(':scope > div:nth-child(3)');
    if (!labelEl || !contentEl) return;

    // クローン（元DOMを移動しない）
    const labelClone = labelEl.cloneNode(true);
    labelClone.classList.add('tab-label');
    labelClone.setAttribute('data-tab-index', String(index));
    labelClone.setAttribute('role', 'tab');
    labelClone.tabIndex = 0;

    const contentClone = contentEl.cloneNode(true);
    contentClone.classList.add('tab-content');
    contentClone.setAttribute('data-tab-index', String(index));
    contentClone.setAttribute('role', 'tabpanel');

    // クリック（および Enter / Space キー）で切り替え
    const activate = () => {
      labelsContainer.querySelectorAll('.tab-label').forEach(l => {
        const isActive = l === labelClone;
        l.classList.toggle('active', isActive);
        l.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      contentsContainer.querySelectorAll('.tab-content').forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-tab-index') === labelClone.getAttribute('data-tab-index'));
      });
    };
    labelClone.addEventListener('click', activate);
    labelClone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });

    labelsContainer.appendChild(labelClone);
    contentsContainer.appendChild(contentClone);

    // 初期アクティブは最初のタブ
    if (index === 0) {
      labelClone.classList.add('active');
      labelClone.setAttribute('aria-selected', 'true');
      contentClone.classList.add('active');
    } else {
      labelClone.setAttribute('aria-selected', 'false');
    }
  });

  // 元のDOMは消さずに（今回は中身を置換）新しいUIを挿入
  tabsBlock.innerHTML = '';
  tabsBlock.appendChild(labelsContainer);
  tabsBlock.appendChild(contentsContainer);


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
