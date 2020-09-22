import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import withData from '../lib/apollo';
import Cookies from 'js-cookie';
import { appWithTranslation, useTranslation } from '../i18n';
import Context from '../context/Context';
import Layout from '../components/Layout';
import { GlobalStyles } from '../styles/global';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppMain = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      // authenticate the token on the server and place set user object
      fetch(`${process.env.NEXT_PUBLIC_API_URL}users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async res => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          Cookies.remove('token');
          setUser(null);
          return null;
        }
        const user = await res.json();
        setUser(user);
      });
    }
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        isAuthenticated: !!user,
        setUser,
      }}
    >
      <Head>
        <title>
          {t('pageTitle')} - {t('pageDescription')}
        </title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap'
          rel='stylesheet'
        />
        <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyCB66OFe36az7VL0w-3cxKijMojUG3LJbs&libraries=places'></script>
      </Head>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Context.Provider>
  );
};

AppMain.getInitialProps = async (appContext: AppContext) => {
  const appProps: AppInitialProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default withData(appWithTranslation(AppMain));
