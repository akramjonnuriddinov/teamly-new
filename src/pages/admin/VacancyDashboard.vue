<template>
  <Suspense>
    <section class="my-[100px] py-[100px]">
      <div
        class="container relative px-5 mx-auto max-w-7xl max-xl:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
      >
        <h1>Vacancy Admin</h1>
      </div>
    </section>
  </Suspense>
</template>

<script setup lang="ts">
// import { ref, onMounted } from "vue"
// import { collection, query, getDocs } from "firebase/firestore"
// import { useFirestore } from "vuefire"

// const db = useFirestore()
// const q = query(collection(db, "vacancies"))

// const cafeCollection = ref([]) as any

// onMounted(async () => {
//   const querySnapshot = await getDocs(q)
//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data())
//     cafeCollection.value.push(doc.data())
//   })
// })

// console.log("cafeCollection: ", cafeCollection.value)
</script>
