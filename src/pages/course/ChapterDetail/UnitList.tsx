import { IconButton, Box, SxProps } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { colors } from 'theme';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomToolbar from 'components/common/CustomToolbar';
import EditIcon from '@mui/icons-material/Edit';
import PrimaryButton from 'components/common/PrimaryButton';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import TinyForm, { IValues } from '../TinyForm';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Tooltip from '@mui/material/Tooltip';
import { createUnitService, updateUnitService } from 'api/course/course';
import getBiggestOrder from 'utils/getBiggestOrder';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { AppDispatch } from 'redux/store';
import { getCourseDetail } from 'redux/features/course/courseSlice';

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

const UnitList = ({ unitList: rows }: any) => {
  const { chapterId, courseId } = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const changeOrder = async (numericOrder: number, value: number) => {
    if (chapterId && courseId) {
      setLoading(true);
      const unit1 = rows.find((row: any) => row.numericOrder === numericOrder);
      const unit1Order = numericOrder;
      const unit2 = rows.find((row: any) => row.numericOrder === unit1Order + value);
      const unit2Order = unit2.numericOrder;
      try {
        await updateUnitService(unit1.id, chapterId, -1, unit1.name);
        await updateUnitService(unit2.id, chapterId, unit1Order, unit2.name);
        await updateUnitService(unit1.id, chapterId, unit2Order, unit1.name);
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
            <Link to={`unit/${params.row.id}`}>
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
              onClick={() => changeOrder(params.row.numericOrder, +1)}
              disabled={params.row.numericOrder === getBiggestOrder(rows) || loading}
            >
              <ArrowDownwardIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
    {
      field: 'numericOrder',
      headerName: 'Thứ tự',
    },
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

  if (!rows || !Array.isArray(rows)) return null;

  if (!courseId) return null;

  const handleCreateUnit = async (data: IValues) => {
    if (chapterId) {
      try {
        await createUnitService(chapterId, getBiggestOrder(rows) + 1, data.name);
        dispatch(getCourseDetail(courseId));
        toast.success('Tạo chủ đề thành công');
        handleClose();
      } catch (error) {
        console.log('🚀 ~ file: UnitList.tsx:139 ~ handleCreateUnit ~ error', error);
        toast.error('Tạo chủ đề thất bại');
      }
    }
  };

  return (
    <Box display="flex" height="calc(100vh - 50px)" flexDirection="column">
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TinyForm isCreate handleFormSubmit={handleCreateUnit} title="Thêm chủ đề" />
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

export default UnitList;
