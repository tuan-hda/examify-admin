import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <Box height="100vh" width="100vw" display="flex" p="20px">
        <Box m="auto">
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default AuthLayout;
