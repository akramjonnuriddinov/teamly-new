<template>
  <div class="relative flex items-center font-bold text-gray-600 w-[72px] uppercase cursor-pointer">
    <img class="w-5 h-5 mr-2 rounded-full" src="@/assets/images/flags/usa.png" alt="flag" />
    <span>En</span>
  </div>
  <ul
    class="absolute z-30 hidden w-16 py-2 mt-2 text-base font-bold text-gray-600 transition -translate-x-1/2 bg-white rounded-lg shadow-lg left-1/2 top-full"
  >
    <li>
      <img class="w-5 h-5 mr-1 rounded-full" src="@/assets/images/flags/ru.svg" alt="" />

      <button class="block w-full mb-1 uppercase cursor-pointer whitespace-nowrap">ru</button>
    </li>
    <li>
      <img class="w-5 h-5 mr-1 rounded-full" src="@/assets/images/flags/usa.png" alt="" />
      <button class="block w-full mb-1 uppercase cursor-pointer whitespace-nowrap">en</button>
    </li>
    <li>
      <img class="w-5 h-5 mr-1 rounded-full" src="@/assets/images/flags/uz.svg" alt="" />
      <button class="block w-full mb-1 uppercase cursor-pointer whitespace-nowrap">uz</button>
    </li>
  </ul>
</template>
