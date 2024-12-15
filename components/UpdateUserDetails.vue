<template>
  <div class="modal-overlay">
    <div
      class="w-[40%] py-4 no-scrollbar overflow-y-auto px-8 modal-content h-[80%] bg-white rounded-md"
    >
      <div
        class="close-icon rounded-full hover:scale-125 cursor-pointer transition-all duration-700 text-center flex justify-center items-center h-[40px] w-[40px] absolute bg-primary top-4 right-4"
        @click="close"
      >
        <i class="ri-close-line text-white"></i>
      </div>
      <div class="mt-12">
        <p class="font-semibold text-[25px]">Update My Profile</p>
        <span>Fill in the details below to Update your Profile</span>
      </div>
      <div class="mt-4">
        <div>
          <label class="block mb-4">Name</label>

          <input
            class="w-full cursor-pointer focus:outline-none px-4 h-12 bg-[#f2f2f2] rounded-lg bordesign"
            type="text"
            placeholder="Fill in New Name"
            v-model="name"
          />
        </div>
        <div class="mt-4">
          <label class="block mb-4"> Email</label>

          <input
            class="w-full cursor-pointer focus:outline-none px-4 h-12 bg-[#f2f2f2] rounded-lg bordesign"
            type="text"
            placeholder="Fill in New Email"
            v-model="email"
          />
        </div>

        <div class="flex justify-center items-center mt-8 h-[50px]">
          <button
            class="px-20 h-full text-white rounded-lg w-full flex items-center focus:outline-none justify-center bg-primary"
            @click="updateProfileDetails"
          >
            <MazSpinner class="h-[40px]" v-if="loading" color="white" />
            <span v-else>Upload my Details</span>
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
const email = ref("");
const loading = ref(false);

const close = () => {
  emit("closeModal");
};

const updatePage = () => {
  emit("update");
};

const updateProfileDetails = async () => {
  try {
    loading.value = true;
    let payload = {};
    if (name.value) {
      payload.name = name.value;
    }

    if (email.value) {
      payload.email = email.value;
      loading.value = false
    }

    const response = await axios.post(
      "http://localhost:5000/api/v1/users/user/Update",
      payload,
      {
        withCredentials: true,
      }
    );

    if (response) {
      toast.success("User Details successfully Uploaded");
      loading.value = false;

      close();
      updatePage();
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else {
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
