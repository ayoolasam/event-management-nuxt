<template>
  <div class="ctn">

<div v-if="loading" class="h-[160px] bordesign rounded-md gap-8 py-4flex px-4 flex items-center flex-wrap mt-12">
<div class="skeleton h-[120px] w-[120px] skeleton rounded-full"></div>
<div class=" class flex flex-col gap-4">
  <div class="skeleton w-[70px] h-[20px]"></div>
  <div class="skeleton   w-[270px] h-[40px]"></div>
</div>

</div>


    <div v-else class="py-8 bordesign rounded-md gap-8 flex px-4 flex-wrap mt-12">
      <div class="rounded-full h-[120px] w-[120px]">
        <img
          class="w-full h-full object-contain object-center"
          src="../../../assets/images/student.png"
          alt="profile-picture"
        />
      </div>
      <div class="">
        <p class="font-semibold text-xl">{{ user.name }}</p>
        <div class="flex gap-8 text-md text-subText text-sm">
          <span> <i class="ri-mail-line"></i> {{ user.email }}</span>
          <span> <i class="ri-phone-line"></i> 09078329726</span>
        </div>
        <div class="flex gap-[5px] text-subText text-sm">
          <label>Date Created:</label>
          <span>{{ formatDate(user.createdAt) }}</span>
        </div>
        <div class="flex gap-[5px] text-subText text-sm">
          <label>Role:</label>
          <span>{{ user.role }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import axios from "axios";
const route = useRoute();
const id = route.params.id;
const loading = ref(false)
const user = ref({});




definePageMeta({
  layout: "admin",
});

const getUser = async () => {
  loading.value = true
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/users/user/${id}`,
      {
        withCredentials: true,
      }
    );

    if (response) {
      user.value = response.data.data.user;
      loading.value = false
  
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else {
      toast.error(e.message);
    }
  }
};



const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", // "short" for abbreviated month
    day: "2-digit",
  });
};

onMounted(() => {
  getUser();
});
</script>

<style scoped></style>
