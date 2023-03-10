import { Box, Typography } from '@mui/material';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getUserInfo, logOut, resetState, userType } from 'redux/features/auth/authSlice';
import colorConfigs from '../../configs/colorConfigs';
import { toggleBar } from '../../redux/features/appStateSlice';
import { AppDispatch, RootState } from '../../redux/store';
import Sidebar from '../common/Sidebar';
import UnauthorizeState from 'assets/images/unauthorized_state.jpg';
import PrimaryButton from 'components/common/PrimaryButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { colors } from 'theme';

const MainLayout = () => {
  const { hideBar } = useSelector((store: RootState) => store.appState);
  const { user } = useSelector((store: RootState) => store.auth);

  const dispatch = useDispatch<AppDispatch>();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logOut(axiosPrivate));
    dispatch(resetState());
    navigate('/login');
  };

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

  const checkPermission = user.roleName === 'Admin' || user.roleName === 'Teaching Staff';

  if (checkPermission)
    return (
      <Box sx={{ display: 'flex' }}>
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
      </Box>
    );

  return (
    <Box
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
        T??i kho???n c???a b???n ch??a ???????c u??? quy???n
      </Typography>

      <PrimaryButton
        onClick={handleClick}
        variant="contained"
        sx={{
          width: '100%',
          mt: '24px',
          position: 'relative',
          bgcolor: colors.grey.quiteDark,
          '&:hover': {
            bgcolor: colors.grey.bitDark,
          },
        }}
      >
        <LogoutIcon sx={{ position: 'absolute', left: '10px' }} />
        ????ng xu???t
      </PrimaryButton>
    </Box>
  );
};

export default MainLayout;
