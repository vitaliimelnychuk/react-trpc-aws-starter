// eslint-disable-next-line no-restricted-syntax
import 'i18next';

import common from '@web/translations/en.json';

const resources = {
  common
} as const;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: typeof resources;
  }
}
