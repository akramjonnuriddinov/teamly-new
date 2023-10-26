<template>
  <footer class="footer py-[90px]">
    <div class="container w-full px-5 mx-auto max-w-7xl">
      <div class="teamly-container">
        <div
          class="flex flex-col lg:!flex-row text-center lg:!text-start max-[767px]:pt-[100px]"
        >
          <router-link class="mr-32" to="/">
            <img
              class="max-w-[150px] w-full"
              width="150"
              height="36"
              src="@/assets/images/logos/custom-logo-white17.png"
              alt=""
            />
          </router-link>
        </div>

        <hr class="my-11" />

        <div class="flex flex-row flex-wrap text-center md:!text-start">
          <div class="basis-full md:!basis-4/12 xl:!basis-3/12 mb-6 md:pr-6">
            <h3 class="mb-0 text-xl font-bold text-gray-50">Teamly</h3>

            <p class="mb-4 text-base text-gray-300">
              © {{ new Date().getFullYear() }} Teamly.<br
                class="hidden lg:!block"
              />
              All rights reserved.
            </p>

            <!-- Social links -->
            <div class="flex items-center justify-center md:justify-start">
              <a href="#" class="mr-3 hover:-translate-y-[2px] transition-all">
                <img src="@/assets/images/svg/twitter.svg" alt="twitter icon" />
              </a>
              <a href="#" class="mr-3 hover:-translate-y-[2px] transition-all">
                <img
                  src="@/assets/images/svg/facebook.svg"
                  alt="facebook icon"
                />
              </a>
              <a href="#" class="mr-3 hover:-translate-y-[2px] transition-all">
                <img
                  src="@/assets/images/svg/instagram.svg"
                  alt="instagram icon"
                />
              </a>
              <a href="#" class="mr-3 hover:-translate-y-[2px] transition-all">
                <img
                  src="@/assets/images/svg/youtube.svg"
                  alt="you tube icon"
                />
              </a>
            </div>
          </div>

          <div
            class="basis-full md:!basis-4/12 xl:!basis-3/12 mb-6 md:pr-6 text-sm text-gray-300"
          >
            <h4 class="mb-3 text-base font-medium text-gray-50">
              Get in Touch
            </h4>
            <div class="xl:!pr-28 mb-5">
              12 Ulitsa Khudzhant, Fergana, Uzbekistan
            </div>
            <a
              to="#"
              class="hover:text-[#6c63ff]"
              title="info@email.com"
              href="mailto:#"
            />
            <br />
            +998 (33) 773 77 37
          </div>

          <div class="basis-full md:!basis-4/12 xl:!basis-3/12 mb-6 md:pr-6">
            <h4 class="mb-3 text-base font-medium text-gray-50">Learn More</h4>
            <ul class="mb-0 list-unstyled">
              <li>
                <router-link
                  to="/"
                  class="text-sm text-gray-300 hover:text-[#6c63ff]"
                  >About us</router-link
                >
              </li>
              <li>
                <router-link
                  to="/"
                  class="text-sm text-gray-300 hover:text-[#6c63ff]"
                  >Our Story</router-link
                >
              </li>
              <li>
                <router-link
                  to="/"
                  class="text-sm text-gray-300 hover:text-[#6c63ff]"
                  >Projects</router-link
                >
              </li>
              <li>
                <router-link
                  to="/"
                  class="text-sm text-gray-300 hover:text-[#6c63ff]"
                  >Terms of Use</router-link
                >
              </li>
              <li>
                <router-link
                  to="/"
                  class="text-sm text-gray-300 hover:text-[#6c63ff]"
                  >Privacy Policy</router-link
                >
              </li>
            </ul>
          </div>

          <div
            class="basis-full md:!basis-full xl:!basis-3/12 mb-6 text-base text-gray-50"
          >
            <h4 class="mb-3 font-medium text-gray-50">Our Newsletter</h4>
            <p class="mb-5 text-gray-300">
              Subscribe to our newsletter to get our news &amp; deals delivered
              to you.
            </p>

            <div>
              <div id="mc_embed_signup2">
                <form
                  method="post"
                  target="_blank"
                  id="mc-embedded-subscribe-form2"
                  name="mc-embedded-subscribe-form"
                  action="https://elemisfreebies.us20.list-manage.com/subscribe/post?u=aa4947f70a475ce162057838d&amp;id=b49ef47a9a"
                >
                  <div id="mc_embed_signup_scroll2">
                    <div class="relative flex">
                      <input
                        type="email"
                        name="EMAIL"
                        id="mce-EMAIL2"
                        placeholder=""
                        class="peer placeholder:opacity- text-tg-white p-3 pr-24 cursor-text border bg-transparent border-[#4b5569] rounded-lg outline-none focus:border-logo-text-color w-full"
                      />
                      <label
                        class="absolute left-3 cursor-text translate-y-[-50%] pl-[1px] transition-all top-[20%] text-xs peer-focus:top-[20%] peer-focus:text-xs peer-placeholder-shown:top-[50%] peer-placeholder-shown:text-sm"
                        htmlFor="mce-EMAIL2"
                        >Email Address</label
                      >
                      <input
                        value="Join"
                        type="submit"
                        name="subscribe"
                        id="mc-embedded-subscribe2"
                        class="absolute right-0 w-20 h-full text-sm font-bold rounded-r-lg cursor-pointer bg-tg-primary-color"
                      />
                    </div>

                    <div id="mce-responses2" class="">
                      <div id="mce-error-response2 hidden" />
                      <div id="mce-success-response2 hidden" />
                    </div>

                    <div class="absolute left-[-5000px]" aria-hidden="true">
                      <input
                        type="text"
                        tabIndex="{-1}"
                        name="b_ddc180777a163e0f9f66ee014_4b1bcfa0bc"
                      />
                    </div>

                    <div />
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

<style>
.footer {
  background-image: url("@/assets/images/footer/footer_bg.png");
  background-position: top center;
  background-size: cover;
  background-color: white;
  color: white;
}
</style>
