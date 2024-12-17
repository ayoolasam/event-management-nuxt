<template>
  <div class="modal-overlay">
    <div
      class="w-[35%] py-4 no-scrollbar overflow-y-auto px-8 modal-content h-[90%] bg-white rounded-md"
    >
      <div
        class="close-icon rounded-full hover:scale-125 cursor-pointer transition-all duration-700 text-center flex justify-center items-center h-[40px] w-[40px] absolute bg-primary top-4 right-4"
        @click="close"
      >
        <i class="ri-close-line text-white"></i>
      </div>
      <div class="mt-12">
        <p class="font-semibold text-[25px]">Ticket Details</p>
        <span>Below are details about this Event</span>
      </div>
      <div class="mt-4">
        <table class="w-full h-full">
          <tr class="">
            <td class="bordesign py-8 text-black text-[15px] font-semibold">
              Ticket ID
            </td>
            <td class="bordesign">{{ ticket.ticketCode }}</td>
          </tr>
          <tr>
            <td class="bordesign py-8 text-[15px] font-semibold">Event</td>
            <td class="bordesig">{{ ticket.event.name }}</td>
          </tr>
          <tr>
            <td class="bordesign py-8 text-[15px] font-semibold">
              Payment Status
            </td>
            <td class="bordesign">
              {{ ticket.isPaid ? "Paid " : "Not Paid" }}
            </td>
          </tr>
          <tr>
            <td class="bordesign py-8 text-[15px] font-semibold">
              Purchased By
            </td>
            <td class="flex items-center gap-[5px]">
              <span
                class="h-[40px] w-[40px] flex justify-center items-center uppercase bg-gray-400 rounded-full"
              >
                {{ ticket.purchasedBy.name[0] }}
                {{ ticket.purchasedBy.username[1] }}
              </span>
              <div class="">
                <p class="font-normal">{{ ticket.purchasedBy.name }}</p>
                <p class="text-[12px] text-gray-600">
                  {{ ticket.purchasedBy.email }}
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td class="bordesign py-8 text-[15px] font-semibold">
              Number Of Tickets
            </td>
            <td>{{ ticket.noOfTickets }}</td>
          </tr>
          <tr>
            <td class="bordesign py-8 text-[15px] font-semibold">Status</td>
            <td>
              <span
                :class="{
                  'badge-green': ticket.isUsed,
                  'badge-orange': !ticket.isUsed,
                }"
                class="badge"
              >
                {{ ticket.isUsed ? "Used" : "Not Used" }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="bordesign py-8 text-[15px] font-semibold">
              Purchased At
            </td>
            <td>{{ formatDate(ticket.purchasedAt) }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "maz-ui";

const emit = defineEmits(["closeModal", "update"]);
const props = defineProps(["ticket"]);
const close = () => {
  emit("closeModal");
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", // "short" for abbreviated month
    day: "2-digit",
  });
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
