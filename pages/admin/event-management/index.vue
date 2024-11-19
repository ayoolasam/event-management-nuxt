<template>
  <div class="h-full ctn no-scrollbar">
    <div class="flex justify-between items-center">
      <h1 class="font-semibold text-[28px]">Event Management</h1>
      <div
        @click="toggleCreate"
        class="bg-primary hover:bg-white cursor-pointer hover:text-primary text-white px-8 rounded-md shadow-md text-center py-[5px]"
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
      <div
        v-else
        v-for="(event, index) in events"
        :key="index"
        class="mt-4 relative"
      >
        <div class="absolute right-[10px] flex gap-4 top-4 px-8 z-50">
          <i class="ri-edit-line"></i>
          <i class="ri-delete-bin-line text-red-400"></i>
        </div>
        <MazCard
          :block="true"
          :images="['https://loremflickr.com/600/600']"
          orientation="row"
        >
          <template #title>
            <h3 style="margin: 0; margin-bottom: 20px; font-weight: 600">
              {{ event.name }}
            </h3>
          </template>
          <template #content>
            <p class="maz-text-muted" style="margin: 0">
              {{ event.description }}
            </p>
            <div class="flex gap-[5px] text-primary">
              <i class="ri-map-pin-line"></i>
              <p>{{ event.location }}</p>
            </div>
          </template>
        </MazCard>
      </div>
    </div>

    <createEventModal v-if="create" @closeModal="toggleCreate" />
  </div>
</template>

<script setup>
import createEventModal from "~/components/admin/createEventModal.vue";
import { MazCard } from "maz-ui/components";
import { useToast } from "maz-ui";
import axios from "axios";
const create = ref(false);
const toast = useToast();
const events = ref([]);
const loading = ref(true);
const toggleCreate = () => {
  create.value = !create.value;
};
definePageMeta({
  layout: "admin",
});

const getEvents = async () => {
  try {
    loading.value = true;
    const response = await axios.get("http://localhost:5000/api/v1/events", {
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
