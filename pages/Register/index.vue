<template>
  <div class="min-h-screen bg-primary flex items-center justify-center p-8">
    <div
      class="flex flex-col md:flex-row bg-white shadow-2xl xl:rounded-lg w-full max-w-4xl overflow-hidden"
    >
      <div class="hidden md:block md:w-1/2">
        <img
          src="../../assets/images/RegisterImage.jpg"
          alt="RegisterImage"
          class="w-full h-full object-cover"
        />
      </div>

      <div class="md:w-1/2 p-8 flex flex-col justify-center">
        <h1 class="text-2xl font-semibold text-center mb-6">
          Create an Account
        </h1>

        <div class="flex flex-col gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Name</label
            >
            <input
              class="inputDesign w-full"
              type="text"
              placeholder="Enter your Name"
              v-model="name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Username</label
            >
            <input
              class="inputDesign w-full"
              type="text"
              placeholder="Enter your username"
              v-model="username"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Email</label
            >
            <input
              class="inputDesign w-full"
              type="email"
              placeholder="Enter your Email"
              v-model="email"
            />
          </div>

          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Password</label
            >
            <input
              :type="show ? 'text' : 'password'"
              class="inputDesign w-full pr-16"
              placeholder="Enter your Password"
              v-model="password"
            />
            <span
              @click="showPassword"
              class="cursor-pointer text-sm text-blue-600 hover:underline absolute right-4 top-4"
            >
              {{ show ? "Hide" : "Show" }}
            </span>
          </div>
        </div>

        <button
          @click="Register"
          class="bg-primary text-white flex items-center justify-center font-medium py-2 h-12 rounded-md mt-6 w-full hover:bg-primary-dark transition-all duration-150"
        >
          <MazSpinner v-if="loading" class="h-[35px]" color="white" />
          <span v-else> Create Account </span>
        </button>

        <div class="text-center mt-4">
          <NuxtLink to="/Login" class="text-sm text-gray-600 hover:underline">
            Have an account? Login
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useToast } from "maz-ui";
const password = ref("");
const show = ref(false);
const name = ref("");
const username = ref("");
const email = ref("");
const loading = ref(false);
const toast = useToast();
const { $apiClient } = useNuxtApp();

const showPassword = () => {
  show.value = !show.value;
};

const Register = async () => {
  loading.value = true;
  try {
    const response = await $apiClient.post("/api/v1/users/register", {
      name: name.value,
      username: username.value,
      password: password.value,
      email: email.value,
    });

    if (response) {
      toast.success("Registered Successfully");
      loading.value = false;
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
      loading.value = false;
    } else {
      toast.error(e.response.data.message);
      loading.value = false;
    }
  }
};
</script>

<style scoped>
.inputDesign {
  border: 1px solid #ddd;
  padding: 0.5rem;
  border-radius: 0.375rem;
  outline: none;
}
.inputDesign:focus {
  border-color: #3182ce;
  box-shadow: 0 0 0 1px #3182ce;
}
</style>
