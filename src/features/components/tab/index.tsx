import * as React from 'react';
import { ButtonDropdownWrapper, StyledTabItem } from '../../../styles/tab';
import Button from './button';
import Dropdown from './dropdown';

const Tab: () => JSX.Element = () => {
  return (
    <StyledTabItem id="qa-upc-tab">
      <ButtonDropdownWrapper className="upc-button-wrapper">
        <Button />
        <Dropdown />
      </ButtonDropdownWrapper>
    </StyledTabItem>
  );
};

export default Tab;
