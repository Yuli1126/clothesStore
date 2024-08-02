<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3">
        <filterComp
          @filter-products="filterProducts"
          @filter-favorite="filterFavorite"
        />
      </v-col>
      <v-col cols="12" md="9" class="pr-5">
        <v-container class="d-flex align-center pe-2">
          <v-text-field
            v-model="filterName"
            density="compact"
            label="Encuentra el producto que necesitas"
            prepend-inner-icon="mdi-magnify"
            variant="solo"
            flat
            hide-details
            single-line
            class="mb-4"
          ></v-text-field>
        </v-container>

        <v-row v-if="products.length > 0">
          <v-col
            v-for="product in products"
            :key="product.id"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card class="h-100 px-3 py-3">
              <v-icon
                v-if="isFavorite(product)"
                @click="toggleFavorite(product)"
                color="red"
                >mdi-heart</v-icon
              >
              <v-icon v-else @click="toggleFavorite(product)"
                >mdi-heart-outline</v-icon
              >
              <v-img
                :src="product.images[0]"
                height="200px"
                @click="openModal(product)"
              ></v-img>
              <v-row class="mt-2">
                <v-col cols="6">
                  <span
                    class="ml-1 font-weight-black"
                    @click="openModal(product)"
                    >{{ product.title }}</span
                  >
                </v-col>
                <v-col cols="6" class="text-right">
                  <span class="mr-3 font-weight-black"
                    >${{ product.price }}</span
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-rating
                    v-model="product.rating"
                    length="5"
                    color="yellow"
                    background-color="grey lighten-1"
                    class="custom-rating ml-3"
                    density="compact"
                    readonly
                  >
                  </v-rating>
                </v-col>
                <v-col class="text-right">
                  <v-btn
                    class="mr-3"
                    color="#3f51b5"
                    style="font-size: 11px;"
                    @click="openModal(product)"
                    >Lo Quiero</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-alert border="start" color="#3f51b5" variant="tonal" class="mx-3">
            No se encontraron productos
          </v-alert>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="headline color-letter font-weight-black">{{
        selectedProduct.title
      }}</v-card-title>
      <v-card-title class="align-right"
        >Price: ${{ selectedProduct.price }}</v-card-title
      >
      <v-card-title class="align-right"
        >Category: {{ selectedProduct.category.name }}</v-card-title
      >
      <v-card-title class="align-right"
        >Brand: {{ selectedProduct.brand.name }}</v-card-title
      >
      <v-card-text>
        <v-img :src="selectedProduct.images[0]" height="200px"></v-img>
        <p class="mt-4">{{ selectedProduct.description }}</p>
        <v-row class="pl-2 my-2">
          <v-rating
            v-model="selectedProduct.rating"
            length="5"
            color="yellow"
            background-color="grey lighten-1"
            class="custom-rating"
            density="compact"
            readonly
          >
          </v-rating>
        </v-row>
        <v-btn class="justify-content-center align-left mt-4" color="#3f51b5"
          >Comprar a Crédito</v-btn
        >
      </v-card-text>
      <v-row class="px-4">
        <v-col class="text-center">
          <span class="text-h8 font-weight-black mt-2 ml-2 color-letter"
            >Productos relacionados</span
          >
        </v-col>
        <v-carousel hide-delimiters height="200px">
          <v-carousel-item
            v-for="(item, i) in productsCategory"
            :key="i"
            :src="item.images[0]"
            height="200px"
          ></v-carousel-item>
        </v-carousel>
      </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#3f51b5" @click="closeModal">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import productsJson from "@/data/products.json";
import filterComp from "@/components/Filter/filter.vue";
export default {
  name: "ProductList",
  components: {
    filterComp,
  },
  data() {
    return {
      products: [],
      productsFilter: [],
      search: "",
      filterName: "",
      categoriesLocal: [],
      minPriceLocal: 0,
      maxPriceLocal: Infinity,
      brandsLocal: [],
      ratingLocal: 0,
      selectedProduct: {},
      dialog: false,
    };
  },
  watch: {
    filterName() {
      this.filterProducts(
        this.categoriesLocal,
        this.minPriceLocal,
        this.maxPriceLocal,
        this.brandsLocal,
        this.ratingLocal
      );
    },
  },
  created() {
    this.products = productsJson;
    this.productsFilter = productsJson;
  },
  computed: {
    productsCategory() {
      const productsCat = this.productsFilter.filter((product) => {
        return (
          product.id !== this.selectedProduct.id &&
          product.category.id === this.selectedProduct.category.id
        );
      });
      return productsCat;
    },
  },
  methods: {
    openModal(product) {
      this.selectedProduct = product;
      this.dialog = true;
    },
    closeModal() {
      this.dialog = false;
    },
    isFavorite(product) {
      return product.isFavorite;
    },
    toggleFavorite(product) {
      product.isFavorite = !product.isFavorite;
    },
    async filterProducts(categories, minPrice, maxPrice, brands, rating) {
      const nameFilter = this.filterName
        ? new RegExp(this.filterName, "i")
        : null;
      this.categoriesLocal = categories;
      this.minPriceLocal = minPrice;
      this.maxPriceLocal = maxPrice;
      this.brandsLocal = brands;
      this.ratingLocal = rating;

      const selectedCategories = this.categoriesLocal
        .filter((category) => category.selected)
        .map((category) => category.id);
      const selectedBrands = this.brandsLocal
        .filter((brand) => brand.selected)
        .map((brand) => brand.id);

      this.products = this.productsFilter.filter((product) => {
        const isInCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(product.category.id);
        const isInPriceRange =
          product.price >= this.minPriceLocal &&
          product.price <= this.maxPriceLocal;
        const isInBrand =
          selectedBrands.length === 0 ||
          selectedBrands.includes(product.brand.id);
        const isInRating =
          this.ratingLocal === 0 || product.rating === this.ratingLocal;
        const matchesName = nameFilter ? nameFilter.test(product.title) : true;

        return (
          isInCategory &&
          isInPriceRange &&
          isInBrand &&
          matchesName &&
          isInRating
        );
      });
    },
    async filterFavorite(favorite) {
      if (favorite) {
        this.products = this.productsFilter.filter((product) => {
          return product.isFavorite;
        });
      } else {
        this.filterProducts(
          this.categoriesLocal,
          this.minPriceLocal,
          this.maxPriceLocal,
          this.brandsLocal,
          this.ratingLocal
        );
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}

.color-letter {
  color: #3f51b5;
}
.v-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.flex-grow-1 {
  flex-grow: 1;
}

.mt-auto {
  margin-top: auto;
}

</style>
