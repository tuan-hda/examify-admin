import { Box, Grid } from '@mui/material';
import Topbar from 'components/common/Topbar';
import useFetchCourseStatistics from '../hooks/useFetchCourseStatistics';
import CompletingCard from './CompletingCard';
import JoiningCard from './JoiningCard';
import LineChart from './LineChart';
import PopularCard from './PopularCard';
import RatingCard from './RatingCard';
import StarCard from './StarCard';

// import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';

const gridSpacing = 3;

const CourseStatistic = () => {
  const { data: course } = useFetchCourseStatistics();

  return (
    <Box pb="20px">
      <Topbar title="Thống kê khoá học" />
      <div style={{ marginTop: '20px' }}></div>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <JoiningCard value={course.join_count || 0} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <CompletingCard value={course.learnt_count || 0} />
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <StarCard value={course.avg_rating || 0} />
                </Grid>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <RatingCard value={course.rating_count || 0} />
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
              <PopularCard data={course.popular || []} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseStatistic;
