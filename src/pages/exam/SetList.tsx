import { IconButton, Box, Typography, Modal } from '@mui/material';
import Topbar from '../../components/common/Topbar';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomToolbar from '../../components/common/CustomToolbar';
import PrimaryButton from '../../components/common/PrimaryButton';
import EditIcon from '@mui/icons-material/Edit';
import { default as sx } from 'utils/tableProps';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from 'theme';
import { Link, useParams } from 'react-router-dom';
import { style } from 'utils/sxStyle';
import FormSet from './FormSet';
import { initialSet, ISet } from 'api/exam/examInterface';
import useFetchSet from './hooks/useFetchSet';

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
    field: 'title',
    headerName: 'Tiêu đề',
    flex: 1,
    minWidth: 250,
    renderCell: (params) => <Typography fontWeight="bold">{params.value}</Typography>,
  },
  {
    field: 'audio',
    headerName: 'Âm thanh',
    minWidth: 250,
    renderCell: (params) => (
      <a
        href={params.value}
        target="_blank"
        rel="noreferrer"
        style={{
          color: colors.primary[400],
        }}
      >
        {params.value}
      </a>
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

const SetList = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selected, setSelected] = useState<ISet>(initialSet);
  const { examId, partId } = useParams();
  const { data: rows, fetchData } = useFetchSet(Number(partId));
  const navigate = useNavigate();

  function toggleEdit(data: ISet) {
    setOpenEdit((prev) => !prev);
    if (!data) {
      setSelected(initialSet);
    } else {
      setSelected(data);
    }
  }

  function handleDelete() {
    navigate(`/exam/list/${examId}/part/${partId}`);
  }

  function toggle() {
    setOpen((prev) => !prev);
  }

  columns[0].renderCell = (params) => (
    <Link to={`/exam/list/${examId}/part/${partId}/set/${params.row.id}`}>
      <IconButton>
        <EditIcon />
      </IconButton>
    </Link>
  );

  return (
    <Box display="flex" height="calc(100vh - 50px)" flexDirection="column">
      <Topbar
        title="Danh sách bộ câu hỏi"
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
          <FormSet
            hide={toggle}
            isCreate
            onCreate={fetchData}
            onUpdate={fetchData}
            onDelete={handleDelete}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default SetList;
