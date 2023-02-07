import { getFlashcardSetDetailService } from 'api/flashcard/flashcard';
import { IFlashcardSet } from 'api/flashcard/flashcardInterface';
import { useState, useEffect, useCallback } from 'react';

const useFetchFlashcardSetDetail = (id: number) => {
  const [detail, setDetail] = useState<IFlashcardSet>();

  const fetchData = useCallback(async () => {
    try {
      const response = await getFlashcardSetDetailService(id);
      setDetail({
        ...response.data.data,
        id: response.data.data.fc_set_id,
      });
    } catch (error: any) {
      console.log('🚀 ~ file: useFetchFlashcardSetDetail.tsx:18 ~ fetchData ~ error', error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { detail, fetchData };
};

export default useFetchFlashcardSetDetail;
