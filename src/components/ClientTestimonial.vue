<template>
  <section class="relative testimonial pt-16 pb-32 bg-tg-white">
    <div class="absolute right-0 translate-y-1/4 -translate-x-1/4">
      <img src="@/assets/images/testimonials/testimonial_shape.png" alt="" />
    </div>
    <div class="container w-full px-5 mx-auto max-w-7xl">
      <div class="pb-[70px]">
        <span
          class="flex justify-center mb-3 text-lg font-bold text-center text-tg-primary-color"
          >Client Testimonial
        </span>
        <h2 class="text-center font-bold leading-[1.2] text-5xl">
          What People are
          <br />
          Saying!
        </h2>
      </div>
      <!-- SWIPER -->
      <swiper
        :slidesPerView="3"
        :spaceBetween="600"
        :pagination="{
          clickable: true,
        }"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide>
          <div
            style="box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.07)"
            class="bg-[#FAFCFF] rounded-[30px] max-w-[570px] min-w-[570px] w-full px-11 py-12"
          >
            <div class="flex justify-center">
              <div class="relative inline-block">
                <img
                  src="@/assets/images/testimonials/testi_avatar02.png"
                  alt=""
                />
                <div
                  class="w-[30px] h-[30px] flex absolute -right-[5px] -bottom-[3px] items-center justify-center bg-tg-primary-color rounded-full"
                >
                  <img
                    src="@/assets/images/testimonials/testimonial_icon.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <p
              class="mb-6 text-center text-lg italic font-medium leading-[1.66] text-tg-heading-font-color"
            >
              Lorem ipsum dolor sit any amet consectetur. Ut as tellus that
              suspendise nulla aliquam. Risus rutrum as tellus eget ultrices
              pretium nisi amet facilisis. Augue vulputate egestas cursus.
            </p>
            <h3
              class="mb-1 text-2xl font-bold text-center capitalize text-tg-heading-font-color"
            >
              Jenny Wilson
            </h3>
            <span
              class="text-[#8C8C8C] font-medium text-[15px] text-center block"
              >Director of Content</span
            >
          </div>
        </swiper-slide>
        <swiper-slide>
          <div
            style="box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.07)"
            class="bg-[#FAFCFF] rounded-[30px] max-w-[570px] min-w-[570px] w-full px-11 py-12"
          >
            <div class="flex justify-center">
              <div class="relative inline-block">
                <img
                  src="@/assets/images/testimonials/testi_avatar01.png"
                  alt=""
                />
                <div
                  class="w-[30px] h-[30px] flex absolute -right-[5px] -bottom-[3px] items-center justify-center bg-tg-primary-color rounded-full"
                >
                  <img
                    src="@/assets/images/testimonials/testimonial_icon.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <p
              class="mb-6 text-center text-lg italic font-medium leading-[1.66] text-tg-heading-font-color"
            >
              Lorem ipsum dolor sit any amet consectetur. Ut as tellus that
              suspendise nulla aliquam. Risus rutrum as tellus eget ultrices
              pretium nisi amet facilisis. Augue vulputate egestas cursus.
            </p>
            <h3
              class="mb-1 text-2xl font-bold text-center capitalize text-tg-heading-font-color"
            >
              Jenny Wilson
            </h3>
            <span
              class="text-[#8C8C8C] font-medium text-[15px] text-center block"
              >Director of Content</span
            >
          </div>
        </swiper-slide>
        <swiper-slide>
          <div
            style="box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.07)"
            class="bg-[#FAFCFF] rounded-[30px] max-w-[570px] min-w-[570px] w-full px-11 py-12"
          >
            <div class="flex justify-center">
              <div class="relative inline-block">
                <img
                  src="@/assets/images/testimonials/testi_avatar02.png"
                  alt=""
                />
                <div
                  class="w-[30px] h-[30px] flex absolute -right-[5px] -bottom-[3px] items-center justify-center bg-tg-primary-color rounded-full"
                >
                  <img
                    src="@/assets/images/testimonials/testimonial_icon.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <p
              class="mb-6 text-center text-lg italic font-medium leading-[1.66] text-tg-heading-font-color"
            >
              Lorem ipsum dolor sit any amet consectetur. Ut as tellus that
              suspendise nulla aliquam. Risus rutrum as tellus eget ultrices
              pretium nisi amet facilisis. Augue vulputate egestas cursus.
            </p>
            <h3
              class="mb-1 text-2xl font-bold text-center capitalize text-tg-heading-font-color"
            >
              Jenny Wilson
            </h3>
            <span
              class="text-[#8C8C8C] font-medium text-[15px] text-center block"
              >Director of Content</span
            >
          </div>
        </swiper-slide>
        <swiper-slide>
          <div
            style="box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.07)"
            class="bg-[#FAFCFF] rounded-[30px] max-w-[570px] min-w-[570px] w-full px-11 py-12"
          >
            <div class="flex justify-center">
              <div class="relative inline-block">
                <img
                  src="@/assets/images/testimonials/testi_avatar01.png"
                  alt=""
                />
                <div
                  class="w-[30px] h-[30px] flex absolute -right-[5px] -bottom-[3px] items-center justify-center bg-tg-primary-color rounded-full"
                >
                  <img
                    src="@/assets/images/testimonials/testimonial_icon.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <p
              class="mb-6 text-center text-lg italic font-medium leading-[1.66] text-tg-heading-font-color"
            >
              Lorem ipsum dolor sit any amet consectetur. Ut as tellus that
              suspendise nulla aliquam. Risus rutrum as tellus eget ultrices
              pretium nisi amet facilisis. Augue vulputate egestas cursus.
            </p>
            <h3
              class="mb-1 text-2xl font-bold text-center capitalize text-tg-heading-font-color"
            >
              Jenny Wilson
            </h3>
            <span
              class="text-[#8C8C8C] font-medium text-[15px] text-center block"
              >Director of Content</span
            >
          </div>
        </swiper-slide>
        <swiper-slide>
          <div
            style="box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.07)"
            class="bg-[#FAFCFF] rounded-[30px] max-w-[570px] min-w-[570px] w-full px-11 py-12"
          >
            <div class="flex justify-center">
              <div class="relative inline-block">
                <img
                  src="@/assets/images/testimonials/testi_avatar02.png"
                  alt=""
                />
                <div
                  class="w-[30px] h-[30px] flex absolute -right-[5px] -bottom-[3px] items-center justify-center bg-tg-primary-color rounded-full"
                >
                  <img
                    src="@/assets/images/testimonials/testimonial_icon.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <p
              class="mb-6 text-center text-lg italic font-medium leading-[1.66] text-tg-heading-font-color"
            >
              Lorem ipsum dolor sit any amet consectetur. Ut as tellus that
              suspendise nulla aliquam. Risus rutrum as tellus eget ultrices
              pretium nisi amet facilisis. Augue vulputate egestas cursus.
            </p>
            <h3
              class="mb-1 text-2xl font-bold text-center capitalize text-tg-heading-font-color"
            >
              Jenny Wilson
            </h3>
            <span
              class="text-[#8C8C8C] font-medium text-[15px] text-center block"
              >Director of Content</span
            >
          </div>
        </swiper-slide>
      </swiper>
      <!-- /SWIPER -->
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue"
</script>

<style scoped>
.swiper-slide {
  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
