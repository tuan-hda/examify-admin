import { IconButton, Box, Typography, Modal } from '@mui/material';
import Topbar from '../../components/common/Topbar';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomToolbar from '../../components/common/CustomToolbar';
import PrimaryButton from '../../components/common/PrimaryButton';
import EditIcon from '@mui/icons-material/Edit';
import { default as sx } from 'utils/tableProps';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import FormPart from './FormPart';
import { style } from 'utils/sxStyle';
import { initialPart, IPart } from 'api/exam/examInterface';
import useFetchParts from './hooks/useFetchParts';

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
  // {
  //   field: 'numericOrder',
  //   headerName: 'Thứ tự',
  // },
  {
    field: 'name',
    headerName: 'Tên',
    flex: 1,
    minWidth: 250,
    renderCell: (params) => <Typography fontWeight="bold">{params.value}</Typography>,
  },
  {
    field: 'totalQuestion',
    headerName: 'Số câu',
  },
  {
    field: 'numberOfExplaination',
    headerName: 'Số câu đã giải thích',
    minWidth: 150,
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

const PartList = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selected, setSelected] = useState<IPart>(initialPart);
  const { examId } = useParams();
  const { data: rows, fetchData } = useFetchParts(Number(examId));

  function toggleEdit(data: IPart) {
    setOpenEdit((prev) => !prev);
    if (!data) {
      setSelected(initialPart);
    } else {
      setSelected(data);
    }
  }

  function toggle() {
    setOpen((prev) => !prev);
  }

  columns[0].renderCell = (params) => (
    <Link to={`/exam/list/${examId}/part/${params.row.id}`}>
      <IconButton>
        <EditIcon />
      </IconButton>
    </Link>
  );

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
          <FormPart hide={toggle} onCreate={fetchData} isCreate />
        </Box>
      </Modal>
    </Box>
  );
};

export default PartList;
