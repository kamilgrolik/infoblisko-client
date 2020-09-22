import React, { ReactNode } from 'react';
import { default as BootstrapModal } from 'reactstrap/lib/Modal';

interface Props {
  children: ReactNode;
}

const Modal = ({ children }: Props) => {
  //test
  return <BootstrapModal>{children}</BootstrapModal>;
};

export default Modal;
