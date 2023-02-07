import axiosBase from 'api/axios';
import { IEditCourse, INewCourse, INewLesson, IEditLesson } from './courseInterface';

export const getAllCoursesService = () => {
  return axiosBase.get('/courses');
};

export const getCourseDetailService = (courseId: string, depth = 4) => {
  return axiosBase.get(`/courses/${courseId}`, {
    params: {
      depth,
    },
  });
};

export const getChapterService = (chapterId: string, depth = 3) => {
  return axiosBase.get(`/chapters/${chapterId}`, {
    params: {
      depth,
    },
  });
};

export const searchCourseService = (searchValue: string) => {
  return axiosBase.get(`/courses/search`, {
    params: {
      q: searchValue,
    },
  });
};

export const createNewCourseService = (data: INewCourse) => {
  return axiosBase.post('/courses/create', {
    ...data,
  });
};

export const updateCourseService = (data: IEditCourse) => {
  const { id, ...restData } = data;
  return axiosBase.put(`courses/update/${id}`, {
    ...restData,
  });
};

export const deleteCourseService = (id: string) => {
  return axiosBase.delete(`courses/delete/${id}`);
};

export const createChapterService = (
  courseId: string | number,
  numericOrder: number,
  name: string
) => {
  return axiosBase.post('chapters/create', {
    courseId,
    numericOrder,
    name,
  });
};

export const updateChapterService = (
  id: string,
  courseId: string | number,
  numericOrder: number,
  name: string
) => {
  return axiosBase.put(`chapters/update/${id}`, {
    courseId,
    numericOrder,
    name,
  });
};

export const deleteChapterService = (id: string) => {
  return axiosBase.delete(`chapters/delete/${id}`);
};

export const createUnitService = (
  chapterId: string | number,
  numericOrder: number,
  name: string
) => {
  return axiosBase.post('units/create', {
    chapterId,
    numericOrder,
    name,
  });
};

export const updateUnitService = (
  id: string,
  chapterId: string | number,
  numericOrder: number,
  name: string
) => {
  return axiosBase.put(`units/update/${id}`, {
    chapterId,
    numericOrder,
    name,
  });
};

export const deleteUnitService = (id: string) => {
  return axiosBase.delete(`units/delete/${id}`);
};

export const createNewLessonService = (data: INewLesson) => {
  return axiosBase.post('lessons/create', {
    ...data,
  });
};

export const updateLessonService = (data: IEditLesson) => {
  const { id, ...rest } = data;
  return axiosBase.put(`lessons/update/${id}`, {
    ...rest,
  });
};

export const deleteLessonService = (id: string) => {
  return axiosBase.delete(`lessons/delete/${id}`);
};

export function getCourseStatisticsService() {
  return axiosBase.get('/courses/statistics');
}

export function getCourseDetailStatisticsService(id: number, year: number) {
  return axiosBase.get('/courses/statistics/' + id, {
    params: {
      year,
    },
  });
}
