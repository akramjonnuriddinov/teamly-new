<template>
  <div class="container relative px-5 mx-auto max-w-7xl">
    <div class="flex pt-[75px] items-center justify-between">
      <div class="relative w-full max-w-2xl">
        <img
          class="absolute -top-10 -left-10"
          src="@/assets/images/banner_shape01.png"
          alt=""
        />
        <h1
          style="line-height: 1.2"
          class="mb-4 text-6xl font-bold text-tg-heading-font-color"
        >
          Shaping Digital Dreams
        </h1>
        <p class="mb-10 text-lg text-tg-heading-font-color">
          We help you transform your ideas into reality. Contact us today and
          let us shape your digital dreams.
        </p>
        <router-link
          class="bg-tg-primary-color text-tg-white rounded-[10px] font-bold inline-block text-center whitespace-nowrap"
          style="padding: 18px 25px; letter-spacing: 0.5px"
          to="/"
          >Get Started</router-link
        >
      </div>
      <img
        data-aos="fade-up"
        data-aos-duration="3000"
        src="@/assets/images/banner_img.png"
        alt=""
      />
    </div>
    <img
      class="absolute -left-5 -bottom-10"
      src="@/assets/images/banner_shape03.png"
      alt=""
    />
    <div class="absolute banner-shaper"></div>
  </div>
</template>

<style scoped>
body {
  overflow: hidden;
}
.banner-shaper::after {
  position: fixed;
  content: "";
  /* right: -298px;
  bottom: -647px; */
  right: -398px;
  bottom: -447px;
  width: 1035px;
  height: 950px;
  border-radius: 50% 50% 50% 50% / 45% 45% 55% 55%;
  will-change: border-radius, transform, opacity;
  animation: bannerShape 10s linear infinite;
  display: block;
  z-index: -1;
  background: #fa4729;
  overflow: hidden;
}

@keyframes bannerShape {
  0%,
  100% {
    border-radius: 45% 55% 60% 40% / 45% 45% 55% 55%;
    transform: translate3d(0, 0, 0) rotateZ(0.01deg);
  }
  34% {
    border-radius: 60% 50% 46% 54% / 40% 39% 61% 60%;
    transform: translate3d(0, 5px, 0) rotateZ(0.01deg);
  }
  50% {
    transform: translate3d(0, 0, 0) rotateZ(0.01deg);
  }
  67% {
    border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%;
    transform: translate3d(0, -3px, 0) rotateZ(0.01deg);
  }
}
</style>
