<template>
  <footer class="footer py-[90px]">
    <div class="container mx-auto w-full max-w-7xl px-5">
      <div class="teamly-container">
        <div class="flex flex-col text-center max-[767px]:pt-[100px] lg:!flex-row lg:!text-start">
          <router-link class="mr-32" to="/">
            <the-logo color="white" />
          </router-link>
        </div>

        <hr class="my-11" />

        <div class="flex flex-row flex-wrap text-center md:!text-start">
          <div class="mb-6 basis-full md:!basis-4/12 md:pr-6 xl:!basis-3/12">
            <h3 class="mb-0 text-xl font-bold text-gray-50">Teamly</h3>

            <p class="mb-4 text-base text-gray-300">
              © {{ new Date().getFullYear() }} Teamly.<br class="hidden lg:!block" />
              All rights reserved.
            </p>

            <div class="flex items-center justify-center md:justify-start">
              <a href="#" class="mr-3 transition-all hover:-translate-y-[2px]">
                <img src="@/assets/images/svg/twitter.svg" alt="twitter icon" />
              </a>
              <a href="#" class="mr-3 transition-all hover:-translate-y-[2px]">
                <img src="@/assets/images/svg/facebook.svg" alt="facebook icon" />
              </a>
              <a href="#" class="mr-3 transition-all hover:-translate-y-[2px]">
                <img src="@/assets/images/svg/instagram.svg" alt="instagram icon" />
              </a>
              <a href="#" class="mr-3 transition-all hover:-translate-y-[2px]">
                <img src="@/assets/images/svg/youtube.svg" alt="you tube icon" />
              </a>
            </div>
          </div>

          <div class="mb-6 basis-full text-sm text-gray-300 md:!basis-4/12 md:pr-6 xl:!basis-3/12">
            <h4 class="mb-3 text-base font-medium text-gray-50">Get in Touch</h4>
            <div class="mb-5 xl:!pr-28">12 Ulitsa Khudzhant, Fergana, Uzbekistan</div>
            <a to="#" class="hover:text-[#6c63ff]" title="info@email.com" href="mailto:#" />
            <br />
            +998 (33) 773 77 37
          </div>

          <div class="mb-6 basis-full md:!basis-4/12 md:pr-6 xl:!basis-3/12">
            <h4 class="mb-3 text-base font-medium text-gray-50">Learn More</h4>
            <ul class="list-unstyled mb-0">
              <li>
                <router-link to="/" class="text-sm text-gray-300 hover:text-[#6c63ff]">About us</router-link>
              </li>
              <li>
                <router-link to="/" class="text-sm text-gray-300 hover:text-[#6c63ff]">Our Story</router-link>
              </li>
              <li>
                <router-link to="/" class="text-sm text-gray-300 hover:text-[#6c63ff]">Projects</router-link>
              </li>
              <li>
                <router-link to="/" class="text-sm text-gray-300 hover:text-[#6c63ff]">Terms of Use</router-link>
              </li>
              <li>
                <router-link to="/" class="text-sm text-gray-300 hover:text-[#6c63ff]">Privacy Policy</router-link>
              </li>
            </ul>
          </div>

          <div class="mb-6 basis-full text-base text-gray-50 md:!basis-full xl:!basis-3/12">
            <h4 class="mb-3 font-medium text-gray-50">Our Newsletter</h4>
            <p class="mb-5 text-gray-300">Subscribe to our newsletter to get our news &amp; deals delivered to you.</p>

            <div>
              <div id="mc_embed_signup2">
                <form method="post">
                  <div>
                    <div class="relative flex">
                      <input
                        type="email"
                        name="EMAIL"
                        placeholder=""
                        class="placeholder:opacity- focus:border-logo-text-color peer w-full cursor-text rounded-lg border border-[#4b5569] bg-transparent p-3 pr-24 text-tg-white outline-none"
                      />
                      <label
                        class="absolute left-3 top-[20%] translate-y-[-50%] cursor-text pl-[1px] text-xs transition-all peer-placeholder-shown:top-[50%] peer-placeholder-shown:text-sm peer-focus:top-[20%] peer-focus:text-xs"
                        >Email Address</label
                      >
                      <input
                        value="Join"
                        type="submit"
                        name="subscribe"
                        class="absolute right-0 h-full w-20 cursor-pointer rounded-r-lg bg-tg-primary-color text-sm font-bold"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import TheLogo from '@/components/TheLogo.vue'
</script>

<style>
.footer {
  background-image: url('@/assets/images/footer/footer_bg.png');
  background-position: top center;
  background-size: cover;
  background-color: white;
  color: white;
}
</style>
