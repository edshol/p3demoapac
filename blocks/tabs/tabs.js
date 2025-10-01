import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {

  const tabs = document.querySelectorAll(".tab");
    
  const tabBlocks = document.querySelectorAll(".tabs.block > div");

  tabBlocks.forEach(block => {
    const label = block.querySelector(":scope > div:nth-child(1)");
    const content = block.querySelector(":scope > div:nth-child(3)");

    label.addEventListener("click", () => {
      // 全部リセット
      document.querySelectorAll(".tabs.block > div > div:nth-child(1)").forEach(l => l.classList.remove("active"));
      document.querySelectorAll(".tabs.block > div > div:nth-child(3)").forEach(c => c.classList.remove("active"));

      // 選択タブをアクティブ化
      label.classList.add("active");
      content.classList.add("active");
    });
  });

  // 初期状態: 最初のタブを表示
  const firstLabel = document.querySelector(".tabs.block > div:first-child > div:nth-child(1)");
  const firstContent = document.querySelector(".tabs.block > div:first-child > div:nth-child(3)");
  if (firstLabel && firstContent) {
    firstLabel.classList.add("active");
    firstContent.classList.add("active");
  }


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
