import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    
    tabs.forEach(tab => {
      const label = tab.querySelector(".tab-label");
      const content = tab.querySelector(".tab-content");

      label.addEventListener("click", () => {
        // すべてリセット
        document.querySelectorAll(".tab-label").forEach(l => l.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

        // クリックしたタブをアクティブ化
        label.classList.add("active");
        content.classList.add("active");
      });
    });

    // 初期状態: 最初のタブを表示
    tabs[0].querySelector(".tab-label").classList.add("active");
    tabs[0].querySelector(".tab-content").classList.add("active");
  });

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
