<template>
  <section
    class="h-screen overflow-y-auto bg-[#00000080] flex justify-center items-start fixed top-0 left-0 w-[100vw] z-50"
  >
    <div class="w-full h-auto max-w-[500px] mx-auto mt-4 mb-4 font-medium bg-white shadow-2xl rounded-xl">
      <div class="flex flex-col items-center pt-6 pb-6 pl-6 pr-6">
        <div class="flex items-center justify-between w-full">
          <span>Profile</span>
          <button>
            <inline-svg src="fontawesome/xmark.svg" />
          </button>
        </div>
        <p class="my-6 text-2xl leading-none tracking-tighter">Akramjon Nuriddinov</p>
        <ul class="flex flex-col w-full">
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/email.svg" />
            <a href="#"> Email </a>
          </li>
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/github.svg" />
            <a href="#"> GitHub </a>
          </li>
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/linkedin.svg" />
            <a href="#"> Linkedin </a>
          </li>
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/file-pdf.svg" />
            <a href="#"> Resume </a>
          </li>
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/phone.svg" />
            <a href="#"> Phone </a>
          </li>
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/telegram.svg" />
            <a href="#"> Telegram </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import InlineSvg from '@/components/reusables/InlineSvg.vue'
</script>
