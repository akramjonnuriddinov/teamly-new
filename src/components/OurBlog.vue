<template>
  <section class="bg-white relative our-blog pt-[135px] pb-[340px]">
    <div class="">
      <img
        class="absolute left-[2%] bottom-2"
        src="../assets/images/blog/blog_shape01.png"
        alt=""
      />
      <img
        class="absolute top-[20%] right-36"
        src="../assets/images/blog/blog_shape02.png"
        alt=""
      />
      <img
        class="absolute top-[40%] right-10"
        src="../assets/images/blog/blog_shape03.png"
        alt=""
      />
    </div>
    <div class="container relative z-10 max-w-7xl w-full mx-auto px-5">
      <div class="pb-[70px]">
        <span
          class="flex justify-center mb-3 text-lg font-bold text-center text-tg-primary-color"
          >Latest news updates
        </span>
        <h2 class="text-center font-bold leading-[1.2] text-5xl">
          Check Our Company
          <br />
          Inside Story
        </h2>
      </div>
      <div class="flex justify-center">
        <ul class="flex gap-7 flex-wrap gap-y-[280px] pb-10">
          <li class="bg-trasnparent relative blog-content rounded-[20px]">
            <div class="rounded-[20px] overflow-hidden w-full">
              <router-link :to="{ name: 'home' }">
                <img
                  class="blog-content-img max-w-[570px] w-full"
                  src="../assets/images/blog/blog01.jpg"
                  alt=""
                />
              </router-link>
            </div>
            <div
              class="blog-post-content flex-col absolute items-center py-[45px] px-[30px] max-w-[510px] w-full top-[100%] translate-y-[-100px] rounded-br-[100px] bg-tg-white"
            >
              <router-link
                class="uppercase text-tg-primary-color font-bold hover:text-tg-secondary-color transition-color duration-300 mb-2.5 flex"
                :to="{ name: 'home' }"
                >DIGITAL MARKETING</router-link
              >
              <h3
                class="mb-5 text-[30px] font-bold transition-color duration-300 leading-[1.2] hover:text-tg-primary-color"
              >
                <router-link :to="{ name: 'home' }">
                  Fintech Startup Will Finance The Women
                </router-link>
              </h3>
              <div class="text-tg-paragraph-color">
                <div class="flex mb-4">
                  <div class="flex mr-12">
                    <img
                      class="mr-2"
                      src="../assets/images/blog/calendar.svg"
                      alt=""
                    />
                    September 3, 2023
                  </div>
                  <div class="flex">
                    <img
                      class="mr-2"
                      src="../assets/images/blog/comments.svg"
                      alt=""
                    />
                    No Comments
                  </div>
                </div>
                <p class="leading-[1.8]">
                  Lorem ipsum dolor sit amet consectetur. Ut tellus suspendisse
                  nulla aliquam. Risus rutrum tellus eget ultrices pretium nisi
                  amet facilisis.
                </p>
              </div>
            </div>
          </li>
          <li class="bg-trasnparent relative blog-content rounded-[20px]">
            <div class="rounded-[20px] overflow-hidden w-full">
              <router-link :to="{ name: 'home' }">
                <img
                  class="blog-content-img max-w-[570px] w-full"
                  src="../assets/images/blog/blog02.jpg"
                  alt=""
                />
              </router-link>
            </div>
            <div
              class="blog-post-content flex-col absolute items-center py-[45px] px-[30px] max-w-[510px] w-full top-[100%] translate-y-[-100px] rounded-br-[100px] bg-tg-white"
            >
              <router-link
                class="uppercase text-tg-primary-color font-bold hover:text-tg-secondary-color transition-color duration-300 mb-2.5 flex"
                :to="{ name: 'home' }"
                >NEW IDEAS</router-link
              >
              <h3
                class="mb-5 text-[30px] font-bold transition-color duration-300 leading-[1.2] hover:text-tg-primary-color"
              >
                <router-link :to="{ name: 'home' }">
                  How Remarketing work any Get More
                </router-link>
              </h3>
              <div class="text-tg-paragraph-color">
                <div class="flex mb-4">
                  <div class="flex mr-12">
                    <img
                      class="mr-2"
                      src="../assets/images/blog/calendar.svg"
                      alt=""
                    />
                    September 3, 2023
                  </div>
                  <div class="flex">
                    <img
                      class="mr-2"
                      src="../assets/images/blog/comments.svg"
                      alt=""
                    />
                    No Comments
                  </div>
                </div>
                <p class="leading-[1.8]">
                  Lorem ipsum dolor sit amet consectetur. Ut tellus suspendisse
                  nulla aliquam. Risus rutrum tellus eget ultrices pretium nisi
                  amet facilisis.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style>
.blog-content-img {
  transform: scale(1);
  transition: 0.5s ease-in-out;
}

.blog-content:hover .blog-content-img {
  transform: scale(1.08);
}

.blog-post-content {
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.1);
}
</style>
