# jump_out_by_iframe
一种通过iframe，实现从当前页面跳转到外部url，然后再跳转回当前页面的方法。
### 适用场景：
当前页面跳转外部人脸识别url页，完成后，外部人脸识别页跳转回来。该方法不影响路由栈，也不会销毁原页面实例，无须做页面持久化缓存与恢复

npm install 后，npm run dev 启动项目
同时需要把srcCode/src/assets/outPage.html用live server打开，模拟跳转的一个外部页面