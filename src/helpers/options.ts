/**
 * Sets the options for the residential property.
 *
 * @returns {void}
 */
export const setupResidential = (): void => {
  const input = document.querySelector(
    '#options-residential'
  ) as HTMLInputElement;

  getResidential().then((residential) => {
    input.checked = residential;

    if (residential) {
      const checkbox = document.querySelector(
        '#qa-residential-checkbox'
      ) as HTMLInputElement;

      checkbox.click();
    }
  });

  input.addEventListener('change', () => {
    setResidential(input.checked);
  });
};

/**
 * Get the residential default configuration from
 * the GreaseMonkey API.
 *
 * @returns {Promise<boolean>}
 */
export const getResidential: () => Promise<boolean> = (): Promise<boolean> => {
  return GM.getValue('residential', false);
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
