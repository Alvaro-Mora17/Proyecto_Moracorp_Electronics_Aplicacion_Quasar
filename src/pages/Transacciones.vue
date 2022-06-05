<template>
  <q-page>
    <br />
    <br />
    <br />
    <div class="row">
      <q-table
        @row-click="goTo"
        title="Transacciones de Venta"
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
  name: "PageTransaccionesVenta",
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
          name: "producto",
          label: "Producto Vendido",
          align: "left",
          field: "producto",
          sortable: true,
        },
        {
          name: "cantidad_vendida",
          label: "Cantidad Vendida",
          align: "left",
          field: "cantidad_vendida",
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
    this.getTransacciones();
  },
  methods: {
    getTransacciones() {
      this.$axios
        .get(
          "http://localhost:8069/gestion/ventas/transacciones/moracorp.transaccion_venta"
        )
        .then((res) => {
          this.rows = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goTo(event, row) {
      this.$router.push("/transacciones/" + row.id);
    },
  },
  setup() {
    return {};
  },
};
</script>
