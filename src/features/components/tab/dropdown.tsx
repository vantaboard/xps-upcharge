import * as React from 'react';
import { List, StyledDropdown } from '../../../styles/tab';
import Input from './input';
import { upcs } from '../../../data/upcs';

const Dropdown: () => JSX.Element = () => {
  return (
        <StyledDropdown className="upc-dropdown">
          <List className="upc-ul">
            {upcs.map((input: string) => <Input name={input} />)}
          </List>
        </StyledDropdown>

  );
};

export default Dropdown;
