<template>
  <section>
    <div
      class="container relative px-5 mx-auto max-w-7xl max-xl:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
    >
      <div
        class="relative pt-[130px] flex flex-col items-center w-full max-[990px]:flex max-[990px]:flex-col max-[990px]:items-center max-[990px]:justify-center max-sm:pt-[100px]"
      >
        <h1
          class="mb-4 text-[70px] font-extrabold text-[#38386E] leading-[1.2] text-center max-sm:text-4xl"
        >
          We are hiring!
        </h1>
        <p class="max-w-3xl text-center mb-10 text-lg text-[#757589]">
          Are you ready to begin a new career journey? At Teamly, we're on the
          lookout for exceptional individuals to join our team.
        </p>
        <button
          @click="scroll"
          class="flex items-center gap-2 text-lg font-bold transition-all duration-500 text-tg-primary-color hover:text-tg-secondary-color"
          type="button"
        >
          <span>Go to jobs</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            <path
              d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1l99.9 107.1c3.5 3.8 5.5 8.7 5.5 13.8s-2 10.1-5.5 13.8L294.6 376.9c-4.2 4.5-10.1 7.1-16.3 7.1C266 384 256 374 256 361.7l0-57.7-96 0c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l96 0 0-57.7c0-12.3 10-22.3 22.3-22.3c6.2 0 12.1 2.6 16.3 7.1z"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const scroll = () => {
  const element = document.getElementById("jobs") as any
  element.scrollIntoView({ behavior: "smooth" })
}
</script>
