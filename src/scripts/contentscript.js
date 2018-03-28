import ext from './utils/ext';
import storage from './utils/storage';
import { showPopup, hidePopup, updatePopup } from './utils/popup';
import { reqParse } from './utils/reqTranslate';

document.addEventListener('pointerup', function(e) {
  const id = e.target.id;
  const parentId = e.target.parentNode.id;
  if (id === 'deepl-popup' || parentId === 'deepl-popup') {
    return;
  }

  storage.get('translation', function (resp) {
    const sel = window.getSelection();
    const originalText = resp.translation.original_text;

    // Grab from cache if identical
    if (originalText.trim() == sel.toString().trim()) {
      showPopup();
      updatePopup(resp.translation, 0);
      return;
    }

    const type = e.target.type;
    if (type === 'textarea' || type === 'input') {
      hidePopup();
      return;
    }

    if (sel.isCollapsed) {
      hidePopup();
      return;
    }

    showPopup();

    reqParse();
  });
});

document.addEventListener('keydown', function(e) {
  // Close popup esc
  if (e.keyCode === 27) {
    hidePopup();
  }
});