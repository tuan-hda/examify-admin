import { IconButton, Box, Modal } from '@mui/material';
import Topbar from '../../components/common/Topbar';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomToolbar from '../../components/common/CustomToolbar';
import PrimaryButton from '../../components/common/PrimaryButton';
import EditIcon from '@mui/icons-material/Edit';
import { default as sx } from 'utils/tableProps';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import FormPart from './FormPart';
import { style } from 'utils/sxStyle';
import { initialSide, ISide } from 'api/exam/examInterface';
import useFetchSides from './hooks/useFetchSides';
import FormSide from './FormSide';

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
    field: 'paragraph',
    headerName: 'Đoạn văn',
    flex: 1,
    minWidth: 400,
    renderCell: (params) => (
      <Box sx={{ maxHeight: '100%' }} dangerouslySetInnerHTML={{ __html: params.value }} />
    ),
  },
  {
    field: 'createdAt',
    headerName: 'Ngày tạo',
    minWidth: 200,
    renderCell: (params) => params.value?.slice(0, 19).split('T').join(' '),
  },
  {
    field: 'updatedAt',
    headerName: 'Ngày cập nhật',
    minWidth: 200,
    renderCell: (params) => params.value?.slice(0, 19).split('T').join(' '),
  },
];

const SideList = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selected, setSelected] = useState<ISide>(initialSide);
  const { setId } = useParams();
  const { data: rows, fetchData } = useFetchSides(Number(setId));

  function toggle() {
    setOpen((prev) => !prev);
  }

  function toggleEdit(data: ISide) {
    setOpenEdit((prev) => !prev);
    setSelected(data);
  }

  columns[0].renderCell = (params) => (
    <IconButton onClick={() => toggleEdit(params.row)}>
      <EditIcon />
    </IconButton>
  );

  return (
    <Box display="flex" height="calc(100vh - 50px)" flexDirection="column">
      <Topbar
        title="Danh sách Side"
        buttons={[
          <PrimaryButton variant="contained" onClick={toggle}>
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
          <FormSide hide={toggle} onCreate={fetchData} isCreate />
        </Box>
      </Modal>
      <Modal open={openEdit} onClose={toggleEdit}>
        <Box sx={style}>
          <FormSide
            hide={toggleEdit}
            initialData={selected}
            onDelete={fetchData}
            onUpdate={fetchData}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default SideList;
