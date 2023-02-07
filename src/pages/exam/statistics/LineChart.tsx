import { Box, Typography, MenuItem, Select } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import { colors } from 'theme';
import { useState } from 'react';
import useFetchExams from '../hooks/useFetchExams';
import useFetchExamDetailStatistics from '../hooks/useFetchCourseDetailStatistics';
import { convertTimeHours, convertTimeMinutes } from 'utils/formatCurrency';

const LineChart = ({ isDashboard = false }) => {
  const [value, setValue] = useState({
    exam: -1,
    year: 2023,
  });
  const { data: exams } = useFetchExams();
  const { data } = useFetchExamDetailStatistics(value.exam, value.year);

  function handleChange(e: any) {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  }

  function formatRows(rows: any, field: string) {
    return (rows.months || []).map((r: any) => ({
      x: r.month,
      y: r[field],
    }));
  }

  const lineData = [
    {
      id: 'Lượt làm bài',
      color: colors.greenAccent[500],
      data: formatRows(data, 'taking_count'),
    },
  ];

  Array(7)
    .fill('')
    .map((_, i) => i + 1)
    .forEach((part) => {
      const partText = 'Part ' + part;
      if (!data[partText]) return;

      lineData.push({
        id: partText,
        color: colors.greenAccent[500],
        data: Object.keys(data[partText]).map((key) => ({
          x: parseInt(key),
          y: data[partText][key],
        })),
      });
    });

  function getTime(value: number) {
    const hours = convertTimeHours(value);
    const minutes = convertTimeMinutes(value);
    const seconds = value - hours * 3600 - minutes * 60;
    let result = '';
    if (hours) result += hours + 'h ';
    if (minutes) result += minutes + 'm ';
    if (seconds) result += seconds + 's ';
    if (!result) result = '0s';
    return result;
  }

  return (
    <Box
      sx={{
        height: '478px',
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(0,0,0,0.2)',
        p: '20px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
        }}
      >
        <Box>
          <Typography sx={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>
            Số lượt làm bài
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 800 }}>
            {data.total_exam_takings} ({data.total_users})
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>
            Part yêu thích
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 800 }}>
            {data?.favorite_part?.name} ({data?.favorite_part?.parts_count})
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>
            TB Thời gian
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 800 }}>
            {getTime(data?.average?.time)}
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>Đúng</Typography>
          <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 800 }}>
            {Math.round(data?.average?.score * 100)}%
          </Typography>
        </Box>

        <Box ml="auto" sx={{ display: 'flex', gap: '16px' }}>
          <Select
            id="standard-select-year"
            size="small"
            value={value.year}
            sx={{
              fontSize: '14px',
            }}
            name="year"
            onChange={handleChange}
          >
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
          </Select>
          <Select
            id="standard-select-currency"
            size="small"
            value={value.exam}
            sx={{
              fontSize: '14px',
              width: '200px',
            }}
            name="exam"
            onChange={handleChange}
          >
            <MenuItem value={-1} disabled>
              Chọn đề thi
            </MenuItem>
            {exams
              .sort((a, b) => a.id - b.id)
              .map((exam) => (
                <MenuItem sx={{ fontSize: '14px' }} key={exam.id} value={exam.id}>
                  {exam.name}
                </MenuItem>
              ))}
          </Select>
        </Box>
      </Box>

      <Box
        sx={{
          height: '400px',
        }}
      >
        <ResponsiveLine
          data={lineData}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[900],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[900],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[900],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[900],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[900],
              },
            },
            tooltip: {
              container: {
                background: colors.grey[200],
                color: colors.grey[900],
              },
            },
          }}
          colors={
            isDashboard
              ? {
                  datum: 'color',
                }
              : { scheme: 'nivo' }
          }
          margin={{ top: 40, right: 150, bottom: 50, left: 50 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="catmullRom"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Tháng',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickValues: 5,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Giá trị',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default LineChart;
