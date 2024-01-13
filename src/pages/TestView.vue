<template>
  <div class="my-[86px]">
    <div class="bg-green-600">
      FETCHDATA
      {{ arr }}
    </div>
    <div class="bg-red-200">
      {{ applierStatuses }}
      VUEFIRE
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchData } from '@/composables/fetchData'
// import { fetchDataWithWhere } from '@/composables/fetchDataWithWhere'
import { onMounted, ref } from 'vue'
const applierStatuses = ref()
onMounted(async () => {
  // applierStatuses.value = await fetchData('applier_statuses')
  console.log(new Date().getSeconds(), '1')
  applierStatuses.value = [
    // await fetchData('applier_statuses'),
    // await fetchData('statuses'),
    // await fetchData('users'),
    // await fetchData('mail'),
    // await fetchData('vacancies'),
    // await fetchData('about'),
    // await fetchData('blog'),
    // await fetchData('services'),
    // await fetchData('tasks'),
    // await fetchData('portfolio'),
    // await fetchData('resume'),
    await fetchData('appliers'),
    // await fetchDataWithWhere('appliers', 'status_id', '==', '8nJTTRTAQephYvWWQNWx'),
  ]
  console.log(applierStatuses.value, 'applierStatuses.value')
  console.log(new Date().getSeconds(), '2')

  // console.log(applierStatuses.value, 'applierStatuses')
})

import { firebaseApp } from '@/firebase'
import { getFirestore, collection, query } from 'firebase/firestore'
import { useCollection } from 'vuefire'

const db = getFirestore(firebaseApp)
const todos = ref()
const todos2 = ref()
const todos3 = ref()
const todos4 = ref()
const todos5 = ref()
const todos6 = ref()
const todos7 = ref()
const todos8 = ref()
const todos9 = ref()
const todos10 = ref()
const todos11 = ref()
const todos12 = ref()
const arr = ref<any>([])

onMounted(async () => {
  const todosRef = query(collection(db, 'appliers'))
  const todosRef2 = query(collection(db, 'applier_statuses'))
  const todosRef3 = query(collection(db, 'users'))
  const todosRef4 = query(collection(db, 'mail'))
  const todosRef5 = query(collection(db, 'vacancies'))
  const todosRef6 = query(collection(db, 'portfolio'))
  const todosRef7 = query(collection(db, 'resume'))
  const todosRef8 = query(collection(db, 'blog'))
  const todosRef9 = query(collection(db, 'tasks'))
  const todosRef10 = query(collection(db, 'services'))
  const todosRef11 = query(collection(db, 'statuses'))
  const todosRef12 = query(collection(db, 'about'))
  todos.value = useCollection(todosRef)
  todos2.value = useCollection(todosRef2)
  todos3.value = useCollection(todosRef3)
  todos4.value = useCollection(todosRef4)
  todos5.value = useCollection(todosRef5)
  todos6.value = useCollection(todosRef6)
  todos7.value = useCollection(todosRef7)
  todos8.value = useCollection(todosRef8)
  todos9.value = useCollection(todosRef9)
  todos10.value = useCollection(todosRef10)
  todos11.value = useCollection(todosRef11)
  todos12.value = useCollection(todosRef12)
  arr.value = [
    todos.value,
    todos2.value,
    todos3.value,
    todos4.value,
    todos5.value,
    todos6.value,
    todos7.value,
    todos8.value,
    todos9.value,
    todos10.value,
    todos11.value,
    todos12.value,
  ]
  console.log(arr.value[10], 'arr.value')
})
</script>
