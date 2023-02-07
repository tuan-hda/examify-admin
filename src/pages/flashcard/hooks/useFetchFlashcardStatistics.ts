import { getFlashcardStatisticsService } from 'api/flashcard/flashcard';
import { useState, useEffect, useCallback } from 'react';

const useFetchFlashcardStatistics = () => {
  const [data, setData] = useState<any>();

  const fetchData = useCallback(async () => {
    try {
      const response = await getFlashcardStatisticsService();
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

export default useFetchFlashcardStatistics;
