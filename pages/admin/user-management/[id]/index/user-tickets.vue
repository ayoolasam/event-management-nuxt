<template>
  <div>
    <TableLoader v-if="loading" />
    <div v-else class="">
      
      <div class="overflow-x-auto no-scrollbar rounded-t-lg bordesign">
        <div class="mt-4 flex justify-between gap-8 w-full h-full  p-3">
        <span class="font-medium text-2xs text-tableh">Tickets Table</span>
        <div class="search-bar flex items-center w-[500px]">
          <input
            type="text"
            class="w-[85%] px-[10px] py-[3px] bordesign bg-[#f2f2f2] placeholder:text-xs focus:w-[100%] rounded-md focus:outline-none transition-all duration-500"
            placeholder="Search for Tickets.."
          />
          <i class="ri-search-line ml-[-25px] text-gray-500"></i>
        </div>
      </div>
        <table class="w-full">
          <thead class="bg-[#f2f2f2]">
            <tr>
              <th>Ticket Code</th>
              <th>Event</th>
              <th>Purchased By</th>
              <th>Paid</th>
              <th>Status</th>
              <th class="whitespace-nowrap">No of Tickets</th>

              <th>Purchased On</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ticket, index) in tickets" :key="index">
              <td class="text-gray-600 text-md capitalize">
                {{ ticket.ticketCode }}
              </td>
              <td class="text-gray-600 text-md">{{ ticket.event.name }}</td>
              <td class="flex gap-[8px] text-left items-center">
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
              <td class="text-gray-600 text-md whitespace-nowrap">
                {{ ticket.isPaid ? "Paid" : "Not Paid" }}
              </td>

              <td class="text-center whitespace-nowrap">
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

              <td class="text-center">
                <span class="font-normal text-gray-600">{{
                  ticket.noOfTickets
                }}</span>
              </td>
              <td class="whitespace-nowrap">
                {{ formatDate(ticket.purchasedAt) }}
              </td>
              <!-- <td>{{ user.dateJoined }}</td> -->
              <td class="">
                <i
                  @click.stop="showMore(index)"
                  class="cursor-pointer ri-more-2-fill relative"
                >
                  <div
                    v-if="show && showIndex === index"
                    class="w-[200px] absolute top-[5px] actions-menu right-4 bordesign bg-white text-[16px] shadow-md font-normal rounded-xl"
                  >
                    <p
                      class="w-full rounded-tr-lg rounded-tl-lg flex gap-4 justify-center text-center py-[13px] border-b hover:bg-[#f2f2f2]"
                      @click="
                        ticketDetails = true;
                        selectedTicket = ticket;
                      "
                    >
                      <i class="ri-eye-line"></i>
                      View Ticket Details
                    </p>

                    <p
                      class="w-full py-[13px] rounded-br-lg rounded-bl-lg text-center flex gap-4 justify-center hover:bg-[#f2f2f2]"
                    >
                      <i class="ri-delete-bin-line"></i>
                      Delete Ticket
                    </p>
                  </div>
                </i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import TableLoader from "~/components/TableLoader.vue";
import TicketDetailsModal from "~/components/admin/TicketDetailsModal.vue";
import axios from "axios";
import { useToast } from "maz-ui";
import { useRoute } from "vue-router";

definePageMeta({
  layout: "admin",
});
const show = ref(false);
const showIndex = ref("");
const selectedTicket = ref({});
const toast = useToast();
const loading = ref(true);
const tickets = ref([]);
const ticketDetails = ref(false);
const route = useRoute();
const { $apiClient } = useNuxtApp();

const showMore = (index) => {
  show.value = !show.value;
  showIndex.value = index;
};
const users = ref([]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", // "short" for abbreviated month
    day: "2-digit",
  });
};

const getUserTickets = async () => {
  try {
    const response = await $apiClient.get(
      `/api/v1/users/tickets/user/${route.params.id}`,
      {
        withCredentials: true,
      }
    );

    if (response) {
      tickets.value = response.data.data.userTickets;
      loading.value = false;
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
  getUserTickets();

  document.addEventListener("click", (e) => {
    if (!e.target.closest("actions-menu") && show.value) {
      show.value = false;
    }
  });
});
</script>

<style lang="scss" scoped></style>
