import React from 'react';
import { Checkbox } from '../../../styles/options';

/**
 * Content component.
 *
 * @returns {JSX.Element} The content component.
 */
export const Content = (): JSX.Element => {
  return (
    <div>
      <label htmlFor="options-residential">
        <Checkbox type="checkbox" id="options-residential" />
        Residential checked by default.
      </label>
    </div>
  );
};

export default Content;
