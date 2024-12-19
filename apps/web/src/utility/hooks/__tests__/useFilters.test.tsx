import { FilterPeriod } from '@web/types';
import {
  filtersToQuery,
  parseDate,
  parseEnum,
  parseNumber,
  parsePeriod,
  useFilters
} from '@web/utility/hooks/useFilters';
import { ApplicationEnum } from '@workalizer/shared';
import { endOfDay, startOfDay, subDays } from 'date-fns';
import { useLocation } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn()
}));

describe('Parsing Functions', () => {
  describe('parseEnum', () => {
    it('should return enum value if a valid parameter is provided', () => {
      const queryParams = new URLSearchParams({ app: ApplicationEnum.CHAT });
      const result = parseEnum(queryParams, 'app', ApplicationEnum);
      expect(result).toBe(ApplicationEnum.CHAT);
    });

    it('should return null for an invalid parameter', () => {
      const queryParams = new URLSearchParams({ app: 'invalid' });
      const result = parseEnum(queryParams, 'app', ApplicationEnum);
      expect(result).toBeNull();
    });
  });

  describe('parseNumber', () => {
    it('should parse a valid numeric value', () => {
      const queryParams = new URLSearchParams({ orgunit: '123' });
      const result = parseNumber(queryParams, 'orgunit');
      expect(result).toBe(123);
    });

    it('should return null for an invalid number', () => {
      const queryParams = new URLSearchParams({});
      const result = parseNumber(queryParams, 'orgunit');
      expect(result).toBeNull();
    });
  });

  describe('parsePeriod', () => {
    it('should return a valid period value', () => {
      const queryParams = new URLSearchParams({ period: 'week' });
      const result = parsePeriod(queryParams, 'period');
      expect(result).toBe('week');
    });

    it('should return null for an invalid period', () => {
      const queryParams = new URLSearchParams({ period: 'invalid' });
      const result = parsePeriod(queryParams, 'period');
      expect(result).toBeNull();
    });
  });

  describe('parseDate', () => {
    it('should parse a valid date', () => {
      const queryParams = new URLSearchParams({ datefrom: '2023-01-01' });
      const result = parseDate(queryParams, 'datefrom');
      expect(result).toEqual(new Date('2023-01-01'));
    });

    it('should return null for an invalid date', () => {
      const queryParams = new URLSearchParams({});
      const result = parseDate(queryParams, 'datefrom');
      expect(result).toBeNull();
    });
  });
});

describe('useFilters Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return filter values from query parameters', () => {
    const queryParams = `?orgunit=1&user=2&period=week&datefrom=2023-01-01&dateto=2023-01-07&app=${ApplicationEnum.DRIVE}&page=3`;
    (useLocation as jest.Mock).mockReturnValue({ search: queryParams });

    const filters = useFilters();
    expect(filters).toEqual({
      orgUnit: 1,
      user: 2,
      period: 'week',
      dateFrom: new Date('2023-01-01'),
      dateTo: new Date('2023-01-07T23:59:59.999Z'),
      app: ApplicationEnum.DRIVE,
      page: 3
    });
  });

  it('should return default values when parameters are absent', () => {
    (useLocation as jest.Mock).mockReturnValue({ search: '' });

    const filters = useFilters();
    expect(filters).toEqual({
      orgUnit: null,
      user: null,
      period: 'week',
      dateFrom: subDays(startOfDay(new Date()), 6),
      dateTo: endOfDay(new Date()),
      app: null,
      page: null
    });
  });
});

describe('filtersToQuery Function', () => {
  it('should convert filter object to a query string', () => {
    const filters = {
      orgUnit: 1,
      user: 2,
      period: 'week' as FilterPeriod,
      dateFrom: new Date('2023-01-01'),
      dateTo: new Date('2023-01-07'),
      app: ApplicationEnum.CHAT,
      page: 3
    };

    const queryString = filtersToQuery(filters);
    expect(queryString).toBe(
      `orgunit=1&user=2&period=week&datefrom=2023-01-01&dateto=2023-01-07&app=${ApplicationEnum.CHAT}&page=3`
    );
  });

  it('should exclude parameters with null values', () => {
    const filters = {
      orgUnit: null,
      user: null,
      period: 'week' as FilterPeriod,
      dateFrom: new Date('2023-01-01'),
      dateTo: new Date('2023-01-07'),
      app: null,
      page: null
    };

    const queryString = filtersToQuery(filters);
    expect(queryString).toBe(
      'period=week&datefrom=2023-01-01&dateto=2023-01-07'
    );
  });
});
