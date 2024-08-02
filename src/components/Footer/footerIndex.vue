<template>
  <v-footer class="pa-4 bg-primary text-white oval-top-footer">
    <v-container>
      <v-row align="center" justify="space-between">
        <v-col cols="auto">
          <strong>Síguenos en nuestras redes sociales:</strong>
        </v-col>
        <v-col cols="auto" class="text-center">
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-2"
            :icon="icon"
            variant="text"
            size="large"
          >
            <v-icon :icon="icon"></v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center mt-4">
          <span>{{ new Date().getFullYear() }}</span> - Clothes Store - Todos
          los derechos reservados
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
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

.v-btn {
  border-radius: 50%;
}

.v-btn .v-icon {
  font-size: 1.5rem;
}

.oval-top-footer {
  position: relative;
  background-color: #3f51b5;
  padding: 20px;
  max-width: auto;
  margin: 0 auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;
}
</style>
