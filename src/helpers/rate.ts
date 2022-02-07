import getUPCMap from './getUPCMap';
import { getProvider } from './providers';

export const isNumber: (rate: HTMLElement) => boolean = (rate: HTMLElement) => {
  return Boolean(rate.innerText.match(/[0-9]/));
};

export const getValue: (rate: HTMLElement) => number = (rate: HTMLElement) => {
  if (!rate.getAttribute('value')) {
    const total = Number(rate.innerText.replace('$', ''));
    rate.setAttribute('value', String(total));
  }

  return Number(rate.getAttribute('value'));
}

export const setInnerText: (rate: HTMLElement, value: number) =>
  void = (rate: HTMLElement, value: number) => {
  const upcMap = getUPCMap();
    
  rate.innerText = `
    $${(value + value * (upcMap[getProvider(rate)].value / 100)).toFixed(2)}
  `;
}
