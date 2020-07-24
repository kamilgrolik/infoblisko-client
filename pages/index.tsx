import React from 'react';
import { withTranslation, useTranslation } from '../i18n';
import { Wall } from '../components/Wall';

const Homepage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Wall />
    </>
  );
};

Homepage.getInitialProps = async () => ({
  namespacesRequired: ['homepage', 'common'],
});

export default withTranslation('common')(Homepage);
