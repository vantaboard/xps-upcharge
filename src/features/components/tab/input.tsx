import * as React from 'react';
import { Name, StyledInput, UPCProvider } from '../../../styles/tab';

/**
 * Props for the input component allowing a name to be provided.
 */
interface IInputProps {
  name: string;
}

/**
 * The input component which provides an input for the upcharge percentages.
 *
 * @param {IInputProps} props The props for the input component.
 * @returns {JSX.Element} The input component.
 */
const Input: (props: IInputProps) => JSX.Element = (
  props: IInputProps
): JSX.Element => {
  const { name } = props;
  const id = name.toLowerCase();

  return (
    <UPCProvider className="upc-provider">
      <StyledInput id={`upc-${id}`} type="text" maxLength={2} size={3} />
      <Name id={id}>{name}</Name>
    </UPCProvider>
  );
};

export default Input;
