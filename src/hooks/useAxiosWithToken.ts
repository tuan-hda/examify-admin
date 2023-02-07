import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axiosBase from 'api/axios';
import { RootState } from 'redux/store';

const useAxiosWithToken = () => {
  const { accessToken } = useSelector((store: RootState) => store.auth);

  useEffect(() => {
    const request = axiosBase.interceptors.request.use(
      (config: any) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = 'Bearer ' + accessToken;
        }
        return config;
      },
      (error: any) => error
    );

    return () => {
      axiosBase.interceptors.request.eject(request);
    };
  }, [accessToken]);

  return axiosBase;
};

export default useAxiosWithToken;
