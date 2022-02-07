/**
 *  Gets the UPC map by constructing it from
 *  the rate element image src attribute.
 *
 *  @param {HTMLElement} rate
 */
export const getProvider: (rate: HTMLElement) => string = (
  rate: HTMLElement
) => {
  const img =
    rate.parentElement.parentElement?.getElementsByTagName('img')[0] ||
    rate.parentElement.parentElement.parentElement?.getElementsByTagName(
      'img'
    )[0];

  const imgSrc = img.getAttribute('src');
  return imgSrc.match(/\/([a-zA-Z]*?)\./)[1];
};
