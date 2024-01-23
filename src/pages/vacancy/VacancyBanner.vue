<template>
  <section>
    <div
      class="container relative mx-auto max-w-7xl px-5 max-xl:max-w-[990px] max-[990px]:max-w-3xl max-[800px]:max-w-2xl max-[680px]:max-w-xl"
    >
      <div
        class="relative flex w-full flex-col items-center pt-[216px] max-[990px]:flex max-[990px]:flex-col max-[990px]:items-center max-[990px]:justify-center max-sm:pt-[100px]"
      >
        <h1 class="mb-4 text-center text-[70px] font-extrabold leading-[1.2] text-tg-dark-blue-color max-sm:text-4xl">
          We are hiring!
        </h1>
        <p class="mb-10 max-w-3xl text-center text-lg text-[#757589]">
          Are you ready to begin a new career journey? At Teamly, we're on the lookout for exceptional individuals to
          join our team.
        </p>
        <button
          @click="scroll"
          class="flex items-center gap-2 text-lg font-bold text-tg-primary-color transition-all duration-500 hover:text-tg-secondary-color"
          type="button"
        >
          <span>Go to Vacancies</span>
          <arrow-circle-icon />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ArrowCircleIcon from '@/components/icons/ArrowCircleIcons.vue'
const scroll = () => {
  const element = document.getElementById('vacancies') as any
  element.scrollIntoView({ behavior: 'smooth' })
}
</script>
