<template>
  <q-page>
    <div class="q-pa-md">
      <q-carousel
        animated
        v-model="slide"
        control-color="amber"
        arrows
        navigation
        infinite
        style="height: 500px"
      >
        <q-carousel-slide :name="1" img-src="~assets/fondo_moracorp.jpg" />
        <q-carousel-slide
          :name="2"
          img-src="https://www.ynext.cl/download/wallpapers/wallpapers_odoo_erp_ynext_A002.jpg"
        />
        <q-carousel-slide
          :name="3"
          img-src="https://miro.medium.com/max/1144/1*8k4KGgByJl2bbAXKGJCBUA.png"
        />
        <q-carousel-slide
          :name="4"
          img-src="https://miro.medium.com/max/1400/1*jxse_DUL4N-i6IxEOakeVg.png"
        />
      </q-carousel>
    </div>
    <div class="row items-center q-mt-md q-pa">
      <q-space />
      <q-btn color="teal" @click="ircrear">
        <q-icon
          size="35px"
          left
          name="img:https://cdn-icons-png.flaticon.com/512/1740/1740376.png"
        />
        <div>Crear Producto</div>
      </q-btn>
    </div>
    <div class="row">
      <q-table
        @row-click="goTo"
        title="Productos"
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
  name: "PageProductos",
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
          name: "n_serie",
          label: "Nº de Serie",
          align: "left",
          field: "n_serie",
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
          name: "marca",
          label: "Marca",
          align: "left",
          field: "marca",
          sortable: true,
        },
        {
          name: "descripcion",
          label: "Descripcion",
          align: "left",
          field: "descripcion",
          sortable: true,
        },
        {
          name: "precio",
          label: "Precio sin IVA",
          align: "left",
          field: "precio",
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
          label: "Precio de Venta al Publico(PVP)",
          align: "left",
          field: "precio_iva",
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
    this.getProductos();
  },
  methods: {
    getProductos() {
      this.$axios
        .get("http://localhost:8069/gestion/moracorp.productos")
        .then((res) => {
          this.rows = res.data;
          /*for (let i = 0; i < this.rows.length; i++) {
            this.rows[i].marca = this.rows[i].marca[1];
            this.rows[i].precio_iva = this.rows[i].precio_iva.toFixed(2);
            this.rows[i].descripcion = this.rows[i].descripcion.replace(
              /(<([^>]+)>)/gi,
              ""
            );
            var image = new Image(1000, 1000);
            image.src =
              "data:image/jpg;base64," + this.rows[i].foto.slice(2, -1);
            this.rows[i].foto = image;
            this.rows[i].descripcion = this.rows[i].descripcion.replace(
              /(<([^>]+)>)/gi,
              ""
            );
            console.log(this.rows[i].foto);
          }*/
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goTo(event, row) {
      this.$router.push("/producto/" + row.id);
    },
    ircrear() {
      this.$router.push("/producto/crear");
    },
  },
  setup() {
    return {
      slide: ref(1),
    };
  },
};
</script>
