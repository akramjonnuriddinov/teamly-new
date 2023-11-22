<template>
  <section>
    <div
      class="container relative px-5 mx-auto max-w-7xl max-xl:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
    >
      <div
        class="relative pt-[130px] flex flex-col items-center w-full max-[990px]:flex max-[990px]:flex-col max-[990px]:items-center max-[990px]:justify-center max-sm:pt-[100px]"
      >
        <h1 class="mb-4 text-[70px] font-extrabold text-tg-dark-blue-color leading-[1.2] text-center max-sm:text-4xl">
          We are hiring!
        </h1>
        <p class="max-w-3xl text-center mb-10 text-lg text-[#757589]">
          Are you ready to begin a new career journey? At Teamly, we're on the lookout for exceptional individuals to
          join our team.
        </p>
        <button
          @click="scroll"
          class="flex items-center gap-2 text-lg font-bold transition-all duration-500 text-tg-primary-color hover:text-tg-secondary-color"
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
