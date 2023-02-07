import React from 'react';
import { Box } from '@mui/material';
import Topbar from '../../components/common/Topbar';

type Props = {};

const HomePage = (props: Props) => {
  return (
    <Box>
      <Topbar title="Homepage" />
    </Box>
  );
};

export default HomePage;
