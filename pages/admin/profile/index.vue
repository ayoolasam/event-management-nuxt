<template>
  <div class="ctn">
    <div class="py-8 bordesign rounded-md gap-8 flex px-4 flex-wrap mt-12">
      <div class="rounded-full h-[120px] w-[120px]">
        <img
          class="w-full h-full rounded-full object-cover object-center"
          :src="userStore.user.imageUrl"
          alt="profile-picture"
        />
      </div>
      <div class="">
        <p class="font-semibold text-xl">{{ userStore.user.name }}</p>
        <div class="flex gap-8 text-md text-subText text-sm">
          <span> <i class="ri-mail-line"></i> {{ userStore.user.email }}</span>
          <span> <i class="ri-phone-line"></i> 09078329726</span>
        </div>
        <div class="flex gap-[5px] text-subText text-sm">
          <label>Date Created:</label>
          <span>{{ formatDate(userStore.user.createdAt) }}</span>
        </div>
        <div class="flex gap-[5px] text-subText text-sm">
          <label>Role:</label>
          <span>{{ userStore.user.role }}</span>
        </div>
      </div>
    </div>
    <div class="mt-8">
      <span
        @click="uploadImage = true"
        class="bordesign p-[10px] cursor-pointer rounded-xl text-xs font-semibold"
        >Click to Upload User Avatar <i class="ri-upload-2-line"></i
      ></span>
    </div>

    <Upload
      v-if="uploadImage"
      @closeModal="uploadImage = false"
      @update="userStore.fetchUserDetails"
    />
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores";
import Upload from "~/components/Upload.vue";
definePageMeta({
  layout: "admin",
});

const userStore = useUserStore();
const uploadImage = ref(false);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", // "short" for abbreviated month
    day: "2-digit",
  });
};
</script>

<style scoped></style>
w
