<template>
  <div class="flex items-center justify-center h-screen bg-primary">
    <div class="flex w-[950px] h-[550px] shadow-2xl">
      <div class="flex-1 left">
        <img
          class="h-full w-full rounded-tl-lg rounded-bl-lg"
          src="../../assets/images/RegisterImage.jpg"
          alt="LoginImage"
        />
      </div>

      <div class="flex-1 bg-white rounded-tr-lg rounded-br-lg flex py-8">
        <div class="flex flex-col w-full">
          <div class="text-center">
            <span class="text-black font-semibold text-[25px]"
              >Create an Account</span
            >
          </div>

          <div class="mt-4 flex flex-col gap-[15px]">
            <div class="form-group px-8 w-full flex flex-col gap-[5px]">
              <label class="block font-medium text-gray-500">Name</label>
              <input
                class="px-4 shadow-sm py-[8px] rounded-lg border-[1px] border-[#efebe9] focus:outline-none placeholder:text-[13px]"
                type="text"
                placeholder="Enter your Name"
              />
            </div>
            <div class="form-group px-8 w-full flex flex-col gap-[5px]">
              <label class="block font-medium text-gray-500">Username</label>
              <input
                class="px-4 shadow-sm py-[8px] rounded-lg border-[1px] border-[#efebe9] focus:outline-none placeholder:text-[13px]"
                type="text"
                placeholder="Enter your username"
              />
            </div>
            <div class="form-group px-8 w-full flex flex-col gap-[5px]">
              <label class="block font-medium text-gray-500">Email</label>
              <input
                class="px-4 py-[8px] shadow-sm rounded-lg border-[1px] border-[#efebe9] focus:outline-none placeholder:text-[13px]"
                type="text"
                placeholder=" Enter Your Email"
              />
            </div>
            <div
              class="form-group px-8 w-full flex flex-col gap-[5px] relative"
            >
              <span
                @click="showPassword()"
                class="absolute right-8 top-0 text-[15px] cursor-pointer underline text-red-400"
              >
                {{ show ? "Hide" : "Show" }}
              </span>
              <label class="block font-medium text-gray-500">Password</label>
              <input
                class="px-4 py-[8px] shadow-sm rounded-lg border-[1px] border-[#efebe9] focus:outline-none placeholder:text-[13px]"
                :type="show ? 'text' : 'password'"
                placeholder=" Enter Your Password"
                v-model="password"
              />
            </div>
          </div>
          <div class="flex items-center flex-col mt-8">
            <button
              class="bg-primary px-24 py-[8px] rounded-xl text-white shadow-md font-medium hover:translate-y-4 transition-all duration-150"
            >
              Create Account
            </button>
            <NuxtLink :to="'/Login'">
              <span class="text-gray-600 text-[14px]">
                Have an Account Login?</span
              >
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const password = ref("");
const show = ref(false);

const showPassword = () => {
  show.value = !show.value;
};
</script>

<style scoped>
@media (max-width: 630px) {
  .left {
    display: none;
    width: 300px;
  }
}
</style>
