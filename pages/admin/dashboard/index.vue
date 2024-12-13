<template>
  <div class="ctn h-full no-scrollbar">
    <div class="bg-primary text-white py-4 px-4 rounded-xl shadow-lg">
      Welcome Admin!
    </div>
    <div v-if="loading" class="w-full h-[160px] rounded-md mt-4 skeleton"></div>
    <div v-else class="flex gap-[10px] flex-wrap mt-4">
      <cardBox
        Title1="Amount Of"
        Title2="Tickets"
        :Amount="ticketTotal"
        :image="ChartBar"
        Color="Chart"
      />
      <cardBox
        Title1="Total"
        Title2="Users"
        :Amount="usersTotal"
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
        :Amount="eventTotal"
        :image="Users"
        Color="user"
      />
    </div>
    <div class="mt-16 bordesign">
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
import { useToast } from "maz-ui";
import axios from "axios";
// import dataLabels from 'chartjs-plugin-datalabels'

definePageMeta({
  layout: "admin",
});
const toast = useToast();
const usersTotal = ref("");
const eventTotal = ref("");
const ticketTotal = ref(null);
const loading = ref(true);

const getUsers = async () => {
  let response;
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/users/GetUsers",
      {
        withCredentials: true,
      }
    );

    if (response) {
      usersTotal.value = response.data.no_of_users;
      loading.value = false;
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else {
      toast.error(e.response.data.message);
    }
  }
};

const getEvents = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/events", {
      withCredentials: true,
    });

    if (response) {
 
      eventTotal.value = response.data.length;
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else {
      toast.error(e.response.data.message);
    }
  }
};

const getTickets = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/tickets", {
      withCredentials: true,
    });

    if (response) {
      ticketTotal.value = response.data.length;
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else {
      toast.error(e.response.data.message);
    }
  }
};

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

onMounted(() => {
  getUsers();
  getEvents();
  getTickets();
});
</script>

<style scoped></style>
