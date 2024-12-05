<template>
  <nav class="w-full py-[7px] flex justify-end px-8 bordesign bg-white">
    <div
      @click="triggerLogOut"
      class="user-box flex gap-[10px] items-center relative cursor-pointer"
    >
      <div
        v-if="logOut"
        @click="LogOut"
        class="shadow-lg cursor-pointer w-[100px] text-subText font-semibold absolute bordesign left-12 top-12 py-[5px] text-center rounded-md"
      >
        Log Out
      </div>
      <div class="class flex flex-col">
        <p class="font-semi-bold text-[16px]">{{ userStore.user.name }}</p>
        <span class="font-normal text-[14px] text-gray-500">{{
          userStore.userRole
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
const logOut = ref(false);

const toast = useToast();
const triggerLogOut = () => {
  logOut.value = !logOut.value;
};
const getMe = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/users/me", {
      withCredentials: true,
    });

    if (response) {
      userStore.user = response.data.data.user;
      userStore.userRole = response.data.data.user.role;
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else {
      toast.error(e.response.data.message);
    }
  }
};

const LogOut = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/users/LogOut",
      {
        withCredentials: true,
      }
    );

    if (response) {
      userStore.$reset();
      navigateTo("/Login");
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
