import { upcs } from '../data/upcs';

/**
 * Gets the UPC map by constructing it from the UPC data.
 *
 * @returns {Map<string, HTMLInputElement>}
 */
export const getUPCMap: () => Map<string, HTMLInputElement> = (): Map<
  string,
  HTMLInputElement
> => {
  const upcMap: Map<string, HTMLInputElement> = new Map();

  upcs.forEach((upc) => {
    upcMap[upc.toLowerCase()] = document.querySelector(
      `#upc-${upc.toLowerCase()}`
    );
  });

  return upcMap;
};

export default getUPCMap;
