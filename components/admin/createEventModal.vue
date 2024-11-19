<template>
  <div class="modal-overlay">
    <div
      class="w-[30%] py-4 no-scrollbar overflow-y-auto px-8 modal-content h-[90%] bg-white rounded-md"
    >
      <div
        class="close-icon rounded-full hover:scale-125 cursor-pointer transition-all duration-700 text-center flex justify-center items-center h-[40px] w-[40px] absolute bg-primary top-4 right-4"
      >
        <i @click="close" class="ri-close-line text-white"></i>
      </div>
      <div class="mt-12">
        <p class="font-semibold text-[25px]">Create Event</p>
        <span>Fill in the details below to create an Event</span>
      </div>
      <div class="mt-4">
        <div>
          <label class="block">Name</label>
          <input
            class="w-full px-4 py-[4px] mt-[10px] focus:outline-none rounded-md bg-gray-300"
          />
        </div>

        <div class="mt-4">
          <label class="block">Capacity</label>
          <input
            type="number"
            class="w-full px-4 py-[4px] mt-[10px] focus:outline-none rounded-md bg-gray-300"
          />
        </div>
        <div class="mt-4">
          <label class="block">Category</label>
          <select
            class="w-full mt-[10px] border-primary py-[5px] border-[1px] rounded-md"
          >
            <option v-for="(category, index) in categories" :key="index">
              {{ category }}
            </option>
          </select>
        </div>

        <div class="mt-4">
          <label class="block">location</label>
          <input
            class="w-full px-4 py-[4px] mt-[10px] focus:outline-none rounded-md bg-gray-300"
          />
        </div>
        <div class="mt-4">
          <label class="block">Description</label>
          <textarea
            class="w-full px-4 mt-[10px] py-8 focus:outline-none rounded-md bg-gray-300"
          />
        </div>
        <div class="flex justify-center items-center mt-8">
          <button class="px-20 text-white rounded-lg bg-primary py-[10px]">
            Create Event
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["closeModal"]);
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
