import { updatePopup } from './popup';
import storage from './storage';

export function reqParse () {
  const sel = window.getSelection();
  const originalText = sel.toString();
  let texts = originalText.trim().split('\n');

  for (var i = 0; i < texts.length; i++) {
    if (texts[i].length === 0) {
      texts.splice(i, 1);
    }
  }

  let reqObj = {
    'jsonrpc':'2.0',
    'id':1,
    'method':'LMT_split_into_sentences',
    'params':{
      'texts': [],
      'lang':{
        'lang_user_selected':'auto',
        'user_preferred_langs':['DE', 'EN'] // Set preferrred languages
      }
    }
  };
  reqObj.params.texts = texts;

  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://www.deepl.com/jsonrpc', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      const res = JSON.parse(xhr.responseText);
      reqTranslate(res);
    }
  };
  xhr.send(JSON.stringify(reqObj));
}

export function reqTranslate(res) {
  const sel = window.getSelection();
  const originalText = sel.toString();
  const lang = res.result.lang;
  const langConfident = res.result.lang_is_confident;
  const textArr = res.result.splitted_texts;
  const jobs = [];

  for (var i = 0; i < textArr.length; i++) {
    const lines = textArr[i];

    if (i > 0) {
      jobs.push({
        'kind': 'enter',
        'raw_en_sentence': '-€€€-',
      });
    }

    for (var j = 0; j < lines.length; j++) {
      jobs.push({
        'kind': 'default',
        'raw_en_sentence': lines[j],
      });
    }
  }

  const reqObj = {
    'jsonrpc': '2.0',
    'method': 'LMT_handle_jobs',
    'params': {
      'jobs': [],
      'lang': {
        'user_preferred_langs': [],
        'source_lang_user_selected': 'auto',
        'target_lang': 'EN' // Translate to EN
      },
      'priority': -1
    },
    'id': 0
  };
  reqObj.params.jobs = jobs;

  if (lang === 'EN') {
    reqObj.params.lang.target_lang = 'DE'; // Reverse language
  }

  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://www.deepl.com/jsonrpc', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      const res = JSON.parse(xhr.responseText);
      res.original_text = originalText;
      storage.set({ translation: res }, function() {});
      updatePopup(res, 0);
    }
  };
  xhr.send(JSON.stringify(reqObj));
};