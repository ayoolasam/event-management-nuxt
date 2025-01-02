<template>
  <div class="flex w-screen h-screen">
    <userSideBar />
    <div class="w-full h-full  overflow-y-auto">
      <navBar />
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import userSideBar from "~/components/user/userSideBar.vue";
import navBar from "~/components/navBar.vue";
</script>

<style scoped></style>
