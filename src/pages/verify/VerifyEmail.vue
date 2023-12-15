<template>
  <div>
    <h1>id: {{ id }}</h1>
    <div v-if="userInfo">
      <p>Name: {{ userInfo.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire'

const db = useFirestore()
const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const userInfo = ref(null);

onMounted(async () => {
  const docRef = doc(db, 'users', props.id);
  try {
    const userSnapshot = await getDoc(docRef);
    let userData = userSnapshot.data();
    userData = { ...userData, verified: true };

    await updateDoc(docRef, userData);

    userInfo.value = userData;
    console.log(userInfo.value);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
});
</script>
