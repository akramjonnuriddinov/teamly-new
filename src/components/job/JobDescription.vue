<template>
  <section class="pt-[115px] pb-[45px] relative z-10 mb-[100px]">
    <div class="container relative w-full px-5 mx-auto max-w-7xl">
      <h2 class="text-xl font-semibold text-[#1C1C37] mb-5">Requirements</h2>
      <ul class="flex flex-col">
        <li
          v-for="requirement in vacancy.description"
          class="flex items-center gap-4 mb-2"
        >
          <img
            width="8"
            height="8"
            src="@/assets/images/circle.svg"
            alt="circle"
          />
          <span class="text-[#5B5A78]">{{ requirement }}</span>
        </li>
      </ul>
      <h2 class="text-xl font-semibold text-[#1C1C37] my-5">Tasks</h2>
      <ul class="flex flex-col">
        <li v-for="task in vacancy.tasks" class="flex items-center gap-4 mb-2">
          <img
            width="8"
            height="8"
            src="@/assets/images/circle.svg"
            alt="circle"
          />
          <span class="text-[#5B5A78]">{{ task }}</span>
        </li>
      </ul>
      <button
        class="bg-tg-primary-color mt-12 text-tg-white rounded-[10px] font-bold inline-block text-center whitespace-nowrap py-[18px] px-[120px] tracking-[0.5px] transition-all duration-300 hover:bg-tg-secondary-color"
        @click="$emit('open')"
      >
        Apply
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps(["vacancy"])
</script>

<style scoped>
.service-item__inner {
  box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.05);
}
</style>
