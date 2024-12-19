import { describe, expect, it } from '@jest/globals';
import { FilterPeriod } from '@web/types';
import {
  filtersToQuery,
  parseDate,
  parseNumber,
  parsePeriod
} from '@web/utility/hooks/useFilters';

describe('Parsing Functions', () => {
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

describe('filtersToQuery Function', () => {
  it('should convert filter object to a query string', () => {
    const filters = {
      user: 2,
      period: 'week' as FilterPeriod,
      dateFrom: new Date('2023-01-01'),
      dateTo: new Date('2023-01-07'),
      page: 3
    };

    const queryString = filtersToQuery(filters);
    expect(queryString).toBe(
      `user=2&period=week&datefrom=2023-01-01&dateto=2023-01-07&page=3`
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
