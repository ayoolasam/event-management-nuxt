<template>
  <div class="h-full ctn">
    <h1 class="font-bold text-[25px]">Users</h1>

    <div
      class="mt-4 flex justify-between w-full rounded-tl-lg rounded-tr-lg bg-gray-400 p-3"
    >
      <span class="font-medium text-2xs text-gray-200">Users Table</span>
      <div class="search-bar flex items-center w-[40%]">
        <input
          type="text"
          class="w-[85%] px-[10px] py-[3px] bg-white placeholder:text-xs focus:w-[100%] rounded-md focus:outline-none transition-all duration-500"
          placeholder="Search for Users.."
        />
        <i class="ri-search-line ml-[-25px] text-gray-500"></i>
      </div>
    </div>
    <div class="overflow-auto no-scrollbar">
      <table class="w-full">
        <thead class="bg-gray-300 border-b-2 border-gray-200">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Role</th>
            <th>Date Joined</th>
            <!-- <th>Status</th> -->
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user._id }}</td>
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
            <td>
              <span class="font-normal text-gray-600">{{ user.role }}</span>
            </td>
            <td>{{ user.createdAt }}</td>
            <!-- <td>{{ user.dateJoined }}</td> -->
            <td class="">
              <i
                @click="showMore(index)"
                class="cursor-pointer ri-more-2-fill relative"
              >
                <div
                  v-if="show && showIndex === index"
                  class="w-[100px] absolute top-[5px] bg-white shadow-md font-medium left-4 rounded-lg"
                >
                  <p
                    class="w-full rounded-tr-lg rounded-tl-lg text-center py-[5px] border-b hover:bg-gray-400"
                  >
                    View Details
                  </p>
                  <p
                    class="w-full rounded-br-lg rounded-bl-lg text-center py-[5px] hover:bg-gray-400"
                  >
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
</template>

<script setup>
import { MazBtn } from "maz-ui/components";
import axios from "axios";
import { useToast } from "maz-ui";

definePageMeta({
  layout: "admin",
});
const show = ref(false);
const showIndex = ref("");
const toast = useToast();

const showMore = (index) => {
  show.value = !show.value;
  showIndex.value = index;
};
const users = ref([]);
// const users = ref([
//   {
//     id: 1,
//     name: "John Doe",
//     active: true,
//     dateJoined: "2024-01-01",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     active: false,
//     dateJoined: "2023-12-15",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     active: false,
//     dateJoined: "2023-12-15",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     active: false,
//     dateJoined: "2023-12-15",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     active: false,
//     dateJoined: "2023-12-15",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     active: false,
//     dateJoined: "2023-12-15",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     active: false,
//     dateJoined: "2023-12-15",
//   },

//   {
//     id: 2,
//     name: "Jane Smith",
//     active: false,
//     dateJoined: "2023-12-15",
//   },
//   {
//     id: 3,
//     name: "Samuel Jackson",
//     active: true,
//     dateJoined: "2024-03-10",
//   },
//   {
//     id: 4,
//     name: "Emily Davis",
//     active: false,
//     dateJoined: "2024-02-20",
//   },
//   {
//     id: 5,
//     name: "Michael Johnson",
//     active: true,
//     dateJoined: "2024-03-15",
//   },
// ]);

const getUsers = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/users/GetUsers",
      {
        withCredentials: true,
      }
    );

    if (response) {
      users.value = response.data.data.users;
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
});
</script>

<style lang="scss" scoped></style>
