<template>
  <q-page>
    <div class="row items-center q-mt-md q-pa q-gutter-sm">
      <q-space />
      <q-btn color="purple" @click="ircrear">
        <q-icon
          size="35px"
          left
          name="img:https://cdn-icons-png.flaticon.com/512/925/925036.png"
        />
        <div>Crear Compra</div>
      </q-btn>
    </div>
    <div class="row">
      <q-table
        @row-click="goTo"
        title="Compras"
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
  name: "PageCompras",
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
          name: "n_transaccion",
          label: "Nº de Transaccion",
          align: "left",
          field: "n_transaccion",
          sortable: true,
        },
        {
          name: "proveedor",
          label: "Nombre del Proveedor",
          align: "left",
          field: "proveedor",
          sortable: true,
        },
        {
          name: "fecha_compra",
          label: "Fecha de Compra",
          align: "left",
          field: "fecha_compra",
          sortable: true,
        },
        {
          name: "fecha_entrega",
          label: "Fecha de Entrega",
          align: "left",
          field: "fecha_entrega",
          sortable: true,
        },
        {
          name: "producto",
          label: "Producto",
          align: "left",
          field: "producto",
          sortable: true,
        },
        {
          name: "precio_unidad",
          label: "Precio por Unidad sin IVA",
          align: "left",
          field: "precio_unidad",
          sortable: true,
        },
        {
          name: "porcentaje_iva",
          label: "Porcentaje de IVA",
          align: "left",
          field: "porcentaje_iva",
          sortable: true,
        },
        {
          name: "precio_iva",
          label: "Precio por Unidad con IVA",
          align: "left",
          field: "precio_iva",
          sortable: true,
        },
        {
          name: "cantidad",
          label: "Cantidad",
          align: "left",
          field: "cantidad",
          sortable: true,
        },
        {
          name: "precio_total",
          label: "Precio Total de la Compra",
          align: "left",
          field: "precio_total",
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
    this.getCompras();
  },
  methods: {
    getCompras() {
      this.$axios
        .get("http://localhost:8069/gestion/compras/moracorp.compras")
        .then((res) => {
          this.rows = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goTo(event, row) {
      this.$router.push("/compras/" + row.id);
    },
    ircrear() {
      this.$router.push("/compras/crear");
    },
  },
  setup() {
    return {};
  },
};
</script>
