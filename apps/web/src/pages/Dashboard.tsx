import { Page } from '@web/pages/layout/Page';
import { useTranslation } from 'react-i18next';

export const DashboardView = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <div className="flex flex-col gap-4 mx-1">
        {t('pages.dashboard.title')}
      </div>
    </Page>
  );
};
