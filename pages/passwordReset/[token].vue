<template>
  <div class="w-screen flex items-center justify-center h-screen bg-primary">
    <div class="bg-white w-full max-w-md p-4 flex flex-col gap-4 rounded-md">
      <p class="font-bold text-center">Reset Password</p>
      <div>
        <label>Password</label>
        <input
          v-model="password"
          class="inputDesign"
          type="password"
          placeholder="Please Fill in Password"
        />
      </div>

      <button
        @click="resetPassword"
        class="w-full flex rounded-md text-white bg-primary items-center justify-center h-12"
      >
        <MazSpinner class="h-[40px]" v-if="loading" color="white" />
        <span v-else>Reset Password</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const password = ref("");

definePageMeta({
  auth: false,
});

const { $apiClient } = useNuxtApp();
import { useToast } from "maz-ui";
const route = useRoute();
const toast = useToast();
const loading = ref(false);

const resetPassword = async () => {
  loading.value = true;
  try {
    const response = await $apiClient.put(
      `/api/v1/users/password/reset/${route.params.token}`,
      {
        password: password.value,
      }
    );

    if (response) {
      toast.success("User Password Updated Successfully");
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
