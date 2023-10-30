<template>
  <section class="bg-white pb-[250px]">
    <div class="container relative px-5 mx-auto max-w-7xl">
      <div
        class="flex bg-tg-primary-color py-[55px] rounded-[30px] px-[100px] pt-[75px] items-center justify-between max-[990px]:px-[20px]"
      >
        <div
          class="relative w-full max-w-2xl max-[990px]:flex max-[990px]:flex-col max-[990px]:items-center max-[990px]:max-w-full"
        >
          <span class="mb-3 text-lg font-bold text-tg-white"
            >Latest news updates
          </span>
          <h2
            class="text-5xl mb-7 font-bold leading-[1.2] text-tg-white max-sm:text-4xl max-[990px]:text-center"
          >
            Need a Successful
            <br class="max-[990px]:hidden" />
            Your Project
          </h2>

          <router-link
            class="bg-tg-white text-tg-black rounded-[10px] font-bold inline-block text-center whitespace-nowrap transition-all duration-300 hover:bg-tg-secondary-color hover:text-tg-white"
            style="padding: 18px 60px; letter-spacing: 0.5px"
            to="/"
            >Contact Us
          </router-link>
        </div>
        <img
          class="absolute right-0 -top-20 max-[990px]:hidden"
          src="@/assets/images/home-contact/newsletter_img.png"
          alt=""
        />
      </div>
    </div>
  </section>
</template>
