import * as React from 'react';
import { Name, StyledInput, UPCProvider } from '../../../styles/tab';

interface IInputProps {
  name: string;
};

const Input: (props: IInputProps) => JSX.Element = (props: IInputProps) => {
  const { name } = props;
  const id = name.toLowerCase();

  return (
    <UPCProvider className="upc-provider">
      <StyledInput id={`upc-${id}`} type="text" maxLength={2} size={1} />
      <Name id={id}>{name}</Name>
    </UPCProvider>
  );
};

export default Input;
