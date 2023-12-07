<template>
  <section
    @click="$emit('closeUserModal')"
    class="h-screen overflow-y-auto bg-[#00000080] flex justify-center items-center fixed top-0 left-0 w-[100vw] z-50"
  >
    <div @click.stop class="w-full h-auto max-w-[500px] mx-auto font-medium m-10 bg-white shadow-2xl rounded-xl">
      <div class="flex flex-col p-6">
        <div class="flex items-center justify-between w-full">
          <span class="text-xl">Profile</span>
          <button
            @click="$emit('closeUserModal')"
            class="text-xl duration-200 transition-color hover:text-tg-secondary-color"
          >
            <inline-svg src="fontawesome/xmark.svg" />
          </button>
        </div>
        <span class="flex justify-center w-full my-6 text-2xl leading-none tracking-tighter">{{
          applier.resume.name
        }}</span>
        <ul class="flex flex-col w-full">
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/email.svg" />
            <a :href="`mailto:${applier.resume.email}`"> {{ applier.resume.email }} </a>
          </li>
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/github.svg" />
            <a :href="applier.resume.github" target="_blank"> {{ applier.resume.github || 'github' }} </a>
          </li>
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/linkedin.svg" />
            <a :href="applier.resume.linkedin" target="_blank"> {{ applier.resume.linkedin || 'Linkedin' }} </a>
          </li>
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/phone.svg" />
            <a :href="`tel:${applier.resume.phone}`"> {{ applier.resume.phone || 'Phone number' }} </a>
          </li>
          <li class="flex items-center mb-3">
            <inline-svg class="mr-2" src="fontawesome/user-profile/telegram.svg" />
            <a :href="`https://t.me/${applier.resume.telegram}`" target="_blank">
              {{ applier.resume.telegram || 'Telegram' }}
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
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InlineSvg from '@/components/reusables/InlineSvg.vue'
import BaseButton from '@/components/reusables/BaseButton.vue'
import { ESize, EThemes } from '@/types'
import { getDownloadURL } from 'firebase/storage'
import { storageRef, storage } from '@/firebase'

const applier = ref<any>({})
const props = defineProps(['appliers', 'userId'])
defineEmits(['closeUserModal'])

applier.value = props.appliers.find((item: any) => item.user_id === props.userId)

const downloadResume = async (id: string) => {
  getDownloadURL(storageRef(storage, `users/${id}`)).then((url) => {
    window.open(url, '_blank')
  })
}
</script>
