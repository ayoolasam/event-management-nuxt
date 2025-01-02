<template>
  <div class="h-full fade-in ctn no-scrollbar">
    <div class="flex justify-between items-center">
      <h1 class="font-semibold text-[28px]">Event Management</h1>
    </div>

    <div class="mt-12">
      <div
        v-if="loading"
        v-for="n in 4"
        :key="n"
        class="skeleton w-full h-[120px] rounded-md mt-4"
      ></div>

      <div v-else class="flex flex-col gap-8">
        <eventList :events="events" />
      </div>
    </div>
  </div>
</template>

<script setup>
import eventList from "~/components/user/eventList.vue";
import { useToast } from "maz-ui";
import axios from "axios";
const create = ref(false);
const toast = useToast();
const events = ref([]);
const loading = ref(true);
const close = ref(false);

const { $apiClient } = useNuxtApp();
const toggleCreate = () => {
  create.value = !create.value;
};
definePageMeta({
  layout: "user",
});

const closeCta = () => {
  close.value = !close.value;
};

const getEvents = async () => {
  try {
    loading.value = true;
    const response = await $apiClient.get("/api/v1/events", {
      withCredentials: true,
    });

    if (response) {
      events.value = response.data.data.events;
      loading.value = false;
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else {
      toast.error(e.message);
    }
  }
};

onMounted(() => {
  getEvents();
});
</script>

<style lang="scss" scoped></style>
