import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RootState } from 'redux/store';
import UnauthorizeState from 'assets/images/unauthorized_state.jpg';
import { Box, Typography } from '@mui/material';

const UserPageLayout = () => {
  const { user } = useSelector((store: RootState) => store.auth);

  if (user.roleName !== 'Admin')
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
          Tài khoản của bạn chưa được uỷ quyền
        </Typography>
      </Box>
    );

  return (
    <>
      <Outlet />
    </>
  );
};

export default UserPageLayout;
