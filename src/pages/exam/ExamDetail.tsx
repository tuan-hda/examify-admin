import { Box, Tab, Tabs } from '@mui/material';
import { initialExam, IUpdateExam } from 'api/exam/examInterface';
import Topbar from 'components/common/Topbar';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getExamDetail } from 'redux/features/exam/examSlice';
import { AppDispatch, RootState } from 'redux/store';
import { colors } from 'theme';
import FormExam from './FormExam';
import PartList from './PartList';

function ExamDetail() {
  const [currentTab, setCurrentTab] = useState<number>(1);
  const { examId } = useParams();
  const { detail } = useSelector((store: RootState) => store.exam);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  function fetchData() {
    if (examId) {
      dispatch(getExamDetail(Number(examId)));
    }
  }

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  function handleDelete() {
    navigate('/exam/list');
  }

  const updateData: IUpdateExam = {
    ...initialExam,
    ...detail,
  };

  return (
    <Box pb="20px">
      <Topbar
        title="Chi tiết đề thi"
        breadcrumbs={[
          {
            name: 'Đề thi',
            path: '/exam/list',
          },
          {
            name: detail?.name || '',
          },
        ]}
        ribbonColor={colors.orange[400]}
      />

      <Tabs
        value={currentTab}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        sx={{ mb: '20px' }}
        centered
      >
        <Tab value={1} label="Thông tin" />
        <Tab value={2} label="Danh sách part" />
      </Tabs>

      {currentTab === 1 ? (
        <Box
          maxWidth="600px"
          position="relative"
          left="50%"
          sx={{
            transform: 'translateX(-50%)',
          }}
        >
          <FormExam
            hide={() => {}}
            onUpdate={fetchData}
            hideTitle
            onDelete={handleDelete}
            initialData={updateData}
          />
        </Box>
      ) : (
        <Box sx={{ mt: '24px' }}>
          <PartList />
        </Box>
      )}
    </Box>
  );
}

export default ExamDetail;
