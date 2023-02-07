import { getUserDetailStatisticsService } from 'api/users/users';
import { useState, useEffect, useCallback } from 'react';

const useFetchUserDetailStatistics = (year: number) => {
  const [data, setData] = useState<any>({});

  const fetchData = useCallback(async () => {
    try {
      const response = await getUserDetailStatisticsService(year);
      setData(response.data.data);
    } catch (error: any) {
      console.log('🚀 ~ file: useFetchUserDetailStatistics.ts:12 ~ fetchData ~ error', error);
    }
  }, [year]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, fetchData };
};

export default useFetchUserDetailStatistics;
