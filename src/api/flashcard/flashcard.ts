import {
  IUpdateFlashcardSet,
  INewFlashcard,
  IUpdateFlashcard,
} from 'api/flashcard/flashcardInterface';
import { INewFlashcardType, IUpdateFlashcardType, INewFlashcardSet } from './flashcardInterface';
import axiosBase, { dictionary } from 'api/axios';
import { AxiosInstance } from 'axios';

export function getFlashcardTypeService() {
  return axiosBase.get(`/flashcard-types`);
}

export function createFlashcardTypeService({ type, description }: INewFlashcardType) {
  return axiosBase.post('/flashcard-types/create', {
    type,
    description,
  });
}

export function updateFlashcardTypeService({ id, type, description }: IUpdateFlashcardType) {
  return axiosBase.put(`/flashcard-types/update/${id}`, {
    type,
    description,
  });
}

export function deleteFlashcardTypeService(id: number) {
  return axiosBase.delete(`/flashcard-types/delete/${id}`);
}

export const getFlashcardSetService = () => {
  return axiosBase.get('/flashcard-sets');
};

export function createFlashcardSetService({
  axios,
  name,
  description,
  fc_type_id,
}: INewFlashcardSet & { axios: AxiosInstance }) {
  return axios.post('/flashcard-sets/create-system', {
    name,
    flashcardTypeId: fc_type_id,
    description,
  });
}

export function updateFlashcardSetService({
  axios,
  id,
  name,
  description,
  fc_type_id,
}: IUpdateFlashcardSet & { axios: AxiosInstance }) {
  return axios.patch(`/flashcard-sets/update/${id}`, {
    name,
    description,
    access: 'public',
    flashcardTypeId: fc_type_id,
  });
}

export function deleteFlashcardSetService({
  axios,
  fc_set_id,
}: {
  axios: AxiosInstance;
  fc_set_id: number;
}) {
  return axios.delete(`/flashcard-sets/delete/${fc_set_id}`);
}

export const getFlashcardSetDetailService = (id: number) => {
  return axiosBase.get(`/flashcard-sets/${id}`);
};

export const getFlashcardsInSetService = ({
  flashcardSetId,
  axios,
}: {
  axios: AxiosInstance;
  flashcardSetId: number;
}) => {
  return axios.get(`/flashcards/get-from-set/${flashcardSetId}`);
};

export function addFlashcardService({
  axios,
  fc_set_id,
  word,
  meaning,
  type_of_word,
  pronounce,
  audio = '',
  example,
  note,
  image,
}: { axios: AxiosInstance } & INewFlashcard) {
  return axios.post('/flashcards/create', {
    flashcardSetId: fc_set_id,
    word,
    meaning,
    typeOfWord: type_of_word,
    pronounce,
    example,
    audio,
    note,
    image,
  });
}

export function updateFlashcardService({
  axios,
  fc_id,
  word,
  meaning,
  type_of_word,
  pronounce,
  audio,
  example,
  note,
  image,
}: { axios: AxiosInstance } & IUpdateFlashcard) {
  return axios.put(`/flashcards/update/${fc_id}`, {
    word,
    meaning,
    typeOfWord: type_of_word,
    pronounce,
    audio,
    example,
    note,
    image,
  });
}

export function deleteFlashcardService({ axios, fc_id }: { axios: AxiosInstance; fc_id: number }) {
  return axios.delete(`/flashcards/delete/${fc_id}`);
}

export function createBulkFlashcardService({
  axios,
  data,
}: {
  axios: AxiosInstance;
  data: INewFlashcard[];
}) {
  return axios.post('/flashcards/create-bulk', data);
}

export function getWordAudioService(word: string) {
  return dictionary.get('/' + word);
}

export function getFlashcardStatisticsService() {
  return axiosBase.get('/flashcard-sets/statistics');
}

export function getSetStatisticsService(id: number, year: number) {
  return axiosBase.get('/flashcard-sets/statistics/' + id, {
    params: {
      year,
    },
  });
}
