<template>
  <canvas ref="myChart" class="px-4"></canvas>
</template>

<script>
import { Chart, registerables } from "chart.js";

export default {
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      Chart.register(...registerables);
      const ctx = this.$refs.myChart.getContext("2d");
      new Chart(ctx, {
        type: this.chartData.type,
        data: this.chartData.data,
        options: this.chartOptions,
      });
    },
  },
  watch: {
    chartData: {
      handler() {
        this.renderChart(); // Re-render chart when data changes
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
canvas {
  max-width: 100%;
  height: auto;
}
</style>
