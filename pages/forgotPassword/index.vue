<template>
  <div class="w-screen flex items-center justify-center h-screen bg-primary">
    <div class="bg-white w-full max-w-md p-4 flex flex-col gap-4 rounded-md">
      <p class="font-bold text-center">Forgot Password</p>
      <div>
        <label>Email</label>
        <input
          v-model="email"
          class="inputDesign"
          type="email"
          placeholder="Please Fill in Email"
        />
      </div>

      <button
        @click="ForgotPassword"
        class="w-full flex rounded-md text-white bg-primary items-center justify-center h-12"
      >
        <MazSpinner class="h-[40px]" v-if="loading" color="white" />
        <span v-else>Submit</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const email = ref("");

const { $apiClient } = useNuxtApp();
import { useToast } from "maz-ui";
const toast = useToast();
const loading = ref(false);

const ForgotPassword = async () => {
  loading.value = true;
  try {
    const response = await $apiClient.post("/api/v1/users/password/forgot", {
      email: email.value,
    });

    if (response) {
      toast.success(response.data.message);
      loading.value = false;
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else {
      console.log(e.message);
      toast.error(e.message);
    }
  }
};
</script>

<style scoped></style>
