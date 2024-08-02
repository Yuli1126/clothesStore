import { createApp } from "vue";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import App from "./App.vue";
// import vuetify from './plugins/vuetify'
// import { loadFonts } from '@/plugins/webfontloader'
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi", // Asegúrate de que el conjunto de iconos predeterminado sea 'mdi'
  },
  components,
  directives,
});

const app = createApp(App);
app.use(vuetify);
app.mount("#app");
