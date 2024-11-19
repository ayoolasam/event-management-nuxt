<template>
  <div>
    <ClientOnly>
      <apexchart
      :type="props.type"
        :height="props.height"
        width="100%"
        :options="props.chartOptions"
        :series="props.series"
      ></apexchart>
    </ClientOnly>
  </div>
</template>

<script setup>
const props = defineProps({
  chartOptions: Object,
  series: Array,
  run: Boolean,
  height: Number,
  type: String,
});
</script>
