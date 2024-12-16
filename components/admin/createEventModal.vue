<template>
  <div class="modal-overlay">
    <div
      class="w-[30%] py-4 no-scrollbar overflow-y-auto px-8 modal-content h-[90%] bg-white rounded-md"
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
            class="w-full bg-[#f2f2f2] h-12 px-4 mt-[10px] focus:outline-none rounded-md bordesign text-sm"
            v-model="name"
          />
        </div>
        <div class="mt-4">
          <label class="block">Date</label>
          <input type="date" class="inputDesign" v-model="date" />
        </div>

        <div class="mt-4">
          <label class="block">Capacity</label>
          <input type="number" class="inputDesign" v-model="capacity" />
        </div>
        <div class="mt-4">
          <label class="block">Category</label>
          <select class="inputDesign" v-model="category">
            <option v-for="(category, index) in categories" :key="index">
              {{ category }}
            </option>
          </select>
        </div>

        <div class="mt-4">
          <label class="block">location</label>
          <input class="inputDesign" v-model="location" />
        </div>

        <div class="mt-4">
          <label class="block">Price</label>
          <input type="text" class="inputDesign" v-model="price" />
        </div>

        <div class="mt-4">
          <label class="block mb-4">Select Image</label>
          <div
            class="bordesign cursor-pointer rounded-lg h-12 flex items-center relative justify-center bg-[#f2f2f2]"
          >
            <input
              class="w-full opacity-0 absolute"
              type="file"
              single
              @change="selectFiles"
            />
            <span>Select Image</span>
          </div>
        </div>

        <div
          v-if="previewImage"
          class="mt-4 cursor-pointer relative flex-col bg-[#f2f2f2] items-center flex justify-center w-[100px] h-[100px] rounded-lg"
        >
          <img
            :src="previewImage"
            class="h-full w-full object-cover rounded-lg"
            alt="image"
          />
          <span
            @click="deleteImage"
            class="p-[2px] rounded-full h-[20px] w-[20px] border-[1px] border-red-400 flex items-center justify-center absolute top-[5px] right-[8px]"
          >
            <i class="ri-close-line text-red-400"></i
          ></span>
        </div>

        <div class="mt-4">
          <label class="block">Description</label>
          <textarea
            class="w-full px-4 bg-[#f2f2f2] mt-[10px] py-8 focus:outline-none rounded-md bordesign text-sm"
            v-model="description"
          />
        </div>

        <div class="flex justify-center items-center mt-8 h-[50px]">
          <button
            class="px-20 h-full text-white rounded-lg w-full flex items-center focus:outline-none justify-center bg-primary"
            @click="uploadImage"
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
const selectedFile = ref("");
const previewImage = ref(null);
const userImage = ref("");
const { $apiClient } = useNuxtApp();

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

const selectFiles = (e) => {
  let file = e.target.files[0];

  if (!file) return;

  selectedFile.value = file;
  previewImage.value = URL.createObjectURL(file);
};

const updatePage = () => {
  emit("update");
};

const uploadImage = async () => {
  loading.value = true;

  if (!selectedFile) {
    toast.error("No Image Selected");
  }

  const formData = new FormData();
  formData.append("image", selectedFile.value);
  try {
    const response = await $apiClient.post(
      "/api/v1/upload/file",
      formData,

      {
        withCredentials: true,
      }
    );

    if (response) {
      userImage.value = response.data.imageUrl;
      createEvent();
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else console.log(e.message);
    toast.error(e.message);
  }
};

const deleteImage = () => {
  selectedFile.value = "";
  previewImage.value = null;
};

const createEvent = async () => {
  loading.value = true;
  try {
    const response = await $apiClient.post(
      "/api/v1/events/create",
      {
        name: name.value,
        date: date.value,
        capacity: capacity.value,
        category: category.value,
        location: location.value,
        price: price.value,
        description: description.value,
        imageUrl: userImage.value,
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
