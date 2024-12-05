<template>
  <div class="ctn">
    <div class="py-8 bordesign rounded-md gap-8 flex px-4 flex-wrap mt-12">
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
          <span>{{ user.createdAt }}</span>
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
const user = ref({});

definePageMeta({
  layout: "admin",
});

const getUser = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/users/user/${id}`,
      {
        withCredentials: true,
      }
    );

    if (response) {
      user.value = response.data.data.user;
  
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else {
      toast.error(e.message);
    }
  }
};

onMounted(() => {
  getUser();
});
</script>

<style scoped></style>
