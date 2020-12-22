<template>
  <div>
    <Chart :chartOptions="chartOptions" />
  </div>
</template>

<script>
import Chart from '../../components/Common/Chart.vue';
import constants from '../../constants/index';

export default {
  components: {
    Chart,
  },
  data() {
    return {
      constants,
      chartOptions: constants.COMMON_CONST.CHART_OPTIONS,
    };
  },
};
</script>

<style lang='scss' scoped></style>
