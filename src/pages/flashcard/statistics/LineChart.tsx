import { Box, Typography, MenuItem } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import { colors } from 'theme';
import { useState } from 'react';
import useFetchFlashcardSets from '../hooks/useFetchFlashcardSets';
import Select from '@mui/material/Select';

import useFetchSetStatistics from '../hooks/useFetchSetStatistics';

const LineChart = ({ isDashboard = false }) => {
  const [value, setValue] = useState({
    set: -1,
    year: 2023,
  });
  const { data } = useFetchSetStatistics(value.set, value.year);
  const { sets } = useFetchFlashcardSets();

  function formatRows(rows: any) {
    return (rows.months || []).map((r: any) => ({
      x: r.month,
      y: r.learnt_count,
    }));
  }

  const lineData = [
    {
      id: 'Lượt học từ',
      color: colors.greenAccent[500],
      data: formatRows(data),
    },
  ];

  function handleChange(e: any) {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  }

  function getRatio(v1: any, v2: any) {
    const a = Number(v1 || 0),
      b = Number(v2 || 1);
    return Math.round((a / b) * 100);
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
            Số flashcard
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 800 }}>
            {data?.count}
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>
            Lượt xem
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 800 }}>
            {data?.views}
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>
            Tổng lượt học từ
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 800 }}>
            {data.learnt_count}
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>
            Tỉ lệ hoàn thành
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 800 }}>
            {getRatio(data.users_learnt_count, data.users_count)}% ({data.users_learnt_count || 0})
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
            value={value.set}
            sx={{
              fontSize: '14px',
              width: '200px',
            }}
            name="set"
            onChange={handleChange}
          >
            <MenuItem value={-1} disabled>
              Chọn bộ flashcard
            </MenuItem>
            {sets.map((set) => (
              <MenuItem sx={{ fontSize: '14px' }} key={set.fc_set_id} value={set.fc_set_id}>
                {set.name}
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
            stacked: true,
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
            legend: isDashboard ? undefined : 'Đếm',
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
