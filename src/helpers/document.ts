export const DocumentClickHandler: (
  dropdown: HTMLElement
) => (e: MouseEvent) => void = (dropdown: HTMLElement) => {
  const upcTab = document.querySelector('#qa-upc-tab');
  const classNames = [];
  const ids = [];
  for (const node of upcTab.querySelectorAll('*')) {
    if (node.className) classNames.push(node.className);
    if (node.id) ids.push(node.id);
  }

  return (e: MouseEvent) => {
    const target = e.target as HTMLTextAreaElement;

    const reducer = (target: string) => (sum: string, next: string) =>
      sum || next === target;
    const hasClassNames = classNames.reduce(reducer(target.className), false);
    const hasIds = ids.reduce(reducer(target.id), false);

    if (!hasClassNames && !hasIds) dropdown.style.display = '';
  };
};
