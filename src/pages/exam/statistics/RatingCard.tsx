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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { colors } from 'theme';
import { convertTimeHours, convertTimeMinutes } from 'utils/formatCurrency';

// styles
const CardWrapper = styled(Card)(({ theme }) => ({
  backgroundColor: colors.orange[300],
  color: theme.palette.primary.light,
  overflow: 'hidden',
  borderRadius: '12px',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${colors.orange[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${colors.orange[300]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130,
  },
}));

const RatingCard = ({ value }: { value: any }) => {
  function getTime(value: number) {
    const hours = convertTimeHours(value);
    const minutes = convertTimeMinutes(value);
    const seconds = value - hours * 3600 - minutes * 60;
    let result = '';
    if (hours) result += hours + 'h ';
    if (minutes) result += minutes + 'm ';
    if (seconds) result += seconds + 's ';
    if (!result) result = '0s';
    return result;
  }

  return (
    <CardWrapper>
      <Box sx={{ p: 2 }}>
        <List sx={{ py: 0 }}>
          <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                sx={{
                  backgroundColor: colors.orange[600],
                  color: '#fff',
                }}
              >
                <AccessTimeIcon fontSize="inherit" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{
                py: 0,
                mt: 0.45,
                mb: 0.45,
              }}
              primary={
                <Typography sx={{ color: '#000', fontSize: '16px', fontWeight: 700 }}>
                  {getTime(value.time)} / {Math.round(value.score * 100)}%
                </Typography>
              }
              secondary={
                <Typography variant="subtitle2" color="#333">
                  Thời gian làm bài / Tỉ lệ đúng trung bình
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Box>
    </CardWrapper>
  );
};

export default RatingCard;
