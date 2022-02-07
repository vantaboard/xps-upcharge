import Inject from './inject';
import { elToObserve } from './mutation';

/**
 * Polls the DOM to see if a particular element exists or not.
 *
 * @returns {void}
 */
export const pollDOM: () => void = (): void => {
  let el = document.querySelector(elToObserve);

  if (el) {
    Inject();
  } else {
    el = document.querySelector(elToObserve);
    setTimeout(pollDOM, 300);
  }
};

export default pollDOM;
