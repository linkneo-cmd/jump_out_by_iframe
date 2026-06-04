<template>
  <div>
    <h2>页面 A - 当前数据：{{ formData.name }}</h2>
    <button @click="goToB">去外部 B 页面</button>
    <p v-if="result">返回结果：{{ result }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useExternalPage } from '@/hooks/useExternalPage';

const formData = ref({ name: 'Initial' });
const result = ref(null);

const { openExternal } = useExternalPage();

async function goToB() {
  try {
    const data = await openExternal('http://127.0.0.1:5500/srcCode/src/assets/outPage.html', { timeout: 60000 });
    result.value = data.type;
    formData.value.name = data.type; // 更新表单数据
    console.log('外部返回的数据:', data);
  } catch (err) {
    console.error(err.message);
    alert('操作失败或已取消');
  }
}
</script>