<template>
  <section>
    <div
      class="container relative mx-auto max-w-7xl px-5 max-xl:max-w-[990px] max-[990px]:max-w-3xl max-[800px]:max-w-2xl max-[680px]:max-w-xl"
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
      <div class="flex max-[990px]:flex-col max-[990px]:items-center max-[990px]:justify-center max-sm:pt-[100px]">
        <form class="w-full max-w-[600px] pt-10" method="post">
          <div class="flex items-center justify-center py-12 max-[580px]:pb-0">
            <div class="w-full bg-white">
              <form action="https://formbold.com/s/FORM_ID" method="POST">
                <div class="mb-7">
                  <label for="name" class="mb-3 block text-base font-medium"> Full Name </label>
                  <input
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
                    autocomplete="off"
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    placeholder="Phone Number"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white px-4 py-3 text-base text-[#757589] outline-none focus:border-tg-primary-color focus:shadow-md"
                  />
                </div>
                <div class="mb-7">
                  <label for="message" class="mb-3 block text-base font-medium"> Message </label>
                  <textarea
                    rows="4"
                    name="message"
                    id="message"
                    placeholder="Enter Message"
                    class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white px-4 py-3 text-base text-[#757589] outline-none focus:border-tg-primary-color focus:shadow-md"
                  ></textarea>
                </div>
                <div>
                  <base-button :size="ESize.MEDIUM">Send Message</base-button>
                </div>
              </form>
            </div>
          </div>
        </form>
        <div class="address flex w-full items-center justify-center max-[990px]:h-[600px]">
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
import { ESize } from '@/types'
</script>

<style scoped>
.address {
  background-image: url('https://uigaint.com/demo/html/anfra/contact-2/assets/images/bg/contact-1-bg.png');
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
