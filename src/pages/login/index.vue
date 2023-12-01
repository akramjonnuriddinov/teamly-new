<template>
<section class="bg-gray-50">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
          Teamly
      </a>
      <div v-if="isCreated" class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input v-model="user.email" type="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input v-model="user.password" type="password" name="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="">
                  </div>
                  <button @click.prevent="signIn" type="submit" class="w-full border border-gray-300 text-primary-600 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                  <p class="text-sm font-light text-gray-500 ">
                      Don’t have an account yet? <a @click="isCreated = false" href="#" class="font-medium text-primary-600 hover:underline">Sign up</a>
                  </p>
              </form>
          </div>
      </div>
      <div v-else  class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Create an account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                <div>
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Your name</label>
                      <input v-model="newUser.name" type="text" name="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"  required="">
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input v-model="newUser.email" type="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input v-model="newUser.password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="">
                  </div>
                  <button @click.prevent="signUp" type="submit" class="w-full border border-gray-300 text-primary-600 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign up</button>
                  <p class="text-sm font-light text-gray-500 ">
                      You already have an account ?<a @click="isCreated = true" href="#" class="font-medium text-primary-600 hover:underline">Sign in</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
</template>

<script setup lang="ts">

// import {
//   getAuth,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";


// const email = ref("")
// const password = ref("")


// const register = async() => {
//   try {
//     const data = await createUserWithEmailAndPassword(getAuth(), email.value, password.value);
//     console.log('Successfully registered!', data);
//   } catch (error: any) {
//       console.log(error.code);
//     }
// }

// const registerWithGoogle = () => {

// }
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { useFirestore } from 'vuefire'
import { setDoc, doc } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useRouter } from 'vue-router';

const store = useAuthStore();
const router = useRouter();
const db = useFirestore()
const isCreated = ref(true)
const newUser = ref({
  email: "",
  name: "",
  password: "",
});


const signUp = async (): Promise<void> => {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      newUser.value.email,
      newUser.value.password
    );

    const user = userCredential.user;
    await updateProfile(user, {
      displayName: newUser.value.name,
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const newUser = ref({
          id: user.uid,
          name: user.displayName,
          email: user.email,
        });
        store.signIn(auth.currentUser);
        const colRef = doc(db, "users", user.uid);
        setDoc(colRef, newUser.value);
      }
    });
    router.push('/');
  } catch (error) {
    console.log(error);
    newUser.value.name = ''
    newUser.value.email = ''
    newUser.value.password = ''
  }
};


const user = ref({
  email: "",
  password: "",
});

const signIn = async () => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, user.value.email, user.value.password);
    store.signIn(userCredential.user);
    router.push('/')
  } catch (error) {
    console.log(error);
  }
};

</script>
