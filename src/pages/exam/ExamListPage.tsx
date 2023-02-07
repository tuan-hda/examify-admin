import { IconButton, Box, Typography } from '@mui/material';
import Topbar from '../../components/common/Topbar';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomToolbar from '../../components/common/CustomToolbar';
import PrimaryButton from '../../components/common/PrimaryButton';
import EditIcon from '@mui/icons-material/Edit';
import { default as sx } from 'utils/tableProps';
import { useState, useEffect } from 'react';
import { getAllExamsService } from 'api/exam/exam';
import useAxiosWithToken from 'hooks/useAxiosWithToken';
import { colors } from 'theme';
import { Link } from 'react-router-dom';

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
    renderCell: (params) => <Typography fontWeight="bold">{params.row.name}</Typography>,
  },
  {
    field: 'examSeriesId',
    headerName: 'Mã bộ đề',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'totalPart',
    headerName: 'Số part',
  },
  {
    field: 'totalQuestion',
    headerName: 'Số câu',
  },
  {
    field: 'duration',
    headerName: 'Thời lượng',
  },
  {
    field: 'pointReward',
    headerName: 'Điểm thưởng',
  },
  {
    field: 'numsJoin',
    headerName: 'Số tham gia',
  },
  {
    field: 'hashtag',
    headerName: 'Hashtag',
    minWidth: 300,
    renderCell: (params) => {
      return params.row.hashtag.map((item: string) => (
        <Typography
          fontSize="12px"
          px="8px"
          py="2px"
          borderRadius="12px"
          color="white"
          mr="6px"
          bgcolor={colors.primary[500]}
        >
          {item}
        </Typography>
      ));
    },
  },
  {
    field: 'isFullExplanation',
    headerName: 'Full lời giải',
    renderCell: (params) =>
      params.row.isFullExplanation && (
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
    field: 'audio',
    headerName: 'Audio',
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

const ExamListPage = (props: Props) => {
  const [rows, setRows] = useState([]);
  const axios = useAxiosWithToken();

  useEffect(() => {
    const fetchExams = async () => {
      const examListRespond = (await getAllExamsService(axios)).data;
      setRows(examListRespond);
    };

    fetchExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  columns[0].renderCell = (params) => (
    <Link to={`/exam/list/${params.row.id}`}>
      <IconButton>
        <EditIcon />
      </IconButton>
    </Link>
  );

  return (
    <Box display="flex" height="calc(100vh - 50px)" flexDirection="column">
      <Topbar
        title="Danh sách đề"
        buttons={[
          <Link to="/exam/create">
            <PrimaryButton variant="contained">Tạo mới</PrimaryButton>
          </Link>,
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
    </Box>
  );
};

export default ExamListPage;
