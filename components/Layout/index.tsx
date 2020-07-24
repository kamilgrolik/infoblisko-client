import React, { ReactNode, useState } from 'react';
import { Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { useTranslation } from 'react-i18next';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <header>
        <Navbar color='light' light expand='md'>
          <NavbarBrand href='/'>infoblisko</NavbarBrand>
          <NavbarToggler onClick={toggle}></NavbarToggler>
        </Navbar>
      </header>
      {children}
      <footer>footer</footer>
    </div>
  );
};

export default Layout;
