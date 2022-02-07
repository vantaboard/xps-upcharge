import React from 'react';
import ReactDOM from 'react-dom';
import { upcs } from '../data/upcs';
import Button from '../features/components/tab';
import { DocumentClickHandler } from './document';
import getUPCMap from './getUPCMap';
import { collectMutateRates, config, elToObserve, observer } from './mutation';
import { ClickHandler } from './upcButton';

export const Inject: () => void = () => {
  document.querySelector('#qa-quick-quote-toggle').remove();

  const addressTab = document.querySelector('#qa-address-book-tab')
    .nextSibling as HTMLElement;

  addressTab.insertAdjacentHTML('afterend', '<div id="qa-upc-tab"></div>');

  ReactDOM.render(<Button />, document.querySelector('#qa-upc-tab'));

  document
    .querySelector('.upc-button')
    .addEventListener(
      'click',
      ClickHandler(document.querySelector('.upc-dropdown'))
    );

  document.onclick = DocumentClickHandler(
    document.querySelector('.upc-dropdown')
  );

  const upcMap: Map<string, HTMLInputElement> = getUPCMap();

  const values = upcs.map((upc) => GM.getValue(upc.toLowerCase(), 0));

  values.forEach((value, index) => {
    value.then((value) => {
      const upcl = upcs[index].toLowerCase();
      upcMap[upcl].value = value as unknown as string;
    });
  });

  for (const upc of upcs) {
    const upcl = upc.toLowerCase();
    upcMap[upcl].addEventListener('change', () => {
      collectMutateRates();

      GM.setValue(upcl, upcMap[upcl].value);
    });
  }

  observer.observe(document.querySelector(elToObserve), config);
};

export default Inject;
