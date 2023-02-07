import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Card, Grid, Typography } from '@mui/material';

// assets
import Person2Icon from '@mui/icons-material/Person2';
import { colors } from 'theme';

const CardWrapper = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  borderRadius: '12px',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: colors.greenAccent[400],
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
    background: colors.greenAccent[300],
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

const JoiningCard = ({ data }: { data: any }) => {
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
                      backgroundColor: colors.greenAccent[200],
                      mt: 1,
                    }}
                  >
                    <Person2Icon />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                    <Typography
                      sx={{
                        fontSize: '2.125rem',
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                        gap: '8px',
                      }}
                    >
                      {data.value}
                    </Typography>
                    <Typography sx={{ fontSize: '14px' }}>(+{data.newValue} tháng qua)</Typography>
                  </Box>
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
                Tổng số người dùng
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
};

JoiningCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default JoiningCard;
