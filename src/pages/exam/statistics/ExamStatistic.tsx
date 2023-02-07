import { Box, Grid } from '@mui/material';

import Topbar from 'components/common/Topbar';
import useFetchExamStatistics from '../hooks/useFetchExamStatistics';

import CompletingCard from './CompletingCard';
import JoiningCard from './JoiningCard';
import LineChart from './LineChart';
import PopularCard from './PopularCard';
import RatingCard from './RatingCard';
import StarCard from './StarCard';

const gridSpacing = 3;

const ExamStatistic = () => {
  const { data } = useFetchExamStatistics();

  return (
    <Box pb="20px">
      <Topbar title="Thống kê đề thi" />
      <div style={{ marginTop: '20px' }}></div>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <JoiningCard value={data.exams_count} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <CompletingCard value={data.taking_count} />
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <StarCard value={data.favorite_parts} />
                </Grid>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <RatingCard value={data.average || {}} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={8}>
              <LineChart />
            </Grid>
            <Grid item xs={12} md={4}>
              <PopularCard data={data.popular_exams || []} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExamStatistic;
