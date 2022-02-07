/** Contains all styling for the tab component. */

import styled from 'styled-components';

export const StyledTabItem = styled.li`
  margin-left: 0;
`;

export const StyledInput = styled.input`
  height: 59%;
`;

export const Name = styled.span`
  padding-left: 8px;
  margin-top: 6px;
`;

export const UPCProvider = styled.li`
  display: flex;
  height: auto;
  margin-top: 14px;
`;

export const ButtonDropdownWrapper = styled.div`
  display: flex;
  margin-top: 0.4em;
  flex-direction: row;
`;

export const StyledButton = styled.button`
  border: 0;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  margin-right: 4px;
  height: 100%;
  cursor: pointer;
  -webkit-transition: color 0.5s ease-in;
  -moz-transition: color 0.5s ease-in;
  -o-transition: color 0.5s ease-in;

  hover & {
    color: #d9d9d9;
    -webkit-transition: color 0.5s ease-in;
    -moz-transition: color 0.5s ease-in;
    -o-transition: color 0.5s ease-in;
  }
`;

export const List = styled.ul`
  padding: 0;
  list-style: none;
`;

export const StyledDropdown = styled.div`
  display: none;
  flex-direction: column;
  z-index: 1;
  top: 3.4rem;
  background-color: white;
  border: 1px solid #e8e4e4;
  padding: 0;
  position: relative;
  left: -3.75rem;
`;

export const OptionsWrapper = styled.p`
  margin: auto;
`;

export const StyledOptions = styled.button`
  font-weight: bold;
  font-size: 1rem;
  color: white;
  margin-top: 0px;
  margin-bottom: 15px;
  text-align: center;
  background-color: rgb(102, 102, 102);
  border: 0px none;
  border-radius: 999rem;
  padding: 10px 20px;
`;
