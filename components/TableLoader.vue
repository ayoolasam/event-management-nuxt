<template>
  <div>
<div class="mt-4 flex justify-between w-full rounded-tl-lg bordesign p-3">
      <span class="font-medium text-2xs text-tableh w-[220px] rounded-md h-[30px] skeleton"></span>
      <div class="search-bar flex items-center w-[40%] h-[30px] rounded-md  skeleton">
       
      </div>
    </div>
    <div class="overflow-auto no-scrollbar">
      <table class="w-full">
        <thead class="bg-[#f2f2f2]">
          <tr>
            <th>
              <div class="skeleton w-[50px] h-[20px]"></div>
            </th>
            <th>
              <div class="skeleton w-[100px] h-[20px]"></div>
            </th>
            <th>
              <div class="skeleton w-[130px] h-[20px]"></div>
            </th>
            <th>
              <div class="skeleton w-[120px] h-[20px]"></div>
            </th>
            <th>
              <div class="skeleton w-[160px] h-[20px]"></div>
            </th>

            <th>
              <div class="skeleton w-[100px] h-[20px]"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 4" :key="n">
            <td class="text-gray-600 text-md">
              <div class="skeleton w-[100px] h-[20px]"></div>
            </td>
            <td class="flex gap-[8px] items-center">
              <div class="skeleton w-[200px] h-[20px]"></div>
            </td>

            <td class="">
              <div class="skeleton w-[120px] h-[20px]"></div>
            </td>

            <td>
              <div class="skeleton w-[120px] h-[20px]"></div>
            </td>
            <td>  <div class="skeleton w-[160px] h-[20px]"></div></td>
            <!-- <td>{{ user.dateJoined }}</td> -->
            <td class="">
              <div class="skeleton w-[100px] h-[20px]"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>




  </div>
</template>

<script setup>

</script>

<style  scoped>

</style>