import { Box } from '@mui/system';
import Topbar from 'components/common/Topbar';
import React from 'react';
import FormExam from './FormExam';

function ExamCreatePage() {
  return (
    <Box pb="20px">
      <Topbar title="Tạo đề thi" />
      <div style={{ marginTop: '20px' }}></div>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <FormExam hideTitle hide={() => {}} isCreate />
      </Box>
    </Box>
  );
}

export default ExamCreatePage;
