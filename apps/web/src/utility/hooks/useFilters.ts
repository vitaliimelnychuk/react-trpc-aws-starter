import { FilterPeriod } from '@web/types';
import { endOfDay, format, startOfDay, subDays } from 'date-fns';
import { useLocation } from 'react-router-dom';

export type Filters = {
  user: number | null;
  period: FilterPeriod;
  dateFrom: Date;
  dateTo: Date;
  page: number | null;
};

export function parseEnum<T extends Record<string, string>>(
  queryParams: URLSearchParams,
  key: string,
  enumType: T
): T[keyof T] | null {
  const value = queryParams.get(key);

  if (value && Object.values(enumType).includes(value)) {
    return value as T[keyof T];
  }

  return null;
}

export function parseNumber(
  queryParams: URLSearchParams,
  key: string
): number | null {
  const orgUnit = queryParams.get(key);
  if (orgUnit) {
    return parseInt(orgUnit, 10);
  }
  return null;
}

export function parsePeriod(
  queryParams: URLSearchParams,
  key: string
): FilterPeriod | null {
  const period = queryParams.get(key);
  const allowedPeriods = [
    'week',
    'month',
    '3month',
    '6month',
    'year',
    'custom'
  ];

  if (period && allowedPeriods.includes(period)) {
    return period as FilterPeriod;
  }

  return null;
}

export function parseDate(
  queryParams: URLSearchParams,
  key: string
): Date | null {
  const date = queryParams.get(key);
  if (date) {
    return new Date(date);
  }
  return null;
}

export function useFilters(): Filters {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const dateFrom = parseDate(queryParams, 'datefrom');
  const dateTo = parseDate(queryParams, 'dateto');

  return {
    user: parseNumber(queryParams, 'user'),
    period: parsePeriod(queryParams, 'period') || 'week',
    dateFrom: dateFrom
      ? startOfDay(dateFrom)
      : subDays(startOfDay(new Date()), 6),
    dateTo: dateTo ? endOfDay(dateTo) : endOfDay(new Date()),

    page: parseNumber(queryParams, 'page')
  };
}

export function filtersToQuery(filters: Filters): string {
  const query = new URLSearchParams();
  if (filters.user) {
    query.set('user', filters.user.toString());
  }
  if (filters.period) {
    query.set('period', filters.period);
  }
  if (filters.dateFrom) {
    query.set('datefrom', format(filters.dateFrom, 'yyyy-MM-dd'));
  }
  if (filters.dateTo) {
    query.set('dateto', format(filters.dateTo, 'yyyy-MM-dd'));
  }

  if (filters.page) {
    query.set('page', filters.page.toString());
  }
  return query.toString();
}
