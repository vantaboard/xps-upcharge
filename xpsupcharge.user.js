// ==UserScript==
// @name         XPS upc
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Brighten Clark
// @run-at       document-idle
// @match        https://xpsshipper.com/ec/*
// @icon         https://www.google.com/s2/favicons?domain=xpsshipper.com
// @grant        window.onurlchange
// @grant        GM.setValue
// @grant        GM.getValue
// ==/UserScript==

const d = document;
const w = window;

const currencies = { USD: '$' };
const currency = currencies.USD;
const valueAttr = 'value';

const upcHTML = `
<li to="upc" id="qa-upc-tab">
    <div class="upc-button-wrapper">
        <button class="upc-button">
            <i class="uk-icon-laptop uk-icon-medium"></i>
        </button>
        <div class="dropdown-upc">
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

const providers = {
    sanger: {
        ups: { name: 'ups', value: 0 },
        usps: { name: 'usps', value: 0 },
        fedex: { name: 'fedex', value: 0 },
        dhl: { name: 'dhl', value: 0 }
    },
    fresno: {
        ups: { name: 'ups', value: 0 },
        usps: { name: 'usps', value: 0 },
        fedex: { name: 'fedex', value: 0 },
        dhl: { name: 'dhl', value: 0 }
    },
    clovis: {
        ups: { name: 'ups', value: 0 },
        usps: { name: 'usps', value: 0 },
        fedex: { name: 'fedex', value: 0 },
        dhl: { name: 'dhl', value: 0 }
    },
};

const pollDOM = () => {
    let el = d.querySelector('#qa-address-book-tab');

    if (el) {
        main();
    } else {
        el = d?.querySelector('#qa-address-book-tab');
        setTimeout(pollDOM, 300);
    }
}

const main = () => {
    const invoices = d.querySelector('#qa-address-book-tab').nextSibling;
    invoices.insertAdjacentHTML('afterend', upcHTML);

    const toggleupc = () => {
        const upcd = d.querySelector('.dropdown-upc').style.display
        upcd = upcd === 'none' ? 'flex' : 'none';
    };
    const upcButton = d.querySelector('.upc-button');
    upcButton.addEventListener('click', toggleupc);

    const quickQuote = d.querySelector('#qa-quick-quote-toggle');

    upcObserver.observe(d.body, { childList: true, subtree: true });
    quickQuote.remove();

    if (!w.onurlchange) w.addEventListener('urlchange', main);
};

const getTotal = (rate) => Number(rate.innerText.replace(currency, ''))
const setTotal = (rate) => {
    rate.innerText = currency + getValue(valueAttr) + " :)";
};

const getValue = (rate) => rate.getAttribute(valueAttr);
const setValue = (rate) => rate.setAttribute(valueAttr, getTotal(rate));
const mutateValue = (rate) => getValue(rate) ? setTotal(rate) : setValue(rate);
const injectupc = (mutations => {
    const rates = async () => await getAllEl('#total-rate');
    for (const rate in rates) mutateValue(rate);
});

const upcObserver = new MutationObserver(injectupc);

pollDOM();