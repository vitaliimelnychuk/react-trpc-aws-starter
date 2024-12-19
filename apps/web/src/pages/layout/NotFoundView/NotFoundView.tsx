import {
  Bars4Icon,
  BookmarkSquareIcon,
  BookOpenIcon,
  ChevronRightIcon,
  RssIcon
} from '@heroicons/react/24/outline';
import { homeUrl } from '@web/router/urls';
import { cx } from '@web/utility';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFoundView = () => {
  const { t } = useTranslation();

  const links = [
    {
      icon: <BookOpenIcon className="h-6 w-6 text-indigo-600" />,
      title: t('notFound.documentation'),
      description: t('notFound.documentationDescription'),
      to: homeUrl
    },
    {
      icon: <Bars4Icon className="h-6 w-6 text-indigo-600" />,
      title: t('notFound.APIReference'),
      description: t('notFound.APIReferenceDescription'),
      to: homeUrl
    },
    {
      icon: <BookmarkSquareIcon className="h-6 w-6 text-indigo-600" />,
      title: t('notFound.guides'),
      description: t('notFound.guidesDescription'),
      to: homeUrl
    },
    {
      icon: <RssIcon className="h-6 w-6 text-indigo-600" />,
      title: t('notFound.blog'),
      description: t('notFound.blogDescription'),
      to: homeUrl
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white w-1/2 mx-auto">
      <div className="flex justify-center mt-10">
        <Link to={homeUrl}>
          <img
            className="h-10 w-auto"
            src="/assets/img/logo-full.png"
            alt="Logo"
          />
        </Link>
      </div>

      <div className="flex flex-col justify-center text-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 my-24">
        <p className="text-base font-semibold text-indigo-600">
          {t('errors.404.title')}
        </p>
        <h1 className="mt-2 text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl sm:tracking-tight">
          {t('notFound.title')}
        </h1>
        <p className="mt-2 text-base text-gray-500">{t('notFound.subtitle')}</p>

        <div className="mt-12">
          <p className="text-left text-gray-500 text-sm font-semibold uppercase">
            {t('notFound.popularPages')}
          </p>

          <ul className="mt-4">
            {links.map((link, index) => (
              <li
                key={link.title}
                className={cx(
                  index < links.length - 1 ? 'border-t-2' : 'border-y-2',
                  'py-4'
                )}
              >
                <Link
                  to={link.to}
                  className="flex justify-between items-center"
                >
                  <div className="flex gap-4">
                    <div className="h-12 w-12 flex rounded bg-indigo-50 justify-center items-center">
                      {link.icon}
                    </div>
                    <div className="flex flex-col gap-1 text-left text-base">
                      <p className="font-medium text-gray-900">{link.title}</p>
                      <p className="font-normal text-gray-500">
                        {link.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRightIcon className="h-6 w-6 text-gray-400" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <Link
            to={homeUrl}
            className="text-base font-medium text-indigo-600 hover:text-indigo-500 flex justify-start items-center cursor-pointer"
          >
            {t('notFound.goBackHome')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundView;
