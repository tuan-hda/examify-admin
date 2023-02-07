import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosPrivate } from 'api/axios';
import { useEffect } from 'react';
import { refreshTokenService } from 'api/auth/auth';
import { setAccessToken } from 'redux/features/auth/authSlice';

const useAxiosPrivate = (stayOnError?: boolean) => {
  const { accessToken } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const request = axiosPrivate.interceptors.request.use(
      (config) => {
        if (config.headers && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const response = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          try {
            if (localStorage.getItem('interceptor') !== 'start') {
              localStorage.setItem('interceptor', 'start');
              const newAccessToken = (await refreshTokenService()).data?.accessToken;
              dispatch(setAccessToken(newAccessToken));
              return axiosPrivate({
                ...prevRequest,
                headers: {
                  ...prevRequest.headers,
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
            }
          } catch (error) {
            console.log('🚀 ~ file: useAxiosPrivate.ts:21 ~ error', error);
            if (!stayOnError) {
              navigate('/login', {
                state: {
                  from: location.pathname,
                },
              });
            }
          } finally {
            localStorage.removeItem('interceptor');
          }
        } else if (error.code === 'ERR_NETWORK') {
          console.log(error.code);
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(request);
      axiosPrivate.interceptors.response.eject(response);
    };
  }, [accessToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
