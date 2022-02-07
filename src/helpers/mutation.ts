import { getValue, isNumber, setInnerText } from './rate';

/**
 * The element to observe for changes to the total rates.
 */
export const elToObserve = '.main-container';

/**
 * Mutation observer configuration.
 */
export const config = {
  characterData: true,
  subtree: true,
  childList: true,
};

/**
 * Mutation observer for the total rates.
 */
export const observer: MutationObserver = new MutationObserver(() => {
  observer.disconnect();
  collectMutateRates();
  observer.observe(document.querySelector(elToObserve), config);
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
