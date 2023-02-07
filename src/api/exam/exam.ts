import { INewExam, IUpdateExam } from 'api/exam/examInterface';
import axiosBase from 'api/axios';
import { AxiosInstance } from 'axios';

export const getAllExamsService = async (axiosPrivate: AxiosInstance) => {
  return (await axiosPrivate.get('/exams')).data;
};

export const getAllExamsServicePure = () => {
  return axiosBase.get('/exams');
};

export function getExamDetailService(id: number) {
  return axiosBase.get('/exams/' + id);
}

export function getExamSeriesService() {
  return axiosBase.get('/examSeries');
}

export function createExamSeriesService({ name, author, createBy }: any) {
  return axiosBase.post('/examSeries/create', { name, author, createBy });
}

export function updateExamSeriesService({ id, name, author, createBy }: any) {
  return axiosBase.put('/examSeries/update/' + id, { name, author, createBy });
}

export function deleteExamSeriesService(id: any) {
  return axiosBase.delete('/examSeries/delete/' + id);
}

export function createExamService(data: INewExam) {
  return axiosBase.post('/exams/create', data);
}

export function updateExamService(data: IUpdateExam) {
  return axiosBase.put('/exams/update/' + data.id, data);
}

export function deleteExamService(id: number) {
  return axiosBase.delete('/exams/delete/' + id);
}

// Part
export function getPartService(id?: number) {
  return axiosBase.get('/parts/belong-to-exam/' + id);
}

export function getPartDetailService(id?: number) {
  return axiosBase.get('/parts/' + id);
}

export function createPartService(data: any) {
  return axiosBase.post('/parts/create', data);
}

export function updatePartService(data: any) {
  return axiosBase.put('/parts/update/' + data.id, data);
}

export function deletePartService(id: any) {
  return axiosBase.delete('/parts/delete/' + id);
}

// Set question
export function getSetQuestionService(id?: number) {
  return axiosBase.get('/setQuestions/belong-to-part/' + id);
}

export function getSetQuestionDetailService(id?: number) {
  return axiosBase.get('/setQuestions/' + id);
}

export function createSetQuestionService(data: any) {
  return axiosBase.post('/setQuestions/create', data);
}

export function updateSetQuestionService(data: any) {
  return axiosBase.put('/setQuestions/update/' + data.id, data);
}

export function deleteSetQuestionService(id: any) {
  return axiosBase.delete('/setQuestions/delete/' + id);
}

// Side
export function getSideService(id?: number) {
  return axiosBase.get('/sides/belong-to-set-question/' + id);
}

export function getSideDetailService(id?: number) {
  return axiosBase.get('/sides/' + id);
}

export function createSideService(data: any) {
  return axiosBase.post('/sides/create', data);
}

export function updateSideService(data: any) {
  return axiosBase.put('/sides/update/' + data.id, data);
}

export function deleteSideService(id: any) {
  return axiosBase.delete('/sides/delete/' + id);
}

// Question
export function getQuestionService(id?: number) {
  return axiosBase.get('/questions/belong-to-set-question/' + id);
}

export function getQuestionDetailService(id?: number) {
  return axiosBase.get('/questions/' + id);
}

export function createQuestionService(data: any) {
  return axiosBase.post('/questions/create', data);
}

export function updateQuestionService(data: any) {
  return axiosBase.put('/questions/update/' + data.id, data);
}

export function deleteQuestionService(id: any) {
  return axiosBase.delete('/questions/delete/' + id);
}

// Hashtag
export function getHashtagService() {
  return axiosBase.get('/hashtags');
}

export function getHashtagDetailService(id?: number) {
  return axiosBase.get('/hashtags/' + id);
}

export function createHashtagService(data: any) {
  return axiosBase.post('/hashtags/create', data);
}

export function updateHashtagService(data: any) {
  return axiosBase.put('/hashtags/update/' + data.id, data);
}

export function deleteHashtagService(id: any) {
  return axiosBase.delete('/hashtags/delete/' + id);
}

export function getExamStatisticsService() {
  return axiosBase.get('/exams/statistics');
}

export function getExamDetailStatisticsService(id: number, year: number) {
  return axiosBase.get('/exams/statistics/' + id, {
    params: { year },
  });
}
