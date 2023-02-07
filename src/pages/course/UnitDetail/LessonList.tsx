import { IconButton, Box, SxProps, Tooltip } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { colors } from 'theme';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomToolbar from 'components/common/CustomToolbar';
import EditIcon from '@mui/icons-material/Edit';
import PrimaryButton from 'components/common/PrimaryButton';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import getBiggestOrder from 'utils/getBiggestOrder';
import { useState } from 'react';
import { updateLessonService } from 'api/course/course';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getCourseDetail } from 'redux/features/course/courseSlice';
import { AppDispatch } from 'redux/store';

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

const LessonList = ({ lessonList: rows }: any) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { courseId } = useParams();

  const changeOrder = async (numericOrder: number, value: number) => {
    if (courseId) {
      setLoading(true);
      const lesson1 = rows.find((row: any) => row.numericOrder === numericOrder);
      const chapter1Order = numericOrder;
      const lesson2 = rows.find((row: any) => row.numericOrder === chapter1Order + value);
      const chapter2Order = lesson2.numericOrder;
      try {
        await updateLessonService({ ...lesson1, numericOrder: -1 });
        await updateLessonService({ ...lesson2, numericOrder: chapter1Order });
        await updateLessonService({ ...lesson1, numericOrder: chapter2Order });
        toast.success('Thay đổi thứ tự thành công');
        dispatch(getCourseDetail(courseId));
      } catch (error) {
        toast.error('Lỗi khi thay đổi thứ tự');
        console.log('🚀 ~ file: ChapterList.tsx:111 ~ changeOrder ~ error', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'action',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      width: 140,
      renderCell: (params) => (
        <>
          <Tooltip title="Chỉnh sửa">
            <Link to={`lesson/${params.row.id}`}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Tăng thứ tự">
            <IconButton
              onClick={() => changeOrder(params.row.numericOrder, -1)}
              disabled={params.row.numericOrder === 1 || loading}
            >
              <ArrowUpwardIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Giảm thứ tự">
            <IconButton
              onClick={() => changeOrder(params.row.numericOrder, 1)}
              disabled={params.row.numericOrder === getBiggestOrder(rows) || loading}
            >
              <ArrowDownwardIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
    { field: 'numericOrder', headerName: 'Thứ tự' },
    { field: 'id', headerName: 'ID' },
    {
      field: 'name',
      headerName: 'Tên',
      flex: 1,
      minWidth: 300,
    },
    {
      field: 'type',
      headerName: 'Loại',
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

  if (!rows || !Array.isArray(rows)) return null;

  if (!courseId) return null;

  return (
    <Box display="flex" height="calc(100vh - 50px)" flexDirection="column">
      <Box display="flex" justifyContent="right">
        <Link to="lesson/create" key="1">
          <PrimaryButton variant="contained">Tạo mới</PrimaryButton>
        </Link>
      </Box>

      <Box flex="1" mt="12px">
        <DataGrid
          rowsPerPageOptions={[5, 10, 20, 50]}
          initialState={{
            sorting: {
              sortModel: [{ field: 'numericOrder', sort: 'asc' }],
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

export default LessonList;
