import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {

  const tabsBlock = block; //.querySelector(".tabs.block");
  if (!tabsBlock) return;

  // ラベルバーとコンテンツ領域を作成
  const labelsContainer = document.createElement("div");
  labelsContainer.classList.add("tab-labels");
  const contentsContainer = document.createElement("div");
  contentsContainer.classList.add("tab-contents");

  // 既存の構造からラベルとコンテンツを抽出
  const tabGroups = tabsBlock.querySelectorAll(":scope > div");
  tabGroups.forEach((group, index) => {
    const label = group.querySelector(":scope > div:nth-child(1)");
    const content = group.querySelector(":scope > div:nth-child(3)");

    // クローンして別の場所に配置
    const labelClone = label.cloneNode(true);
    const contentClone = content.cloneNode(true);

    labelsContainer.appendChild(labelClone);
    contentsContainer.appendChild(contentClone);

    // クリックイベント
    labelClone.addEventListener("click", () => {
      // 全部リセット
      labelsContainer.querySelectorAll("div").forEach(l => l.classList.remove("active"));
      contentsContainer.querySelectorAll("div").forEach(c => c.classList.remove("active"));

      // アクティブ化
      labelClone.classList.add("active");
      contentClone.classList.add("active");
    });

    // 最初のタブを初期表示
    if (index === 0) {
      labelClone.classList.add("active");
      contentClone.classList.add("active");
    }
  });

  // 元のtabs.block内をクリアして新しい構造を追加
  tabsBlock.innerHTML = "";
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
