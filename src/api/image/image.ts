import { axiosImage } from 'api/axios';

export const uploadImageService = (file: File, upload_preset: string) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', upload_preset);

  return axiosImage.post('', data);
};
