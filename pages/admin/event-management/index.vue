<template>
  <div class="h-full ctn">
    <div class="flex justify-between items-center">
      <h1 class="font-semibold text-[28px]">Event Management</h1>
      <div
        @click="toggleCreate"
        class="bg-primary hover:bg-white cursor-pointer hover:text-primary text-white px-8 rounded-md shadow-md text-center py-[5px]"
      >
        Create Event
      </div>
    </div>

    <createEventModal v-if="create" 
    @closeModal="toggleCreate"/>
  </div>
</template>

<script setup>
import createEventModal from "~/components/admin/createEventModal.vue";
const create = ref(false);
const toggleCreate = () => {
  create.value = !create.value;
};
definePageMeta({
  layout: "admin",
});
</script>

<style lang="scss" scoped></style>
