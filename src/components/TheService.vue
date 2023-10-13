<template>
  <section
    class="bg-[#131313] pt-[115px] pb-[90px] relative z-10 text-tg-white"
  >
    <div class="container w-full px-5 mx-auto max-w-7xl">
      <div class="pb-[70px]">
        <span
          class="flex justify-center mb-3 text-lg font-bold text-center text-tg-primary-color"
          >We Can Do For You</span
        >
        <h2 class="text-center font-bold leading-[1.2] text-5xl">
          Experts in every aspect <br />
          lifecycle
        </h2>
      </div>

      <ul class="flex gap-[30px] flex-wrap">
        <li
          data-aos="fade-right"
          class="service-item max-w-[390px] w-full bg-tg-black-three px-[35px] py-[50px] rounded-[20px] hover:bg-tg-black"
        >
          <router-link
            class="mb-[22px] hover:text-tg-primary-color text-2xl font-bold"
            to="/"
            >Product Research</router-link
          >
          <img
            class="mb-6 service-item-img"
            src="@/assets/images/service/services_icon01.png"
            width=""
            height=""
            alt=""
          />
          <p class="service-item-text mb-4 leading-[1.8] text-tg-gray">
            Lorem ipsum dolor amet the any more dummy as consectetur.
            suspendisse a any aliquam tellus ultrices.
          </p>
          <router-link class="font-medium hover:text-tg-primary-color" to="/"
            >Find out more</router-link
          >
        </li>
        <li
          data-aos="fade-right"
          class="service-item max-w-[390px] w-full bg-tg-black-three px-[35px] py-[50px] rounded-[20px] hover:bg-tg-black"
        >
          <router-link
            class="mb-[22px] hover:text-tg-primary-color text-2xl font-bold"
            to="/"
            >UI/UX Design</router-link
          >
          <img
            class="mb-6 service-item-img"
            src="@/assets/images/service/services_icon02.png"
            width=""
            height=""
            alt=""
          />
          <p class="service-item-text mb-4 leading-[1.8] text-tg-gray">
            Lorem ipsum dolor amet the any more dummy as consectetur.
            suspendisse a any aliquam tellus ultrices.
          </p>
          <router-link class="font-medium hover:text-tg-primary-color" to="/"
            >Find out more</router-link
          >
        </li>
        <li
          data-aos="fade-right"
          class="service-item max-w-[390px] w-full bg-tg-black-three px-[35px] py-[50px] rounded-[20px] hover:bg-tg-black"
        >
          <router-link
            class="mb-[22px] hover:text-tg-primary-color text-2xl font-bold"
            to="/"
            >Web Development</router-link
          >
          <img
            class="mb-6 service-item-img"
            src="@/assets/images/service/services_icon03.png"
            width=""
            height=""
            alt=""
          />
          <p class="service-item-text mb-4 leading-[1.8] text-tg-gray">
            Lorem ipsum dolor amet the any more dummy as consectetur.
            suspendisse a any aliquam tellus ultrices.
          </p>
          <router-link class="font-medium hover:text-tg-primary-color" to="/"
            >Find out more</router-link
          >
        </li>
        <li
          data-aos="fade-right"
          class="service-item max-w-[390px] w-full bg-tg-black-three px-[35px] py-[50px] rounded-[20px] hover:bg-tg-black"
        >
          <router-link
            class="mb-[22px] hover:text-tg-primary-color text-2xl font-bold"
            to="/"
            >SEO Analytics</router-link
          >
          <img
            class="mb-6 service-item-img"
            src="@/assets/images/service/services_icon04.png"
            width=""
            height=""
            alt=""
          />
          <p class="service-item-text mb-4 leading-[1.8] text-tg-gray">
            Lorem ipsum dolor amet the any more dummy as consectetur.
            suspendisse a any aliquam tellus ultrices.
          </p>
          <router-link class="font-medium hover:text-tg-primary-color" to="/"
            >Find out more</router-link
          >
        </li>
        <li
          data-aos="fade-right"
          class="service-item max-w-[390px] w-full bg-tg-black-three px-[35px] py-[50px] rounded-[20px] hover:bg-tg-black"
        >
          <router-link
            class="mb-[22px] hover:text-tg-primary-color text-2xl font-bold"
            to="/"
            >Online Marketing</router-link
          >
          <img
            class="mb-6 service-item-img"
            src="@/assets/images/service/services_icon05.png"
            width=""
            height=""
            alt=""
          />
          <p class="service-item-text mb-4 leading-[1.8] text-tg-gray">
            Lorem ipsum dolor amet the any more dummy as consectetur.
            suspendisse a any aliquam tellus ultrices.
          </p>
          <router-link class="font-medium hover:text-tg-primary-color" to="/"
            >Find out more</router-link
          >
        </li>
        <li
          data-aos="fade-right"
          class="service-item max-w-[390px] w-full bg-tg-black-three px-[35px] py-[50px] rounded-[20px] hover:bg-tg-black"
        >
          <router-link
            class="mb-[22px] hover:text-tg-primary-color text-2xl font-bold"
            to="/"
            >Support Team</router-link
          >
          <img
            class="mb-6 service-item-img"
            src="@/assets/images/service/services_icon06.png"
            width=""
            height=""
            alt=""
          />
          <p class="service-item-text mb-4 leading-[1.8] text-tg-gray">
            Lorem ipsum dolor amet the any more dummy as consectetur.
            suspendisse a any aliquam tellus ultrices.
          </p>
          <router-link class="font-medium hover:text-tg-primary-color" to="/"
            >Find out more</router-link
          >
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.service-item {
  transition: 0.3s ease-in-out;
}
.service-item-img {
  transform: rotateY(0);
  transition: 0.5s;
}

.service-item:hover .service-item-img {
  transform: rotateY(180deg);
}

.service-item:hover .service-item-text {
  color: #9c9c9c;
  transition: 0.3s ease-in-out;
}
</style>
