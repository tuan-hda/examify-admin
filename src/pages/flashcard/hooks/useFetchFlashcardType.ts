import { getFlashcardTypeService } from 'api/flashcard/flashcard';
import { IFlashcardType } from 'api/flashcard/flashcardInterface';
import { useState, useEffect, useCallback } from 'react';
const useFetchFlashcardType = () => {
  const [types, setTypes] = useState<IFlashcardType[]>([]);

  function addType(type: IFlashcardType) {
    setTypes([...types, type]);
  }

  function deleteType(id: number) {
    setTypes(types.filter((type) => type.fc_type_id !== id));
  }

  const fetchData = useCallback(async () => {
    try {
      const response = await getFlashcardTypeService();
      setTypes(
        response.data.data.map((item: IFlashcardType) => ({
          ...item,
          id: item.fc_type_id,
        }))
      );
    } catch (error: any) {
      console.log('🚀 ~ file: useFetchCourses.ts:11 ~ getAllCourses ~ error', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { types, addType, fetchData, deleteType };
};

export default useFetchFlashcardType;
