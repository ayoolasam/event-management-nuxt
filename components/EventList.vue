<template>
  <div class="flex flex-col gap-8">
    <div
      v-for="(event, index) in events"
      :key="index"
      class="bordesign w-full event-box p-4 rounded-lg relative"
    >
    <div
        class="absolute font-bold icon-contain top-8 cursor-pointer flex gap-4 right-[6px] px-8 z-40"
      >
        <i
          class="ri-edit-line"
          @click="
            editModal = true;
            selectedEvent = event;
          "
        ></i>
        <i
          @click="
            close = true;
            selectedEvent = event;
          "
          class="ri-delete-bin-line text-red-400"
        ></i>
      </div>
      <div class="flex flex-col gap-4">
        <div class="w-full h-[180px]">
          <img
            class="h-full w-full object-cover object-center rounded-lg"
            :src="event.imageUrl"
            alt="image"
          />
        </div>
        <NuxtLink :to="`/admin/event-management/${event._id}`">
          <p class="font-semibold underline cursor-pointer">{{ event.name }}</p>
        </NuxtLink>

        <div class="text-subText text-sm">
          <p>
            {{ event.description }}
          </p>
        </div>
        <div class="text-subText sub flex flex-wrap gap-8 text-sm">
          <div class="flex gap-[5px]">
            <label>Capacity: </label>

            <p class="text-black font-semibold">{{ event.capacity }}</p>
          </div>
          <div class="flex gap-[5px]">
            <label> <i class="ri-map-pin-line"></i> Location: </label>

            <p class="text-black font-semibold">{{ event.location }}</p>
          </div>

          <div class="flex gap-[5px]">
            <label>Price: </label>

            <p class="text-black font-semibold">{{ event.price }}</p>
          </div>

          <div class="flex gap-[5px]">
            <label>Happening on </label>

            <p class="text-black font-semibold">{{ formatDate(event.date) }}</p>
          </div>
        </div>
      </div>
    
    </div>
    <ctaModal
      v-if="close"
      title="Event"
      @closeModal="closeCta"
      @delete="deleteEvent"
      :loading="dLoading"
    />

    <EditEvent
      v-if="editModal"
      @closeModal="editModal = false"
      :event="selectedEvent"
    />
  </div>
</template>

<script setup>
import { useToast } from "maz-ui";
const props = defineProps(["events"]);
const emit = defineEmits(["update"]);
import axios from "axios";
import ctaModal from "./ctaModal.vue";
import EditEvent from "./admin/EditEvent.vue";
const toast = useToast();
const close = ref(false);
const selectedEvent = ref({});
const editModal = ref(false);
const dLoading = ref(false);
const {$apiClient} = useNuxtApp()

const closeCta = () => {
  close.value = !close.value;
};

const updatePage = () => {
  emit("update");
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", // "short" for abbreviated month
    day: "2-digit",
  });
};

const deleteEvent = async () => {
  try {
    dLoading.value = true;
    const response = await $apiClient.delete(
      `/api/v1/events/delete/${selectedEvent.value._id}`,
      {
        withCredentials: true,
      }
    );

    if (response) {
      dLoading.value = false;
      toast.success("Event Deleted");
      closeCta();
      updatePage();
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else {
      toast.error(e.message);
    }
  }
};
</script>

<style scoped>
@media (max-width:500px) {
  

  .event-box{
  @apply text-xs
  
  }
  .sub{
    @apply text-xs
  }
}



</style>
