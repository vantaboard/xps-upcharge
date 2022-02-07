import * as React from 'react';
import { Close, ModalContent, StyledModal } from '../../../styles/options';
import Content from './content';

/**
 * Modal component.
 *
 * @returns {JSX.Element} The modal component.
 */
export const Modal: () => JSX.Element = (): JSX.Element => {
  return (
    <StyledModal id="options-modal">
      <ModalContent>
        <Close id="options-close">&times;</Close>
        <Content />
      </ModalContent>
    </StyledModal>
  );
};

export default Modal;
