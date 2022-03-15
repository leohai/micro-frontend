import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'vueApp', // app name registered
    entry: '//localhost:8080',
    container: '#vue-container',
    activeRule: '#/vue',
  },
  {
    name: 'angularApp',
    entry: '//localhost:5500/subApp/angularjs/www/index.html',
    container: '#angular-container',
    activeRule: '#/angular',
  },
]);

start({ sandbox: false });
createApp(App).use(store).use(router).mount('#app');
