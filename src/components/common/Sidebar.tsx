import { Drawer, List, Toolbar, IconButton, Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import assets from '../../assets';
import colorConfigs from '../../configs/colorConfigs';
import sizeConfigs from '../../configs/sizeConfigs';
import appRoutes from '../../routes/appRoutes';
import SidebarItem from './SidebarItem';
import SidebarItemCollapse from './SidebarItemCollapse';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import User from './User';
import { colors } from '../../theme';
import LogoutIcon from '@mui/icons-material/Logout';
import PrimaryButton from './PrimaryButton';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { logOut, resetState } from 'redux/features/auth/authSlice';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

type SidebarProps = {
  toggle: React.MouseEventHandler<HTMLElement>;
  showBar: boolean;
};

const Sidebar = ({ toggle, showBar }: SidebarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logOut(axiosPrivate));
    dispatch(resetState());
    navigate('/login');
  };

  return (
    <Drawer
      open={showBar}
      variant="persistent"
      sx={{
        width: showBar ? sizeConfigs.sidebar.width : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sizeConfigs.sidebar.width,
          boxSizing: 'border-box',
          borderRight: '0px',
          backgroundColor: colorConfigs.sidebar.bg,
          color: colorConfigs.sidebar.color,
          overflow: 'visible',
        },
      }}
    >
      <List
        disablePadding
        sx={{
          '&': {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            pb: '20px',
            height: '100vh',
          },
        }}
      >
        <IconButton
          aria-label="close"
          size="medium"
          onClick={toggle}
          sx={{
            position: 'absolute',
            top: '28px',
            right: '-15px',
            mr: '-5px',
            bgcolor: 'white',
            zIndex: 10,
            boxShadow: '0 0 10px 0 rgba(0,0,0,0.25) !important',
            '&:hover': {
              backgroundColor: '#ccc',
            },
          }}
        >
          <ChevronLeftIcon
            sx={{
              color: 'black',
            }}
          />
        </IconButton>

        <Box sx={{ overflowY: 'auto' }} id="sidebar">
          <Toolbar sx={{ margin: '8px 0 20px' }}>
            <Stack
              sx={{ width: '100%', paddingTop: '20px' }}
              direction="row"
              justifyContent="space-between"
            >
              <img style={{ width: '120px', height: 'auto' }} src={assets.images.logo} alt="s" />
            </Stack>
          </Toolbar>
          {appRoutes.map((route, index) => {
            return route.sidebarProps ? (
              route.child ? (
                <SidebarItemCollapse item={route} key={index} />
              ) : (
                <SidebarItem item={route} key={index} />
              )
            ) : null;
          })}
        </Box>

        <Box width="100%" px="20px" bottom="24px">
          <Typography
            color={colors.grey.bitDark}
            fontSize="12px"
            fontWeight="bold"
            sx={{
              mb: '20px',
            }}
          >
            NGUỜI DÙNG
          </Typography>
          <User />
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
            Đăng xuất
          </PrimaryButton>
        </Box>
      </List>
    </Drawer>
  );
};

export default Sidebar;
