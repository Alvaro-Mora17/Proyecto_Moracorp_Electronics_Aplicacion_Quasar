<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <h1 style="font-size: 25px">
            Introduce valores a los Campos para Crear una Venta:
          </h1>
          <div class="justify-center q-gutter-md row items-start">
            <q-input
              square
              filled
              v-model="n_transaccion"
              label="Nº de Transaccion"
            />
            <q-input
              style="width: 200px"
              v-model="fecha_compra"
              filled
              type="date"
              label="Fecha de Venta"
              stack-label
              :dense="dense"
            >
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-input>
            <q-input square filled v-model="cliente" label="Cliente" />
            <q-input
              square
              filled
              style="width: 500px"
              v-model="productos"
              label="Productos"
            />
          </div>
          <div class="q-mt-md q-pa justify-center q-gutter-md row items-start">
            <q-btn color="red" @click="crear">
              <q-icon
                size="35px"
                left
                name="img:https://cdn-icons-png.flaticon.com/512/3028/3028956.png"
              />
              <div>Crear</div>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";
export default {
  name: "PageCrearVenta",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    CrearVenta() {
      var array_productos = this.productos.split(",");
      this.$axios
        .post(
          'http://localhost:8069/gestion/apirest/moracorp.ventas?data={"id":"0","n_transaccion":"' +
            this.n_transaccion +
            '","fecha_compra":"' +
            this.fecha_compra +
            '","cliente":"' +
            this.cliente +
            '","productos":[' +
            this.productos +
            "]}"
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.$router.push("/ventas");
    },
    crear() {
      this.CrearVenta();
    },
  },
  setup() {
    return {
      n_transaccion: ref(""),
      fecha_compra: ref(""),
      cliente: ref(""),
      productos: ref(""),
    };
  },
};
</script>
<style></style>
