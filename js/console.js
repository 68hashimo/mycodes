const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && mutation.target.nodeName === 'DIV' && mutation.target.classList.contains('console-log')) {
        const message = mutation.target.textContent;
        if (message.match("挙手したユーザーのPeerID:")) {
          console.log('特定の文字列が出力されました:', message);
        }
      }
    }
  });
  
  // メインのJavaScriptファイル
  
import { observer } from './script.js';
  
// 監視対象の要素を指定して監視を開始
observer.observe(document.querySelector('.console'), { childList: true });