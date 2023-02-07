// material-ui
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

// assets
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { colors } from 'theme';

// styles
const CardWrapper = styled(Card)(({ theme }) => ({
  backgroundColor: '#fff',
  color: theme.palette.primary.light,
  overflow: 'hidden',
  borderRadius: '12px',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${colors.red[600]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${colors.red[500]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130,
  },
}));

const StarCard = ({ value }: { value: any }) => {
  return (
    <CardWrapper>
      <Box sx={{ p: 2 }}>
        <List sx={{ py: 0 }}>
          <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                sx={{
                  backgroundColor: colors.red[500],
                  color: '#fff',
                }}
              >
                <LocalFireDepartmentIcon fontSize="inherit" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{
                py: 0,
                mt: 0.45,
                mb: 0.45,
              }}
              primary={
                <Typography sx={{ color: '#333', fontSize: '16px', fontWeight: 700 }}>
                  {(value || [])[0]?.name} ({(value || [])[0]?.count} lượt)
                </Typography>
              }
              secondary={
                <Typography variant="subtitle2" color={colors.grey[700]}>
                  Phần thi được yêu thích nhất
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Box>
    </CardWrapper>
  );
};

export default StarCard;
