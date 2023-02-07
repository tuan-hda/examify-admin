import { getUserStatisticsService } from 'api/users/users';
import { useState, useEffect, useCallback } from 'react';

const useFetchUserStatistics = () => {
  const [data, setData] = useState<any>({});

  const fetchData = useCallback(async () => {
    try {
      const response = await getUserStatisticsService();
      setData(response.data.data);
    } catch (error: any) {
      console.log('🚀 ~ file: useFetchUserStatistics.ts:12 ~ fetchData ~ error', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, fetchData };
};

export default useFetchUserStatistics;
