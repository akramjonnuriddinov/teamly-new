<template>
  <section class="bg-white pb-[250px]">
    <div class="container relative px-5 mx-auto max-w-7xl">
      <div
        class="flex bg-tg-primary-color py-[55px] rounded-[30px] px-[100px] pt-[75px] items-center justify-between"
      >
        <div class="relative w-full max-w-2xl">
          <span class="mb-3 text-lg font-bold text-tg-white"
            >Latest news updates
          </span>
          <h1 class="text-5xl mb-7 font-bold leading-[1.2] text-tg-white">
            Need a Successful
            <br />
            Your Project
          </h1>

          <router-link
            class="bg-tg-white text-tg-black rounded-[10px] font-bold inline-block text-center whitespace-nowrap transition-all duration-300 hover:bg-tg-secondary-color hover:text-tg-white"
            style="padding: 18px 25px; letter-spacing: 0.5px"
            to="/"
            >Estimate Project
          </router-link>
        </div>
        <img
          class="absolute right-0 -top-20"
          src="@/assets/images/home-contact/newsletter_img.png"
          alt=""
        />
      </div>
    </div>
  </section>
</template>
