<script>
import Chart from "~/components/chart.vue";

export default {
  components: {
    Chart,
  },
  data() {
    return {
      chartData: {
        type: "line",
        data: {
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          datasets: [
            {
              label: "Activity",
              data: [75, 60, 45, 56, 67, 43],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              fill: true,
            },
          ],
        },
      },
      chartOptions: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },

          y: {
            grid: {
              display: false,
            },
            beginAtZero: true,
          },
        },
      },
    };
  },
};
</script>

<template>
  <div class="rounded-xl shadow bg-white cursor-pointer bordesign">
    <div
      class="flex items-center justify-between px-6 py-3 font-[500] text-[18px] border-b"
    >
      <h4 class="font-semibold text-[20px]">Overview</h4>
      <div
        class="flex gap-[10px] font-Rubik font-medium text-[15px] text-primary"
      >
        <div class="flex items-center gap-[10px]">
          <div class="rounded-full w-[10px] h-[10px] bg-primary"></div>
          <span>Activity</span>
        </div>

        <div class="flex items-center">
          <button class="border rounded-lg text-center py-1 px-3 text-[14px]">
            Export
          </button>
        </div>
      </div>
    </div>
    <Chart :chartData="chartData" :chartOptions="chartOptions" />
  </div>
</template>
