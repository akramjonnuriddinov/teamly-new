<template>
  <div
    class="h-[80%] overflow-y-auto modal modal--login"
    id="loginModal"
    role="dialog"
    aria-labelledby="loginModalTrigger"
  >
    <div class="modal__overlay" data-plugin="MODAL_TRIGGER" href="#loginModal"></div>
    <div class="overflow-y-auto modal__inner">
      <div class="modal__header">
        <button class="modal__close" data-plugin="MODAL_TRIGGER" href="#loginModal" aria-label="Close">×</button>
        <h4 class="modal__title">Welcome back!</h4>
      </div>
      <form name="login" class="modal-form modal__body" data-plugin="login">
        <label for="login-email" class="screen-reader-text">Email Address</label>
        <input type="email" name="email" id="login-email" placeholder="Email" />
        <label for="login-password" class="screen-reader-text">Password</label>
        <input type="password" name="password" id="login-password" placeholder="Password" />
        <p class="hidden alert alert-danger"></p>
        <button type="submit" class="modal-form__submit">Sign In</button>
        <div class="modal-form__footer">
          <a href="#passwordResetModal" data-plugin="MODAL_TRIGGER"> Forgot password? </a>
        </div>
      </form>
      <form name="login" class="modal-form modal__body" data-plugin="login">
        <label for="login-email" class="screen-reader-text">Email Address</label>
        <input type="email" name="email" id="login-email" placeholder="Email" />
        <label for="login-password" class="screen-reader-text">Password</label>
        <input type="password" name="password" id="login-password" placeholder="Password" />
        <p class="hidden alert alert-danger"></p>
        <button type="submit" class="modal-form__submit">Sign In</button>
        <div class="modal-form__footer">
          <a href="#passwordResetModal" data-plugin="MODAL_TRIGGER"> Forgot password? </a>
        </div>
      </form>
      <form name="login" class="modal-form modal__body" data-plugin="login">
        <label for="login-email" class="screen-reader-text">Email Address</label>
        <input type="email" name="email" id="login-email" placeholder="Email" />
        <label for="login-password" class="screen-reader-text">Password</label>
        <input type="password" name="password" id="login-password" placeholder="Password" />
        <p class="hidden alert alert-danger"></p>
        <button type="submit" class="modal-form__submit">Sign In</button>
        <div class="modal-form__footer">
          <a href="#passwordResetModal" data-plugin="MODAL_TRIGGER"> Forgot password? </a>
        </div>
      </form>
      <form name="login" class="modal-form modal__body" data-plugin="login">
        <label for="login-email" class="screen-reader-text">Email Address</label>
        <input type="email" name="email" id="login-email" placeholder="Email" />
        <label for="login-password" class="screen-reader-text">Password</label>
        <input type="password" name="password" id="login-password" placeholder="Password" />
        <p class="hidden alert alert-danger"></p>
        <button type="submit" class="modal-form__submit">Sign In</button>
        <div class="modal-form__footer">
          <a href="#passwordResetModal" data-plugin="MODAL_TRIGGER"> Forgot password? </a>
        </div>
      </form>
      <div class="modal__outside">
        Don't have an account yet? <a href="#signupModal" data-plugin="MODAL_TRIGGER">Sign up</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.modal {
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  visibility: visible;
  width: 100%;
  z-index: 9999;
  padding: 100px;
}

.modal__overlay {
  background: rgba(0, 0, 0, 0.8);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  transition: 0.4s ease-in-out;
  width: 100%;
  z-index: -1;
}

.modal__inner {
  background: #fff;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  left: 50%;
  max-width: 375px;
  padding: 30px 40px;
  position: absolute;
  /* top: 100%; */
  transform: translateX(-50%);
  width: 100%;
}
.modal__close {
  background-color: transparent;
  border: 0;
  font-size: 20px;
  font-weight: 600;
  outline: none;
  position: absolute;
  right: 20px;
  top: 20px;
}
.modal__title {
  color: #090b17;
  font-family: Circular, Arial, sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  margin-bottom: 20px;
  text-align: center;
}
.modal-form__social,
.modal-form__socialbutton {
  align-items: center;
  display: flex;
  justify-content: center;
}
.modal-form__socialbutton--twitter {
  background-color: #1da1f2;
}
.modal-form__socialbutton {
  border-radius: 4px;
  box-shadow: 0 0 20px 0 rgba(11, 7, 110, 0.08);
  cursor: pointer;
  height: 48px;
  margin: 0 8px;
  transition: all 0.3s ease;
  width: 48px;
}
.modal-form__social,
.modal-form__socialbutton {
  align-items: center;
  display: flex;
  justify-content: center;
}
.modal-form__socialbutton img {
  max-height: 20px;
}
img {
  height: auto;
}
iframe,
img {
  max-width: 100%;
}
.modal-form__or {
  align-items: center;
  display: flex;
  font-size: 14px;
  font-weight: 400;
  margin: 15px 0;
}
.modal-form__or:before {
  margin-right: 10px;
}

.modal-form__or:after,
.modal-form__or:before {
  border-bottom: 1px solid #ccc;
  content: '';
  flex: 0 1 50%;
  height: 4px;
  position: relative;
}
.screen-reader-text {
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(50%);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  width: 1px;
  word-wrap: normal !important;
}
.modal-form input {
  font-size: 14px;
  height: 46px;
  margin-bottom: 8px;
}

input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #fff;
  border: 1px solid #dae2f2;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  color: #676e8b;
  display: inline-block;
  font-family: Circular, Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  outline: none;
  padding: 18px;
  width: 100%;
}
.modal-form__submit {
  background: #5340ff;
  border: none;
  color: #fff;
  display: inline-block;
  font-family: Circular, Arial, sans-serif;
  font-weight: 300;
  transition: all 0.2s ease-in-out;
  border-radius: 4px;
  font-size: 14px;
  height: 48px;
  line-height: 18px;
  padding: 15px 40px;
  width: 100%;
}
</style>
