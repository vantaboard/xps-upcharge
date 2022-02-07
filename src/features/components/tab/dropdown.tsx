import * as React from 'react';
import { upcs } from '../../../data/upcs';
import { List, StyledDropdown } from '../../../styles/tab';
import Input from './input';
import Options from './options';

/**
 * Dropdown component.
 *
 * @returns {JSX.Element} The dropdown component.
 */
const Dropdown: () => JSX.Element = (): JSX.Element => {
  return (
    <StyledDropdown className="upc-dropdown">
      <List className="upc-ul">
        {upcs.map((input: string) => (
          <Input key={input} name={input} />
        ))}
      </List>
      <Options />
    </StyledDropdown>
  );
};

export default Dropdown;
