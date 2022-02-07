import React from 'react';
import ReactDOM from 'react-dom';
import { upcs } from '../data/upcs';
import Modal from '../features/components/options/modal';
import Button from '../features/components/tab';
import { documentClickHandler } from './document';
import getUPCMap from './getUPCMap';
import { setupModal } from './modal';
import {
  collectMutateRates,
  elToObserve,
  rateConfig,
  rateObserver,
  residentialConfig,
  residentialObserver,
  residentialQuery,
} from './mutation';
import { setupResidential } from './options';
import { clickHandler } from './upcButton';

/**
 * This is the main entry point for the userscript.
 * It will be called when the page with a residential checkbox
 * is loaded. It will also be called when the page is refreshed.
 *
 * @returns {void}
 */
export const injectRate: () => void = (): void => {
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

  const appContainer = document.querySelector('#app-container');
  appContainer.insertAdjacentHTML('afterend', '<div id="modal-root"></div>');

  /**
   * Render modal.
   */
  ReactDOM.render(<Modal />, document.querySelector('#modal-root'));

  // Set up modal.
  setupModal();

  /**
   * Add click handler to UPC tab.
   */
  document
    .querySelector('.upc-button')
    .addEventListener(
      'click',
      clickHandler(document.querySelector('.upc-dropdown'))
    );

  /**
   * Add click handler to document to watch for clicking off UPC dropdown.
   */
  document.onclick = documentClickHandler(
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
  rateObserver.observe(document.querySelector(elToObserve), rateConfig);
};

/**
 * This is the main entry point for the userscript.
 * It will be called when any page with rates is loaded.
 * It will also be called when the page is refreshed.
 *
 * @returns {void}
 */
export const injectResidential: () => void = (): void => {
  // Set up residential.
  setupResidential();

  /**
   * Begin observing the page for mutations of the residential checkbox
   * and setup the checkbox based on those mutations.
   */
  residentialObserver.observe(
    document.querySelector(residentialQuery),
    residentialConfig
  );
};
