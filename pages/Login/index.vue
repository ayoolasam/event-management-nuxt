<template>
  <div
    class="flex items-center font-poppins justify-center h-screen bg-primary"
  >
    <div class="flex w-[950px] cont h-[460px] shadow-2xl">
      <div class="flex-1 left">
        <img
          class="h-full w-full rounded-tl-lg rounded-bl-lg"
          src="../../assets/images/loginImage.jpg"
          alt="LoginImage"
        />
      </div>

      <div
        class="flex-1 bg-white rounded-tr-lg justify-center rounded-br-lg flex py-8"
      >
        <div class="flex flex-col px-8 w-full">
          <div class="text-center">
            <span class="text-black font-semibold text-[25px]">Login</span>
          </div>

          <div
            class="mt-4 flex flex-col gap-[15px] h-full justify-center items-center"
          >
            <!-- <div class="form-group px-8 w-full flex flex-col gap-[5px]">
              <label class="block font-medium text-gray-500">Name</label>
              <input
                class="px-4 shadow-sm py-[8px] rounded-lg border-[1px] border-[#efebe9] focus:outline-none placeholder:text-[13px]"
                type="text"
                placeholder="Enter your Name"
              />
            </div> -->
            <div class="form-group  w-full flex flex-col gap-[5px]">
              <label class="block font-medium text-gray-500">Email</label>
              <input
                class="inputDesign placeholder:text-[13px]"
                type="text"
                placeholder=" Enter Your Email"
                v-model="email"
              />
            </div>
            <div
              class="form-group  w-full flex flex-col gap-[5px] relative"
            >
              <span
                @click="showPassword()"
                class="absolute right-4 top-4 text-[15px] cursor-pointer underline text-red-400"
              >
                {{ show ? "Hide" : "Show" }}
              </span>
              <label class="block font-medium text-gray-500">Password</label>
              <input
                class="inputDesign placeholder:text-[13px]"
                :type="show ? 'text' : 'password'"
                placeholder=" Enter Your Password"
                v-model="password"
              />
            </div>

            <div class="flex items-center w-full flex-col mt-8">
              <button
                class="bg-primary px-24 w-full h-12 rounded-xl flex items-center justify-center text-white shadow-md font-medium transition-all duration-150"
                @click="LogIn"
              >
                <MazSpinner v-if="loading" class="h-[35px]" color="white" />
                <span v-else>Sign In</span>
              </button>
              <NuxtLink :to="'/Register'">
                <span class="text-gray-600 text-[14px]"
                  >Dont Have an Account Signup?</span
                >
              </NuxtLink>
              <NuxtLink :to="'forgotPassword'">
                <span class="text-gray-600 text-[14px]"
                  >Forgot Password?</span
                >
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useToast } from "maz-ui";
const password = ref("");
const email = ref("");
const show = ref(false);
const toast = useToast();
const userStore = useUserStore();
const loading = ref(false);
const {$apiClient} = useNuxtApp()

const showPassword = () => {
  show.value = !show.value;
};

const LogIn = async () => {
  let response;
  try {
    loading.value = true;
    const response = await $apiClient.post(
      "/api/v1/users/login",
      {
        password: password.value,
        email: email.value,
      },
      {
        withCredentials: true, // Required for cookies
      }
    );

    if (response) {
      // await userStore.fetchUserDetails();
      userStore.loggedIn = true;
      loading.value = false;
      toast.success("Logged In Successfully");
      if (userStore.userRole === "Admin") {
        navigateTo("/admin/dashboard");
      } else {
        navigateTo("/user/dashboard");
      }
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



.inputDesign:focus {
  border-color: #3182ce;
  box-shadow: 0 0 0 1px #3182ce;
}
@media (max-width: 984px) {
  .left {
    display: none;
  }
  .cont {
    width: 500px;
  }
}

@media (max-width: 560px) {
  .left {
    display: none;
  }
  .cont {
    width: 400px;
  }
}
@media (max-width: 560px) {
  .left {
    display: none;
  }
  .cont {
    width: 340px;
  }
}
</style>
