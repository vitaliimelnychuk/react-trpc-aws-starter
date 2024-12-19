// import { RouterOutputs } from '@web/lib/trpc';

// export type CurrentUser = Exclude<RouterOutputs['currentUser'], null>;

// export type User = RouterOutputs['users'][number];

export type FilterPeriod =
  | 'week'
  | 'month'
  | '3month'
  | '6month'
  | 'year'
  | 'custom';

export type IconProps = {
  width: number;
  height: number;
  disabled?: boolean;
  color?: string;
};

export const UserRoles = {
  MANAGER: 'MANAGER',
  USER: 'USER',
  ADMIN: 'ADMIN'
} as const;
