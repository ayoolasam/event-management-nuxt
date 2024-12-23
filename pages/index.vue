<template>
  <div class="">
    <section>
      <div class="hero-box h-[450px] w-full">
        <mainNav />
        <div class="text-center mt-12 flex flex-col gap-[20px]">
          <h1 class="text-white hero-header font-bold text-[38px] font-poppins">
            Let There Be Live
          </h1>
          <p class="text-white font-bold text-[20px] herosub font-poppins">
            Your next best Event is Waiting
          </p>
          <div class="flex justify-center relative">
            <input
              @input="handleSearch"
              v-model="keyword"
              class="w-full max-w-sm px-4 rounded-lg h-12 bg-[#ededed] searchBar focus:outline-none placeholder:text-[14px] placeholder:text-gray-500 placeholder:font-medium"
              placeholder="What do you want to see Live?"
            />
            <div
              v-if="dropDown"
              class="absolute overflow-y-auto no-scrollBar cursor-pointer h-[150px] w-[400px] bordesign rounded-lg top-12 bg-white"
            >
              <div
                v-if="sLoading"
                class="flex h-full w-full items-center justify-center"
              >
                <MazSpinner class="" />
              </div>

              <ul v-else class="w-full">
                <li
                  class="text-xs underline flex justify-start px-4 w-full hover:text-red-300 py-4"
                  v-for="(event, index) in searchedEvents"
                  :key="index"
                >
                  {{ event.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-6 px-8">
      <h1 class="font-bold text-xl px-8">Trending</h1>
      <div v-if="loading" class="skeleton w-full h-[300px] mt-4"></div>
      <div v-else class="flex items-center justify-center">
        <div
          class="overflow-x-auto transition-all duration-500 w-[80%] flex mt-4 no-scrollbar"
        >
          <div class="flex gap-4 duration-700 transition-all">
            <div
              v-for="(event, index) in events"
              :key="index"
              class="p-4 flex flex-col gap-[10px] w-[380px] h-[300px] bordesign rounded-md"
            >
              <div class="rounded-md h-[150px]">
                <img
                  :src="event.imageUrl"
                  class="h-full rounded-md w-full"
                  alt=""
                />
              </div>
              <div>
                <p class="text-sm font-bold">{{ event.name }}</p>

                <p class="text-xs">{{ event.description }}</p>
                <span class="text-xs font-bold"> NGN {{ event.price }}</span>
                <p class="text-xs font-bold">
                  Happening On: {{ formatDate(event.date) }}
                </p>
                <p class="text-xs">
                  <i class="ri-map-pin-line"></i> {{ event.location }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="bg-[#1e1e1e] px-12 py-16 flex flex-col gap-[30px]">
      <div class="flex footer-body flex-wrap justify-between">
        <div class="">
          <h1 class="text-[#3c3c3c] text-[18px]">Get in Touch</h1>
          <p class="text-white text-[16px]">Obayomisamuel2403@gmail.com</p>
          <p class="text-white text-[16px]">Obayomisamuel941@gmail.com</p>
        </div>
        <div class="tracking-wide">
          <h1 class="text-[#3c3c3c] text-[18px]">Connect</h1>
          <p class="text-white text-[16px]">LinkedIn</p>
          <p class="text-white text-[16px]">Instagram</p>
          <p class="text-white text-[16px]">Twitter</p>
        </div>
        <div class="">
          <h1 class="text-[#3c3c3c] text-[18px]">Address</h1>
          <p class="text-white text-[16px]">No 3b Michael Shosanya street,</p>
          <p class="text-white text-[16px]">Ikotun,Egbe</p>
          <p class="text-white text-[16px]">Lagos,Nigeria</p>
        </div>
        <div class="">
          <h1 class="text-[#3c3c3c] text-[18px]">Company</h1>
          <p class="text-white text-[16px]">About Us</p>
          <p class="text-white text-[16px]">Our Team</p>
          <p class="text-white text-[16px]">Contact Us</p>
        </div>

        <div class="">
          <h1 class="mb-4">Follow us on</h1>
          <!-- Facebook -->
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener"
            aria-label="Facebook"
          >
            <i
              class="ri-facebook-circle-fill text-2xl hover:text-blue-500 transition-colors"
            ></i>
          </a>
          <!-- Twitter -->
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener"
            aria-label="Twitter"
          >
            <i
              class="ri-twitter-fill text-2xl hover:text-blue-400 transition-colors"
            ></i>
          </a>
          <!-- Instagram -->
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
          >
            <i
              class="ri-instagram-fill text-2xl hover:text-pink-500 transition-colors"
            ></i>
          </a>
          <!-- LinkedIn -->
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
          >
            <i
              class="ri-linkedin-fill text-2xl hover:text-blue-600 transition-colors"
            ></i>
          </a>
        </div>
      </div>
      <div class="mt-8">
        <p class="text-white text-[16px]">
          © 2024 techbysam. All rights reserved.
        </p>
        <p class="text-white text-[16px]">
          Built with ❤️ by
          <a href="#" class="text-blue-400 hover:underline">Obayomi Samuel</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import mainNav from "~/components/mainNav.vue";

import eventList from "~/components/user/eventList.vue";
import { useToast } from "maz-ui";

const toast = useToast();
const events = ref([]);
const loading = ref(true);
const dropDown = ref(false);
const searchedEvents = ref([]);
let searchTimeout = null;
const keyword = ref("");
const sLoading = ref(false);

const { $apiClient } = useNuxtApp();

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", // "short" for abbreviated month
    day: "2-digit",
  });
};

const showDropDown = () => {
  dropDown.value = !dropDown.value;
};

const getEvents = async () => {
  try {
    loading.value = true;
    const response = await $apiClient.get("/api/v1/events", {
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

const handleSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout);
  if (!keyword.value.trim()) {
    searchedEvents.value = [];
    dropDown.value = false;

    return;
  }
  searchTimeout = setTimeout(() => {
    searchEvents();
  }, 500);
};
const searchEvents = async () => {
  try {
    sLoading.value = true;
    const response = await $apiClient.get(
      `/api/v1/events?keyword=${keyword.value}`,
      {
        withCredentials: true,
      }
    );

    if (response) {
      searchedEvents.value = response.data.data.events;

      dropDown.value = true;
      sLoading.value = false;
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      dropDown.value = false;
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

<style scoped>
.hero-box {
  background-image: url("../assets/images/stadium.jpg");
  background-size: cover;
  background-position: center;
}

.animate {
  animation: loop-scroll 20s linear infinite;
}

@keyframes loop-scroll {
  0% {
    transform: translateX(80%);
  }

  100% {
    transform: translateX(-20%);
  }
}
@media (max-width: 900px) {
  .footer-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}

@media (max-width: 500px) {
  .hero-header {
    font-size: 30px;
  }
  .herosub {
    font-size: 14px;
  }
  .searchBar {
    @apply max-w-xs;
  }
}
</style>
