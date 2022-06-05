<template>
  <q-page>
    <div class="row items-center q-mt-md q-pa">
      <q-space />
      <q-btn color="green" @click="irgrafico">
        <q-icon
          size="35px"
          left
          name="img:https://cdn-icons-png.flaticon.com/512/4341/4341805.png"
        />
        <div>Grafico de Contabilidad</div>
      </q-btn>
    </div>
    <div class="row">
      <q-table
        @row-click="goTo"
        title="Stock de Productos"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :pagination="pagination"
        class="col"
      />
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
export default {
  name: "PageStock",
  data() {
    return {
      columns: [
        {
          name: "id",
          label: "id",
          align: "left",
          field: "id",
          sortable: true,
        },
        {
          name: "nombre",
          label: "Nombre",
          align: "left",
          field: "nombre",
          sortable: true,
        },
        {
          name: "cantidad",
          label: "Cantidad en Stock",
          align: "left",
          field: "cantidad",
          sortable: true,
        },
        {
          name: "compra",
          label: "Compra",
          align: "left",
          field: "compra",
          sortable: true,
        },
        {
          name: "venta",
          label: "Venta",
          align: "left",
          field: "venta",
          sortable: true,
        },
        {
          name: "ingresos",
          label: "Ingresos",
          align: "left",
          field: "ingresos",
          sortable: true,
        },
        {
          name: "costes",
          label: "Costes",
          align: "left",
          field: "costes",
          sortable: true,
        },
        {
          name: "beneficios",
          label: "Beneficios",
          align: "left",
          field: "beneficios",
          sortable: true,
        },
      ],
      pagination: {
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },
      rows: [],
    };
  },
  mounted() {
    this.getStock();
  },
  methods: {
    getStock() {
      this.$axios
        .get("http://localhost:8069/gestion/stock/moracorp.productos")
        .then((res) => {
          this.rows = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goTo(event, row) {
      this.$router.push("/producto/" + row.id);
    },
    irgrafico() {
      this.$router.push("/stock/grafico");
    },
  },
  setup() {
    return {
      slide: ref(1),
    };
  },
};
</script>
