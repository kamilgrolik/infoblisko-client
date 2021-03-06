import React from 'react';
import Head from 'next/head';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import { appWithTranslation, useTranslation } from '../i18n';
import withData from '../lib/apollo';
import Layout from '../components/Layout';
import { GlobalStyles } from '../styles/global';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/scss/mixins/_breakpoints.scss';

const AppMain = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation();

  return (
    <>
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
    </>
  );
};

AppMain.getInitialProps = async (appContext: AppContext) => {
  const appProps: AppInitialProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default withData(appWithTranslation(AppMain));
