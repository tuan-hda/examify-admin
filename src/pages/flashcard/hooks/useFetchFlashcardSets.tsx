import { getFlashcardSetService } from 'api/flashcard/flashcard';
import { IFlashcardSet } from 'api/flashcard/flashcardInterface';
import { useState, useEffect, useCallback } from 'react';

const useFetchFlashcardSets = () => {
  const [sets, setSets] = useState<IFlashcardSet[]>([]);

  function addSet(set: IFlashcardSet) {
    setSets([...sets, set]);
  }

  function deleteSet(id: number) {
    setSets(sets.filter((set) => set.fc_set_id !== id));
  }

  const fetchData = useCallback(async () => {
    try {
      const response = await getFlashcardSetService();
      setSets(
        response.data.data.map((item: IFlashcardSet) => ({
          ...item,
          id: item.fc_set_id,
        }))
      );
    } catch (error: any) {
      console.log('🚀 ~ file: useFetchFlashcardSets.tsx:28 ~ fetchData ~ error', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { sets, addSet, fetchData, deleteSet };
};

export default useFetchFlashcardSets;
