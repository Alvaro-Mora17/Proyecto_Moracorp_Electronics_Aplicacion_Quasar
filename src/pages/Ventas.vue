<template>
  <q-page>
    <div class="row items-center q-mt-md q-pa q-gutter-sm">
      <q-space />
      <q-btn color="red" @click="ircrear_venta">
        <q-icon
          size="35px"
          left
          name="img:https://cdn-icons-png.flaticon.com/512/3028/3028956.png"
        />
        <div>Crear Venta</div>
      </q-btn>
      <q-btn color="red" @click="ircrear">
        <q-icon
          size="35px"
          left
          name="img:https://cdn-icons-png.flaticon.com/512/4222/4222025.png"
        />
        <div>Crear Transaccion de Venta</div>
      </q-btn>
      <q-btn color="red" @click="irtransacciones">
        <q-icon
          size="35px"
          left
          name="img:https://cdn-icons-png.flaticon.com/512/781/781760.png"
        />
        <div>Ver Transacciones de Venta</div>
      </q-btn>
    </div>
    <div class="row">
      <q-table
        @row-click="goTo"
        title="Ventas"
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
  name: "PageVentas",
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
          name: "fecha_compra",
          label: "Fecha de Venta",
          align: "left",
          field: "fecha_compra",
          sortable: true,
        },
        {
          name: "cliente",
          label: "Cliente",
          align: "left",
          field: "cliente",
          sortable: true,
        },
        {
          name: "productos",
          label: "Productos",
          align: "left",
          field: "productos",
          sortable: true,
        },
        {
          name: "precio_venta",
          label: "Precio Total de la Venta",
          align: "left",
          field: "precio_venta",
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
    this.getVentas();
  },
  methods: {
    getVentas() {
      this.$axios
        .get("http://localhost:8069/gestion/ventas/moracorp.ventas")
        .then((res) => {
          this.rows = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goTo(event, row) {
      this.$router.push("/ventas/" + row.id);
    },
    irtransacciones() {
      this.$router.push("/transacciones");
    },
    ircrear() {
      this.$router.push("/transacciones/crear");
    },
    ircrear_venta() {
      this.$router.push("/ventas/crear");
    },
  },
  setup() {
    return {};
  },
};
</script>
