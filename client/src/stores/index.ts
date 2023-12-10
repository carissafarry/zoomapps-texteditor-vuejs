import { createPinia } from "pinia";
import { markRaw } from "vue";
import router from "@/router";

// Configuration for Pinia State Management
const stores = createPinia();

// For directly access from Pinia store files
stores.use(({ store }) => {
  store.router = markRaw(router);
});

export default stores;
