import { Divider, Grid, Typography } from '@mui/material';
import BlindIcon from '@mui/icons-material/Blind';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
function PopularItem({ hideDivider = false, data }: { hideDivider: boolean; data: any }) {
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
                {data.firstName + ' ' + data.lastName}
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
                    {data.rankPoint} <AutoFixOffIcon sx={{ fontSize: '16px', mt: '-2px' }} />
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
            {data.rankName} <BlindIcon sx={{ ml: '8px', fontSize: '16px' }} />
          </Typography>
        </Grid>
      </Grid>
      {!hideDivider && <Divider sx={{ my: 1.5 }} />}
    </Grid>
  );
}

export default PopularItem;
