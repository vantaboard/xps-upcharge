import Inject from './inject';

export const pollDOM: () => void = () => {
  let el = document.querySelector('.uk-width-2-10');

  if (el) {
    Inject();
  } else {
    el = document.querySelector('.uk-width-2-10');
    setTimeout(pollDOM, 300);
  }
};

export default pollDOM;
