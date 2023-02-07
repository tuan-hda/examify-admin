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
import MoodIcon from '@mui/icons-material/Mood';
import { colors } from 'theme';

// styles
const CardWrapper = styled(Card)(({ theme }) => ({
  backgroundColor: colors.blue[500],
  color: theme.palette.primary.light,
  overflow: 'hidden',
  borderRadius: '12px',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${colors.blue[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${colors.blue[300]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130,
  },
}));

const RatingCard = ({ value }: { value: number }) => {
  return (
    <CardWrapper>
      <Box sx={{ p: 2 }}>
        <List sx={{ py: 0 }}>
          <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                sx={{
                  backgroundColor: colors.blue[600],
                  color: '#fff',
                }}
              >
                <MoodIcon fontSize="inherit" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{
                py: 0,
                mt: 0.45,
                mb: 0.45,
              }}
              primary={
                <Typography sx={{ color: '#fff', fontSize: '16px', fontWeight: 700 }}>
                  {value}
                </Typography>
              }
              secondary={
                <Typography variant="subtitle2" color="#fff">
                  Số người đánh giá
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
