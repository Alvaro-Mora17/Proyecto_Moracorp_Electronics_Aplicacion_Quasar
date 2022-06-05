<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <div>
            <form>
              <h1>Editar Venta:</h1>
              <q-input
                v-model="n_transaccion"
                label="Nº de Transaccion:"
                stack-label
                :dense="dense"
              />
              <q-input
                v-model="fecha_compra"
                type="date"
                label="Fecha de Venta:"
                stack-label
                :dense="dense"
              >
                <template v-slot:prepend>
                  <q-icon name="event" />
                </template>
              </q-input>
              <q-input
                v-model="cliente"
                label="Cliente:"
                stack-label
                :dense="dense"
              />
              <q-input
                v-model="productos"
                label="Productos:"
                stack-label
                :dense="dense"
              />
              <br />
              <q-btn color="red" @click="editar">
                <q-icon
                  left
                  name="img:https://cdn-icons-png.flaticon.com/512/2525/2525762.png"
                />
                <div>Editar</div>
              </q-btn>
            </form>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";
export default {
  name: "PageEditarVenta",
  data() {
    return {
      id: "",
      n_transaccion: ref(""),
      fecha_compra: ref(""),
      cliente: ref(""),
      productos: ref(""),
    };
  },
  mounted() {
    this.getVenta();
  },
  methods: {
    getVenta() {
      this.$axios
        .get(
          'http://localhost:8069/gestion/apirest/moracorp.ventas?data={"id":' +
            this.$route.params.id +
            "}"
        )
        .then((res) => {
          this.id = res.data[0].id;
          this.n_transaccion = res.data[0].n_transaccion;
          this.fecha_compra = res.data[0].fecha_compra;
          this.cliente = res.data[0].cliente[0];
          this.productos = res.data[0].productos;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editar() {
      this.$axios
        .get(
          'http://localhost:8069/gestion/editar/moracorp.ventas?data={"id":"' +
            this.id +
            '","n_transaccion":"' +
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
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      this.$router.push("/ventas");
    },
  },
  setup() {
    return {};
  },
};
</script>

<style>
h1 {
  font-size: 35px;
}
form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  align-items: center;
}

.q-input .q-field__label {
  font-size: 25px;
}
</style>
