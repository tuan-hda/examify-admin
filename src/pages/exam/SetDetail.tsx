import { Box, Tab, Tabs } from '@mui/material';
import { initialSet, ISet } from 'api/exam/examInterface';
import Topbar from 'components/common/Topbar';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getExamDetail } from 'redux/features/exam/examSlice';
import { AppDispatch, RootState } from 'redux/store';
import { colors } from 'theme';
import FormSet from './FormSet';
import useFetchPartDetail from './hooks/useFetchPartDetail';
import useFetchSetDetail from './hooks/useFetchSetDetail';
import QuestionList from './QuestionList';
import SideList from './SideList';

function SetDetail() {
  const [currentTab, setCurrentTab] = useState<number>(1);
  const { examId, partId, setId } = useParams();
  const { detail } = useSelector((store: RootState) => store.exam);
  const { data, fetchData } = useFetchSetDetail(Number(setId));
  const { data: partDetail } = useFetchPartDetail(Number(partId));
  const navigate = useNavigate();

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  function handleDelete() {
    navigate(`/exam/list/${examId}/part/${partId}`);
  }

  const updateData: ISet = {
    ...initialSet,
    ...data,
  };

  return (
    <Box pb="20px">
      <Topbar
        title="Chi tiết bộ câu hỏi"
        breadcrumbs={[
          {
            name: 'Đề thi',
            path: '/exam/list',
          },
          {
            name: detail.name,
            path: `/exam/list/${examId}`,
          },
          {
            name: partDetail?.name || '',
            path: `/exam/list/${examId}/part/${partId}`,
          },
          {
            name: data?.title || '',
          },
        ]}
        ribbonColor={colors.red[400]}
      />

      <Tabs
        value={currentTab}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        sx={{ mb: '20px' }}
        centered
      >
        <Tab value={1} label="Thông tin" />
        <Tab value={2} label="Danh sách side" />
        <Tab value={3} label="Danh sách câu hỏi" />
      </Tabs>

      {currentTab === 1 && (
        <Box
          maxWidth="600px"
          position="relative"
          left="50%"
          sx={{
            transform: 'translateX(-50%)',
          }}
        >
          <FormSet
            hide={() => {}}
            initialData={updateData}
            onDelete={handleDelete}
            onUpdate={fetchData}
          />
        </Box>
      )}

      {currentTab === 2 && (
        <Box sx={{ mt: '24px' }}>
          <SideList />
        </Box>
      )}

      {currentTab === 3 && (
        <Box sx={{ mt: '24px' }}>
          <QuestionList />
        </Box>
      )}
    </Box>
  );
}

export default SetDetail;
