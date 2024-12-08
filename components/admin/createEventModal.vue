<template>
  <div class="modal-overlay">
    <div
      class="w-[30%]  py-4 no-scrollbar overflow-y-auto px-8 modal-content h-[90%] bg-white rounded-md"
    >
      <div
        class="close-icon rounded-full hover:scale-125 cursor-pointer transition-all duration-700 text-center flex justify-center items-center h-[40px] w-[40px] absolute bg-primary top-4 right-4"
        @click="close"
      >
        <i class="ri-close-line text-white"></i>
      </div>
      <div class="mt-12">
        <p class="font-semibold text-[25px]">Create Event</p>
        <span>Fill in the details below to create an Event</span>
      </div>
      <div class="mt-4">
        <div>
          <label class="block">Name</label>
          <input
            class="w-full px-4 py-[7px] mt-[10px] focus:outline-none rounded-md bordesign text-sm"
            v-model="name"
          />
        </div>
        <div class="mt-4">
          <label class="block">Date</label>
          <input
            type="date"
            class="w-full px-4 py-[4px] mt-[10px] focus:outline-none rounded-md bordesign text-sm"
            v-model="date"
          />
        </div>

        <div class="mt-4">
          <label class="block">Capacity</label>
          <input
            type="number"
            class="w-full px-4 py-[4px] mt-[10px] focus:outline-none rounded-md bordesign text-sm"
            v-model="capacity"
          />
        </div>
        <div class="mt-4">
          <label class="block">Category</label>
          <select
            class="w-full mt-[10px] py-[5px] border-[1px] rounded-md bordesign text-sm"
            v-model="category"
          >
            <option v-for="(category, index) in categories" :key="index">
              {{ category }}
            </option>
          </select>
        </div>

        <div class="mt-4">
          <label class="block">location</label>
          <input
            class="w-full px-4 py-[4px] mt-[10px] focus:outline-none rounded-md bordesign text-sm"
            v-model="location"
          />
        </div>

        <div class="mt-4">
          <label class="block">Price</label>
          <input
            type="text"
            class="w-full px-4 py-[4px] mt-[10px] focus:outline-none rounded-md bordesign text-sm"
            v-model="price"
          />
        </div>
        <div class="mt-4">
          <label class="block">Description</label>
          <textarea
            class="w-full px-4 mt-[10px] py-8 focus:outline-none rounded-md bordesign text-sm"
            v-model="description"
          />
        </div>
        <div class="flex justify-center items-center mt-8 h-[50px]">
          <button
            class="px-20 h-full text-white rounded-lg w-full flex items-center focus:outline-none justify-center bg-primary "
            @click="createEvent"
            :disabled="!name || !description || !category"
          >
            <MazSpinner class="h-[40px]" v-if="loading" color="white" />
            <span v-else>Create Event</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "maz-ui";
import axios from "axios";
const emit = defineEmits(["closeModal", "update"]);
const toast = useToast();
const name = ref("");
const date = ref("");
const capacity = ref(null);
const price = ref(null);
const location = ref("");
const loading = ref(false);
const category = ref("");
const description = ref("");
const categories = ref([
  "conference",
  "webinar",
  "workshop",
  "seminar",
  "meetup",
  "networking",
  "hackathon",
  "training",
  "fundraiser",
  "party",
  "concert",
  "exhibition",
  "festival",
  "charity",
  "sport",
  "launch",
  "award",
  "panel",
  "roundtable",
  "retreat",
  "community",
]);

const close = () => {
  emit("closeModal");
};

const updatePage = () => {
  emit("update");
};

const createEvent = async () => {
  loading.value = true;
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/events/create",
      {
        name: name.value,
        date: date.value,
        capacity: capacity.value,
        category: category.value,
        location: location.value,
        price: price.value,
        description: description.value,
      },
      {
        withCredentials: true,
      }
    );

    if (response) {
      toast.success("Event Created");
      loading.value = false;

      close();
      updatePage();
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else {
      console.log(e.message);
      toast.error(e.message);
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;
}

label {
  font-weight: 500;
  font-size: 17px;
}
</style>
