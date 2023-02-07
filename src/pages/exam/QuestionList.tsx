import { IconButton, Box, Typography, Modal } from '@mui/material';
import Topbar from '../../components/common/Topbar';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomToolbar from '../../components/common/CustomToolbar';
import PrimaryButton from '../../components/common/PrimaryButton';
import EditIcon from '@mui/icons-material/Edit';
import { default as sx } from 'utils/tableProps';
import { ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import { style } from 'utils/sxStyle';
import { IChoice, initialChoice, initialQuestion, IQuestion } from 'api/exam/examInterface';
import FormQuestion from './FormQuestion';
import useFetchQuestions from './hooks/useFetchQuestions';
import Tooltip from '@mui/material/Tooltip';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { updateQuestionService } from 'api/exam/exam';
import { toast } from 'react-toastify';

const initialChoices: IChoice[] = [
  initialChoice,
  initialChoice,
  initialChoice,
  { ...initialChoice, key: true },
];

const QuestionList = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selected, setSelected] = useState<IQuestion>(initialQuestion);
  const [loading, setLoading] = useState<boolean>(false);
  const { setId } = useParams();
  const { data: rows, fetchData } = useFetchQuestions(Number(setId));

  const columns: GridColDef[] = [
    {
      field: 'action',
      headerName: '',
      width: 140,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => toggleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          {getChangeOrderButton(
            'inc',
            <IconButton
              onClick={() => changeOrder(params.row, -1)}
              disabled={params.row.order === 1 || loading}
            >
              <ArrowUpwardIcon />
            </IconButton>,
            params.row.order
          )}
          {getChangeOrderButton(
            'dec',
            <IconButton
              onClick={() => changeOrder(params.row, 1)}
              disabled={Number(params.row.order) === getBiggestOrder() || loading}
            >
              <ArrowDownwardIcon />
            </IconButton>,
            params.row.order
          )}
        </>
      ),
    },
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'order',
      headerName: 'Thứ tự',
    },
    {
      field: 'name',
      headerName: 'Câu hỏi',
      flex: 1,
      minWidth: 250,
      renderCell: (params) => <Typography fontWeight="bold">{params.value}</Typography>,
    },
    { field: 'hashtagId', headerName: 'Hashtag ID', width: 90 },
    {
      field: 'explain',
      headerName: 'Giải thích',
      minWidth: 250,
    },
    {
      field: 'level',
      headerName: 'Mức độ',
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

  function getBiggestOrder() {
    return rows.at(-1)?.order;
  }

  function getChangeOrderButton(type: string, children: ReactElement, order: number) {
    if (loading) return children;
    if (type === 'inc' && order !== 1) return <Tooltip title="Tăng thứ tự">{children}</Tooltip>;
    if (type === 'dec' && order !== getBiggestOrder())
      return <Tooltip title="Giảm thứ tự">{children}</Tooltip>;
    return children;
  }

  async function changeOrder(data: any, value: number) {
    try {
      setLoading(true);
      const swapData = rows.find((item: any) => item.order === data.order + value);
      await updateQuestionService({ ...swapData, numericOrder: -1 });
      await updateQuestionService({ ...data, numericOrder: data.order + value });
      await updateQuestionService({ ...swapData, numericOrder: data.order });
      await fetchData();
      toast.success('Thay đổi thành công');
    } catch (error: any) {
      toast.error('Thay đổi thất bại');
      console.log('🚀 ~ file: QuestionList.tsx:117 ~ changeOrder ~ error', error);
    } finally {
      setLoading(false);
    }
  }

  function toggleEdit(data: any) {
    setOpenEdit((prev) => !prev);
    setSelected(data);
  }

  function toggle() {
    setOpen((prev) => !prev);
  }

  return (
    <Box display="flex" height="calc(100vh - 50px)" flexDirection="column">
      <Topbar
        title="Danh sách câu hỏi"
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
              sortModel: [{ field: 'order', sort: 'asc' }],
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
          <FormQuestion hide={toggle} onCreate={fetchData} isCreate />
        </Box>
      </Modal>
      <Modal open={openEdit} onClose={toggleEdit}>
        <Box sx={style}>
          <FormQuestion
            hide={toggleEdit}
            onDelete={fetchData}
            onUpdate={fetchData}
            initialData={selected}
            initialChoices={initialChoices}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default QuestionList;
