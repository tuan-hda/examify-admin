import { getExamSeriesService } from 'api/exam/exam';
import { useState, useEffect, useCallback } from 'react';

const useFetchExamSeries = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await getExamSeriesService();
      setData(response.data.data);
    } catch (error: any) {
      console.log('🚀 ~ file: useFetchFlashcardSetDetail.tsx:18 ~ fetchData ~ error', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, fetchData };
};

export default useFetchExamSeries;
