import getUPCMap from './getUPCMap';
import { getProvider } from './providers';

/**
 * Checks whether or not the rate's inner text is a number.
 *
 * @param {HTMLElement} rate
 * @returns {boolean}
 */
export const isNumber: (rate: HTMLElement) => boolean = (rate: HTMLElement) => {
  return Boolean(rate.innerText.match(/[0-9]/));
};

/**
 * Gets the value attribute of the rate if it exists and returns it.
 * If it doesn't exist, the attribute is set to the inner text.
 *
 * @param {HTMLElement} rate
 * @returns {number}
 */
export const getValue: (rate: HTMLElement) => number = (rate: HTMLElement) => {
  if (!rate.getAttribute('value')) {
    const total = Number(rate.innerText.replace('$', ''));
    rate.setAttribute('value', String(total));
  }

  return Number(rate.getAttribute('value'));
};

/**
 * Sets the inner text of the rate to a modified value based on the upcharge
 * percentage from the UPC dropdown menu.
 *
 * @param {HTMLElement} rate
 * @param {number} value
 * @returns {void}
 */
export const setInnerText: (rate: HTMLElement, value: number) => void = (
  rate: HTMLElement,
  value: number
) => {
  const upcMap = getUPCMap();

  rate.innerText = `
    $${(value + value * (upcMap[getProvider(rate)].value / 100)).toFixed(2)}
  `;
};
