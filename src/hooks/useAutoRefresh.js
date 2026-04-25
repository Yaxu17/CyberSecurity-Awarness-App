import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThreats } from '../store/slices/threatSlice';

export function useAutoRefresh() {
  const dispatch = useDispatch();
  const { autoRefresh, refreshInterval } = useSelector(state => state.ui);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      dispatch(fetchThreats());
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, dispatch]);
}
