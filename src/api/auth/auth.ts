import { AxiosInstance } from 'axios';
import axios from '../axios';

// export const signUpService = (
//   email: string,
//   firstname: string,
//   lastname: string,
//   password: string,
//   passwordConfirmation: string
// ) => {
//   return axios.post('/users/register', {
//     email,
//     firstname,
//     lastname,
//     password,
//     passwordConfirmation,
//   });
// };

export const signInService = (email: string, password: string) => {
  return axios.post(
    '/auth/login',
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
};

export const logOutService = (axiosPrivate: AxiosInstance) => {
  return axiosPrivate.delete('/auth/logout');
};

export const refreshTokenService = () => {
  return axios.post('/auth/refresh-token', {}, { withCredentials: true });
};

// User
export const getAllUsersService = () => {
  return axios.get('/users');
};

export const getUserInfoService = (axiosPrivate: AxiosInstance) => {
  return axiosPrivate.get('/users/me');
};

export const updateUserInfoService = (
  axiosPrivate: AxiosInstance,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  phoneNumber: string,
  description: string
) => {
  return axiosPrivate.put('/users/update-info', {
    firstName,
    lastName,
    dateOfBirth,
    phoneNumber,
    description,
  });
};

export const changePasswordService = (
  axiosPrivate: AxiosInstance,
  oldPassword: string,
  newPassword: string
) => {
  return axiosPrivate.put('/users/change-password', {
    oldPassword,
    newPassword,
  });
};

export const changeAvatarService = (axiosPrivate: AxiosInstance, newImageUrl: string) => {
  return axiosPrivate.put('/users/avatar', {
    newImageUrl,
  });
};
