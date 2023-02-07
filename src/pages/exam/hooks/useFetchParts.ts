import { getPartService } from 'api/exam/exam';
import { useState, useEffect, useCallback } from 'react';

const useFetchParts = (id: number) => {
  const [data, setData] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await getPartService(id);
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

export default useFetchParts;
