<template>
  <q-page>
    <grafico></grafico>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from "vue";
const grafico = defineAsyncComponent(() =>
  import("components/charts/grafico.vue")
);
export default {
  name: "PageStockGrafico",
  components: {
    grafico,
  },
};
</script>
