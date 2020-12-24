<template>
  <div class="overview-container">
    <h1 class="text-center">TỔNG QUAN</h1>
        <div class="row sparkboxes mt-15">
      <div class="col-md-3 mb-4" v-for="(item, index) in responseData" :key="index">
        <div class="box" :class="{'box1': index % 2 ===0, 'box2': index %2 !==0, 'box4': index %3 ===0} ">
          <div class="details">
             <h4 style="text-transform: uppercase;">{{ item.name }}</h4>
            <h3>{{ item.value }}</h3>
          </div>
          <div id="spark1"></div>
        </div>
      </div>
    </div>
     <div class="row mt-25 mb-18">
      <div class="col-md-7">
        <label class="sub-text">Thông tin cơ bản:</label>
        <div class="box shadow mt-4">
          <div id="chart">
            <apexchart height=345 :options="barChartOption" :series="seriesBarChart" v-if="flag"></apexchart>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <label class="sub-text">Số order theo status:</label>
        <div class="box shadow mt-4">
          <div id="chart">
            <apexchart :options="chartOptionsPie" :series="seriesPieChart" v-if="flag"></apexchart>
          </div>
        </div>
      </div>
    </div>
    <Chart :chartOptions="chartOptions" />

  </div>
</template>

<script>
import Chart from '../../components/Common/Chart.vue';
import constants from '../../constants/index';
import api from '../../core/services/api/api';

export default {
  name: 'Analytics',
  components: {
    Chart,
  },
  data() {
    return {
      constants,
      chartOptions: constants.COMMON_CONST.CHART_OPTIONS,
      responseData: [],
      seriesPieChart: [0, 0, 0],
      chartOptionsPie: constants.COMMON_CONST.PIE_CHART_OPTIONS,
      seriesBarChart: [],
      barChartOption: constants.COMMON_CONST.BAR_CHART_OPTION,
      flag: false,
    };
  },
  async created() {
    await this.overview();
  },
  methods: {
    makeToastMessage(message, status) {
      this.$bvToast.toast(message, {
        title: 'Thông báo',
        variant: status,
        autoHideDelay: 2000,
        solid: true,
      });
    },
    async overview() {
      const response = await api('getAllStatistic');
      if (response.data.error_code === 0) {
        this.responseData = response.data.data;
        this.seriesPieChart = this.responseData.map((item) => item.value);
        const series = {
          name: '',
          data: this.responseData.map((item) => item.value),
        };
        this.seriesBarChart.push(series);
        this.flag = true;
      } else {
        this.makeToastMessage(response.data.message, 'danger');
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.overview-container {
  .text-center {
    color: burlywood;
    font-weight: 600;
  }
  .sparkboxes .box {
    padding-top: 10px;
    padding-bottom: 10px;
    text-shadow: 0 1px 1px 1px #666;
    box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
    position: relative;
    border-radius: 5px;
  }

  .sparkboxes strong {
    position: relative;
    z-index: 3;
    top: -8px;
    color: #fff;
  }

  .sparkboxes .box1 {
    background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);
  }

  .sparkboxes .box2 {
    background-image: linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%);
  }

  .sparkboxes .box3 {
    background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);
  }

  .sparkboxes .box4 {
    background-image: linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%);
  }
}
</style>

<style lang='scss' scoped>
  .details {
    text-align: center;
  }
  .sub-text {
    font-weight: 600;
    font-size: 15px;
  }
</style>
