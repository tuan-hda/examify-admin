import { getSetQuestionService } from 'api/exam/exam';
import { useState, useEffect, useCallback } from 'react';

const useFetchSet = (id: number) => {
  const [data, setData] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await getSetQuestionService(id);
      setData(response.data.data);
    } catch (error: any) {
      console.log('🚀 ~ file: useFetchFlashcardSetDetail.tsx:18 ~ fetchData ~ error', error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, fetchData };
};

export default useFetchSet;
