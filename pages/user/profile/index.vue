<template>
  <div class="ctn  fade-in">
    <div class="py-8 bordesign rounded-md gap-8 flex px-4 flex-wrap mt-12">
      <div class="rounded-full h-[120px] w-[120px]">
        <div
          v-if="!userStore.user.imageUrl"
          class="h-full rounded-full bordesign flex items-center justify-center w-full"
        >
          {{ userStore.user.name[0] }}
        </div>
        <img
          v-else
          class="w-full h-full rounded-full object-cover object-center"
          :src="userStore.user.imageUrl"
          alt="profile-picture"
        />
      </div>
      <div class="">
        <p class="font-semibold text-xl">{{ userStore.user.name }}</p>
        <div class="flex gap-8 text-md text-subText text-sm flex-wrap">
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
    <div class="mt-8 flex gap-4">
      <span
        @click="uploadImage = true"
        class="bordesign p-[10px] cursor-pointer rounded-xl text-xs font-semibold"
        >Click to Upload User Avatar <i class="ri-upload-2-line"></i
      ></span>
      <span
        @click="updateProfile = true"
        class="bordesign p-[10px] cursor-pointer rounded-xl text-xs font-semibold"
        >Click to Update User Details <i class="ri-user-fill"></i>
      </span>
    </div>

    <!-- <div class="flex mt-4 filterTabs gap-4 text-">
      <NuxtLink :to="`/admin/profile/user-tickets`">
        <div
          @click="changeSubPage('Tickets')"
          :class="{ 'bg-primary text-white': present === 'Tickets' }"
          class="text-sm rounded-md font-semibold p-[10px] cursor-pointer bg-[#f2f2f2]"
        >
          My Tickets
        </div>
      </NuxtLink>

      <NuxtLink :to="`/admin/profile/user-transactions`">
        <div
          @click="changeSubPage('Transactions')"
          :class="{ 'bg-primary text-white': present === 'Transactions' }"
          class="text-sm rounded-md font-semibold p-[10px] bg-[#f2f2f2]"
        >
          My Transactions
        </div>
      </NuxtLink>
    </div>
    <div class="ctn">
      <NuxtPage> </NuxtPage>
    </div> -->

    <Upload
      v-if="uploadImage"
      @closeModal="uploadImage = false"
      @update="userStore.fetchUserDetails"
    />
    <UpdateUserDetails
      v-if="updateProfile"
      @closeModal="updateProfile = false"
      @update="userStore.fetchUserDetails"
    />
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores";
import Upload from "~/components/Upload.vue";
import UpdateUserDetails from "~/components/UpdateUserDetails.vue";
definePageMeta({
  layout: "user",
});
const present = ref("Tickets");
const changeSubPage = (page) => {
  present.value = page;
};
const userStore = useUserStore();
const uploadImage = ref(false);
const updateProfile = ref(false);

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
