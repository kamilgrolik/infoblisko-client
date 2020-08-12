import React from 'react';
import { withTranslation, useTranslation } from '../i18n';
import IncidentEntries from '../components/IncidentEntries';

const Homepage = () => {
  const { t } = useTranslation();

  return (
    <>
      <IncidentEntries />
    </>
  );
};

Homepage.getInitialProps = async () => ({
  namespacesRequired: ['homepage', 'common'],
});

export default withTranslation('common')(Homepage);
