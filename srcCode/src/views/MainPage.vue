<template>
  <div>
    <h2>页面 A - 当前数据：{{ formData.name }}</h2>
    <button @click="goToB">去外部 B 页面</button>
    <button @click="goToBNew">去外部 B 页面（新方法）</button>
    <p v-if="result">返回结果：{{ result }}</p>
    <p v-if="result">返回结果（新）：{{ result }}</p>
    <ExternalOverlayNew
      ref="externalOverlayNew"
      @close="getResult"
    ></ExternalOverlayNew>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useExternalPage } from '@/hooks/useExternalPage';
import ExternalOverlayNew from '@/components/ExternalOverlayNew.vue';
const formData = ref({ name: 'Initial' });
const result = ref(null);
const externalOverlayNew = ref(null) // 与模板中 ref 属性名一致
const { openExternal } = useExternalPage();

async function goToB() {
  try {
    const data = await openExternal('http://127.0.0.1:5500/srcCode/src/assets/outPage.html?type=1', { timeout: 60000 });
    result.value = data.type;
    formData.value.name = data.type; // 更新表单数据
    console.log('外部返回的数据:', data);
  } catch (err) {
    console.error(err.message);
    alert('操作失败或已取消');
  }
}
async function goToBNew() {
  try {
    console.log("获取子组件元素", externalOverlayNew);
    externalOverlayNew.value.changeshowOverlayNew();
  } catch (err) {
    console.error(err.message);
    alert('操作失败或已取消');
  }
}
function getResult(data) {
  result.value = data.type;
  formData.value.name = data.type; // 更新表单数据
  console.log('外部返回的数据（新方法）:', data);
}
</script>