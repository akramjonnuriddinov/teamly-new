<template>
  <div id="preloader" class="preloader-bg">
    <div class="loader-center">
      <slot></slot>
    </div>
  </div>
</template>

<style>
#preloader {
  background-color: #fff;
  opacity: 1;
  height: 100%;
  width: 100%;
  position: fixed;
  margin-top: 0px;
  top: 0px;
  z-index: 999;
}
.loader-center {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
