import React from 'react';
import ReactDOM from 'react-dom';
import { upcs } from '../data/upcs';
import Button from '../features/components/tab';
import { DocumentClickHandler } from './document';
import getUPCMap from './getUPCMap';
import { collectMutateRates, config, elToObserve, observer } from './mutation';
import { ClickHandler } from './upcButton';

/**
 * This is the main entry point for the userscript.
 * It will be called when the page is loaded.
 * It will also be called when the page is refreshed.
 *
 * @returns {void}
 */
export const Inject: () => void = (): void => {
  /**
   * Address tab to insert html for UPC tab.
   */
  const addressTab = document.querySelector('#qa-address-book-tab')
    .nextSibling as HTMLElement;

  /**
   * Insert UPC tab after address tab.
   */
  addressTab.insertAdjacentHTML('afterend', '<div id="qa-upc-tab"></div>');

  /**
   * Render UPC tab.
   */
  ReactDOM.render(<Button />, document.querySelector('#qa-upc-tab'));

  /**
   * Add click handler to UPC tab.
   */
  document
    .querySelector('.upc-button')
    .addEventListener(
      'click',
      ClickHandler(document.querySelector('.upc-dropdown'))
    );

  /**
   * Add click handler to document to watch for clicking off UPC dropdown.
   */
  document.onclick = DocumentClickHandler(
    document.querySelector('.upc-dropdown')
  );

  /**
   * Map of UPCs to their corresponding html input elements.
   */
  const upcMap: Map<string, HTMLInputElement> = getUPCMap();

  /**
   * Upcharge percentages for each UPC from GreaseMonkey API.
   */
  const values = upcs.map((upc) => GM.getValue(upc.toLowerCase(), 0));

  /**
   * Loop through each UPC input element and set its value.
   */
  values.forEach((value, index) => {
    value.then((value) => {
      const upcl = upcs[index].toLowerCase();
      upcMap[upcl].value = value as unknown as string;
    });
  });

  /**
   * Set up a change listener for each UPC input element which will
   * update the GreaseMonkey API with the new upcharge percentage.
   */
  for (const upc of upcs) {
    const upcl = upc.toLowerCase();
    upcMap[upcl].addEventListener('change', () => {
      collectMutateRates();

      GM.setValue(upcl, upcMap[upcl].value);
    });
  }

  /**
   * Begin observing the page for mutations and
   * change the rate based on those mutations.
   */
  observer.observe(document.querySelector(elToObserve), config);
};

export default Inject;
