const bodyElem = document.body;
const btnsArr = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'],
  ['Ctrl', 'Win', 'Alt', '&nbsp;', 'Alt', '◄', '▼', '►', 'Ctrl'],
];

const createBaseMarkup = () => {
  const baseMarkup = `<div class="page__laptop laptop">
  <div class="laptop__head">
      <h1 class="laptop__title">Virtual keyboard</h1>
      <textarea class="laptop__screen"></textarea>
  </div>
  <div class="laptop__body">
      <div class="laptop__keyboard keyboard js-keyboard"></div>
      <p class="keyboard__info">Клавиатура создана в операционной системе Windows</p>
  </div>
</div>`;

  bodyElem.insertAdjacentHTML('afterbegin', baseMarkup);
};

createBaseMarkup();

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

    case '&nbsp;':
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

  btnsArr.forEach((rowArray) => {
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

const clickBtn = (e) => {
  if (!e.target.classList.contains('keyboard__btn')) {
    return;
  }

  console.log(e.target.textContent);
};

keyboardElem.addEventListener('click', clickBtn);
