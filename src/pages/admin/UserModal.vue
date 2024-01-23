<template>
  <BaseModal class="" title="Profile" @close="$emit('close')" width="max-w-[470px]" height="h-auto">
    <span class="my-6 flex w-full justify-center text-2xl leading-none tracking-tighter">{{ user.name }}</span>
    <ul class="flex w-full flex-col">
      <li class="mb-3 flex items-center">
        <inline-svg class="mr-2" src="fontawesome/user-profile/email.svg" />
        <a :href="`mailto:${user.email}`"> {{ user.email }} </a>
      </li>
      <li class="mb-3 flex items-center">
        <inline-svg class="mr-2" src="fontawesome/user-profile/github.svg" />
        <a :href="user.github" target="_blank"> {{ 'github' }} </a>
      </li>
      <li class="mb-3 flex items-center">
        <inline-svg class="mr-2" src="fontawesome/user-profile/linkedin.svg" />
        <a :href="user.linkedin" target="_blank"> {{ 'Linkedin' }} </a>
      </li>
      <li class="mb-3 flex items-center">
        <inline-svg class="mr-2" src="fontawesome/user-profile/phone.svg" />
        <a :href="`tel:${user.phone}`"> {{ user.phone || 'Phone number' }} </a>
      </li>
      <li class="mb-3 flex items-center">
        <inline-svg class="mr-2" src="fontawesome/user-profile/telegram.svg" />
        <a :href="`https://t.me/${user.telegram}`" target="_blank">
          {{ user.telegram || 'Telegram' }}
        </a>
      </li>
    </ul>
    <base-button
      @click.stop="downloadResume(user.id)"
      :size="ESize.SMALL"
      :theme="EThemes.GREEN"
      class="mt-5 flex w-full items-center"
    >
      <inline-svg class="mr-2" src="fontawesome/user-profile/file-pdf.svg" />
      <span>Show resume</span>
    </base-button>
  </BaseModal>
</template>

<script setup lang="ts">
import InlineSvg from '@/components/InlineSvg.vue'
import BaseButton from '@/components/BaseButton.vue'
import { ESize, EThemes } from '@/types'
import { getDownloadURL } from 'firebase/storage'
import { storageRef, storage } from '@/firebase'
import BaseModal from '@/components/BaseModal.vue'

defineProps(['user'])
defineEmits(['close'])

const downloadResume = async (id: any) => {
  getDownloadURL(storageRef(storage, `users/${id}`)).then((url) => {
    window.open(url, '_blank')
  })
}
</script>
