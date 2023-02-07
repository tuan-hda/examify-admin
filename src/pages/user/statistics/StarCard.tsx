// material-ui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Card, Typography, Grid } from '@mui/material';

// assets
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import { colors } from 'theme';

const CardWrapper = styled(Card)(({ theme }) => ({
  backgroundColor: '#fff',
  color: '#333',
  overflow: 'hidden',
  borderRadius: '12px',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(100.04deg, ${colors.orange[600]} -20%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140,
    },
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(40.9deg, ${colors.orange[500]} 0%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70,
    },
  },
}));

const StarCard = ({ value }: { value: number }) => {
  return (
    <>
      <CardWrapper sx={{ height: '100%' }}>
        <Box sx={{ p: 2.25 }}>
          <Grid container direction="column">
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Avatar
                    variant="rounded"
                    sx={{
                      backgroundColor: colors.orange[500],
                      mt: 1,
                    }}
                  >
                    <AutoFixOffIcon />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography
                    sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}
                  >
                    {value}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ mb: 1.25 }}>
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                Tích luỹ của toàn bộ đạo hữu
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
};

export default StarCard;
