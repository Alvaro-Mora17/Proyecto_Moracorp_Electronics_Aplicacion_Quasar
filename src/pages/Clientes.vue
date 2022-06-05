<template>
  <q-page>
    <div class="row items-center q-mt-md q-pa">
      <q-space />
      <q-btn color="deep-purple-4" @click="ircrear">
        <q-icon
          size="35px"
          left
          name="img:https://cdn-icons-png.flaticon.com/512/3557/3557291.png"
        />
        <div>Crear Cliente</div>
      </q-btn>
    </div>
    <div class="row">
      <q-table
        @row-click="goTo"
        title="Clientes"
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
  name: "PageClientes",
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
          name: "nif",
          label: "Numero de Identificacion Fiscal(NIF)",
          align: "left",
          field: "nif",
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
          name: "fecha_registro",
          label: "Fecha de Registro",
          align: "left",
          field: "fecha_registro",
          sortable: true,
        },
        {
          name: "direccion",
          label: "Direccion",
          align: "left",
          field: "direccion",
          sortable: true,
        },
        {
          name: "telefono",
          label: "Telefono",
          align: "left",
          field: "telefono",
          sortable: true,
        },
        {
          name: "email",
          label: "Email",
          align: "left",
          field: "email",
          sortable: true,
        },
        {
          name: "codigo_postal",
          label: "Codigo Postal",
          align: "left",
          field: "codigo_postal",
          sortable: true,
        },
        {
          name: "localizacion",
          label: "Localizacion",
          align: "left",
          field: "localizacion",
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
    this.getClientes();
  },
  methods: {
    getClientes() {
      this.$axios
        .get("http://localhost:8069/gestion/clientes/moracorp.clientes")
        .then((res) => {
          this.rows = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goTo(event, row) {
      this.$router.push("/clientes/" + row.id);
    },
    ircrear() {
      this.$router.push("/clientes/crear");
    },
  },
  setup() {
    return {};
  },
};
</script>
