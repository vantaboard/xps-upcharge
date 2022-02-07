import { residentialQuery } from './mutation';

/**
 * Sets the options for the residential property.
 *
 * @returns {void}
 */
export const setupResidential = (): void => {
  const input = document.querySelector(
    '#options-residential'
  ) as HTMLInputElement;

  input.addEventListener('change', () => {
    setResidential(input.checked);
  });

  const newShipment = document.querySelector(
    '#qa-new-shipment-btn'
  ) as HTMLInputElement;

  newShipment.addEventListener('click', () => {
    getResidential().then(checkResidential);
  });

  getResidential().then(checkResidential);
};

const checkResidential: (residential: boolean) => void = (
  residential: boolean
) => {
  const input = document.querySelector(
    '#options-residential'
  ) as HTMLInputElement;

  const checkbox = document.querySelector(residentialQuery) as HTMLInputElement;

  input.checked = residential;
  setInterval(() => {
    checkbox.checked = residential;
  }, 2000);
};

/**
 * Get the residential default configuration from
 * the GreaseMonkey API.
 *
 * @returns {Promise<boolean>}
 */
export const getResidential: () => Promise<boolean> = (): Promise<boolean> => {
  return GM.getValue('residential', true);
};

/**
 * Set the residential default configuration with
 * the GreaseMonkey API.
 *
 * @param {boolean} residential
 * @returns {void}
 */
export const setResidential: (value: boolean) => void = (
  value: boolean
): void => {
  GM.setValue('residential', value);
};
