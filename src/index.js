import { pollRateDOM, pollResidentialDOM } from './helpers/pollDOM';

/**
 * This is the main entry point for the application.
 * This polls the DOM to check whether the userscript
 * is ready to be injected.
 */
pollRateDOM();
pollResidentialDOM();
