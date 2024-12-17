<template>
  <div
    class="rounded-[10px]  bg-white flex  flex-col justify-between py-[10px] px-[15px] shadow-lg font-Rubik text-[#033E96] bordesign"
  >
    <div class="font-Rubik text-[20px] font-normal">
      <p>{{ Title1 }}</p>
      <p>{{ Title2 }}</p>
    </div>
    <div class="flex justify-between">
      <span class="font-medium text-[30px]">{{ Amount }}</span>
      <div
        :class="{
          'bg-[#E1F7E3]': Color === 'Chart',
          'bg-[#FFF0F0]': Color === 'Circle',
          'bg-[#EBEBFF]': Color === 'Stack',
          'bg-[#FFF2E5]': Color === 'user',
        }"
        class="flex items-center justify-center rounded-[10px] p-[14px] bg-[#E1F7E3]"
      >
        <img :src="image" alt="dashboard-icons" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["Title1", "Title2", "Amount", "Color", "image"]);
</script>

<style scoped></style>
