import { getExamDetailStatisticsService } from 'api/exam/exam';
import { useState, useEffect, useCallback } from 'react';

const useFetchExamDetailStatistics = (id: number, year: number) => {
  const [data, setData] = useState<any>({});

  const fetchData = useCallback(async () => {
    try {
      const response = await getExamDetailStatisticsService(id, year);
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

export default useFetchExamDetailStatistics;
