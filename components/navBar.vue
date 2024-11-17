<template>
  <nav
    class="shadow-md w-full py-4 flex justify-end px-8 sticky z-50 top-0 bg-white"
  >
    <div class="user-box flex gap-[10px] items-center">
      <div class="class flex flex-col">
        <p class="font-semi-bold text-[16px]">Thomas Arne</p>
        <span class="font-normal text-[14px] text-gray-500">User</span>
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
import studentImage from "../assets/images/student.png";
</script>

<style lang="scss" scoped></style>
