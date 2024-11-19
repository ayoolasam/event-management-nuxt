<template>
  <div class="ctn h-full">
    <div class="bg-primary text-white py-4 px-4 rounded-xl shadow-lg">
      Welcome Admin!
    </div>
    <div class="flex gap-[10px] flex-wrap mt-4">
      <cardBox
        Title1="Site"
        Title2="Performance"
        Amount="60%"
        :image="ChartBar"
        Color="Chart"
      />
      <cardBox
        Title1="Total"
        Title2="Users"
        Amount="100"
        :image="UserCircle"
        Color="Circle"
      />
      <cardBox
        Title1="Total"
        Title2="Income"
        Amount="20,000"
        :image="Stack"
        Color="Stack"
      />
      <cardBox
        Title1="Total"
        Title2="Events"
        Amount="10"
        :image="Users"
        Color="user"
      />
    </div>
    <div class="mt-16">
      <overview-chart />
    </div>
  </div>
</template>

<script setup>
import cardBox from "~/components/admin/cardBox.vue";
import ChartBar from "../../../assets/images/ChartBarHorizontal.png";
import Users from "../../../assets/images/Users.png";
import UserCircle from "../../../assets/images/UserCircle.png";
import Stack from "../../../assets/images/Stack.png";
// import dataLabels from 'chartjs-plugin-datalabels'

definePageMeta({
  layout: "admin",
});
import { ref } from "vue";

const chartOptions = ref({
  chart: {
    type: "bar",
    toolbar: {
      show: true, // Optional toolbar for extra features
    },
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
  yaxis: {
    title: {
      text: "Values", // Add a label to the y-axis
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
});

const series = ref([
  {
    name: "Series 1",
    data: [30, 40, 35, 50, 49, 60, 70, 91],
  },
]);
</script>

<style scoped></style>
