require('./bootstrap');

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';

let app = createApp(App).use(store).use(router);

app.mount('#app');

store.dispatch('components/load');
store.dispatch('tempRanges/load');
store.dispatch('manufacturers/load');
store.dispatch('partStatuses/load');
store.dispatch('libraryRefs/load');
store.dispatch('footprints/load');
