// ==UserScript==
// @name        XPS Upcharge
// @namespace   http://tampermonkey.net/
// @run-at      document-idle
// @match       https://xpsshipper.com/ec/*
// @icon        https://xpsshipper.com/ec/static/images/client/xps/xps-favicon.png
// @updateURL   https://github.com/blackboardd/xps-upcharge/raw/main/xpsupcharge.user.js
// @downloadURL https://github.com/blackboardd/xps-upcharge/raw/main/xpsupcharge.user.js
// @version     0.0.8
// @author      blackboardd <86866786+blackboardd@users.noreply.github.com>
// @license     MIT
// @grant       windowindow.onurlchange
// @grant       GM.addStyle
// @grant       GM.setValue
// @grant       GM.getValue
// ==/UserScript==

GM.addStyle(`
    #qa-upc-tab {
        margin-left: 0;
    }

    .upc-button-wrapper {
        display: flex;
        margin-top: .4em;
        flex-direction: row
    }

    .upc-button {
        border: 0;
        background-color: rgba(0, 0, 0, 0);
        color: white;
        margin-right: 4px;
        height: 100%;
    }

    .upc-dropdown {
        display: none;
        z-index: 1;
        position: absolute;
        top: 3.4rem;
        background-color: white;
        border: 1px solid #e8e4e4;
        margin: 0;
        padding: 0;
    }

    .upc-ul {
        padding: 0;
        list-style: none;
    }

    .upc-provider {
        display: flex;
        height: auto;
        margin-top: 14px;
    }

    #upc-ups, #upc-usps, #upc-fedex, #upc-dhl {
        height: 59%;
    }

    #span-ups, #span-usps, #span-fedex, #span-dhl {
        padding-left: 8px;
        margin-top: 6px;
    }
`);

const upcHTML = `
<li to="upc" id="qa-upc-tab">
    <div class="upc-button-wrapper">
        <button class="upc-button">
            <i class="uk-icon-laptop uk-icon-medium"></i>
        </button>
        <div class="upc-dropdown">
            <ul class="upc-ul">
                <li class="upc-provider">
                    <input id="upc-ups" type="text" maxlength="2" size="1">
                    <span id="span-ups">UPS</span>
                </li>
                <li class="upc-provider">
                    <input id="upc-usps" type="text" maxlength="2" size="1">
                    <span id="span-usps">USPS</span>
                </li>
                <li class="upc-provider">
                    <input id="upc-fedex" type="text" maxlength="2" size="1">
                    <span id="span-fedex">FedEx</span>
                </li>
                <li class="upc-provider">
                    <input id="upc-dhl" type="text" maxlength="2" size="1">
                    <span id="span-dhl">DHL</span>
                </li>
            </ul>
        </div>
    </div>
</li>`;

const pollDOM = () => {
  let el = document.querySelector('.uk-width-2-10');

  if (el) {
    main();
  } else {
    el = document?.querySelector('.uk-width-2-10');
    setTimeout(pollDOM, 300);
  }
};

const getups = GM.getValue('ups');
const getusps = GM.getValue('usps');
const getfedex = GM.getValue('fedex');
const getdhl = GM.getValue('dhl');

const getProviders = Promise.all([getups, getusps, getfedex, getdhl]);

const main = () => {
  const invoices = document.querySelector('#qa-address-book-tab').nextSibling;
  invoices.insertAdjacentHTML('afterend', upcHTML);

  const upcButton = document.querySelector('.upc-button');
  const upcDropdown = document.querySelector('.upc-dropdown');

  upcButton.addEventListener('click', () => {
    if (upcDropdown.style.display === 'none') {
      upcDropdown.style.display = 'flex';
    } else {
      upcDropdown.style.display = 'none';
    }
  });

  const upcUPS = document.querySelector('#upc-ups');
  const upcUSPS = document.querySelector('#upc-usps');
  const upcFedEx = document.querySelector('#upc-fedex');
  const upcDHL = document.querySelector('#upc-dhl');

  const upcs = new Map([
    ['ups', upcUPS],
    ['usps', upcUSPS],
    ['fedex', upcFedEx],
    ['dhl', upcDHL],
  ]);

  getProviders.then((items) => {
    const upsValue = items[0];
    const uspsValue = items[1];
    const fedexValue = items[2];
    const dhlValue = items[3];

    if (upsValue !== undefined) {
      upcUPS.value = upsValue;
    } else {
      upcUPS.value = 0;
    }

    if (uspsValue !== undefined) {
      upcUSPS.value = uspsValue;
    } else {
      upcUSPS.value = 0;
    }

    if (fedexValue !== undefined) {
      upcFedEx.value = fedexValue;
    } else {
      upcUPS.value = 0;
    }

    if (dhlValue !== undefined) {
      upcDHL.value = dhlValue;
    } else {
      upcDHL.value = 0;
    }
  });

  const mutateRate = (rate) => {
    console.log(rate);
    if (rate.innerText.match(/[0-9]/)) {
      let rateAttr = rate.getAttribute('value');
      if (!rateAttr) {
        const total = Number(rate.innerText.replace('$', ''));
        rate.setAttribute('value', total);
      }
      rateAttr = rate.getAttribute('value');
      let providerImg =
        rate.parentElement.parentElement?.getElementsByTagName('img')[0];
      if (!providerImg) {
        providerImg =
          rate.parentElement.parentElement.parentElement?.getElementsByTagName(
            'img'
          )[0];
      }
      const providerImgSrc = providerImg.getAttribute('src');
      const provider = providerImgSrc.match(/\/([a-zA-Z]*?)\./)[1];
      rate.innerText = `
                $${(
                  Number(rateAttr) +
                  Number(rateAttr) * (upcs.get(provider).value / 100)
                ).toFixed(2)}`;
    }
  };

  const collectMutateRates = () => {
    const rates = document.querySelectorAll('#total-rate');
    for (const rate of rates) {
      mutateRate(rate);
    }
  };

  upcUPS.addEventListener('change', () => {
    collectMutateRates();
    GM.setValue('ups', upcUPS.value);
    GM.setValue('usps', upcUSPS.value);
    GM.setValue('fedex', upcFedEx.value);
    GM.setValue('dhl', upcDHL.value);
  });

  upcUSPS.addEventListener('change', () => {
    collectMutateRates();
    GM.setValue('ups', upcUPS.value);
    GM.setValue('usps', upcUSPS.value);
    GM.setValue('fedex', upcFedEx.value);
    GM.setValue('dhl', upcDHL.value);
  });

  upcFedEx.addEventListener('change', () => {
    collectMutateRates();
    GM.setValue('ups', upcUPS.value);
    GM.setValue('usps', upcUSPS.value);
    GM.setValue('fedex', upcFedEx.value);
    GM.setValue('dhl', upcDHL.value);
  });

  upcDHL.addEventListener('change', () => {
    collectMutateRates();
    GM.setValue('ups', upcUPS.value);
    GM.setValue('usps', upcUSPS.value);
    GM.setValue('fedex', upcFedEx.value);
    GM.setValue('dhl', upcDHL.value);
  });

  const quickQuote = document.querySelector('#qa-quick-quote-toggle');
  quickQuote.remove();

  const observerCallback = (mutations) => {
    const rates = document.querySelectorAll('#total-rate');
    upcObserver.disconnect();
    for (const rate of rates) {
      mutateRate(rate);
    }
    upcObserver.observe(document.querySelector('.uk-width-2-10'), config);
  };

  const upcObserver = new MutationObserver(observerCallback);

  const config = {
    characterData: true,
    subtree: true,
    childList: true,
  };

  upcObserver.observe(document.querySelector('.uk-width-2-10'), config);

  if (!window.onurlchange) window.addEventListener('urlchange', main);
};

pollDOM();
