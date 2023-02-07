import { getCourseStatisticsService } from 'api/course/course';
import { useState, useEffect, useCallback } from 'react';

const useFetchCourseStatistics = () => {
  const [data, setData] = useState<any>({});

  const fetchData = useCallback(async () => {
    try {
      const response = await getCourseStatisticsService();
      setData(response.data.data);
    } catch (error: any) {
      console.log('🚀 ~ file: useFetchCourseStatistics.ts:12 ~ fetchData ~ error', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, fetchData };
};

export default useFetchCourseStatistics;
