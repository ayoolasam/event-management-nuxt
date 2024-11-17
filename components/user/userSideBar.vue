<template>
  <aside
    class="bg-primary h-full w-[20%] flex flex-col gap-[50px] py-12 rounded-tr-2xl"
  >
    <div class="w-full flex items-center justify-center">
      <img
        class="w-[70px] h-[40px]"
        src="../../assets/images/logo-white.png"
        alt="logo"
      />
    </div>
    <div class="link-section overflow-y-auto no-scrollbar h-[65%]">
      <ul class="">
        <li
          v-for="(item, index) in sideBarLinks"
          :key="index"
          class="text-white flex py-4 items-center px-4 w-full hover:bg-white transition-all hover:text-primary duration-500 ease-in-out"
        >
          <NuxtLink :to="item.to" class="flex gap-[10px]">
            <i :class="item.icon" class="sidebar-icon"></i>
            <span>{{ item.text }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div class="link-section">
      <ul class="">
        <li
          v-for="(item, index) in options"
          :key="index"
          class="text-white flex py-4 items-center px-4 w-full hover:bg-white transition-all hover:text-primary duration-500 ease-in-out"
        >
          <NuxtLink :to="item.to" class="flex gap-[10px]">
            <i :class="item.icon" class="sidebar-icon"></i>
            <span>{{ item.text }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
const sideBarLinks = ref([
  {
    text: "Dashboard",
    icon: "ri-dashboard-fill",
    to: { name: "user-dashboard" },
  },
  {
    text: "Browse Events",
    icon: "ri-book-2-line",
    to: { name: "admin-dashboard" },
  },
  {
    text: "FeedBack and Support",
    icon: "ri-group-line",
    to: { name: "admin-dashboard" },
  },
  {
    text: "Reports and Analytics",
    icon: "ri-file-chart-line",
    to: { name: "admin-dashboard" },
  },
  {
    text: " Profile and Settings",
    icon: "ri-settings-3-line",
    to: { name: "admin-dashboard" },
  },
  {
    text: "Support and FeedBack",
    icon: "ri-feedback-line",
    to: { name: "admin-dashboard" },
  },
  // {
  //   text: "Support and FeedBack",
  //   icon: "ri-dashboard-fill",
  //   to: { name: "admin-dashboard" },
  // },
  // {
  //   text: "Support and FeedBack",
  //   icon: "ri-dashboard-fill",
  //   to: { name: "admin-dashboard" },
  // },
]);

const options = ref([
  {
    text: "Settings",
    icon: "ri-feedback-line",
    to: { name: "admin-dashboard" },
  },
  {
    text: "Log Out",
    icon: "ri-logout-box-line",
    to: { name: "admin-dashboard" },
  },
]);
</script>

<style scoped></style>
