import { getAllExamsServicePure } from 'api/exam/exam';
import { useState, useEffect, useCallback } from 'react';

const useFetchExams = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await getAllExamsServicePure();
      setData(response.data.data);
    } catch (error: any) {
      console.log('🚀 ~ file: useFetchExams.ts:12 ~ fetchData ~ error', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, fetchData };
};

export default useFetchExams;
