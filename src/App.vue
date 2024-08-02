<template>
  <v-app>
    <v-main>
      <Index />
    </v-main>
  </v-app>
</template>

<script>
import Index from "./views/home/index.vue";
export default {
  name: "App",
  components: {
    Index,
  },
};
</script>
