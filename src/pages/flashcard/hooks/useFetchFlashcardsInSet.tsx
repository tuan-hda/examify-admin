import { getFlashcardsInSetService } from 'api/flashcard/flashcard';
import { IFlashcard } from 'api/flashcard/flashcardInterface';
import useAxiosWithToken from 'hooks/useAxiosWithToken';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

function useFetchFlashcardsInSet(flashcardSetId: number) {
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
  const axios = useAxiosWithToken();
  const { accessToken } = useSelector((store: RootState) => store.auth);

  const fetchData = useCallback(async () => {
    try {
      const response = await getFlashcardsInSetService({
        flashcardSetId,
        axios,
      });
      setFlashcards(
        response.data.data.map((f: IFlashcard) => ({
          ...f,
          id: f.fc_id,
        }))
      );
    } catch (error) {
      console.log('🚀 ~ file: useFetchFlashcardsInSet.tsx:26 ~ fetchData ~ error', error);
    }
  }, [flashcardSetId, axios]);

  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [fetchData, accessToken]);

  function addFlashcard(f: IFlashcard) {
    setFlashcards([...flashcards, f]);
  }

  function deleteFlashcard(id: number) {
    setFlashcards(flashcards.filter((f) => f.id !== id));
  }

  return { flashcards, fetchData, addFlashcard, deleteFlashcard };
}

export default useFetchFlashcardsInSet;
