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

export const getResidential: () => Promise<boolean> = () => {
  return GM.getValue('residential', false);
};

export const setResidential: (value: boolean) => void = (value: boolean) => {
  GM.setValue('residential', value);
};
