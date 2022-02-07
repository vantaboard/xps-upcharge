/**
 * Set up the modal content and its event listeners.
 *
 * @returns {void}
 */
export const setupModal = (): void => {
  const optModal = document.querySelector('#options-modal') as HTMLElement;
  const optButton = document.querySelector('#options-btn') as HTMLElement;
  const optClose = document.querySelector('#options-close') as HTMLElement;

  /** Controls the visibility of the modal by turning it on. */
  optButton.addEventListener('click', () => {
    optModal.style.display = 'block';
  });

  /** Controls the visibility of the modal by turning it off. */
  optClose.addEventListener('click', () => {
    optModal.style.display = 'none';
  });

  document.onclick = (e: MouseEvent) => {
    if (e.target == optModal) optModal.style.display = 'none';
  };
};
