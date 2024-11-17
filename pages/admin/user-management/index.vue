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
    <div class="overflow-auto">
      <table class="w-full">
        <thead class="bg-gray-300 border-b-2 border-gray-200">
          <tr>
            <th>S/No</th>
            <th>Name</th>
            <th>Status</th>
            <th>Date Joined</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>
              <span class="badge badge-green">{{ user.active }}</span>
            </td>
            <td>{{ user.dateJoined }}</td>
            <td>{{ user.dateJoined }}</td>
            <td>
              <i class="ri-more-2-fill"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { MazBtn } from "maz-ui/components";
const users = ref([
  {
    id: 1,
    name: "John Doe",
    active: true,
    dateJoined: "2024-01-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    active: false,
    dateJoined: "2023-12-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    active: false,
    dateJoined: "2023-12-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    active: false,
    dateJoined: "2023-12-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    active: false,
    dateJoined: "2023-12-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    active: false,
    dateJoined: "2023-12-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    active: false,
    dateJoined: "2023-12-15",
  },

  {
    id: 2,
    name: "Jane Smith",
    active: false,
    dateJoined: "2023-12-15",
  },
  {
    id: 3,
    name: "Samuel Jackson",
    active: true,
    dateJoined: "2024-03-10",
  },
  {
    id: 4,
    name: "Emily Davis",
    active: false,
    dateJoined: "2024-02-20",
  },
  {
    id: 5,
    name: "Michael Johnson",
    active: true,
    dateJoined: "2024-03-15",
  },
]);

definePageMeta({
  layout: "admin",
});
</script>

<style lang="scss" scoped></style>
