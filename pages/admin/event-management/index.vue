<template>
  <div class="h-full ctn no-scrollbar">
    <div class="flex justify-between items-center">
      <h1 class="font-semibold text-[28px]">Event Management</h1>
      <div
        @click="toggleCreate"
        class="bg-primary cursor-pointer text-white px-8 rounded-md shadow-md text-center py-[5px]"
      >
        Create Event
      </div>
    </div>

    <div class="mt-12">
      <div
        v-if="loading"
        v-for="n in 4"
        :key="n"
        class="skeleton w-full h-[120px] rounded-md mt-4"
      ></div>

      <div v-else class="flex flex-col gap-8">
        <EventList :events="events" @update="getEvents" />
      </div>
    </div>

    <createEventModal
      v-if="create"
      @closeModal="toggleCreate"
      @update="getEvents"
    />
  </div>
</template>

<script setup>
import createEventModal from "~/components/admin/createEventModal.vue";
import EditEvent from "~/components/admin/EditEvent.vue";
import { MazCard } from "maz-ui/components";
import ctaModal from "~/components/ctaModal.vue";
import EventList from "~/components/EventList.vue";
import { useToast } from "maz-ui";
import axios from "axios";
const create = ref(false);
const toast = useToast();
const events = ref([]);
const loading = ref(true);
const close = ref(false);
const selectedEvent = ref({});
const editModal = ref(false);
const dLoading = ref(false);
const {$apiClient} = useNuxtApp()
const toggleCreate = () => {
  create.value = !create.value;
};
definePageMeta({
  layout: "admin",
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
