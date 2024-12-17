<template>
  <div class="modal-overlay">
    <div
      class="w-full max-w-sm py-4 no-scrollbar overflow-y-auto px-8 modal-content h-[90%] bg-white rounded-md"
    >
      <div
        class="close-icon rounded-full hover:scale-125 cursor-pointer transition-all duration-700 text-center flex justify-center items-center h-[40px] w-[40px] absolute bg-primary top-4 right-4"
        @click="close"
      >
        <i class="ri-close-line text-white"></i>
      </div>
      <div class="mt-12">
        <p class="font-semibold text-[25px]">Pay For This Event</p>
        <span
          >Fill in the details below to Pay for A Ticket for this Event</span
        >
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
          <label class="block">No Of Tickets</label>
          <input
            type="number"
            @input="calculatePrice(event.price, number)"
            class="inputDesign"
            v-model="number"
          />
        </div>

        <div class="mt-4">
          <label class="block">Amount(NGN)</label>
          <input type="number" class="inputDesign" v-model="amountToBePaid" />
        </div>

        <div class="flex justify-center items-center mt-8 h-[50px]">
          <button
            class="px-20 h-full cursor-pointer text-white rounded-lg w-full flex items-center focus:outline-none justify-center bg-primary"
            @click="buyTicket"
            :disabled="!number"
          >
            <MazSpinner class="h-[40px]" v-if="loading" color="white" />
            <span v-else>Buy Ticket</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "maz-ui";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
const emit = defineEmits(["closeModal", "update"]);
const props = defineProps(["event"]);
const route = useRoute();
const toast = useToast();
const name = ref(props.event.name);
const number = ref(null);
const capacity = ref(null);
const paymentLink = ref("");
const price = ref(null);
const location = ref("");
const loading = ref(false);

const amountToBePaid = ref("");

const { $apiClient } = useNuxtApp();
const router = useRouter();

const close = () => {
  emit("closeModal");
};

const updatePage = () => {
  emit("update");
};

const buyTicket = async () => {
  loading.value = true;
  try {
    const response = await $apiClient.post(
      "/api/v1/tickets/ticket",
      {
        eventId: route.params.id,
        price: amountToBePaid.value,
        noOfTickets: number.value,
      },
      {
        withCredentials: true,
      }
    );

    if (response) {
      toast.success("Ticket Booked Successfully Now Navigating to Payment");
      paymentLink.value = response.data.data.paymentLink.data.authorization_url;
      window.location.href = paymentLink.value;
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

const calculatePrice = (price, ticketNo) => {
  const amount = price * ticketNo;

  amountToBePaid.value = amount;
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
