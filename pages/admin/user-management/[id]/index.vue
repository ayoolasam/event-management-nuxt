<template>
  <div class="ctn fade-in">
    <NuxtLink :to="`/admin/user-management`">
      <div class="flex items-center gap-[10px] mb-8">
        <div
          class="w-[40px] flex items-center justify-center cursor-pointer h-[40px] bg-[#f2f2f2] rounded-full bordesign"
        >
          <i class="ri-arrow-left-s-line"></i>
        </div>
        <span class="font-semibold text-sm text-primary">user-management</span>
      </div>
    </NuxtLink>

    <div
      v-if="loading"
      class="h-[160px] bordesign rounded-md gap-8 py-4 px-4 flex items-center mb-8 flex-wrap mt-8"
    >
      <div class="skeleton h-[120px] w-[120px] skeleton rounded-full"></div>
      <div class="class flex flex-col gap-4">
        <div class="skeleton w-[70px] h-[20px]"></div>
        <div class="skeleton w-[270px] h-[40px]"></div>
      </div>
    </div>

    <div
      v-else
      class="py-8 bordesign rounded-md gap-8 flex px-4 flex-wrap mt-12"
    >
      <div
        v-if="!user?.imageUrl"
        class="h-[120px] rounded-full flex items-center gap-[5px] justify-center w-[120px] bg-[#f2f2f2]"
      >
        <span class="font-bold text-xl">
          {{ user && user.name ? user.name[0] : "" }}
        </span>
        <span class="font-bold text-xl">
          {{ user && user.name ? user.name[0] : "" }}</span
        >
      </div>

      <div v-else class="rounded-full h-[120px] w-[120px]">
        <img
          class="h-full w-full rounded-full object-cover object-center"
          :src="user?.imageUrl"
          alt="profile-picture"
        />
      </div>
      <div class="">
        <p class="font-semibold text-xl">{{ user.name }}</p>
        <div class="flex flex-wrap gap-8 text-md text-subText text-sm">
          <span> <i class="ri-mail-line"></i> {{ user.email }}</span>
          <span> <i class="ri-phone-line"></i> 09078329726</span>
        </div>
        <div class="flex gap-[5px] text-subText text-sm">
          <label>Date Created:</label>
          <span>{{ formatDate(user.createdAt) }}</span>
        </div>
        <div class="flex gap-[5px] text-subText text-sm">
          <label>Role:</label>
          <span>{{ user.role }}</span>
        </div>
        <div class="flex gap-[5px] items-center text-subText text-sm">
          <label>Status:</label>
          <span
            class="badge text-[10px]"
            :class="{
              'badge-green': user.status === 'active',
              'badge-red': user.status === 'inactive',
            }"
            >{{ user.status }}</span
          >
        </div>
      </div>
    </div>

    <div v-if="!loading" class="flex mt-8 filterTabs gap-4">
      <NuxtLink :to="`/admin/user-management/${user._id}/user-tickets`">
        <div
          @click="changeSubPage('Tickets')"
          :class="{ 'bg-primary text-white': present === 'Tickets' }"
          class="text-sm rounded-md font-semibold p-[10px] cursor-pointer bg-[#f2f2f2]"
        >
          Tickets
        </div>
      </NuxtLink>

      <NuxtLink :to="`/admin/user-management/${user._id}/user-transactions`">
        <div
          @click="changeSubPage('Transactions')"
          :class="{ 'bg-primary text-white': present === 'Transactions' }"
          class="text-sm rounded-md font-semibold p-[10px] bg-[#f2f2f2]"
        >
          Transactions
        </div>
      </NuxtLink>
    </div>
    <div class="ctn mt-4">
      <NuxtPage> </NuxtPage>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import axios from "axios";
const route = useRoute();
const id = route.params.id;
const loading = ref(false);
const user = ref({});
const present = ref("Tickets");
const { $apiClient } = useNuxtApp();
const changeSubPage = (page) => {
  present.value = page;
};

definePageMeta({
  layout: "admin",
});

const getUser = async () => {
  loading.value = true;
  try {
    const response = await $apiClient.get(`/api/v1/users/user/${id}`, {
      withCredentials: true,
    });

    if (response) {
      user.value = response.data.data.user;
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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", // "short" for abbreviated month
    day: "2-digit",
  });
};

onMounted(() => {
  getUser();
});
</script>

<style scoped></style>
