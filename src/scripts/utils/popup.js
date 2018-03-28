import { getLanguage } from './language';
import { loading, arrow } from './svg';

const popupStyles = [
  'display:none;',
  'position:absolute;',
  'padding:10px;',
  'margin:20px 0 0 0;',
  'background:#fff;',
  'font-size: 15px;',
  'font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;',
  'line-height: 22px;',
  'color:#000;',
  'max-width: 400px;',
  'z-index: 2147483647;',
  'box-shadow: 0 0 10px 0 gray;',
];

const bylineStyles = [
  'color: #909090;',
  'font-size: 10px;',
];

export function showPopup () {
  let popup = document.getElementById('deepl-popup');

  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'deepl-popup';
    popup.style.cssText = popupStyles.join('');
    document.body.appendChild(popup);
  }
  popup.innerHTML = `${loading}`;
  popup.style.display = 'block';

  const sel = window.getSelection();
  const range = sel.getRangeAt(0).getBoundingClientRect()
  const relative = document.body.parentNode.getBoundingClientRect();
  popup.style.top = (range.bottom - relative.top) + 'px';
  popup.style.left = (range.left - relative.left ) + 'px';
};

export function hidePopup() {
  const popup = document.getElementById('deepl-popup');

  if (popup) {
    popup.style.display = 'none';
  }
};

export function updatePopup(translation, beam = 0) {
  const sourceLang = translation.result.source_lang;
  const targetLang = translation.result.target_lang;
  const confidence = translation.result.source_lang_is_confident;
  const translations = translation.result.translations;
  const textArray = [];

  for (var i = 0; i < translations.length; i++) {
    if (translations[i].beams[beam].postprocessed_sentence === '-€€€-') {
      textArray.push('<br style="line-height:26px;" />');
    } else {
      textArray.push(translations[i].beams[beam].postprocessed_sentence);
    }
  }

  const popup = document.getElementById('deepl-popup');
  popup.innerHTML = `
    <div>${textArray.join(' ')}</div>
    <div style="${bylineStyles.join('')}">${getLanguage(sourceLang)} ${arrow} ${getLanguage(targetLang)}, confidence: ${confidence * 100}%.</div>
  `;
};