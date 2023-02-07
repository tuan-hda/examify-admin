import { Divider, Grid, Typography } from '@mui/material';
import { colors } from 'theme';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';

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
                {data.name}
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
                    {data.views} lượt xem
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
              flex: '1',
              color: colors.grey[800],
              textAlign: 'right',
              fontSize: '14px',
              display: 'flex',
              width: '100%',
            }}
          >
            {data.learnt_count} lần học các từ trong bộ
          </Typography>
        </Grid>
      </Grid>
      {!hideDivider && <Divider sx={{ my: 1.5 }} />}
    </Grid>
  );
}

export default PopularItem;
