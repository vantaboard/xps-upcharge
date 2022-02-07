import * as React from 'react';
import { StyledButton } from '../../../styles/tab';

/**
 * Button component.
 *
 * @returns {JSX.Element} The button component.
 */
const Button: () => JSX.Element = (): JSX.Element => {
  return (
    <StyledButton className="upc-button">
      <i className="uk-icon-laptop uk-icon-medium"></i>
    </StyledButton>
  );
};

export default Button;
