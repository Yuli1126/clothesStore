<template>
  <div>
    <v-card class="px-2 py-2">
      <p class="text-h8 font-weight-black mt-2 ml-2 color-letter">Categorias</p>
      <v-row>
        <v-col v-for="(category, index) in categories" :key="index" cols="6" md="12">
          <v-checkbox
            :label="category.name"
            v-model="category.selected"
            hide-details
            class="mb-n4 ml-4"
            @change="updateProducts"
          />
        </v-col>
      </v-row>
      <p class="text-h8 font-weight-black mt-2 ml-2 color-letter">Marcas</p>
      <v-row>
        <v-col v-for="(brand, index) in brands" :key="index"  cols="6" md="12">
          <v-checkbox
            :label="brand.name"
            v-model="brand.selected"
            hide-details
            class="mb-n4 ml-4"
            @change="updateProducts"
          />
        </v-col>
      </v-row>
      <p class="text-h8 font-weight-black mt-2 ml-2 mb-4 color-letter">
        Precios
      </p>
      <v-row>
        <v-col cols="4">
          <v-text-field
            density="compact"
            placeholder="Mínimo"
            variant="outlined"
            class="ml-4"
            v-model="minPrice"
          ></v-text-field>
        </v-col>
        <v-col cols="2" class="text-center">
          <span> _ </span>
        </v-col>
        <v-col cols="4">
          <v-text-field
            density="compact"
            placeholder="Máximo"
            variant="outlined"
            class="mr-4"
            v-model="maxPrice"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn
            icon
            density="compact"
            class="align-items-center"
            style="background-color: #3f51b5"
            @click="updateProducts"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <p class="text-h8 font-weight-black mt-2 ml-2 color-letter">Reviews</p>
      <v-rating
        value="1"
        v-model="rating"
        length="5"
        color="yellow"
        background-color="grey lighten-1"
        dense
        hover
        @click="updateProducts"
      >
      </v-rating>
      <p class="text-h8 font-weight-black mt-2 ml-2 color-letter">Favoritos</p>
      <v-row class="ml-2 my-2">
        <v-switch
          v-model="favorite"
          label="Solo favoritos"
          hide-details
          inset
          color="#3f51b5"
        ></v-switch>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import categoriesJson from "@/data/categories.json";
import brandsJson from "@/data/brands.json";

export default {
  name: "Filter",
  data() {
    return {
      categories: [],
      selectedCategories: [],
      minPrice: "",
      maxPrice: "",
      favorite: "",
      brand: "",
      rating: 0,
      brands: [],
      favorite: false,
    };
  },
  created() {
    this.categories = categoriesJson;
    this.brands = brandsJson;
  },
  watch: {
    favorite() {
      this.$emit("filter-favorite", this.favorite);
    },
  },
  methods: {
    updateProducts() {
      const minimun = this.minPrice === "" ? 0 : this.minPrice;
      const maximun = this.maxPrice === "" ? Infinity : this.maxPrice;
      this.$emit(
        "filter-products",
        this.categories,
        minimun,
        maximun,
        this.brands,
        this.rating
      );
    },
  },
};
</script>

<style scoped>
.color-letter {
  color: #3f51b5;
}
</style>
