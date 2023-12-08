<template>
  <BaseModal title="Profile" @close="$emit('close')" width="max-w-[470px]" height="h-auto">
    <span class="flex justify-center w-full my-6 text-2xl leading-none tracking-tighter">{{
          applier.user.name
        }}</span>
        <ul class="flex flex-col w-full">
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/email.svg" />
            <a :href="`mailto:${applier.user.email}`"> {{ applier.user.email }} </a>
          </li>
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/github.svg" />
            <a :href="applier.user.github" target="_blank"> {{ applier.user.github || 'github' }} </a>
          </li>
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/linkedin.svg" />
            <a :href="applier.user.linkedin" target="_blank"> {{ applier.user.linkedin || 'Linkedin' }} </a>
          </li>
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/phone.svg" />
            <a :href="`tel:${applier.user.phone}`"> {{ applier.user.phone || 'Phone number' }} </a>
          </li>
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/telegram.svg" />
            <a :href="`https://t.me/${applier.user.telegram}`" target="_blank">
              {{ applier.user.telegram || 'Telegram' }}
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

const applier = ref<any>({})
const props = defineProps(['appliers', 'userId'])
defineEmits(['closeUserModal'])

applier.value = props.appliers.find((item: any) => item.user.id === props.userId)

const downloadResume = async (id: string) => {
  getDownloadURL(storageRef(storage, `users/${id}`)).then((url) => {
    window.open(url, '_blank')
  })
}
</script>
