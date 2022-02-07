/**
 * Set up the modal content and its event listeners.
 *
 * @returns {void}
 */
export const setupModal = (): void => {
  const optModal = document.querySelector('#options-modal') as HTMLElement;
  const optButton = document.querySelector('#options-btn') as HTMLElement;
  const optClose = document.querySelector('#options-close') as HTMLElement;

  optButton.addEventListener('click', () => {
    optModal.style.display = 'block';
  });

  optClose.addEventListener('click', () => {
    optModal.style.display = 'none';
  });

  document.onclick = (e: MouseEvent) => {
    if (e.target == optModal) optModal.style.display = 'none';
  };
};
