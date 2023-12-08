<template>
  <BaseModal title="Profile" @close="$emit('close')" width="max-w-[470px]" height="h-auto">
    <span class="flex justify-center w-full my-6 text-2xl leading-none tracking-tighter">{{
          user.name
        }}</span>
        <ul class="flex flex-col w-full">
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/email.svg" />
            <a :href="`mailto:${user.email}`"> {{ user.email }} </a>
          </li>
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/github.svg" />
            <a :href="user.github" target="_blank"> {{ user.github || 'github' }} </a>
          </li>
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/linkedin.svg" />
            <a :href="user.linkedin" target="_blank"> {{ user.linkedin || 'Linkedin' }} </a>
          </li>
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/phone.svg" />
            <a :href="`tel:${user.phone}`"> {{ user.phone || 'Phone number' }} </a>
          </li>
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/telegram.svg" />
            <a :href="`https://t.me/${user.telegram}`" target="_blank">
              {{ user.telegram || 'Telegram' }}
            </a>
          </li>
        </ul>
        <base-button
          @click.stop="downloadResume(userId)"
          :size="ESize.SMALL"
          :theme="EThemes.GREEN"
          class="flex items-center w-full mt-5"
        >
          <inline-svg class="mr-2" src="fontawesome/user-profile/file-pdf.svg" />
          <span>Download resume</span>
        </base-button>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InlineSvg from '@/components/reusables/InlineSvg.vue'
import BaseButton from '@/components/reusables/BaseButton.vue'
import { ESize, EThemes } from '@/types'
import { getDownloadURL } from 'firebase/storage'
import { storageRef, storage } from '@/firebase'
import BaseModal from '@/components/reusables/BaseModal.vue'

defineProps(['user'])
defineEmits(['close'])

const downloadResume = async (id: string) => {
  getDownloadURL(storageRef(storage, `users/${id}`)).then((url) => {
    window.open(url, '_blank')
  })
}
</script>
