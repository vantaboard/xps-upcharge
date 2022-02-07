import * as React from 'react';
import { OptionsWrapper, StyledOptions } from '../../../styles/tab';

/**
 * Options component.
 *
 * @returns {JSX.Element} The options component.
 */
export const Options: () => JSX.Element = (): JSX.Element => {
  return (
    <OptionsWrapper>
      <StyledOptions id="options-btn">Options</StyledOptions>
    </OptionsWrapper>
  );
};

export default Options;
