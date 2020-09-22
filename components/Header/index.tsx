import React, { useContext } from 'react';
import Link from 'next/link';
import { Button, Container } from 'reactstrap';
import Context from '../../context/Context';
import { logout } from '../../lib/auth';
import { Wrapper, HeadingsWrapper, ButtonsWrapper } from './styled';

const Header = () => {
  const { user, setUser } = useContext(Context);

  return (
    <Wrapper>
      <Container className='d-flex justify-content-between align-items-center'>
        <HeadingsWrapper>
          <Link href='/'>
            <a>
              <h1>infoblisko</h1>
              <h2>platforma wyminay informacji lokalnych</h2>
            </a>
          </Link>
        </HeadingsWrapper>
        <ButtonsWrapper>
          {user ? (
            <div
              onClick={() => {
                if (setUser) {
                  logout();
                  setUser(null);
                }
              }}
            >
              <p>{user.username}</p>
            </div>
          ) : (
            <>
              <Link href='/zaloguj'>
                <Button outline color='primary' className='login'>
                  <a>Zaloguj się</a>
                </Button>
              </Link>
              <Link href='/utworz-konto'>
                <Button color='primary' className='register'>
                  <a>Utwórz konto</a>
                </Button>
              </Link>
            </>
          )}
        </ButtonsWrapper>
      </Container>
    </Wrapper>
  );
};

export default Header;
