import {
  Filters,
  filtersToQuery,
  useFilters
} from '@web/utility/hooks/useFilters';
import { useNavigate } from 'react-router-dom';

type NavigateToParams = {
  pathname: string;
  newFilters?: Partial<Filters>;
  resetScroll?: boolean;
};

export function useNavigateTo() {
  const navigate = useNavigate();
  const filters = useFilters();

  return function navigateTo({
    pathname,
    newFilters = {},
    resetScroll = true
  }: NavigateToParams): void {
    const query = filtersToQuery({
      ...filters,
      ...newFilters
    });

    navigate(`${pathname}?${query}`, { replace: false });

    if (resetScroll) {
      window.scrollTo(0, 0);
    }
  };
}
