<template>
  <div class="modal-overlay">
    <div
      class="w-full max-w-md py-4 no-scrollbar overflow-y-auto px-8 modal-content mh-[60%] bg-white rounded-md"
    >
      <div
        class="close-icon rounded-full hover:scale-125 cursor-pointer transition-all duration-700 text-center flex justify-center items-center h-[40px] w-[40px] absolute bg-primary top-4 right-4"
        @click="close"
      >
        <i class="ri-close-line text-white"></i>
      </div>
      <div class="mt-12">
        <p class="font-semibold text-[25px]">Upload Image</p>
        <span>Fill in the details below to Upload an Image</span>
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

        <div class="flex justify-center items-center mt-8 h-[50px]">
          <button
            class="px-20 h-full text-white rounded-lg w-full flex items-center focus:outline-none justify-center bg-primary"
            @click="uploadImage"
            :disabled="!selectedFile"
          >
            <MazSpinner class="h-[40px]" v-if="loading" color="white" />
            <span v-else>Upload Image</span>
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
const selectedFile = ref("");
const previewImage = ref(null);
const userImage = ref("");
const loading = ref(false);
const {$apiClient} = useNuxtApp()

const close = () => {
  emit("closeModal");
  selectedFile.value = "";
  previewImage.value = null;
};

const updatePage = () => {
  emit("update");
};

const selectFiles = (e) => {
  let file = e.target.files[0];

  if (!file) return;

  selectedFile.value = file;
  previewImage.value = URL.createObjectURL(file);
};

const deleteImage = () => {
  selectedFile.value = "";
  previewImage.value = null;
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
      sendImage();
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else console.log(e.message);
    toast.error(e.message);
  }
};

const sendImage = async () => {
  try {
    const response = await $apiClient.post(
      "/api/v1/users/user/Avatar",
      {
        imageUrl: userImage.value,
      },
      {
        withCredentials: true,
      }
    );

    if (response) {
      toast.success("User Image successfully Uploaded");
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
