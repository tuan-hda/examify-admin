import { IconButton, Box, Typography, Modal } from '@mui/material';
import Topbar from '../../components/common/Topbar';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomToolbar from '../../components/common/CustomToolbar';
import PrimaryButton from '../../components/common/PrimaryButton';
import EditIcon from '@mui/icons-material/Edit';
import { default as sx } from 'utils/tableProps';
import { useState } from 'react';

import { style } from 'utils/sxStyle';
import { initialHashtag, IHashtag } from 'api/exam/examInterface';
import useFetchHashtags from './hooks/useFetchHashtags';
import FormHashtag from './FormHashtag';

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
    field: 'name',
    headerName: 'Tên',
    flex: 1,
    minWidth: 250,
    renderCell: (params) => <Typography fontWeight="bold">{params.value}</Typography>,
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

const HashtagList = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selected, setSelected] = useState<IHashtag>(initialHashtag);
  const { data: rows, fetchData } = useFetchHashtags();

  columns[0].renderCell = (params) => (
    <IconButton onClick={() => toggleEdit(params.row)}>
      <EditIcon />
    </IconButton>
  );

  function toggleEdit(data: IHashtag) {
    setOpenEdit((prev) => !prev);
    setSelected(data);
  }

  function toggle() {
    setOpen((prev) => !prev);
  }

  return (
    <Box display="flex" height="calc(100vh - 50px)" flexDirection="column">
      <Topbar
        title="Danh sách Part"
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
          <FormHashtag hide={toggle} onCreate={fetchData} isCreate />
        </Box>
      </Modal>
      <Modal open={openEdit} onClose={toggleEdit}>
        <Box sx={style}>
          <FormHashtag
            hide={toggleEdit}
            onUpdate={fetchData}
            onDelete={fetchData}
            initialData={selected}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default HashtagList;
