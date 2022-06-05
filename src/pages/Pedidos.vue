<template>
  <q-page>
    <div class="row items-center q-mt-md q-pa q-gutter-sm">
      <q-space />
      <q-btn color="pink-7" @click="ircalendario">
        <q-icon
          size="35px"
          left
          name="img:https://cdn-icons-png.flaticon.com/512/3652/3652267.png"
        />
        <div>Calendario de Pedidos</div>
      </q-btn>
      <q-btn color="pink-7" @click="ircrear">
        <q-icon
          size="35px"
          left
          name="img:https://cdn-icons-png.flaticon.com/512/1524/1524983.png"
        />
        <div>Crear Pedido</div>
      </q-btn>
    </div>
    <div class="row">
      <q-table
        @row-click="goTo"
        title="Pedidos"
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
  name: "PagePedidos",
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
          name: "n_pedido",
          label: "Nº de Pedido",
          align: "left",
          field: "n_pedido",
          sortable: true,
        },
        {
          name: "venta",
          label: "Identificador de la Venta",
          align: "left",
          field: "venta",
          sortable: true,
        },
        {
          name: "distribuidor",
          label: "Distribuidor",
          align: "left",
          field: "distribuidor",
          sortable: true,
        },
        {
          name: "nif",
          label: "NIF del Cliente",
          align: "left",
          field: "nif",
          sortable: true,
        },
        {
          name: "nombre_cliente",
          label: "Nombre del Cliente",
          align: "left",
          field: "nombre_cliente",
          sortable: true,
        },
        {
          name: "direccion_cliente",
          label: "Direccion del Cliente",
          align: "left",
          field: "direccion_cliente",
          sortable: true,
        },
        {
          name: "telefono_cliente",
          label: "Telefono del Cliente",
          align: "left",
          field: "telefono_cliente",
          sortable: true,
        },
        {
          name: "email_cliente",
          label: "Email del Cliente",
          align: "left",
          field: "email_cliente",
          sortable: true,
        },
        {
          name: "mensajeria",
          label: "Empresa de Logistica",
          align: "left",
          field: "mensajeria",
          sortable: true,
        },
        {
          name: "fecha_expedicion",
          label: "Fecha de Expedicion",
          align: "left",
          field: "fecha_expedicion",
          sortable: true,
        },
        {
          name: "fecha_recepcion",
          label: "Fecha de Recepcion",
          align: "left",
          field: "fecha_recepcion",
          sortable: true,
        },
        {
          name: "estado",
          label: "Estado",
          align: "left",
          field: "estado",
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
    this.getPedidos();
  },
  methods: {
    getPedidos() {
      this.$axios
        .get("http://localhost:8069/gestion/pedidos/moracorp.pedidos")
        .then((res) => {
          this.rows = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goTo(event, row) {
      this.$router.push("/pedidos/" + row.id);
    },
    ircrear() {
      this.$router.push("/pedidos/crear");
    },
    ircalendario() {
      this.$router.push("/pedidos/calendario");
    },
  },
  setup() {
    return {};
  },
};
</script>
