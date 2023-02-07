import { Box, Grid } from '@mui/material';
import Topbar from 'components/common/Topbar';
import useFetchUserStatistics from '../hooks/useFetchUserStatistics';
import CompletingCard from './CompletingCard';
import JoiningCard from './JoiningCard';
import LineChart from './LineChart';
import PopularCard from './PopularCard';
import StarCard from './StarCard';

// import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';

const gridSpacing = 3;

const UserStatistic = () => {
  const { data } = useFetchUserStatistics();

  return (
    <Box pb="20px">
      <Topbar title="Thống kê User" />
      <div style={{ marginTop: '20px' }}></div>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <JoiningCard
                data={{
                  value: data.total_users,
                  newValue: data.total_new_users,
                }}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <CompletingCard value={data.total_active_users} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <StarCard value={data.total_rank_point} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={8}>
              <LineChart />
            </Grid>
            <Grid item xs={12} md={4}>
              <PopularCard data={data.popular || []} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserStatistic;
