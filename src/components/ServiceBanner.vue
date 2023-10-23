<template>
  <section class="service-banner">
    <div
      class="container relative px-5 mx-auto max-w-7xl max-xl:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
    >
      <div
        class="flex justify-between max-[990px]:flex-wrap max-[990px]:items-center max-[990px]:justify-center max-[990px]:pb-[110px] max-[990px]:pt-[50px]"
      >
        <div
          class="relative pt-[150px] w-full max-w-2xl max-[990px]:flex max-[990px]:flex-col max-[990px]:items-center max-[990px]:justify-center max-sm:pt-[100px]"
        >
          <h1
            class="mb-4 text-[50px] font-semibold leading-[1.2] text-tg-heading-font-color max-[990px]:text-center max-sm:text-4xl"
          >
            Dreams Transformed: Our Digital Shaping Services
          </h1>
          <p class="mb-10 text-lg text-[#757589] max-[990px]:text-center">
            We're committed to transforming your innovative ideas into reality,
            nurturing your digital dreams and bringing them to life.
          </p>
          <router-link
            class="bg-tg-primary-color text-tg-white rounded-[10px] font-bold inline-block text-center whitespace-nowrap py-[18px] px-[25px] tracking-[0.5px] transition-all duration-300 hover:bg-tg-secondary-color"
            to="/"
            >Get Started</router-link
          >
        </div>
        <img
          class="max-w-[470px] w-full pt-[100px] max-[990px]:pb-0 max-[990px]:pt-16 pb-[130px]"
          data-aos=""
          data-aos-duration="3000"
          src="@/assets/images/service-view/breadcrumb_img.png"
          alt=""
        />
      </div>

      <div class="absolute banner-shaper"></div>
    </div>
  </section>
</template>

<style scoped>
.service-banner {
  background-image: url("../assets/images/service-view/service_banner_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
