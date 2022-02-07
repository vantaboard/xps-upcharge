/**
 * Click event for UPC button that puts it
 * into view on click, otherwise it is hidden.
 */
export const ClickHandler: (dropdown: HTMLElement) => () => void = (
  dropdown: HTMLElement
) => {
  return () => {
    if (dropdown.style.display === '') {
      dropdown.style.display = 'flex';
    } else {
      dropdown.style.display = '';
    }
  };
};
