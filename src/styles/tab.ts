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
  margin-top: .4em;
  flex-direction: row
`;

export const StyledButton = styled.button`
  border: 0;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  margin-right: 4px;
  height: 100%;
  cursor: pointer;
  -webkit-transition: color .5s ease-in;
  -moz-transition: color .5s ease-in;
  -o-transition: color .5s ease-in;

  hover & {
    color: #d9d9d9;
    -webkit-transition: color .5s ease-in;
    -moz-transition: color .5s ease-in;
    -o-transition: color .5s ease-in;
  }
`;

export const List = styled.ul`
  padding: 0;
  list-style: none;
`;

export const StyledDropdown = styled.div`
  display: none;
  z-index: 1;
  top: 3.4rem;
  background-color: white;
  border: 1px solid #e8e4e4;
  padding: 0;
  position: relative;
  left: -3.75rem;
`;
