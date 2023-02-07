import { IconButton, Box, SxProps, Tooltip } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { colors } from 'theme';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomToolbar from 'components/common/CustomToolbar';
import EditIcon from '@mui/icons-material/Edit';
import PrimaryButton from 'components/common/PrimaryButton';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import TinyForm from '../TinyForm';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { IValues } from '../TinyForm';
import { createChapterService, updateChapterService } from 'api/course/course';
import { toast } from 'react-toastify';
import { getCourseDetail } from 'redux/features/course/courseSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';
import getBiggestOrder from 'utils/getBiggestOrder';

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

const ChapterList = ({ chapterList: rows }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const { courseId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const handleCreateChapter = async (data: IValues) => {
    let order = getBiggestOrder(rows);
    if (courseId)
      try {
        await createChapterService(courseId, order + 1, data.name);
        dispatch(getCourseDetail(courseId));
        toast.success('Tạo chương thành công');
        handleClose();
      } catch (error) {
        toast.error('Tạo chương thất bại');
        console.log('🚀 ~ file: ChapterList.tsx:91 ~ handleCreateChapter ~ error', error);
      }
  };

  const changeOrder = async (numericOrder: number, value: number) => {
    if (courseId) {
      setLoading(true);
      const chapter1 = rows.find((row: any) => row.numericOrder === numericOrder);
      const chapter1Order = numericOrder;
      const chapter2 = rows.find((row: any) => row.numericOrder === chapter1Order + value);
      const chapter2Order = chapter2.numericOrder;
      try {
        await updateChapterService(chapter1.id, courseId, -1, chapter1.name);
        await updateChapterService(chapter2.id, courseId, chapter1Order, chapter2.name);
        await updateChapterService(chapter1.id, courseId, chapter2Order, chapter1.name);
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
            <Link to={`chapter/${params.row.id}`}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Tăng thứ tự">
            <IconButton
              disabled={params.row.numericOrder === 1 || loading}
              onClick={() => changeOrder(params.row.numericOrder, -1)}
            >
              <ArrowUpwardIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Giảm thứ tự">
            <IconButton
              disabled={params.row.numericOrder === getBiggestOrder(rows) || loading}
              onClick={() => changeOrder(params.row.numericOrder, +1)}
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
      field: 'totalLesson',
      headerName: 'Số bài',
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  if (!rows) return null;

  return (
    <Box display="flex" height="calc(100vh - 50px)" flexDirection="column">
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TinyForm isCreate handleFormSubmit={handleCreateChapter} title="Thêm chương" />
        </Box>
      </Modal>

      <Box display="flex" justifyContent="right">
        <PrimaryButton variant="contained" onClick={handleOpen}>
          Tạo mới
        </PrimaryButton>
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

export default ChapterList;
