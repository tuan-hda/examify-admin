import { Box, Tab, Tabs } from '@mui/material';
import { initialExam, IPart, IUpdateExam } from 'api/exam/examInterface';
import Topbar from 'components/common/Topbar';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getExamDetail } from 'redux/features/exam/examSlice';
import { AppDispatch, RootState } from 'redux/store';
import { colors } from 'theme';
import FormExam from './FormExam';
import FormPart from './FormPart';
import useFetchPartDetail from './hooks/useFetchPartDetail';
import PartList from './PartList';
import SetList from './SetList';

function PartDetail() {
  const [currentTab, setCurrentTab] = useState<number>(1);
  const { examId, partId } = useParams();
  const { data, fetchData } = useFetchPartDetail(Number(partId));
  const { detail } = useSelector((state: RootState) => state.exam);
  const navigate = useNavigate();

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  function handleDelete() {
    navigate(`/exam/list/${examId}`);
  }

  const updateData: IPart = {
    ...data,
  };

  return (
    <Box pb="20px">
      <Topbar
        title="Chi tiết phần thi"
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
            name: data?.name || '',
          },
        ]}
        ribbonColor={colors.greenAccent[400]}
      />

      <Tabs
        value={currentTab}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        sx={{ mb: '20px' }}
        centered
      >
        <Tab value={1} label="Thông tin" />
        <Tab value={2} label="Danh sách bộ câu hỏi" />
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
          <FormPart
            initialData={updateData}
            hide={() => {}}
            onCreate={fetchData}
            onUpdate={fetchData}
            onDelete={handleDelete}
          />
        </Box>
      ) : (
        <Box sx={{ mt: '24px' }}>
          <SetList />
        </Box>
      )}
    </Box>
  );
}

export default PartDetail;
