export const getProvider: (rate: HTMLElement) => string = (rate: HTMLElement) => {
  let img =
    rate.parentElement
        .parentElement
       ?.getElementsByTagName('img')[0] ||
    rate.parentElement
        .parentElement
        .parentElement
       ?.getElementsByTagName('img')[0];

  const imgSrc = img.getAttribute('src');
  return imgSrc.match(/\/([a-zA-Z]*?)\./)[1];
}
