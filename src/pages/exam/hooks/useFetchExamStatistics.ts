import { getExamStatisticsService } from 'api/exam/exam';
import { useState, useEffect, useCallback } from 'react';

const useFetchExamStatistics = () => {
  const [data, setData] = useState<any>({});

  const fetchData = useCallback(async () => {
    try {
      const response = await getExamStatisticsService();
      setData(response.data.data);
    } catch (error: any) {
      console.log('🚀 ~ file: useFetchExamStatistics.ts:12 ~ fetchData ~ error', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, fetchData };
};

export default useFetchExamStatistics;
