<template>
  <div class="h-full ctn">
    <h1 class="font-bold text-[25px]">My Transactions</h1>

    <TableLoader v-if="loading" />
    <div v-else class="">
      <div class="mt-4 flex justify-between w-full rounded-tl-lg bordesign p-3">
        <span class="font-medium text-2xs text-tableh">Transactions Table</span>
        <div class="search-bar flex items-center w-[40%]">
          <input
            type="text"
            class="w-[85%] px-[10px] py-[3px] bordesign bg-[#f2f2f2] placeholder:text-xs focus:w-[100%] rounded-md focus:outline-none transition-all duration-500"
            placeholder="Search for Transactions.."
          />
          <i class="ri-search-line ml-[-25px] text-gray-500"></i>
        </div>
      </div>
      <div class="overflow-auto no-scrollbar">
        <table class="w-full">
          <thead class="bg-[#f2f2f2]">
            <tr>
              <th>reference</th>
              <!-- <th>Event</th> -->
              <th>User</th>

              <th>Status</th>
              <th>Amount</th>
              <th>Date Created</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(transaction, index) in transactions" :key="index">
              <td class="text-gray-600 text-md">{{ transaction.reference }}</td>

              <td class="flex gap-[8px] items-center">
                <span
                  class="h-[40px] w-[40px] flex justify-center items-center uppercase bg-gray-400 rounded-full"
                >
                  {{ transaction?.paidBy?.name[0] }}
                  {{ transaction?.paidBy?.name[5] }}
                </span>
                <div class="">
                  <p class="font-normal">{{ transaction?.paidBy?.name }}</p>
                  <p class="text-[12px] text-gray-600">
                    {{ transaction.email }}
                  </p>
                </div>
              </td>

              <td class="text-left">
                <span
                  class="badge"
                  :class="{
                    'badge-green': transaction.status === 'success',
                    'badge-orange': transaction.status === 'pending',
                    'badge-red': transaction.status === 'failed',
                  }"
                >
                  {{ transaction.status }}</span
                >
              </td>

              <td>
                <span class="font-normal text-gray-600">{{
                  transaction.amount
                }}</span>
              </td>
              <td>{{ formatDate(transaction.transactionDate) }}</td>

              <td class="">
                <i
                  @click.stop="showMore(index)"
                  class="cursor-pointer ri-more-2-fill relative"
                >
                  <div
                    v-if="show && showIndex === index"
                    class="w-[201px] absolute top-[5px] actions-menu right-4 bordesign bg-white text-[16px] shadow-md font-normal rounded-xl"
                  >
                    <p
                      class="w-full rounded-tr-lg rounded-tl-lg flex justify-center gap-4 text-center py-[13px] border-b hover:bg-[#f2f2f2]"
                      @click="
                        showDetails = true;
                        selectedTransaction = transaction;
                      "
                    >
                      <i class="ri-eye-line"></i>
                      View Details
                    </p>

                    <p
                      class="w-full py-[13px] rounded-br-lg rounded-bl-lg gap-[10px] text-center flex justify-center hover:bg-[#f2f2f2]"
                    >
                      <i class="ri-delete-bin-line"></i>
                      Delete Transaction
                    </p>
                  </div>
                </i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <TransactionDetails
      v-if="showDetails"
      :transaction="selectedTransaction"
      @closeModal="toggleDetails"
    />
  </div>
</template>

<script setup>
import TableLoader from "~/components/TableLoader.vue";

import { useToast } from "maz-ui";
import TransactionDetails from "~/components/admin/TransactionDetails.vue";
const { $apiClient } = useNuxtApp();

definePageMeta({
  layout: "user",
});
const show = ref(false);
const showDetails = ref(false);
const showIndex = ref("");
const toast = useToast();
const loading = ref(true);
const selectedTransaction = ref({});

const showMore = (index) => {
  show.value = !show.value;
  showIndex.value = index;
};

const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};
const transactions = ref([]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", // "short" for abbreviated month
    day: "2-digit",
  });
};

const getTransactions = async () => {
  try {
    const response = await $apiClient.get("/api/v1/users/user/myTransactions", {
      withCredentials: true,
    });

    if (response) {
      transactions.value = response.data.data.myTransactions;
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
  getTransactions();

  document.addEventListener("click", (e) => {
    if (!e.target.closest("actions-menu") && show.value) {
      show.value = false;
    }
  });
});
</script>

<style lang="scss" scoped></style>
