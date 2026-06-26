// composables/useExternalPage.js
import { ref, onUnmounted } from 'vue';
import { createApp } from 'vue';
import ExternalOverlay from '@/components/ExternalOverlay.vue';

export function useExternalPage() {
  // 保存当前活动的覆盖层实例及相关清理引用
  const overlayApp = ref(null);
  const overlayDom = ref(null);
  const cleanupRef = ref(null);

  /**
   * 打开外部页面（全屏 iframe）
   * @param {string} url 外部页面 URL
   * @param {object} options { timeout }
   * @returns {Promise<any>}
   */
  function openExternal(url, { timeout = 0 } = {}) {
    // 如果已有实例，先销毁
    if (overlayApp.value) {
      destroyOverlay();
    }

    return new Promise((resolve, reject) => {
      // 1. 创建挂载点
      const mountNode = document.createElement('div');
      document.body.appendChild(mountNode);
      overlayDom.value = mountNode;

      // 2. 创建 Vue 3 应用实例并挂载组件
      const app = createApp(ExternalOverlay, {
        url: url,
      });
      app.mount(mountNode);

      // 保存应用实例
      overlayApp.value = app;

      // 3. 定义清理函数（具名函数，方便解除监听）
      function cleanup() {
        if (cleanup.called) return;
        cleanup.called = true;

        window.removeEventListener('message', messageHandler);
        if (timer) clearTimeout(timer);

        if (overlayDom.value) {
          // 卸载 Vue 应用
          app.unmount();
          // 移除根 DOM 元素（unmount 不会自动删除挂载点）
          if (overlayDom.value.parentNode) {
            overlayDom.value.parentNode.removeChild(overlayDom.value);
          }
          overlayDom.value = null;
        }
        overlayApp.value = null;
      }

      // 4. 消息监听
      function messageHandler(event) {
        if (event.origin !== window.location.origin) return;
        if (!event.data || event.data.type !== '1') return;
        cleanup();
        resolve(event.data);
      }
      window.addEventListener('message', messageHandler);

      // 5. 超时处理
      let timer = null;
      if (timeout > 0) {
        timer = setTimeout(() => {
          cleanup();
          reject(new Error('外部页面操作超时'));
        }, timeout);
      }

      // 保存 cleanup 引用，便于组件卸载时兜底
      cleanupRef.value = cleanup;
    });
  }

  /** 外部可主动销毁覆盖层（例如路由切换时） */
  function destroyOverlay() {
    if (cleanupRef.value) {
      cleanupRef.value();
      cleanupRef.value = null;
    }
  }

  // 当使用该组合式函数的组件卸载时，自动清理覆盖层
  onUnmounted(() => {
    destroyOverlay();
  });

  return {
    openExternal,
    destroyOverlay
  };
}