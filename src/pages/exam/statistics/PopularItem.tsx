import { Divider, Grid, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function PopularItem({ hideDivider = false, data }: { hideDivider?: boolean; data: any }) {
  return (
    <Grid item xs={12}>
      <Grid container direction="column">
        <Grid item>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography
                variant="subtitle1"
                color="inherit"
                sx={{ fontSize: '14px', fontWeight: 600 }}
              >
                Bajaj Finery
              </Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    {data.participants_count} <PersonIcon sx={{ fontSize: '18px' }} />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'success.dark',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {data.taking_count} lượt thi
          </Typography>
        </Grid>
      </Grid>
      {!hideDivider && <Divider sx={{ my: 1.5 }} />}
    </Grid>
  );
}

export default PopularItem;
