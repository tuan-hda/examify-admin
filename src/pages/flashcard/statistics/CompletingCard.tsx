// material-ui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Card, Grid, Typography } from '@mui/material';

// assets
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { colors } from 'theme';

const CardWrapper = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: '#fff',
  overflow: 'hidden',
  borderRadius: '12px',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: colors.primary[700],
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
    background: colors.primary[600],
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

const CompletingCard = ({ value }: { value: number }) => {
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
                      backgroundColor: colors.primary[800],
                      mt: 1,
                    }}
                  >
                    <CreditCardIcon />
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
                Tổng số flashcard trong hệ thống
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
};

export default CompletingCard;
