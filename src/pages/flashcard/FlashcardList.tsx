import { IconButton, Box, Typography, Modal, SxProps, Button } from '@mui/material';
import Topbar from '../../components/common/Topbar';
import { DataGrid, GridColDef, GridRowSpacingParams } from '@mui/x-data-grid';
import CustomToolbar from '../../components/common/CustomToolbar';
import PrimaryButton from '../../components/common/PrimaryButton';
import { IUpdateFlashcard } from 'api/flashcard/flashcardInterface';
import { SyntheticEvent, useCallback, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { default as sx } from 'utils/tableProps';
import { useParams } from 'react-router-dom';
import useFetchFlashcardsInSet from './hooks/useFetchFlashcardsInSet';
import AddFlashcardForm from './AddFlashcardForm';
import AddMultipleFlashcardForm from './AddMultipleFlashcardForm';

const columns: GridColDef[] = [
  {
    field: 'action',
    headerName: '',
    width: 60,
    sortable: false,
    disableColumnMenu: true,
  },
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'fc_set_id', headerName: 'Set ID', width: 90 },
  {
    field: 'word',
    headerName: 'Từ',
    flex: 1,
    minWidth: 120,
    renderCell: (params) => <Typography fontWeight="bold">{params.row.word}</Typography>,
  },
  {
    field: 'type_of_word',
    headerName: 'Loại từ',
    minWidth: 120,
    flex: 1,
  },
  {
    field: 'pronounce',
    headerName: 'Phiên âm',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'image',
    headerName: 'Ảnh',
    flex: 1,
    minWidth: 160,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      if (!params.row.image) return null;
      return (
        <img
          src={params.row.image}
          alt="Ảnh"
          style={{
            objectFit: 'cover',
            width: '100%',
          }}
        />
      );
    },
  },
  {
    field: 'example',
    headerName: 'Ví dụ',
    minWidth: 200,
  },
  {
    field: 'note',
    headerName: 'Ghi chú',
    minWidth: 200,
  },
  {
    field: 'createdAt',
    headerName: 'Ngày tạo',
    minWidth: 200,
    renderCell: (params) => params.value.slice(0, 19).split('T').join(' '),
  },
  {
    field: 'updatedAt',
    headerName: 'Ngày cập nhật',
    minWidth: 200,
    renderCell: (params) => params.value.slice(0, 19).split('T').join(' '),
  },
];

const style: SxProps = {
  position: 'absolute',
  zIndex: '10',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'white',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflow: 'auto',
};

const styleMulOuter: SxProps = {
  width: '100vw',
  height: '100vh',
  zIndex: '10',
  display: 'flex',
};

const styleMulInner: SxProps = {
  m: 'auto',
  width: '85vw',
  bgcolor: 'white',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflow: 'auto',
};

const initialValues: IUpdateFlashcard = {
  word: '',
  id: -1,
  fc_set_id: -1,
  fc_id: -1,
  meaning: '',
  type_of_word: '',
};

function FlashcardList() {
  const [open, setOpen] = useState<boolean>(false);
  const [openBulk, setOpenBulk] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selected, setSelected] = useState<IUpdateFlashcard>(initialValues);
  const { flashcardSetId } = useParams();
  const {
    flashcards: rows,
    fetchData,
    addFlashcard,
    deleteFlashcard,
  } = useFetchFlashcardsInSet(Number(flashcardSetId));

  columns[0].renderCell = (params) => (
    <IconButton onClick={() => toggleEdit({ ...params.row, fc_id: params.row.id })}>
      <EditIcon />
    </IconButton>
  );

  function toggle() {
    setOpen((prev) => !prev);
  }

  const getRowSpacing = useCallback((params: GridRowSpacingParams) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);

  function toggleEdit(data: IUpdateFlashcard) {
    setOpenEdit((prev) => !prev);
    if (!data) {
      setSelected(initialValues);
    } else {
      setSelected(data);
    }
  }

  function toggleBulk() {
    setOpenBulk((prev) => !prev);
  }

  return (
    <Box display="flex" height="calc(100vh - 50px)" flexDirection="column">
      <Topbar
        title="Danh sách flashcard"
        buttons={[
          <PrimaryButton key={1} onClick={toggle} variant="contained">
            Tạo mới
          </PrimaryButton>,
          <Button key={2} onClick={toggleBulk} variant="outlined">
            <Typography textTransform="none" fontSize="14px" px="12px">
              Tạo hàng loạt
            </Typography>
          </Button>,
        ]}
      />

      <Box flex="1" mt="12px">
        <DataGrid
          getRowSpacing={getRowSpacing}
          rowsPerPageOptions={[5, 10, 20, 50]}
          rowHeight={80}
          initialState={{
            sorting: {
              sortModel: [{ field: 'id', sort: 'asc' }],
            },
            pagination: {
              pageSize: 10,
            },
          }}
          components={{ Toolbar: CustomToolbar }}
          rows={rows}
          columns={columns}
          experimentalFeatures={{ newEditingApi: true }}
          sx={sx}
        />
      </Box>

      <Modal open={open} onClose={toggle}>
        <Box sx={style}>
          <AddFlashcardForm hide={toggle} onCreate={addFlashcard} isCreate />
        </Box>
      </Modal>
      <Modal open={openBulk} onClose={toggleBulk}>
        <Box sx={styleMulOuter} onClick={toggleBulk}>
          <Box sx={styleMulInner} onClick={(e: SyntheticEvent) => e.stopPropagation()}>
            <AddMultipleFlashcardForm onCreate={fetchData} hide={toggleBulk} />
          </Box>
        </Box>
      </Modal>
      <Modal open={openEdit} onClose={toggleEdit}>
        <Box sx={style}>
          <AddFlashcardForm
            hide={toggleEdit}
            onDelete={deleteFlashcard}
            onUpdate={fetchData}
            initialData={selected}
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default FlashcardList;
