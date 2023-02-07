import { getAllCoursesService } from 'api/course/course';
import { useState, useEffect, useCallback } from 'react';
const useFetchCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);

  const getAllCourses = useCallback(async () => {
    try {
      const response = await getAllCoursesService();
      setCourses(response.data.data);
    } catch (error: any) {
      console.log('🚀 ~ file: useFetchCourses.ts:11 ~ getAllCourses ~ error', error);
    }
  }, []);

  useEffect(() => {
    getAllCourses();
  }, [getAllCourses]);

  return { courses };
};

export default useFetchCourses;
