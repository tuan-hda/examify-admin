import { Box, Typography, MenuItem } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import { colors } from 'theme';
import { useState } from 'react';
import Select from '@mui/material/Select';
import useFetchUserDetailStatistics from '../hooks/useFetchUserDetailStatistics';

const LineChart = ({ isDashboard = false }) => {
  const [value, setValue] = useState({
    year: 2023,
  });
  const { data } = useFetchUserDetailStatistics(value.year);

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

  const lineData: any[] = [
    {
      id: 'Đạo hữu mới',
      color: colors.greenAccent[500],
      data: formatRows(data, 'new_count'),
    },
    {
      id: 'Số đạo hữu tu luyện',
      color: '#2929cc',
      data: formatRows(data, 'active_count'),
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
            Tổng đạo hữu mới
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 800 }}>
            {data.total_new_users}
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>
            Tổng đạo hữu hoạt động
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 800 }}>
            {data.total_active_users}
          </Typography>
        </Box>

        {/* <Box>
          <Typography sx={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>
            Tổng điểm các đạo hữu
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 800 }}>
            {data.total_rank_point}
          </Typography>
        </Box> */}

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
