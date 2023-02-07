import { Box, Tab, Tabs } from '@mui/material';
import { IUpdateFlashcardSet } from 'api/flashcard/flashcardInterface';
import Topbar from 'components/common/Topbar';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { colors } from 'theme';
import AddFlashcardSetModal from './AddFlashcardSetModal';
import FlashcardList from './FlashcardList';
import useFetchFlashcardSetDetail from './hooks/useFetchFlashcardSetDetail';

function FlashcardSetDetail() {
  const [currentTab, setCurrentTab] = useState<number>(1);
  const { flashcardSetId } = useParams();
  const { detail, fetchData } = useFetchFlashcardSetDetail(Number(flashcardSetId));
  const navigate = useNavigate();

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  function handleDelete() {
    navigate('/flashcard/set');
  }

  const updateData: IUpdateFlashcardSet = detail
    ? {
        id: detail.fc_set_id,
        name: detail.name,
        description: detail.description,
        fc_type_id: detail.fc_type_id || 0,
      }
    : {
        id: 0,
        name: '',
        description: '',
        fc_type_id: 0,
      };

  return (
    <Box pb="20px">
      <Topbar
        title="Chi tiết bộ Flashcard"
        breadcrumbs={[
          {
            name: 'Bộ Flashcard',
            path: '/flashcard/set',
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
        <Tab value={2} label="Danh sách flashcard" />
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
          <AddFlashcardSetModal
            hide={() => {}}
            hideTitle
            onDelete={handleDelete}
            onUpdate={fetchData}
            initialData={updateData}
          />
        </Box>
      ) : (
        <Box sx={{ mt: '24px' }}>
          <FlashcardList />
        </Box>
      )}
    </Box>
  );
}

export default FlashcardSetDetail;
