<template>
  <div class="ctn fade-in h-full no-scrollbar">
    <div class="bg-primary text-white py-4 px-4 rounded-xl shadow-lg">
      Welcome Back {{ userStore.user.name }}
    </div>
    <div v-if="loading" class="w-full h-[160px] rounded-md mt-4 skeleton"></div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-[10px] mt-4">
      <cardBox
        Title1="Amount Of"
        Title2="Tickets"
        :Amount="ticketTotal"
        :image="ChartBar"
        Color="Chart"
      />

      <cardBox
        Title1="Total"
        Title2="Payments"
        :Amount="paymentTotal"
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
const userStore = useUserStore();

definePageMeta({
  layout: "user",
});

const toast = useToast();

const paymentTotal = ref("");
const ticketTotal = ref(null);
const loading = ref(true);
const { $apiClient } = useNuxtApp();

const fetchUserDashboardData = async () => {
  try {
    const response = await $apiClient.get("/api/v1/users/userdashBoard", {
      withCredentials: true,
    });

    if (response) {
      paymentTotal.value = response.data.data.payments.length;
      ticketTotal.value = response.data.data.tickets.length;

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
  fetchUserDashboardData();
});
</script>

<style scoped></style>
