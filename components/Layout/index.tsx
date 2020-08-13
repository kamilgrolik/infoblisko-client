import React, { ReactNode, useState } from 'react';
import { Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <header>
        <Navbar expand='md' color='primary'>
          <NavbarBrand href='/' style={{ color: '#fff' }}>
            infoblisko
          </NavbarBrand>
          <NavbarToggler onClick={toggle}></NavbarToggler>
        </Navbar>
      </header>
      {children}
      <footer>footer</footer>
    </div>
  );
};

export default Layout;
