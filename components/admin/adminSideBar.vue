<template>
  <aside
    :class="{
      'w-[5%]': collapse,
    }"
    class="bg-primary shadow-sm h-full w-[20%] flex flex-col gap-[50px] relative py-12 rounded-tr-2xl transition-all duration-700"
  >
    <div
      @click="isCollapsed"
      class="absolute shadow-3xl top-8 right-4 bg-white flex items-center justify-center h-[40px] w-[40px] rounded-full hover:scale-125 transition-all duration-300"
    >
      <i
        v-if="!collapse"
        class="ri-arrow-left-double-fill text-[25px] hover:scale-75 transition-all duration-300"
      ></i>
      <i
        v-else
        class="ri-arrow-right-double-line text-[25px] hover:scale-75 transition-all duration-300"
      ></i>
    </div>
    <div
      :class="{
        'mt-12': collapse,
      }"
      class="w-full flex items-center justify-center transition-all duration-200"
    >
      <img
        :class="{
          'w-[36px] h-[24px]': collapse,
        }"
        class="w-[70px] h-[40px]"
        src="../../assets/images/logo-white.png"
        alt="logo"
      />
    </div>
    <div class="link-section overflow-y-auto no-scrollbar h-[65%]">
      <ul class="transition-all duration-500">
        <li
          v-for="(item, index) in sideBarLinks"
          :key="index"
          class="text-white flex py-4 items-center px-4 w-full hover:bg-white transition-all hover:text-primary duration-500 ease-in-out cursor-pointer"
        >
          <NuxtLink :to="item.to" class="flex gap-[10px]">
            <i :class="item.icon" class="sidebar-icon"></i>
            <span
              :class="{
                hidden: collapse,
              }"
              >{{ item.text }}</span
            >
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
            <span
              :class="{
                hidden: collapse,
              }"
              >{{ item.text }}</span
            >
          </NuxtLink>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
const collapse = ref(false);
const isCollapsed = () => {
  collapse.value = !collapse.value;
};

const sideBarLinks = ref([
  {
    text: "Dashboard",
    icon: "ri-dashboard-fill",
    to: { name: "admin-dashboard" },
  },
  {
    text: "Event Management",
    icon: "ri-book-2-line",
    to: { name: "admin-event-management" },
  },
  {
    text: "User Management",
    icon: "ri-group-line",
    to: { name: "admin-user-management" },
  },
  {
    text: "Reports and Analytics",
    icon: "ri-file-chart-line",
    to: { name: "admin-dashboard" },
  },
  {
    text: "Settings",
    icon: "ri-settings-3-line",
    to: { name: "admin-dashboard" },
  },
  {
    text: "Support and FeedBack",
    icon: "ri-feedback-line",
    to: { name: "admin-dashboard" },
  },
  // {
]);

const options = ref([
  {
    text: "Profile",
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

<style scoped>

</style>
