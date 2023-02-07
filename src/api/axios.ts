import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
const CLOUD_NAME = 'doxsstgkc';
const IMAGE_BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const axiosBase = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const axiosImage = axios.create({
  baseURL: IMAGE_BASE_URL,
});

export const dictionary = axios.create({
  baseURL: 'https://api.dictionaryapi.dev/api/v2/entries/en',
});

export { axiosPrivate, axiosImage, IMAGE_BASE_URL, BASE_URL };

export default axiosBase;
