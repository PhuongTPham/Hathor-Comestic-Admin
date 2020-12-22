<template>
  <Highcharts :options="chartOptions" />
</template>

<script>
import { Chart } from 'highcharts-vue';
import HighCharts from 'highcharts';
import HighChartsMore from 'highcharts/highcharts-more';

HighChartsMore(HighCharts)

export default {
  components: {
    Highcharts: Chart,
  },
  props: ['chartOptions'],
};
</script>

<style lang='scss' scoped></style>
