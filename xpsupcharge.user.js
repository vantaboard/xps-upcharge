// ==UserScript==
// @name         XPS Upcharge
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author       Brighten Clark
// @run-at       document-idle
// @match        https://xpsshipper.com/ec/*
// @icon         https://www.google.com/s2/favicons?domain=xpsshipper.com
// @grant        window.onurlchange
// @grant        GM.setValue
// @grant        GM.getValue
// ==/UserScript==

const upchargeHTML = `
<li to="upcharge" id="qa-upcharge-tab" style="margin-left: 0;">
  <div style="display: flex;
    margin-top: .4em;
    flex-direction: row">
    <button class="upcharge-button" onClick="toggleUpcharge()" style="border: 0;
      background-color: rgba(0,0,0,0);
      color: white;
      margin-right: 4px;
      height: 100%;">
      <i class="uk-icon-laptop uk-icon-medium"></i>
    </button>
    <div class="dropdown-upcharge" style="display: none;z-index: 1;position: absolute;top: 3.4rem;background-color: white;border: 1px solid #e8e4e4; margin: 0; padding: 0;">
      <ul class="upcharge-ul" style="padding: 0; list-style: none;">
        <div class="upcharge-providers">
          <li class="upcharge-provider" style="display: flex; height: auto">
            <input id="ups" type="text" maxlength="2" size="1">
            <span class="upcharge-ups" style="padding-left: 2px">UPS</span>
          </li>
          <li class="upcharge-provider" style="display: flex; height: auto">
            <input id="usps" type="text" maxlength="2" size="1">
            <span class="upcharge-usps" style="padding-left: 2px">USPS</span>
          </li>
          <li class="upcharge-provider" style="display: flex; height: auto">
            <input id="FedEx" type="text" maxlength="2" size="1">
            <span class="upcharge-fedex" style="padding-left: 2px">FedEx</span>
          </li>
          <li class="upcharge-provider" style="display: flex; height: auto">
            <input id="dhl" type="text" maxlength="2" size="1">
            <span class="upcharge-dhl" style="padding-left: 2px">DHL</span>
          </li>
        </div>
      </ul>
    </div>
  </div>
</li>

`;

const locations = ['sanger1', 'fresno1', 'clovis1'];
const providers = ['dhl', 'ups', 'usps', 'fedex'];
let lp = [];

for (let location of locations) {
    for (let provider of providers) {
        lp.push({ location, provider });
    }
}

(async () => {
    await GM.setValue('count', 0);
})();

function pollDOM() {
    let el = document.querySelector('.uk-margin');

    if (el !== null) {
        fetchMutations();
    } else {
        el = document?.querySelector('.uk-margin');
        setTimeout(pollDOM, 300);
    }
}

const fetchMutations = () => {
    console.log('fetchmuteentered');
    let mPar = document.getElementsByClassName(
        'uk-width-2-10 uk-margin-large-bottom'
    )[0];

    let options = {
        childList: true,
        subtree: true,
    };

    const observer = new MutationObserver(mCallback);

    const addressBook = document.getElementById('qa-address-book-tab');
    const invoices = addressBook.nextSibling;
    invoices.insertAdjacentHTML('afterend', upchargeHTML);
    const upcharge = document.getElementsByClassName('dropdown-upcharge')[0];
    const upchargeButton = document.getElementsByClassName('upcharge-button')[0];

    const quickQuote = document.querySelector('#qa-quick-quote-toggle');
    quickQuote.remove();

    upchargeButton.addEventListener('click', () => {
        if (upcharge.style.display === 'none') {
            upcharge.style.display = 'flex';
        } else {
            upcharge.style.display = 'none';
        }
    });

    const upchargePercent = 0.65;

    function mCallback(mutations) {
        console.log('mutation triggered');
        for (let mutation of mutations) {
            if (mutation.type === 'childList') {
                for (let i = 0, length = mutation.addedNodes.length; i < length; i++) {
                    let addedNode = mutation.addedNodes[i];
                    if (addedNode.data?.match('react-empty')) {
                        addedNode = addedNode.parentElement;
                    }
                    console.log(addedNode);
                    if (addedNode.querySelector('#total-rate')) {
                        const inText = Number(
                            String(addedNode.querySelector('#total-rate').innerText).replace(
                                '$',
                                ''
                            )
                        );
                        addedNode.querySelector('#total-rate').innerText = `$${(
                            inText +
                            inText * upchargePercent
                        ).toFixed(2)}`;
                    }
                }
            }
        }
    }

    observer.observe(mPar, options);

    if (window.onurlchange === null) {
        window.addEventListener('urlchange', (info) => {
            fetchMutations();
        });
    }
};

pollDOM();
