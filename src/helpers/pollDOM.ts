import { injectRate, injectResidential } from './inject';
import { elToObserve, residentialQuery } from './mutation';

/**
 * Polls the DOM to see if a rate element exists or not.
 *
 * @returns {void}
 */
export const pollResidentialDOM: () => void = (): void => {
  let el = document.querySelector(residentialQuery);

  if (el) {
    injectResidential();
  } else {
    el = document.querySelector(residentialQuery);
    setTimeout(pollResidentialDOM, 300);
  }
};

/**
 * Polls the DOM to see if a rate element exists or not.
 *
 * @returns {void}
 */
export const pollRateDOM: () => void = (): void => {
  let el = document.querySelector(elToObserve);

  if (el) {
    injectRate();
  } else {
    el = document.querySelector(elToObserve);
    setTimeout(pollRateDOM, 300);
  }
};
