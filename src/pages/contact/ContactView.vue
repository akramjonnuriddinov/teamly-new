<template>
  <section class="pb-32 max-[990px]:pb-5">
    <div
      class="container relative mx-auto px-5 max-xl:max-w-[990px] max-[990px]:max-w-3xl max-[800px]:max-w-2xl max-[680px]:max-w-xl"
    >
      <div
        class="relative flex w-full flex-col items-center pt-[216px] max-[990px]:flex max-[990px]:flex-col max-[990px]:items-center max-[990px]:justify-center max-sm:pt-[100px]"
      >
        <h1 class="mb-4 text-center text-[70px] font-extrabold leading-[1.2] text-tg-dark-blue-color max-sm:text-4xl">
          Get in touch
        </h1>
        <p class="mb-10 max-w-3xl text-center text-lg text-[#757589]">
          We always want to hear from you! Let us know how we can best help you and we'll do our very best.
        </p>
      </div>
      <div class="flex max-[990px]:flex-col max-[990px]:items-center max-[990px]:justify-center max-sm:pt-[0px]">
        <div class="w-full max-w-[600px] pt-10 max-[990px]:max-w-full max-sm:pt-[0px]">
          <div class="flex items-center justify-center pt-12">
            <div class="w-full bg-white">
              <form @submit.prevent="sendMessage" method="POST">
                <div class="mb-7">
                  <label for="name" class="mb-3 block text-base font-medium"> Full Name </label>
                  <input
                    v-model="message.fullname"
                    autocomplete="off"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white px-4 py-3 text-base text-[#757589] outline-none focus:border-tg-primary-color focus:shadow-md"
                  />
                </div>
                <div class="mb-7">
                  <label for="email" class="mb-3 block text-base font-medium"> Email Address </label>
                  <input
                    v-model="message.email"
                    autocomplete="off"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@domain.com"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white px-4 py-3 text-base text-[#757589] outline-none focus:border-tg-primary-color focus:shadow-md"
                  />
                </div>
                <div class="mb-7">
                  <label for="phone_number" class="mb-3 block text-base font-medium"> Phone Number </label>
                  <input
                    v-model="message.phone"
                    autocomplete="off"
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    placeholder="+998 (--) --- -- --"
                    @input="message.phone = updateNumber(message.phone)"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white px-4 py-3 text-base text-[#757589] outline-none focus:border-tg-primary-color focus:shadow-md"
                  />
                </div>
                <div v-if="message.service" class="mb-7">
                  <label for="service" class="mb-3 block text-base font-medium"> Service </label>
                  <select
                    v-model="message.service"
                    autocomplete="off"
                    type="text"
                    name="service"
                    id="service"
                    placeholder="Phone Number"
                    class="w-full cursor-pointer rounded-md border border-[#e0e0e0] bg-white px-4 py-3 text-base text-[#757589] outline-none focus:border-tg-primary-color focus:shadow-md"
                  >
                    <option v-for="option in serviceOptions" class="flex cursor-pointer items-center" :value="option">
                      {{ option }}
                    </option>
                  </select>
                </div>
                <div class="mb-7">
                  <label for="message" class="mb-3 block text-base font-medium"> Message </label>
                  <textarea
                    v-model="message.text"
                    rows="4"
                    name="message"
                    id="message"
                    placeholder="Enter Message"
                    class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white px-4 py-3 text-base text-[#757589] outline-none focus:border-tg-primary-color focus:shadow-md"
                  ></textarea>
                </div>
                <div>
                  <base-button
                    :disabled="disabled"
                    class="base-button w-[239px]"
                    :class="{ 'bg-green-700': isLoading }"
                    type="submit"
                    :size="ESize.MEDIUM"
                  >
                    <app-animation
                      v-if="isLoading"
                      :width="50"
                      :speed="2"
                      :options="defaultOptions"
                      @animCreated="handleAnimation"
                    />
                    <span v-else class="sent-mail flex items-center gap-2">
                      <svg class="w-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                          d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"
                        />
                      </svg>
                      Send Message
                    </span>
                  </base-button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="address flex w-full items-center justify-center max-[990px]:h-[600px] max-sm:h-[350px]">
          <div
            class="address__inner relative z-30 flex w-full max-w-[304px] flex-col items-center rounded-2xl bg-tg-white p-10 text-xl"
          >
            <p class="my-4 text-center text-tg-body-font-color">
              Frunzenskiy Massiv, <span class="font-bold">Fergana Region</span>
            </p>
            <a class="font-medium text-tg-blue" href="https://maps.app.goo.gl/j9wA6zQc8zdY4Qe68" target="_blank"
              >Google Direction</a
            >
            <div class="dot"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { db } from '@/firebase'
import { ESize } from '@/types'
import { ref, computed, nextTick } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { isDisabled } from '@/composables/isDisabled'
import AppAnimation from '@/components/AppAnimation.vue'
import SentMail from '@/assets/images/animation/success-failed-custom.json'
import { useRoute } from 'vue-router'
import { updateNumber } from '../../composables/usePone'
import { useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const message = ref<any>({
  fullname: '',
  email: '',
  phone: '',
  text: '',
  service: route.query.service || '',
})
const defaultOptions = {
  loop: true,
  autoplay: true,
  renderer: 'svg',
  animationData: SentMail,
}
const isLoading = ref(false)
const anim = ref()
const serviceOptions = route.query.options

const disabled = computed(() => isDisabled({ ...message.value, service: true }))

const handleAnimation = (createdAnim: any) => {
  anim.value = createdAnim
}

const playLoading = () => {
  if (anim.value) {
    anim.value.playSegments([10, 234], true)
    anim.value.loop = true
  }
}

const playSuccess = () => {
  if (anim.value) {
    anim.value.playSegments([235, 400], true)
    anim.value.loop = false
  }
}

const sendMessage = async () => {
  const collectionRef = collection(db, 'messages')
  isLoading.value = true
  nextTick(() => {
    playLoading()
  })
  await addDoc(collectionRef, { ...message.value, date: Date.now() })
  playSuccess()
  setTimeout(() => {
    message.value = {
      fullname: '',
      email: '',
      phone: '',
      text: '',
      service: '',
    }
    router.push({ name: 'contact' })
    isLoading.value = false
  }, 3000)
}
</script>

<style>
.sent-mail path {
  stroke-width: 10 !important;
}

.address {
  background-image: url('@/assets/images/contact-view/contact-1-bg.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}

.address__inner::before {
  position: absolute;
  content: '';
  top: 100%;
  left: 50%;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #ffffff;
  z-index: 20;
}

.dot {
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, calc(100% + 15px));
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: #1e85ff;
  cursor: pointer;
}

.dot::before {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  content: '';
  background: #1e85ff;
  border-radius: 50%;
  -webkit-animation: wave 2s linear infinite;
  animation: wave 2s linear infinite;
}

.dot::after {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  content: '';
  background: #1e85ff;
  border-radius: 50%;
  -webkit-animation: wave 2s linear infinite;
  animation: wave 2s linear infinite;
}

@keyframes wave {
  0% {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0.6;
  }
  50% {
    top: -10px;
    left: -10px;
    bottom: -10px;
    right: -10px;
    opacity: 0.3;
  }
  100% {
    opacity: 0;
    top: -20px;
    left: -20px;
    bottom: -20px;
    right: -20px;
  }
}
</style>
