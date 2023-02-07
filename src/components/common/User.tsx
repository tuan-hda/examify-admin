import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Avatar, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { colors } from 'theme';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton } from '@mui/material';

const User = () => {
  const { user } = useSelector((store: RootState) => store.auth);
  const { avt, firstName, lastName, email } = user;

  return (
    <Stack direction="row" alignItems="center">
      <Avatar
        src={avt}
        alt={firstName + ' ' + lastName}
        sx={{
          width: '40px',
          height: '40px',
        }}
      />
      <Box ml="14px" overflow="hidden" textOverflow="ellipsis">
        <Typography fontSize="14px" fontWeight="600" color="white" noWrap>
          {firstName + ' ' + lastName}
        </Typography>
        <Typography fontSize="12px" color={colors.grey.light2} noWrap>
          {email}
        </Typography>
      </Box>
      <IconButton
        sx={{
          ml: 'auto',
        }}
      >
        <MoreHorizIcon sx={{ color: 'white' }} />
      </IconButton>
    </Stack>
  );
};

export default User;
