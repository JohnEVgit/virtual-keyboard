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
      <div class="laptop__keyboard keyboard js-keyboard"></div>
      <p class="keyboard__info">Клавиатура создана в операционной системе Windows</p>
  </div>
</div>`;

  bodyElem.insertAdjacentHTML('afterbegin', baseMarkup);
};

createBaseMarkup();

const laptopScreenElem = bodyElem.querySelector('.js-laptop-screen');
const keyboardElem = bodyElem.querySelector('.js-keyboard');

const createBtn = (name) => {
  const btnElem = document.createElement('button');
  btnElem.textContent = name;
  btnElem.setAttribute('type', 'button');
  btnElem.classList.add('keyboard__btn');

  switch (name) {
    case 'Backspace':
      btnElem.classList.add('keyboard__btn--control', 'keyboard__btn--backspace');
      break;

    case 'Tab':
      btnElem.classList.add('keyboard__btn--control', 'keyboard__btn--tab');
      break;

    case 'CapsLock':
      btnElem.classList.add('keyboard__btn--control', 'keyboard__btn--capsLock');
      break;

    case 'Enter':
      btnElem.classList.add('keyboard__btn--control', 'keyboard__btn--enter');
      break;

    case 'Shift':
      btnElem.classList.add('keyboard__btn--control', 'keyboard__btn--shift');
      break;

    case 'Ctrl':
      btnElem.classList.add('keyboard__btn--typing', 'keyboard__btn--ctrl');
      break;

    case 'Alt':
      btnElem.classList.add('keyboard__btn--typing', 'keyboard__btn--alt');
      break;

    case 'Win':
      btnElem.classList.add('keyboard__btn--typing', 'keyboard__btn--win');
      break;

    case '':
      btnElem.classList.add('keyboard__btn--control', 'keyboard__btn--space');
      break;

    default:
      btnElem.classList.add('keyboard__btn--typing');
  }

  return btnElem;
};

const createKeyboard = () => {
  const keyboardFragment = document.createDocumentFragment();
  const keyboardRowFragment = document.createDocumentFragment();

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

const clickBtn = (e) => {
  if (!e.target.classList.contains('keyboard__btn')) {
    laptopScreenElem.focus();
    return;
  }

  if (e.target.textContent === 'Shift') {
    if (currentBtnsArr === btnsArr) {
      currentBtnsArr = btnsArrShift;
    } else {
      currentBtnsArr = btnsArr;
    }
    changeKeyboard();
    laptopScreenElem.focus();
    return;
  }

  laptopScreenElem.value += e.target.textContent;
  laptopScreenElem.focus();
  laptopScreenElem.selectionStart = laptopScreenElem.value.length;

  if (currentBtnsArr === btnsArrShift) {
    currentBtnsArr = btnsArr;
    changeKeyboard();
  }
};

keyboardElem.addEventListener('click', clickBtn);

const keysPressed = {};

const keyDown = (e) => {
  const eventKey = e.key;

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
  }

  currentBtnsArr.forEach((rowArray, i) => {
    rowArray.forEach((btnName, j) => {
      if (eventKey === btnName) {
        document.querySelector(`.keyboard__row:nth-child(${i + 1}) .keyboard__btn:nth-child(${j + 1})`).classList.add('keyboard__btn--is-active');
      }
    });
  });
};

const keyUp = (e) => {
  const eventKey = e.key;

  if (eventKey === 'Shift') {
    if (currentLanguage === 'en') {
      currentBtnsArr = btnsArr;
    } else {
      currentBtnsArr = btnsArrRu;
    }

    changeKeyboard();
  }

  currentBtnsArr.forEach((rowArray, i) => {
    rowArray.forEach((btnName, j) => {
      if (eventKey === btnName) {
        document.querySelector(`.keyboard__row:nth-child(${i + 1}) .keyboard__btn:nth-child(${j + 1})`).classList.remove('keyboard__btn--is-active');
      }
    });
  });

  delete keysPressed[e.key];
};

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
