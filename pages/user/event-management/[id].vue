<template>
  <div class="ctn fade-in">
  
    <NuxtLink :to="`/user/event-management`">
      <div class="flex items-center gap-[10px] mb-8">
        <div
          class="w-[40px] flex items-center justify-center cursor-pointer h-[40px] bg-[#f2f2f2] rounded-full bordesign"
        >
          <i class="ri-arrow-left-s-line"></i>
        </div>
        <span class="font-semibold text-sm text-primary">event-management</span>
      </div>
    </NuxtLink>
    <button
      @click="payTicket = true"
      class="bg-primary px-4 rounded-md py-[10px] mb-8 text-white text-sm"
    >
      Buy A ticket For This Event
    </button>

    <div v-if="loading" class="bordesign w-full p-4 rounded-lg">
      <div class="flex flex-col gap-4">
        <div class="w-full skeleton h-[400px]"></div>

        <p class="w-[200px] h-[30px] skeleton"></p>

        <div class="w-full skeleton h-[55px]"></div>
      </div>
    </div>

    <div v-else class="bordesign w-full p-4 rounded-lg relative">
      <div class="flex flex-col gap-4">
        <div class="w-full h-[400px]">
          <img
            class="h-full w-full object-cover object-center rounded-lg"
            :src="event.imageUrl"
            alt="image"
          />
        </div>

        <p class="font-semibold">{{ event.name }}</p>

        <div class="text-subText text-sm">
          <p>
            {{ event.description }}
          </p>
        </div>
        <div class="text-subText flex flex-wrap gap-8 text-sm">
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
          <div class="flex gap-[5px]">
            <label>Price: </label>

            <p class="text-black font-semibold">{{ event.price }}</p>
          </div>
          <div class="flex gap-[5px]">
            <label>Category: </label>

            <p class="text-black font-semibold">{{ event.category }}</p>
          </div>
        </div>
      </div>
    </div>
    <PayForATicket
      v-if="payTicket"
      :event="event"
      @closeModal="payTicket = false"
    />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useToast } from "maz-ui";
import PayForATicket from "~/components/user/PayForATicket.vue";
import axios from "axios";
definePageMeta({
  layout: "user",
});

const route = useRoute();

const toast = useToast();
const event = ref({});
const loading = ref(true);
const { $apiClient } = useNuxtApp();

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", // "short" for abbreviated month
    day: "2-digit",
  });
};

const payTicket = ref(false);

const fetchEvent = async () => {
  try {
    loading.value = true;
    const response = await $apiClient.get(`/api/v1/events/${route.params.id}`, {
      withCredentials: true,
    });

    if (response) {
      event.value = response.data.data.event;
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
  fetchEvent();
});
</script>

<style scoped></style>
