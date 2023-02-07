import { IconButton, Box, Typography, Modal, SxProps } from '@mui/material';
import Topbar from '../../components/common/Topbar';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomToolbar from '../../components/common/CustomToolbar';
import PrimaryButton from '../../components/common/PrimaryButton';
import EditIcon from '@mui/icons-material/Edit';
import { default as sx } from 'utils/tableProps';
import useFetchFlashcardType from './hooks/useFetchFlashcardType';
import { useState } from 'react';
import AddFlashcardTypeModal from './AddFlashcardTypeModal';
import { IUpdateFlashcardType } from 'api/flashcard/flashcardInterface';

type Props = {};

const columns: GridColDef[] = [
  {
    field: 'action',
    headerName: '',
    width: 60,
    sortable: false,
    disableColumnMenu: true,
  },
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'type',
    headerName: 'Loại',
    flex: 1,
    minWidth: 300,
    renderCell: (params) => <Typography fontWeight="bold">{params.row.type}</Typography>,
  },
  {
    field: 'description',
    headerName: 'Mô tả',
    flex: 1,
    minWidth: 400,
  },
  {
    field: 'sets_count',
    headerName: 'Số bộ',
    minWidth: 100,
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
};

const initialValues = { type: '', description: '', id: -1 };

const FlashcardType = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selected, setSelected] = useState<IUpdateFlashcardType>(initialValues);
  const { types: rows, addType, fetchData, deleteType } = useFetchFlashcardType();

  columns[0].renderCell = (params) => (
    <IconButton
      onClick={() =>
        toggleEdit({
          id: params.row.id,
          type: params.row.type,
          description: params.row.description,
        })
      }
    >
      <EditIcon />
    </IconButton>
  );

  function toggle() {
    setOpen((prev) => !prev);
  }

  function toggleEdit(data: IUpdateFlashcardType) {
    setOpenEdit((prev) => !prev);
    if (!data) {
      setSelected(initialValues);
    } else {
      setSelected(data);
    }
  }

  return (
    <Box display="flex" height="calc(100vh - 50px)" flexDirection="column">
      <Topbar
        title="Danh sách các loại flashcard"
        buttons={[
          <PrimaryButton onClick={toggle} variant="contained">
            Tạo mới
          </PrimaryButton>,
        ]}
      />

      <Box flex="1" mt="12px">
        <DataGrid
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
          <AddFlashcardTypeModal hide={toggle} onCreate={addType} isCreate />
        </Box>
      </Modal>
      <Modal open={openEdit} onClose={toggleEdit}>
        <Box sx={style}>
          <AddFlashcardTypeModal
            hide={toggleEdit}
            onDelete={deleteType}
            onUpdate={fetchData}
            initialData={selected}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default FlashcardType;
