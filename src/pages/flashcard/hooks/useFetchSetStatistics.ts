import { getSetStatisticsService } from 'api/flashcard/flashcard';
import { useState, useEffect, useCallback } from 'react';

const useFetchSetStatistics = (id: number, year: number) => {
  const [data, setData] = useState<any>({});

  const fetchData = useCallback(async () => {
    try {
      const response = await getSetStatisticsService(id, year);
      setData(response.data.data);
    } catch (error: any) {
      console.log('🚀 ~ file: useFetchSetStatistics.ts:12 ~ fetchData ~ error', error);
    }
  }, [id, year]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, fetchData };
};

export default useFetchSetStatistics;
