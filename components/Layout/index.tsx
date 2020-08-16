import React, { ReactNode, useState } from 'react';
import { Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { Wrapper, Footer } from './styled';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Wrapper backgroundImageUrl='/images/bg.png'>
      <header>
        <Navbar expand='md' color='primary'>
          <NavbarBrand href='/' style={{ color: '#fff' }}>
            infoblisko
          </NavbarBrand>
          <NavbarToggler onClick={toggle}></NavbarToggler>
        </Navbar>
      </header>
      <main>{children}</main>
      <Footer></Footer>
    </Wrapper>
  );
};

export default Layout;
