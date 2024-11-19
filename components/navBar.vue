<template>
  <nav
    class="shadow-md w-full py-4 flex justify-end px-8 sticky z-50 top-0 bg-white"
  >
    <div class="user-box flex gap-[10px] items-center">
      <div class="class flex flex-col">
        <p class="font-semi-bold text-[16px]">{{ userStore.user.name }}</p>
        <span class="font-normal text-[14px] text-gray-500">{{
          userStore.role
        }}</span>
      </div>
      <div class="flex gap-[8px] items-center">
        <div class="h-[40px] w-[40px] bg-green-400 rounded-full">
          <img src="../assets/images/student.png" alt="user-photo" />
        </div>

        <i class="ri-arrow-down-s-line"></i>
      </div>
    </div>
  </nav>
</template>

<script setup>
import axios from "axios";
import { useToast } from "maz-ui";
const userStore = useUserStore();

const toast = useToast();

const getMe = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/users/me", {
      withCredentials: true,
    });

    if (response) {
      userStore.user = response.data.data.user;
      userStore.role = response.data.data.user.role;
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else {
      toast.error(e.response.data.message);
    }
  }
};

onMounted(() => {
  getMe();
});
</script>

<style lang="scss" scoped></style>
