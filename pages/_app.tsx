import React from 'react';
import Head from 'next/head';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import { appWithTranslation, useTranslation } from '../i18n';
import Layout from '../components/Layout';

const MyApp = ({ Component, pageProps }: AppProps) => {
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
          rel='stylesheet'
          href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
          integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps: AppInitialProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default appWithTranslation(MyApp);
