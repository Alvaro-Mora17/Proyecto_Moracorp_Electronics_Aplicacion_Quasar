<template>
  <q-page>
    <div class="row items-center q-mt-md q-pa">
      <q-space />
      <q-btn color="amber-5" @click="ircrear">
        <q-icon
          size="35px"
          left
          name="img:https://cdn-icons-png.flaticon.com/512/4394/4394557.png"
        />
        <div>Crear Proveedor</div>
      </q-btn>
    </div>
    <div class="row">
      <q-table
        @row-click="goTo"
        title="Proveedores"
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
  name: "PageProveedores",
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
          name: "cif",
          label: "Codigo de Identificacion Fiscal(CIF)",
          align: "left",
          field: "cif",
          sortable: true,
        },
        {
          name: "nombre",
          label: "Nombre del Proveedor",
          align: "left",
          field: "nombre",
          sortable: true,
        },
        {
          name: "fecha_fundacion",
          label: "Fecha de Fundacion",
          align: "left",
          field: "fecha_fundacion",
          sortable: true,
        },
        {
          name: "tipo_sociedad",
          label: "Tipo Sociedad",
          align: "left",
          field: "tipo_sociedad",
          sortable: true,
        },
        {
          name: "direccion",
          label: "Direccion del Proveedor",
          align: "left",
          field: "direccion",
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
          name: "sede",
          label: "Sede Central",
          align: "left",
          field: "sede",
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
    this.getProveedores();
  },
  methods: {
    getProveedores() {
      this.$axios
        .get("http://localhost:8069/gestion/proveedores/moracorp.proveedores")
        .then((res) => {
          this.rows = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goTo(event, row) {
      this.$router.push("/proveedores/" + row.id);
    },
    ircrear() {
      this.$router.push("/proveedores/crear");
    },
  },
  setup() {
    return {};
  },
};
</script>
