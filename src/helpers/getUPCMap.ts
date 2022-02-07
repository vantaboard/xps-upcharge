import { upcs } from '../data/upcs';

export const getUPCMap: () => Map<string, HTMLInputElement> = () => {
  const upcMap: Map<string, HTMLInputElement> = new Map();

  upcs.forEach((upc) => {
    upcMap[upc.toLowerCase()] = document.querySelector(
      `#upc-${upc.toLowerCase()}`
    );
  });

  return upcMap;
};

export default getUPCMap;
