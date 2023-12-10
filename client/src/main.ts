import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import stores from "@/stores";

import QuillEditor from "vue3-quill-editor-vite";
import "vue3-quill-editor-vite/dist/style.css";

// import './assets/base.css'
// import './assets/main.css'

const app = createApp(App);

app.use(stores);
app.use(router);

app.use(QuillEditor);

app.mount("#app");
