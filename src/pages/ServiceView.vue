<template>
  <div>
    <service-banner />
    <the-service2 />
    <home-contact />
  </div>
</template>

<script setup lang="ts">
import ServiceBanner from "@/components/ServiceBanner.vue"
import TheService2 from "@/components/TheService2.vue"
import HomeContact from "@/components/HomeContact.vue"
import { useColorStore } from "@/store"

const store = useColorStore()

console.log(store.header_position)
</script>
