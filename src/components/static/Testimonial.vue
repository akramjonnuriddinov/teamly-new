<template>
  <section class="relative hidden pt-16 pb-32 testimonial">
    <div class="absolute right-0 -z-10 translate-y-1/4 -translate-x-1/4">
      <img src="@/assets/images/testimonials/testimonial_shape.png" alt="" />
    </div>
    <div class="container w-full px-5 mx-auto max-w-7xl">
      <div class="pb-[70px]">
        <span class="flex justify-center mb-3 text-lg font-bold text-center text-tg-primary-color"
          >Client Testimonial
        </span>
        <h2 class="text-center font-bold leading-[1.2] text-5xl max-sm:text-4xl">
          What People are
          <br class="max-[500px]:hidden" />
          Saying!
        </h2>
      </div>
      <div class="mySwiper">
        <div
          class="flex items-center justify-center mx-[100px] max-[1200px]:mx-[150px] max-[920px]:mx-[200px] max-[600px]:mx-[250px]"
        >
          <div
            style="box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.07)"
            class="bg-[#FAFCFF] rounded-[30px] max-w-[570px] min-w-[570px] w-full px-11 py-12"
          >
            <div class="flex justify-center">
              <div class="relative inline-block">
                <div
                  class="w-[30px] h-[30px] flex absolute -right-[5px] -bottom-[3px] items-center justify-center bg-tg-primary-color rounded-full"
                >
                  <img src="@/assets/images/testimonials/testimonial_icon.svg" alt="" />
                </div>
              </div>
            </div>
            <p
              class="mb-6 text-center h-[112px] line-clamp-4 overflow-hidden text-lg italic font-medium leading-[1.66] text-tg-heading-font-color"
            >
              {{ 'swiperContent.text' }}
            </p>
            <h3 class="mb-1 text-2xl font-bold text-center capitalize text-tg-heading-font-color">
              {{ 'swiperContent.name' }}
            </h3>
            <span class="text-[#8C8C8C] font-medium text-[15px] text-center block">{{ 'swiperContent.position' }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
