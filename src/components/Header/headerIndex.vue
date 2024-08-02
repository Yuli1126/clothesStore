<template>
  <v-card class="mx-auto">
    <v-layout>
      <v-app-bar color="pa-4 bg-primary text-white">
        <v-app-bar-title>Clothes Store</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn class="ma-2">Crea Tu cuenta</v-btn>

        <v-btn class="ma-2">Iniciar sesión</v-btn>

        <v-btn icon class="pr-4">
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main> </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "HeaderBar",
  data() {
    return {
      title: "PRODUCTOS",
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
};
</script>

<style scoped>
.bg-primary {
  background-color: #3f51b5;
}

.text-white {
  color: #ffffff;
}
</style>
