<template>
  <div class="flex flex-col gap-8">
    <div
      v-for="(event, index) in events"
      :key="index"
      class="bordesign w-full p-4 rounded-lg relative"
    >
      <div class="flex flex-col gap-4">
        <div class="w-full h-[180px]">
          <img
            class="h-full w-full object-cover object-center rounded-lg"
            :src="event.imageUrl"
            alt="image"
          />
        </div>
        <NuxtLink :to="`/user/event-management/${event._id}`">
          <p class="font-semibold underline cursor-pointer">{{ event.name }}</p>
        </NuxtLink>

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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "maz-ui";
const props = defineProps(["events"]);

const toast = useToast();

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", // "short" for abbreviated month
    day: "2-digit",
  });
};
</script>

<style lang="scss" scoped></style>
