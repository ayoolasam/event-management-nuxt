<template>
  <div class="p-3 flex font-poppins justify-between px-6">
    <div class="logo">
      <img
        src="../assets/images/logo-white.png"
        class="h-[40px] w-[70px]"
        alt="logo"
      />
    </div>

    <button
      class="rounded-lg cursor-pointer px-[30px] py-[5px] bg-white text-[15px] font-medium"
    >
      <NuxtLink :to="{ name: 'Login' }"> Sign In </NuxtLink>
    </button>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
