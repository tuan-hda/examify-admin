import { IconButton, Box, SxProps, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Topbar from '../../components/common/Topbar';
import { colors } from '../../theme';
import { DataGrid, GridColDef, GridRowSpacingParams } from '@mui/x-data-grid';
import CustomToolbar from '../../components/common/CustomToolbar';
import PrimaryButton from '../../components/common/PrimaryButton';
import { convertTimeHours, convertTimeMinutes, numberWithCommas } from 'utils/formatCurrency';
import EditIcon from '@mui/icons-material/Edit';
import { useCallback } from 'react';
import useFetchCourses from './hooks/useFetchCourses';

const columns: GridColDef[] = [
  {
    field: 'action',
    headerName: '',
    width: 60,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <Link to={`/course/${params.row.id}`}>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Link>
    ),
  },
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Tên',
    flex: 1,
    minWidth: 300,
    renderCell: (params) => <Typography fontWeight="bold">{params.row.name}</Typography>,
  },
  {
    field: 'image',
    headerName: 'Ảnh',
    flex: 1,
    minWidth: 160,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
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
    field: 'level',
    headerName: 'Mức độ',
    minWidth: 100,
    renderCell: (params) => {
      switch (params.row.level) {
        case 'basic':
          return (
            <Typography fontSize="14px" color={colors.primary[500]}>
              Cơ bản
            </Typography>
          );
        case 'advance':
          return (
            <Typography fontSize="14px" color={colors.red[500]}>
              Nâng cao
            </Typography>
          );
        default:
          return (
            <Typography fontSize="14px" color={colors.orange[500]}>
              Trung bình
            </Typography>
          );
      }
    },
  },
  {
    field: 'pointToUnlock',
    headerName: 'Điểm mở khoá',
  },
  {
    field: 'price',
    headerName: 'Giá',
    flex: 1,
    minWidth: 120,
    renderCell: (params) => {
      return numberWithCommas(params.value) + 'đ';
    },
  },
  {
    field: 'discount',
    headerName: 'Giảm giá',
    renderCell: (params) => params.value + '%',
  },
  {
    field: 'discountPrice',
    headerName: 'Giá sau giảm',
    minWidth: 120,
    renderCell: (params) =>
      numberWithCommas(Math.round(params.row.price * (1 - params.row.discount / 100))) + 'đ',
  },
  {
    field: 'pointReward',
    headerName: 'Điểm thưởng',
  },
  {
    field: 'participants',
    headerName: 'Số tham gia',
  },
  {
    field: 'avgRating',
    headerName: 'Đánh giá',
    renderCell: (params) => (
      <Typography fontSize="14px" color={colors.orange[500]}>
        {params.value}
      </Typography>
    ),
  },
  {
    field: 'totalChapter',
    headerName: 'Số chương',
  },
  {
    field: 'totalLesson',
    headerName: 'Số bài',
  },
  {
    field: 'totalVideoTime',
    headerName: 'Thời gian',
    renderCell: (params) => {
      const time = params.row.totalVideoTime;
      return convertTimeHours(time) + ':' + convertTimeMinutes(time);
    },
  },
];

// const rows = [
//   {
//     id: 1,
//     name: 'Nhập môn Anh văn Siêu cấp 1',
//     image:
//       'https://occ-0-300-784.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABSLYygH8PLglJ5MsvLCFpM6iTUBMGsqD-f7ki5KNHh3CX3xDobO_XqrdGjlnK0Kb1bLxHRFKYGYd0yKGJUlW4M88L-F2FbS2c4Ka.jpg?r=2ab',
//     level: 'Cơ bản',
//     pointToUnlock: 1234,
//     price: 1234656,
//     discount: 24,
//     pointReward: 1234,
//     participants: 4000,
//     avgRating: 4.3,
//     totalChapter: 12,
//     totalLesson: 100,
//     totalVideoTime: 15364,
//   },
//   {
//     id: 2,
//     name: 'Nhập môn Anh văn Siêu cấp 2',
//     image:
//       'https://occ-0-300-784.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABSLYygH8PLglJ5MsvLCFpM6iTUBMGsqD-f7ki5KNHh3CX3xDobO_XqrdGjlnK0Kb1bLxHRFKYGYd0yKGJUlW4M88L-F2FbS2c4Ka.jpg?r=2ab',
//     level: 'Trung bình',
//     pointToUnlock: 1234,
//     price: 1234656,
//     discount: 24,
//     pointReward: 1234,
//     participants: 4000,
//     avgRating: 4.3,
//     totalChapter: 12,
//     totalLesson: 100,
//     totalVideoTime: 15364,
//   },
// ];

const sx: SxProps = {
  '& .MuiDataGrid-columnHeader:focus': {
    outline: 'none !important',
  },
  '& .MuiDataGrid-root': {
    border: 'none',
  },
  '& .MuiDataGrid-cell': {
    borderBottom: 'none',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: '600',
    color: '#000',
  },
  '& .MuiDataGrid-columnHeaders': {
    pl: '8px',
    backgroundColor: colors.grey[500],
    borderBottom: 'none',
  },
  '& .MuiDataGrid-footerContainer': {
    justifyContent: 'end',
    borderTop: 'none',
  },
  '& .MuiDataGrid-cell:focus': {
    outline: 'none !important',
  },
  '& .MuiDataGrid-row': {
    pl: '8px',
  },
  '& .MuiDataGrid-selectedRowCount': {
    display: 'none',
  },
  '& .MuiTablePagination-selectLabel': {
    display: 'none !important',
  },
  '& .MuiTablePagination-spacer': {
    display: 'none',
  },
  '& .MuiTablePagination-toolbar::before': {
    content: '"Số hàng mỗi trang"',
    display: 'block',
    marginRight: '-60px',
    width: '200px',
  },
};

const CourseListPage = () => {
  const { courses: rows } = useFetchCourses();
  const getRowSpacing = useCallback((params: GridRowSpacingParams) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);

  return (
    <Box display="flex" height="calc(100vh - 50px)" flexDirection="column">
      <Topbar
        title="Danh sách các khoá học"
        buttons={[
          <Link to="/course/create" key="1">
            <PrimaryButton variant="contained">Tạo mới</PrimaryButton>
          </Link>,
        ]}
      />

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
    </Box>
  );
};

export default CourseListPage;
