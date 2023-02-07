import { getCourseDetailStatisticsService } from 'api/course/course';
import { useState, useEffect, useCallback } from 'react';

const useFetchCourseDetailStatistics = (id: number, year: number) => {
  const [data, setData] = useState<any>({});

  const fetchData = useCallback(async () => {
    try {
      const response = await getCourseDetailStatisticsService(id, year);
      setData(response.data.data);
    } catch (error: any) {
      console.log('🚀 ~ file: useFetchCourseDetailStatistics.ts:12 ~ fetchData ~ error', error);
    }
  }, [id, year]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, fetchData };
};

export default useFetchCourseDetailStatistics;
