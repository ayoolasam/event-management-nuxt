<template>
  <aside
    :class="{
      'w-24': collapse,
      'w-64': !collapse,
    }"
    class="bg-primary shadow-sm h-full flex flex-col gap-[50px] relative py-12 transition-all duration-700"
  >
    <div class="arrow">
      <div
        @click="isCollapsed"
        class="absolute arrow-box shadow-3xl top-4 right-4 bg-white flex items-center justify-center h-[35px] w-[35px] rounded-full hover:scale-125 transition-all duration-300"
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
    </div>
    <div
      :class="{
        'mt-12 px-[5px]': collapse,
      }"
      class="w-full flex items-center justify-center transition-all duration-700"
    >
      <img
        :class="{
          'w-[26px] h-[25px]': collapse,
        }"
        class="w-[70px] h-[40px] image-logo"
        src="../../assets/images/logo-white.png"
        alt="logo"
      />
    </div>
    <div class="link-section overflow-y-auto no-scrollbar h-[80%]">
      <ul class="transition-all duration-700">
        <li
          :class="{
            'flex justify-center': collapse,
          }"
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
          :class="{
            'flex justify-center': collapse,
          }"
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
    to: { name: "user-dashboard" },
  },
  {
    text: "Event Management",
    icon: "ri-book-2-line",
    to: { name: "user-event-management" },
  },
  // {
  //   text: "User Managemen",
  //   icon: "ri-group-line",
  //   to: { name: "admin-user-management" },
  // },
  {
    text: "My Tickets",
    icon: "ri-file-chart-line",
    to: { name: "user-ticket-management" },
  },
  {
    text: " My Transactions",
    icon: "ri-settings-3-line",
    to: { name: "user-transactions" },
  },
  {
    text: "Support and FeedBack",
    icon: "ri-feedback-line",
    to: { name: "user-dashboard" },
  },
  // {
]);

const options = ref([
  {
    text: "Profile",
    icon: "ri-feedback-line",
    to: { name: "user-profile" },
  },
  // {
  //   text: "Log Out",
  //   icon: "ri-logout-box-line",
  //   to: { name: "admin-dashboard" },
  // },
]);
</script>

<style scoped>
@media (max-width: 697px) {
aside{
  @apply text-sm
}
}
@media (max-width: 500px) {
aside{
  @apply text-xs
}
}
</style>
