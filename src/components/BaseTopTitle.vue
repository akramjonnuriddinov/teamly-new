<template>
  <div>
    <span class="mb-3 flex justify-center text-center text-lg font-bold text-tg-indigo">
      <slot name="subtitle" />
    </span>
    <h2 class="text-center text-5xl font-bold leading-[1.2] text-tg-dark-blue-color max-xl:text-5xl max-sm:text-4xl">
      <slot name="title" />
    </h2>
  </div>
</template>
