import { IconButton, Box, Typography, Modal, SxProps } from '@mui/material';
import Topbar from '../../components/common/Topbar';
import { DataGrid, GridColDef, GridRowSpacingParams } from '@mui/x-data-grid';
import CustomToolbar from '../../components/common/CustomToolbar';
import EditIcon from '@mui/icons-material/Edit';
import { default as sx } from 'utils/tableProps';
import { useCallback, useState } from 'react';
import { initialUser, IUser } from 'api/users/userInterface';
import useFetchUsers from './hooks/useFetchUsers';
import FormUser from './FormUser';

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
    field: 'mail',
    headerName: 'Email',
    flex: 1,
    minWidth: 300,
    renderCell: (params) => <Typography fontWeight="bold">{params.value}</Typography>,
  },
  {
    field: 'first_name',
    headerName: 'Họ',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'last_name',
    headerName: 'Tên',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'role_name',
    headerName: 'Role',
    flex: 1,
    minWidth: 180,
    renderCell: (params) => {
      switch (params.value) {
        case 'Student':
          return 'Học viên';
        case 'Teacher':
          return 'Giáo viên';
        case 'Teaching Staff':
          return 'Nhân viên giảng dạy';
        case 'Admin':
          return 'Admin';
        default:
          return '';
      }
    },
  },
  {
    field: 'date_of_birth',
    headerName: 'Ngày sinh',
    minWidth: 150,
    renderCell: (params) => params.value?.slice(0, 10),
  },
  {
    field: 'phone_number',
    headerName: 'SĐT',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'avt',
    headerName: 'Avatar',
    flex: 1,
    minWidth: 100,
    renderCell: (params) =>
      params.value ? (
        <img
          src={params.value}
          alt="Ảnh"
          style={{
            objectFit: 'cover',
            width: '100%',
          }}
        />
      ) : (
        ''
      ),
  },
  {
    field: 'Banner',
    headerName: 'Ảnh bìa',
    flex: 1,
    minWidth: 200,
    renderCell: (params) =>
      params.value ? (
        <img
          src={params.value}
          alt="Ảnh"
          style={{
            objectFit: 'cover',
            width: '100%',
          }}
        />
      ) : (
        ''
      ),
  },
  {
    field: 'description',
    headerName: 'Mô tả',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'accumulated_point',
    headerName: 'Điểm tích luỹ',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'rank_name',
    headerName: 'Rank',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'rank_point',
    headerName: 'Điểm xếp hạng',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'created_at',
    headerName: 'Ngày tạo',
    minWidth: 200,
    renderCell: (params) => params.value?.slice(0, 19).split('T').join(' '),
  },
  {
    field: 'updated_at',
    headerName: 'Ngày cập nhật',
    minWidth: 200,
    renderCell: (params) => params.value?.slice(0, 19).split('T').join(' '),
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

const UserList = () => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selected, setSelected] = useState<IUser>(initialUser);
  const { users: rows, fetchData } = useFetchUsers();
  const getRowSpacing = useCallback((params: GridRowSpacingParams) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);

  columns[0].renderCell = (params) => (
    <IconButton onClick={() => toggleEdit(params.row)}>
      <EditIcon />
    </IconButton>
  );

  function handleDelete() {}

  function toggleEdit(data: IUser) {
    setOpenEdit((prev) => !prev);
    if (!data) {
      setSelected(initialUser);
    } else {
      setSelected(data);
    }
  }

  return (
    <Box display="flex" height="calc(100vh - 50px)" flexDirection="column">
      <Topbar title="Danh sách User" />

      <Box flex="1" mt="12px">
        <DataGrid
          rowsPerPageOptions={[5, 10, 20, 50]}
          rowHeight={80}
          getRowSpacing={getRowSpacing}
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

      <Modal open={openEdit} onClose={toggleEdit}>
        <Box sx={style}>
          <FormUser
            hide={toggleEdit}
            onDelete={handleDelete}
            onUpdate={fetchData}
            initialData={selected}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default UserList;
