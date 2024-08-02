<template>
  <div>
    <Header />
    <Products />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header/headerIndex.vue";
import Products from "@/components/products.vue";
import Footer from "@/components/Footer/footerIndex.vue";

export default {
  name: "Index",
  components: {
    Header,
    Footer,
    Products,
  },
};
</script>
