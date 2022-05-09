const bodyElem = document.body;
const btnsArr = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'],
  ['Ctrl', 'Win', 'Alt', '', 'Alt', '◄', '▼', '►', 'Ctrl'],
];

const btnsArrShift = [
  ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del'],
  ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '▲', 'Shift'],
  ['Ctrl', 'Win', 'Alt', '', 'Alt', '◄', '▼', '►', 'Ctrl'],
];

const btnsArrRu = [
  ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del'],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
  ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift'],
  ['Ctrl', 'Win', 'Alt', '', 'Alt', '◄', '▼', '►', 'Ctrl'],
];

const btnsArrShiftRu = [
  ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'],
  ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del'],
  ['CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'],
  ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '▲', 'Shift'],
  ['Ctrl', 'Win', 'Alt', '', 'Alt', '◄', '▼', '►', 'Ctrl'],
];

let currentBtnsArr = btnsArr;
let currentLanguage = localStorage.getItem('localCurrentLanguage') || 'en';

const createBaseMarkup = () => {
  const baseMarkup = `<div class="page__laptop laptop">
  <div class="laptop__head">
      <h1 class="laptop__title">Virtual keyboard</h1>
      <textarea class="laptop__screen js-laptop-screen" autofocus></textarea>
  </div>
  <div class="laptop__body">
      <p class="keyboard__lang">Для переключения языка комбинация: Alt + Shift</p>
      <div class="laptop__keyboard keyboard js-keyboard"></div>
      <p class="keyboard__info">Клавиатура создана в операционной системе Windows</p>
  </div>
</div>`;

  bodyElem.insertAdjacentHTML('afterbegin', baseMarkup);
};

createBaseMarkup();

const laptopScreenElem = bodyElem.querySelector('.js-laptop-screen');
const keyboardElem = bodyElem.querySelector('.js-keyboard');
let isCaps = false;

const createBtn = (name) => {
  const btnElem = document.createElement('button');
  btnElem.textContent = name;
  btnElem.setAttribute('type', 'button');
  btnElem.classList.add('keyboard__btn');

  switch (name) {
    case 'Backspace':
      btnElem.classList.add('keyboard__btn--control', 'keyboard__btn--is-big', 'keyboard__btn--backspace');
      break;

    case 'Tab':
      btnElem.classList.add('keyboard__btn--control', 'keyboard__btn--is-big', 'keyboard__btn--tab');
      break;

    case 'CapsLock':
      btnElem.classList.add('keyboard__btn--control', 'keyboard__btn--is-big', 'keyboard__btn--capsLock');
      break;

    case 'Enter':
      btnElem.classList.add('keyboard__btn--control', 'keyboard__btn--is-big', 'keyboard__btn--enter');
      break;

    case 'Shift':
      btnElem.classList.add('keyboard__btn--control', 'keyboard__btn--is-big', 'keyboard__btn--shift');
      break;

    case 'Ctrl':
      btnElem.classList.add('keyboard__btn--control', 'keyboard__btn--is-small', 'keyboard__btn--ctrl');
      break;

    case 'Alt':
      btnElem.classList.add('keyboard__btn--control', 'keyboard__btn--is-small', 'keyboard__btn--alt');
      break;

    case 'Win':
      btnElem.classList.add('keyboard__btn--control', 'keyboard__btn--is-small', 'keyboard__btn--win');
      break;

    case 'Del':
      btnElem.classList.add('keyboard__btn--control', 'keyboard__btn--is-small');
      break;

    case '':
      btnElem.classList.add('keyboard__btn--control', 'keyboard__btn--is-big', 'keyboard__btn--space');
      break;

    default:
      btnElem.classList.add('keyboard__btn--typing', 'keyboard__btn--is-small');
  }

  return btnElem;
};

const createKeyboard = () => {
  const keyboardFragment = document.createDocumentFragment();
  const keyboardRowFragment = document.createDocumentFragment();

  if (currentLanguage === 'en') {
    currentBtnsArr = btnsArr;
  } else {
    currentBtnsArr = btnsArrRu;
  }

  currentBtnsArr.forEach((rowArray) => {
    const rowElem = document.createElement('div');
    rowElem.classList.add('keyboard__row');
    keyboardRowFragment.append(rowElem);
    const keyboardRowFragmentRow = keyboardRowFragment.querySelector('.keyboard__row');

    rowArray.forEach((btnName) => {
      keyboardRowFragmentRow.append(createBtn(btnName));
    });

    keyboardFragment.append(keyboardRowFragment);
  });

  keyboardElem.append(keyboardFragment);
};

createKeyboard();

const changeKeyboard = () => {
  currentBtnsArr.forEach((rowArray, i) => {
    rowArray.forEach((btnName, j) => {
      document.querySelector(`.keyboard__row:nth-child(${i + 1}) .keyboard__btn:nth-child(${j + 1})`).textContent = btnName;
    });
  });
};

const keysPressed = {};
const btnsTyping = document.querySelectorAll('.keyboard__btn--typing');

const clickBtn = (e) => {
  if (!e.target.classList.contains('keyboard__btn')) {
    laptopScreenElem.focus();
    return;
  }

  const eventKey = e.target.textContent;
  const selectionStartPrev = laptopScreenElem.selectionStart;

  e.preventDefault();

  let hasKey = false;

  if (eventKey === 'Shift') {
    if (currentLanguage === 'en') {
      if (currentBtnsArr === btnsArr) {
        currentBtnsArr = btnsArrShift;
      } else {
        currentBtnsArr = btnsArr;
      }
    } else if (currentLanguage === 'ru') {
      if (currentBtnsArr === btnsArrRu) {
        currentBtnsArr = btnsArrShiftRu;
      } else {
        currentBtnsArr = btnsArrRu;
      }
    }

    changeKeyboard();

    if (isCaps) {
      btnsTyping.forEach((elem) => {
        const theElem = elem;
        theElem.textContent = elem.textContent.toLowerCase();
      });
    } else {
      btnsTyping.forEach((elem) => {
        const theElem = elem;
        theElem.textContent = elem.textContent.toUpperCase();
      });
    }

    laptopScreenElem.focus();
    return;
  }

  if (currentBtnsArr === btnsArrShift) {
    currentBtnsArr = btnsArr;
    changeKeyboard();
  }

  if (eventKey === 'Tab') {
    laptopScreenElem.value = `${laptopScreenElem.value.slice(0, selectionStartPrev)
    }    ${laptopScreenElem.value.slice(selectionStartPrev, laptopScreenElem.value.length)}`;
    laptopScreenElem.focus();
    laptopScreenElem.selectionStart = selectionStartPrev + 4;
    laptopScreenElem.selectionEnd = selectionStartPrev + 4;
  }

  if (eventKey === 'Enter') {
    laptopScreenElem.value = `${laptopScreenElem.value.slice(0, selectionStartPrev)
    }\n${laptopScreenElem.value.slice(selectionStartPrev, laptopScreenElem.value.length)}`;
    laptopScreenElem.focus();
    laptopScreenElem.selectionStart = selectionStartPrev + 1;
    laptopScreenElem.selectionEnd = selectionStartPrev + 1;
  }

  if (eventKey === 'Backspace') {
    if (selectionStartPrev > 0) {
      laptopScreenElem.value = laptopScreenElem.value.slice(0, selectionStartPrev - 1)
      + laptopScreenElem.value.slice(selectionStartPrev, laptopScreenElem.value.length);
      laptopScreenElem.focus();
      laptopScreenElem.selectionStart = selectionStartPrev - 1;
      laptopScreenElem.selectionEnd = selectionStartPrev - 1;
    }
  }

  if (eventKey === '') {
    laptopScreenElem.value = `${laptopScreenElem.value.slice(0, selectionStartPrev)
    } ${laptopScreenElem.value.slice(selectionStartPrev, laptopScreenElem.value.length)}`;
    laptopScreenElem.focus();
    laptopScreenElem.selectionStart = selectionStartPrev + 1;
    laptopScreenElem.selectionEnd = selectionStartPrev + 1;
  }

  if (eventKey === 'Del') {
    if (selectionStartPrev < laptopScreenElem.value.length) {
      laptopScreenElem.value = laptopScreenElem.value.slice(0, selectionStartPrev)
      + laptopScreenElem.value.slice(selectionStartPrev + 1, laptopScreenElem.value.length);
      laptopScreenElem.focus();
      laptopScreenElem.selectionStart = selectionStartPrev;
      laptopScreenElem.selectionEnd = selectionStartPrev;
    }
  }

  if (eventKey === 'CapsLock') {
    if (isCaps) {
      btnsTyping.forEach((elem) => {
        const theElem = elem;
        theElem.textContent = theElem.textContent.toLowerCase();
        e.target.classList.remove('keyboard__btn--is-active');
        isCaps = false;
      });
    } else {
      btnsTyping.forEach((elem) => {
        const theElem = elem;
        theElem.textContent = theElem.textContent.toUpperCase();
        e.target.classList.add('keyboard__btn--is-active');
        isCaps = true;
      });
    }
  }

  currentBtnsArr.forEach((rowArray, i) => {
    rowArray.forEach((btnName, j) => {
      if (eventKey === btnName || eventKey === btnName.toUpperCase() || (eventKey === 'ArrowLeft' && btnName === '◄')
      || (eventKey === 'ArrowUp' && btnName === '▲')
      || (eventKey === 'ArrowDown' && btnName === '▼')
      || (eventKey === 'ArrowRight' && btnName === '►')
      || (eventKey === 'Delete' && btnName === 'Del')
      || (eventKey === 'Control' && btnName === 'Ctrl')
      || (eventKey === 'Meta' && btnName === 'Win')) {
        if (btnsArr[i][j].length === 1) {
          laptopScreenElem.value = laptopScreenElem.value.slice(0, selectionStartPrev)
          + ((eventKey === btnName.toUpperCase()) ? currentBtnsArr[i][j].toUpperCase()
            : currentBtnsArr[i][j])
          + laptopScreenElem.value.slice(selectionStartPrev, laptopScreenElem.value.length);
          laptopScreenElem.focus();
          laptopScreenElem.selectionStart = selectionStartPrev + 1;
          laptopScreenElem.selectionEnd = selectionStartPrev + 1;
        }
        hasKey = true;
      }
    });
  });

  if (hasKey) {
    return;
  }

  if (currentBtnsArr === btnsArr) {
    btnsArrRu.forEach((rowArray, i) => {
      rowArray.forEach((btnName, j) => {
        if (eventKey === btnName || eventKey === btnName.toUpperCase() || (eventKey === 'ArrowLeft' && btnName === '◄')
        || (eventKey === 'ArrowUp' && btnName === '▲')
        || (eventKey === 'ArrowDown' && btnName === '▼')
        || (eventKey === 'ArrowRight' && btnName === '►')
        || (eventKey === 'Delete' && btnName === 'Del')
        || (eventKey === 'Control' && btnName === 'Ctrl')
        || (eventKey === 'Meta' && btnName === 'Win')) {
          if (btnsArr[i][j].length === 1) {
            laptopScreenElem.value = laptopScreenElem.value.slice(0, selectionStartPrev)
            + ((eventKey === btnName.toUpperCase()) ? btnsArr[i][j].toUpperCase() : btnsArr[i][j])
            + laptopScreenElem.value.slice(selectionStartPrev, laptopScreenElem.value.length);
            laptopScreenElem.focus();
            laptopScreenElem.selectionStart = selectionStartPrev + 1;
            laptopScreenElem.selectionEnd = selectionStartPrev + 1;
          }
        }
      });
    });
  } else {
    btnsArr.forEach((rowArray, i) => {
      rowArray.forEach((btnName, j) => {
        if (eventKey === btnName || eventKey === btnName.toUpperCase() || (eventKey === 'ArrowLeft' && btnName === '◄')
        || (eventKey === 'ArrowUp' && btnName === '▲')
        || (eventKey === 'ArrowDown' && btnName === '▼')
        || (eventKey === 'ArrowRight' && btnName === '►')
        || (eventKey === 'Delete' && btnName === 'Del')
        || (eventKey === 'Control' && btnName === 'Ctrl')
        || (eventKey === 'Meta' && btnName === 'Win')) {
          if (btnsArr[i][j].length === 1) {
            laptopScreenElem.value = laptopScreenElem.value.slice(0, selectionStartPrev)
            + ((eventKey === btnName.toUpperCase()) ? btnsArrRu[i][j].toUpperCase()
              : btnsArrRu[i][j])
            + laptopScreenElem.value.slice(selectionStartPrev, laptopScreenElem.value.length);
            laptopScreenElem.focus();
            laptopScreenElem.selectionStart = selectionStartPrev + 1;
            laptopScreenElem.selectionEnd = selectionStartPrev + 1;
          }
        }
      });
    });
  }
};

keyboardElem.addEventListener('click', clickBtn);

const keyDown = (e) => {
  const eventKey = e.key;
  const selectionStartPrev = laptopScreenElem.selectionStart;

  e.preventDefault();

  let hasKey = false;

  keysPressed[e.key] = true;

  if (eventKey === 'Shift' && keysPressed.Alt) {
    if (currentLanguage === 'en') {
      currentLanguage = 'ru';
      localStorage.setItem('localCurrentLanguage', 'ru');
      currentBtnsArr = btnsArrRu;
    } else {
      currentLanguage = 'en';
      localStorage.setItem('localCurrentLanguage', 'en');
      currentBtnsArr = btnsArr;
    }
  }

  if (eventKey === 'Shift') {
    if (currentLanguage === 'en') {
      currentBtnsArr = btnsArrShift;
    } else {
      currentBtnsArr = btnsArrShiftRu;
    }

    changeKeyboard();

    if (isCaps) {
      btnsTyping.forEach((elem) => {
        const theElem = elem;
        theElem.textContent = elem.textContent.toLowerCase();
      });
    } else {
      btnsTyping.forEach((elem) => {
        const theElem = elem;
        theElem.textContent = elem.textContent.toUpperCase();
      });
    }
  }

  if (eventKey === 'Tab') {
    laptopScreenElem.value = `${laptopScreenElem.value.slice(0, selectionStartPrev)
    }    ${laptopScreenElem.value.slice(selectionStartPrev, laptopScreenElem.value.length)}`;
    laptopScreenElem.focus();
    laptopScreenElem.selectionStart = selectionStartPrev + 4;
    laptopScreenElem.selectionEnd = selectionStartPrev + 4;
  }

  if (eventKey === 'Enter') {
    laptopScreenElem.value = `${laptopScreenElem.value.slice(0, selectionStartPrev)
    }\n${laptopScreenElem.value.slice(selectionStartPrev, laptopScreenElem.value.length)}`;
    laptopScreenElem.focus();
    laptopScreenElem.selectionStart = selectionStartPrev + 1;
    laptopScreenElem.selectionEnd = selectionStartPrev + 1;
  }

  if (eventKey === 'Backspace') {
    if (selectionStartPrev > 0) {
      laptopScreenElem.value = laptopScreenElem.value.slice(0, selectionStartPrev - 1)
      + laptopScreenElem.value.slice(selectionStartPrev, laptopScreenElem.value.length);
      laptopScreenElem.focus();
      laptopScreenElem.selectionStart = selectionStartPrev - 1;
      laptopScreenElem.selectionEnd = selectionStartPrev - 1;
    }
  }

  if (eventKey === ' ') {
    laptopScreenElem.value = `${laptopScreenElem.value.slice(0, selectionStartPrev)
    } ${laptopScreenElem.value.slice(selectionStartPrev, laptopScreenElem.value.length)}`;
    laptopScreenElem.focus();
    laptopScreenElem.selectionStart = selectionStartPrev + 1;
    laptopScreenElem.selectionEnd = selectionStartPrev + 1;
  }

  if (eventKey === 'Delete') {
    if (selectionStartPrev < laptopScreenElem.value.length) {
      laptopScreenElem.value = laptopScreenElem.value.slice(0, selectionStartPrev)
      + laptopScreenElem.value.slice(selectionStartPrev + 1, laptopScreenElem.value.length);
      laptopScreenElem.focus();
      laptopScreenElem.selectionStart = selectionStartPrev;
      laptopScreenElem.selectionEnd = selectionStartPrev;
    }
  }

  if (eventKey === 'CapsLock') {
    if (isCaps) {
      btnsTyping.forEach((elem) => {
        const theElem = elem;
        theElem.textContent = theElem.textContent.toLowerCase();
        isCaps = false;
      });
    } else {
      btnsTyping.forEach((elem) => {
        const theElem = elem;
        theElem.textContent = theElem.textContent.toUpperCase();
        isCaps = true;
      });
    }
  }

  currentBtnsArr.forEach((rowArray, i) => {
    rowArray.forEach((btnName, j) => {
      if (eventKey === btnName || eventKey === btnName.toUpperCase() || (eventKey === 'ArrowLeft' && btnName === '◄')
      || (eventKey === 'ArrowUp' && btnName === '▲')
      || (eventKey === 'ArrowDown' && btnName === '▼')
      || (eventKey === 'ArrowRight' && btnName === '►')
      || (eventKey === 'Delete' && btnName === 'Del')
      || (eventKey === 'Control' && btnName === 'Ctrl')
      || (eventKey === 'Meta' && btnName === 'Win')) {
        document.querySelector(`.keyboard__row:nth-child(${i + 1}) .keyboard__btn:nth-child(${j + 1})`).classList.add('keyboard__btn--is-active');
        if (btnsArr[i][j].length === 1) {
          laptopScreenElem.value = laptopScreenElem.value.slice(0, selectionStartPrev)
          + ((eventKey === btnName.toUpperCase()) ? currentBtnsArr[i][j].toUpperCase()
            : currentBtnsArr[i][j])
          + laptopScreenElem.value.slice(selectionStartPrev, laptopScreenElem.value.length);
          laptopScreenElem.focus();
          laptopScreenElem.selectionStart = selectionStartPrev + 1;
          laptopScreenElem.selectionEnd = selectionStartPrev + 1;
        }
        hasKey = true;
      }
    });
  });

  if (hasKey) {
    return;
  }

  if (currentBtnsArr === btnsArr) {
    btnsArrRu.forEach((rowArray, i) => {
      rowArray.forEach((btnName, j) => {
        if (eventKey === btnName || eventKey === btnName.toUpperCase() || (eventKey === 'ArrowLeft' && btnName === '◄')
        || (eventKey === 'ArrowUp' && btnName === '▲')
        || (eventKey === 'ArrowDown' && btnName === '▼')
        || (eventKey === 'ArrowRight' && btnName === '►')
        || (eventKey === 'Delete' && btnName === 'Del')
        || (eventKey === 'Control' && btnName === 'Ctrl')
        || (eventKey === 'Meta' && btnName === 'Win')) {
          document.querySelector(`.keyboard__row:nth-child(${i + 1}) .keyboard__btn:nth-child(${j + 1})`).classList.add('keyboard__btn--is-active');

          if (btnsArr[i][j].length === 1) {
            laptopScreenElem.value = laptopScreenElem.value.slice(0, selectionStartPrev)
            + ((eventKey === btnName.toUpperCase()) ? btnsArr[i][j].toUpperCase() : btnsArr[i][j])
            + laptopScreenElem.value.slice(selectionStartPrev, laptopScreenElem.value.length);
            laptopScreenElem.focus();
            laptopScreenElem.selectionStart = selectionStartPrev + 1;
            laptopScreenElem.selectionEnd = selectionStartPrev + 1;
          }
        }
      });
    });
  } else {
    btnsArr.forEach((rowArray, i) => {
      rowArray.forEach((btnName, j) => {
        if (eventKey === btnName || eventKey === btnName.toUpperCase() || (eventKey === 'ArrowLeft' && btnName === '◄')
        || (eventKey === 'ArrowUp' && btnName === '▲')
        || (eventKey === 'ArrowDown' && btnName === '▼')
        || (eventKey === 'ArrowRight' && btnName === '►')
        || (eventKey === 'Delete' && btnName === 'Del')
        || (eventKey === 'Control' && btnName === 'Ctrl')
        || (eventKey === 'Meta' && btnName === 'Win')) {
          document.querySelector(`.keyboard__row:nth-child(${i + 1}) .keyboard__btn:nth-child(${j + 1})`).classList.add('keyboard__btn--is-active');

          if (btnsArr[i][j].length === 1) {
            laptopScreenElem.value = laptopScreenElem.value.slice(0, selectionStartPrev)
            + ((eventKey === btnName.toUpperCase()) ? btnsArrRu[i][j].toUpperCase()
              : btnsArrRu[i][j])
            + laptopScreenElem.value.slice(selectionStartPrev, laptopScreenElem.value.length);
            laptopScreenElem.focus();
            laptopScreenElem.selectionStart = selectionStartPrev + 1;
            laptopScreenElem.selectionEnd = selectionStartPrev + 1;
          }
        }
      });
    });
  }
};

const keyUp = (e) => {
  const eventKey = e.key;
  let hasKey = false;

  if (eventKey === 'Shift') {
    if (currentLanguage === 'en') {
      currentBtnsArr = btnsArr;
    } else {
      currentBtnsArr = btnsArrRu;
    }

    changeKeyboard();

    if (isCaps) {
      btnsTyping.forEach((elem) => {
        const theElem = elem;
        theElem.textContent = elem.textContent.toUpperCase();
      });
    } else {
      btnsTyping.forEach((elem) => {
        const theElem = elem;
        theElem.textContent = elem.textContent.toLowerCase();
      });
    }
  }

  if (eventKey === 'Control' || eventKey === 'Meta' || eventKey === 'Alt') {
    e.preventDefault();
  }

  if (isCaps && eventKey === 'CapsLock') {
    return;
  }

  currentBtnsArr.forEach((rowArray, i) => {
    rowArray.forEach((btnName, j) => {
      if (eventKey === btnName || eventKey === btnName.toUpperCase() || (eventKey === 'ArrowLeft' && btnName === '◄')
      || (eventKey === 'ArrowUp' && btnName === '▲')
      || (eventKey === 'ArrowDown' && btnName === '▼')
      || (eventKey === 'ArrowRight' && btnName === '►')
      || (eventKey === 'Delete' && btnName === 'Del')
      || (eventKey === 'Control' && btnName === 'Ctrl')
      || (eventKey === 'Meta' && btnName === 'Win')) {
        document.querySelector(`.keyboard__row:nth-child(${i + 1}) .keyboard__btn:nth-child(${j + 1})`).classList.remove('keyboard__btn--is-active');
        hasKey = true;
      }
    });
  });

  delete keysPressed[e.key];

  if (hasKey) {
    return;
  }

  if (currentBtnsArr === btnsArr) {
    btnsArrRu.forEach((rowArray, i) => {
      rowArray.forEach((btnName, j) => {
        if (eventKey === btnName || eventKey === btnName.toUpperCase() || (eventKey === 'ArrowLeft' && btnName === '◄')
        || (eventKey === 'ArrowUp' && btnName === '▲')
        || (eventKey === 'ArrowDown' && btnName === '▼')
        || (eventKey === 'ArrowRight' && btnName === '►')
        || (eventKey === 'Delete' && btnName === 'Del')
        || (eventKey === 'Control' && btnName === 'Ctrl')
        || (eventKey === 'Meta' && btnName === 'Win')) {
          document.querySelector(`.keyboard__row:nth-child(${i + 1}) .keyboard__btn:nth-child(${j + 1})`).classList.remove('keyboard__btn--is-active');
        }
      });
    });
  } else {
    btnsArr.forEach((rowArray, i) => {
      rowArray.forEach((btnName, j) => {
        if (eventKey === btnName || eventKey === btnName.toUpperCase() || (eventKey === 'ArrowLeft' && btnName === '◄')
        || (eventKey === 'ArrowUp' && btnName === '▲')
        || (eventKey === 'ArrowDown' && btnName === '▼')
        || (eventKey === 'ArrowRight' && btnName === '►')
        || (eventKey === 'Delete' && btnName === 'Del')
        || (eventKey === 'Control' && btnName === 'Ctrl')
        || (eventKey === 'Meta' && btnName === 'Win')) {
          document.querySelector(`.keyboard__row:nth-child(${i + 1}) .keyboard__btn:nth-child(${j + 1})`).classList.remove('keyboard__btn--is-active');
        }
      });
    });
  }

  e.preventDefault();
};

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
