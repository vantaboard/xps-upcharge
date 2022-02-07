import { setupResidential } from './options';
import { getValue, isNumber, setInnerText } from './rate';

/**
 * The element to observe for changes to the total rates.
 */
export const elToObserve = '.main-container';

/**
 * The element to observe for changes to the residential checkbox.
 */
export const residentialQuery = '#qa-residential-checkbox';

/**
 * Mutation observer configuration.
 */
export const residentialConfig = {
  characterData: true,
  subtree: true,
  childList: true,
};

/**
 * Mutation observer configuration.
 */
export const rateConfig = {
  characterData: true,
  subtree: true,
  childList: true,
};

/**
 * Mutation observer for the residential checkbox.
 */
export const residentialObserver: MutationObserver = new MutationObserver(
  () => {
    setupResidential();
  }
);

/**
 * Mutation observer for the total rates.
 */
export const rateObserver: MutationObserver = new MutationObserver(() => {
  rateObserver.disconnect();
  collectMutateRates();
  rateObserver.observe(document.querySelector(elToObserve), rateConfig);
});

/**
 * Mutates the rates based on the upcharge percentages in the UPC dropdown.
 *
 * @param {HTMLElement} rate
 * @returns {void}
 */
export const mutateRate: (rate: HTMLElement) => void = (
  rate: HTMLElement
): void => {
  if (isNumber(rate)) setInnerText(rate, getValue(rate));
};

/**
 * Collects rates from the DOM and mutates them.
 *
 * @returns {void}
 */
export const collectMutateRates: () => void = (): void => {
  for (const rate of document.querySelectorAll('#total-rate')) {
    mutateRate(rate as HTMLElement);
  }
};
