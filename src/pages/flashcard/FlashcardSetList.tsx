import { IconButton, Box, Typography, Modal, SxProps } from '@mui/material';
import Topbar from '../../components/common/Topbar';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomToolbar from '../../components/common/CustomToolbar';
import PrimaryButton from '../../components/common/PrimaryButton';
import { IUpdateFlashcardSet } from 'api/flashcard/flashcardInterface';
import { useState } from 'react';
import { colors } from 'theme';
import EditIcon from '@mui/icons-material/Edit';
import useFetchFlashcardSets from './hooks/useFetchFlashcardSets';
import { default as sx } from 'utils/tableProps';
import AddFlashcardSetModal from './AddFlashcardSetModal';
import { Link } from 'react-router-dom';

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
    field: 'name',
    headerName: 'Tên',
    flex: 1,
    minWidth: 300,
    renderCell: (params) => <Typography fontWeight="bold">{params.row.name}</Typography>,
  },
  { field: 'fc_type_id', headerName: 'Type ID', width: 90 },
  {
    field: 'type',
    headerName: 'Loại',
    minWidth: 300,
    flex: 1,
  },
  {
    field: 'description',
    headerName: 'Mô tả',
    flex: 1,
    minWidth: 300,
  },
  {
    field: 'words_count',
    headerName: 'Số từ',
    minWidth: 100,
  },
  {
    field: 'system_belong',
    headerName: 'Hệ thống',
    renderCell: (params) =>
      params.row.system_belong && (
        <Box
          sx={{
            width: '100%',
            height: '80%',
            bgcolor: colors.greenAccent[400],
          }}
        />
      ),
  },
  {
    field: 'access',
    headerName: 'Quyền',
  },
  {
    field: 'views',
    headerName: 'Số lượt xem',
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

const initialValues = { name: '', description: '', id: -1, fc_type_id: 1 };

function FlashcardSetList() {
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selected, setSelected] = useState<IUpdateFlashcardSet>(initialValues);
  const { sets: rows, addSet, fetchData, deleteSet } = useFetchFlashcardSets();

  columns[0].renderCell = (params) => (
    <Link to={`/flashcard/set/${params.row.id}`}>
      <IconButton>
        <EditIcon />
      </IconButton>
    </Link>
  );

  function toggle() {
    setOpen((prev) => !prev);
  }

  function toggleEdit(data: IUpdateFlashcardSet) {
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
        title="Danh sách các bộ flashcard"
        buttons={[
          <PrimaryButton onClick={toggle} variant="contained">
            Tạo mới
          </PrimaryButton>,
        ]}
      />

      <Box flex="1" mt="12px">
        <DataGrid
          rowsPerPageOptions={[5, 10, 20, 50]}
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
          <AddFlashcardSetModal hide={toggle} onCreate={addSet} isCreate />
        </Box>
      </Modal>
      <Modal open={openEdit} onClose={toggleEdit}>
        <Box sx={style}>
          <AddFlashcardSetModal
            hide={toggleEdit}
            onDelete={deleteSet}
            onUpdate={fetchData}
            initialData={selected}
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default FlashcardSetList;
