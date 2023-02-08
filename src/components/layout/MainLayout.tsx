import { Box,Typography } from '@mui/material';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getUserInfo, userType } from 'redux/features/auth/authSlice';
import colorConfigs from '../../configs/colorConfigs';
import { toggleBar } from '../../redux/features/appStateSlice';
import { AppDispatch, RootState } from '../../redux/store';
import Sidebar from '../common/Sidebar';
import UnauthorizeState from 'assets/images/unauthorized_state.jpg';


const MainLayout = () => {
  const { hideBar } = useSelector((store: RootState) => store.appState);
  const { user } = useSelector((store: RootState) => store.auth);

  const dispatch = useDispatch<AppDispatch>();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.email && location.pathname === '/') {
      if (user.roleName === 'Admin') navigate('/user');
      else if (user.roleName === 'Teaching Staff') navigate('/course');
    }
  }, [user, navigate, location]);

  useEffect(() => {
    dispatch(getUserInfo(axiosPrivate));
  }, [axiosPrivate, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const  checkPermission =  user.roleName === 'Admin' || user.roleName === 'Teaching Staff'

  return (
    {checkPermission ? <Box sx={{ display: 'flex' }}>
    <Sidebar toggle={() => dispatch(toggleBar())} showBar={!hideBar} />
    <Box
      sx={{
        flexGrow: 1,
        py: 3,
        px: 4,
        height: '100vh',
        backgroundColor: colorConfigs.mainBg,
      }}
    >
      <Outlet />
    </Box>
  </Box>  :<Box
  sx={{
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  }}
>
  <img
    style={{
      objectFit: 'contain',
      maxHeight: '80%',
    }}
    src={UnauthorizeState}
    alt="Unauthorized"
  />

  <Typography variant="h6" sx={{ fontWeight: 700 }}>
    Tài khoản của bạn chưa được uỷ quyền
  </Typography>
</Box>}
    

  );
};

export default MainLayout;
