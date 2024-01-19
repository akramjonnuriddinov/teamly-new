<template>
  <section>
    <div class="mt-6 flex h-96 items-center rounded-lg border text-center">
      <div class="mx-auto flex w-full max-w-sm flex-col px-4">
        <div class="mx-auto rounded-full bg-blue-100 p-3 text-blue-500 dark:bg-gray-800">
          <svg
            class="h-6 w-6 text-blue-500"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              d="M0 192C0 103.6 71.6 32 160 32s160 71.6 160 160V320c0 88.4-71.6 160-160 160S0 408.4 0 320V192zM160 96c-53 0-96 43-96 96V320c0 53 43 96 96 96s96-43 96-96V192c0-53-43-96-96-96z"
            />
          </svg>
        </div>
        <h1 class="mt-3 text-lg text-gray-800 dark:text-white">{{ title }}</h1>
        <p class="mt-2 text-gray-500 dark:text-gray-400">
          {{ text }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})
</script>
