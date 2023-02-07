import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Box, CardContent, Grid, Menu, MenuItem, Typography } from '@mui/material';

// assets
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { colors } from 'theme';
import PopularItem from './PopularItem';
// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ data }: { data: any[] }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        boxShadow: '0 0 20px rgba(0,0,0,0.2)',
        borderRadius: '12px',
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container alignContent="center" justifyContent="space-between">
              <Grid item>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: '16px',
                  }}
                >
                  Các bộ flashcard nổi bật
                </Typography>
              </Grid>
              <Grid item>
                <MoreHorizOutlinedIcon
                  fontSize="small"
                  sx={{
                    color: colors.primary[200],
                    cursor: 'pointer',
                  }}
                  aria-controls="menu-popular-card"
                  aria-haspopup="true"
                  onClick={handleClick}
                />
                <Menu
                  id="menu-popular-card"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  variant="selectedMenu"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={handleClose}> Today</MenuItem>
                  <MenuItem onClick={handleClose}> This Month</MenuItem>
                  <MenuItem onClick={handleClose}> This Year </MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Grid>

          {data.map((datum, index) => (
            <PopularItem data={datum} key={index} hideDivider={index === 4} />
          ))}
        </Grid>
      </CardContent>
    </Box>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default PopularCard;
