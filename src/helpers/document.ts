/**
 * Handles click events on the document for the UPC dropdown menu.
 *
 * @param {HTMLElement} dropdown
 *
 * @returns {(e: MouseEvent) => void}
 */
export const documentClickHandler: (
  dropdown: HTMLElement
) => (e: MouseEvent) => void = (
  dropdown: HTMLElement
): ((e: MouseEvent) => void) => {
  /**
   * Element for the dropdown menu.
   */
  const upcTab = document.querySelector('#qa-upc-tab');

  /**
   * Class names for the dropdown menu.
   */
  const classNames = [];

  /**
   * IDs for the dropdown menu.
   */
  const ids = [];

  /**
   * Loops through the dropdown menu's class names and IDs
   * and pushes them to the classNames and ids arrays.
   */
  for (const node of upcTab.querySelectorAll('*')) {
    if (node.className) classNames.push(node.className);
    if (node.id) ids.push(node.id);
  }

  /**
   * Start of the click event handler.
   *
   * This function compares all actively clicked target class names and IDs
   * to the classNames and ids arrays. If the target class name or ID is found
   * in the classNames or ids arrays, the dropdown menu is hidden.
   */
  return (e: MouseEvent) => {
    const target = e.target as HTMLTextAreaElement;

    const reducer = (target: string) => (sum: string, next: string) =>
      sum || next === target;
    const hasClassNames = classNames.reduce(reducer(target.className), false);
    const hasIds = ids.reduce(reducer(target.id), false);

    if (!hasClassNames && !hasIds) dropdown.style.display = '';
  };
};
