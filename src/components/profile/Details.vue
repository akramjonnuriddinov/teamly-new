<template>
  <!-- Your HTML template -->
  <div class="relative pb-[135px] border-b border-gray-300">
    <div class="mb-7">
      <h1 class="text-[20px] font-medium">Personal information</h1>
      <span class="text-gray-400 text-sm">Your main profile information</span>
    </div>
    <div class="flex justify-between">
      <div class="flex flex-col w-[400px]">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Your name</label>
        <input type="text" required name="name" v-model="userName" placeholder="Diyorbek Rajabov" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
      </div>
      <div class="flex flex-col w-[400px]">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email address</label>
        <input type="email" required v-model="userEmail" placeholder="email@company.com" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
      </div>
    </div>
    <button class="w-[250px] transition-all duration-300 bg-tg-primary-color text-tg-white hover:bg-tg-secondary-color absolute right-0 bg-[#7e54f8] text-white mt-[35px] focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-[30px] py-[8px] text-center">Update profile information</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from "@/store/auth";

const user = ref({ name: '', email: '' });

onMounted(async () => {
  const store = useAuthStore();
  await store.fetchProfile();
  user.value = store.user || { name: '', email: '' };
});


const userName = computed({
  get: () => user.value?.name || '',
  set: (newValue) => {
    if (user.value) user.value.name = newValue;
  }
});

const userEmail = computed({
  get: () => user.value?.email || '',
  set: (newValue) => {
    if (user.value) user.value.email = newValue;
  }
});
</script>
