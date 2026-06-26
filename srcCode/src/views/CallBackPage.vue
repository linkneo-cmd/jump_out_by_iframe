<!-- src/views/CallbackPage.vue -->
<template>
  <div class="callback-page">
    <p v-if="isIframe">操作完成，即将返回...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isIframe = ref(false);

onMounted(() => {
  isIframe.value = window.self !== window.top;
  if (isIframe.value) {
    const message = {
      type: 'EXTERNAL_CALLBACK',
      ...route.query
    };
    console.log('CallbackPage mounted, sending message to parent:', message);
    setTimeout(() => {
      window.parent.postMessage(message, window.location.origin);
    }, 2000);
  }
});
</script>

<style scoped>
.callback-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 16px;
  color: #666;
}
</style>