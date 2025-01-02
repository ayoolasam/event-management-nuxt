<template>
  <div class="modal-overlay">
    <div
      class="mw-[27%] py-4 no-scrollbar overflow-y-auto flex flex-col px-8 modal-content mh-[35%] bg-white rounded-md"
    >
      <div
        class="close-icon rounded-full hover:scale-125 cursor-pointer transition-all duration-700 text-center flex justify-center items-center h-[40px] w-[40px] absolute bg-primary top-4 right-4"
      >
        <i @click="close" class="ri-close-line text-white"></i>
      </div>
      <div class="mt-12 text-center">
        <p class="font-semibold text-[25px]">Deactivate</p>
        <span>Are you sure you want to deactivate this {{ title }}</span>
      </div>

      <div class="justify-center flex mt-8">
        <button
          @click="emit('deactivate')"
          class="bg-primary h-[40px] text-white rounded-lg w-full flex items-center justify-center px-20"
        >
          <MazSpinner class="h-[40px]" v-if="loading" color="white" />
          <span v-else>Deactivate</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["closeModal", "deactivate"]);
const props = defineProps(["title", "loading"]);

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
