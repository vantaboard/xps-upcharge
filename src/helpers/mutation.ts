import { getValue, isNumber, setInnerText } from './rate';

export const elToObserve = '.uk-width-2-10';

export const config = {
  characterData: true,
  subtree: true,
  childList: true,
};

export const observer = new MutationObserver((mutations: MutationRecord[]) => {
  observer.disconnect();
  collectMutateRates();
  observer.observe(document.querySelector(elToObserve), config);
});

export const mutateRate: (rate: HTMLElement) =>
  void = (rate: HTMLElement) => {
  if (isNumber(rate)) {
    setInnerText(rate, getValue(rate));
  }
};

export const collectMutateRates: () => void = () => {
  for (const rate of document.querySelectorAll('#total-rate')) {
    mutateRate(rate as HTMLElement);
  }
};
