import { getSetQuestionDetailService, getSideService } from 'api/exam/exam';
import { useState, useEffect, useCallback } from 'react';

const useFetchSetDetail = (id: number) => {
  const [data, setData] = useState<any>({});

  const fetchData = useCallback(async () => {
    try {
      const response = await getSetQuestionDetailService(id);
      const response2 = await getSideService(id);
      setData({
        ...response.data.data,
        side: response2.data.data[0]?.paragraph || '',
      });
    } catch (error: any) {
      console.log('🚀 ~ file: useFetchFlashcardSetDetail.tsx:18 ~ fetchData ~ error', error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, fetchData };
};

export default useFetchSetDetail;
