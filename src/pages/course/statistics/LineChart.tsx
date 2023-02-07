import { Box, Typography, MenuItem } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import { colors } from 'theme';
import { useState } from 'react';
import Select from '@mui/material/Select';
import useFetchCourses from '../hooks/useFetchCourses';
import useFetchCourseDetailStatistics from '../hooks/useFetchCourseDetailStatistics';

const LineChart = ({ isDashboard = false }) => {
  const [value, setValue] = useState({
    course: -1,
    year: 2023,
  });
  const { courses } = useFetchCourses();
  const { data } = useFetchCourseDetailStatistics(value.course, value.year);

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
      id: 'Lượt tham gia',
      color: colors.greenAccent[500],
      data: formatRows(data, 'join_count'),
    },
    {
      id: 'Lượt hoàn thành',
      color: '#2929cc',
      data: formatRows(data, 'completed_count'),
    },
  ];

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
            Tổng người tham gia
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 800 }}>
            {data.total_join_count}
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>
            Số người hoàn thành
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 800 }}>
            {data.total_completed_count}
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>
            Đánh giá
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 800 }}>
            {data.avg_rating} ({data.rating_count})
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
            value={value.course}
            sx={{
              fontSize: '14px',
              width: '200px',
            }}
            name="course"
            onChange={handleChange}
          >
            <MenuItem value={-1} disabled>
              Chọn khoá học
            </MenuItem>
            {courses
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((course) => (
                <MenuItem sx={{ fontSize: '14px' }} key={course.id} value={course.id}>
                  {course.name}
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
          margin={{ top: 40, right: 140, bottom: 50, left: 50 }}
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
            legend: isDashboard ? undefined : 'Tháng',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickValues: 5,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : 'Giá trị',
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
