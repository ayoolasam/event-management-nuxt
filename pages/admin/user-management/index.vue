<template>
  <div class="h-full fade-in ctn">
    <h1 class="font-bold text-[25px]">Users</h1>

    <TableLoader v-if="loading" />
    <div v-else class="">
      <div class="overflow-auto bordesign rounded-t-lg no-scrollbar">
        <div class="mt-4 flex justify-between gap-8 h-full w-full p-3">
          <span class="font-medium text-sm sm:text-lg text-tableh"
            >Users Table</span
          >
          <div class="search-bar flex items-center w-[300px]">
            <input
              type="text"
              class="w-[85%] px-[10px] py-[3px] bordesign bg-[#f2f2f2] placeholder:text-xs focus:w-[100%] rounded-md focus:outline-none transition-all duration-500"
              placeholder="Search for Users.."
            />
            <i class="ri-search-line ml-[-25px] text-gray-500"></i>
          </div>
        </div>
        <table class="w-full">
          <thead class="bg-[#f2f2f2]">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Role</th>
              <th>Date Joined</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody v-if="!loading && users.length === 0">
            <tr>
              <td class="text-center" colspan="8">No Users Found</td>
            </tr>
          </tbody>
          <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <td class="text-gray-600 text-md">{{ user.uniqueID }}</td>
              <td class="flex gap-[8px] items-center">
                <span
                  class="h-[40px] w-[40px] flex justify-center items-center uppercase bg-gray-400 rounded-full"
                >
                  {{ user.name[0] }} {{ user.name[5] }}
                </span>
                <div class="">
                  <p class="font-normal">{{ user.name }}</p>
                  <p class="text-[12px] text-gray-600">{{ user.email }}</p>
                </div>
              </td>

              <td class="">
                <span
                  class="badge"
                  :class="{
                    'badge-green': user.status === 'active',

                    'badge-red': user.status === 'inactive',
                  }"
                >
                  {{ user.status }}</span
                >
              </td>

              <td>
                <span class="font-normal text-gray-600">{{ user.role }}</span>
              </td>
              <td>{{ formatDate(user.createdAt) }}</td>
              <!-- <td>{{ user.dateJoined }}</td> -->
              <td class="">
                <i
                  @click.stop="showMore(index)"
                  class="cursor-pointer ri-more-2-fill relative"
                >
                  <div
                    v-if="show && showIndex === index"
                    class="w-[200px] absolute top-[5px] actions-menu right-4 bordesign bg-white text-[16px] shadow-md font-normal rounded-xl"
                  >
                    <NuxtLink :to="`/admin/user-management/${user._id}`">
                      <p
                        class="w-full rounded-tr-lg rounded-tl-lg flex items-center gap-4 px-4 justify-start text-start py-[13px] border-b hover:bg-[#f2f2f2]"
                      >
                        <i class="ri-eye-line"></i>
                        View Details
                      </p>
                    </NuxtLink>
                    <p
                      @click="
                        selectedUser = user;
                        showDeactivate = true;
                      "
                      class="w-full py-[13px] border-b flex items-center gap-4 px-4 justify-start text-center hover:bg-[#f2f2f2]"
                    >
                      <i class="ri-user-line"></i>
                      Deactivate User
                    </p>
                    <p
                      @click="
                        selectedUser = user;
                        showCta = true;
                      "
                      class="w-full py-[13px] flex items-center gap-4 px-4 justify-start text-center hover:bg-[#f2f2f2]"
                    >
                      <i class="ri-delete-bin-line"></i>
                      Delete User
                    </p>
                  </div>
                </i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <ctaModal
      v-if="showCta"
      @closeModal="showCta = false"
      title="User"
      :loading="dLoading"
      @delete="deleteUser"
    />

    <Deactivate
      v-if="showDeactivate"
      @closeModal="showDeactivate = false"
      title="User"
      :loading="dLoading"
      @deactivate="deactivateUser"
    />
  </div>
</template>

<script setup>
import { MazBtn } from "maz-ui/components";
import TableLoader from "~/components/TableLoader.vue";
import Deactivate from "~/components/admin/Deactivate.vue";
import axios from "axios";
import { useToast } from "maz-ui";
const { $apiClient } = useNuxtApp();

definePageMeta({
  layout: "admin",
});
const show = ref(false);
const showIndex = ref("");
const toast = useToast();
const loading = ref(true);

const dLoading = ref(false);
const showCta = ref(false);
const showDeactivate = ref(false);
const selectedUser = ref({});

const showMore = (index) => {
  show.value = !show.value;
  showIndex.value = index;
};
const users = ref([]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", // "short" for abbreviated month
    day: "2-digit",
  });
};

const getUsers = async () => {
  try {
    const response = await $apiClient.get("/api/v1/users/GetUsers", {
      withCredentials: true,
    });

    if (response) {
      users.value = response.data.data.users;
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

const deleteUser = async () => {
  dLoading.value = true;
  try {
    const response = await $apiClient.delete(
      `/api/v1/users/user/${selectedUser.value._id}`,
      {
        withCredentials: true,
      }
    );

    if (response) {
      dLoading.value = false;
      toast.success("User Deleted Successfully");
      showCta.value = false;
      getUsers();
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else {
      toast.error(e.message);
    }
  }
};

const deactivateUser = async () => {
  dLoading.value = true;
  try {
  

    const response = await $apiClient.put(
      `/api/v1/users/admin/deactivateUser/${selectedUser.value._id}`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response) {
      dLoading.value = false;
      toast.success("User Deactivated Successfully");
      showDeactivate.value = false;
      getUsers();
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
  getUsers();

  document.addEventListener("click", (e) => {
    if (!e.target.closest("actions-menu") && show.value) {
      show.value = false;
    }
  });
});
</script>

<style lang="scss" scoped></style>
