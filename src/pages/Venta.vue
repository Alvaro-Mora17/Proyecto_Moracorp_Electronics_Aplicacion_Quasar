<template>
  <q-page>
    <div>
      <q-card>
        <q-card-section>
          <div style="width: 100%; margin: 0 auto">
            <div class="justify-center q-gutter-md row items-start">
              <div>
                <pre><h1 style="font-size: 35px">{{ n_transaccion }}</h1></pre>
                <div class="justify-center q-gutter-md row">
                  <div>
                    <q-input
                      style="width: 200px"
                      v-model="fecha_compra"
                      filled
                      type="date"
                      label="Fecha de Venta"
                      stack-label
                      :dense="dense"
                      readonly
                    >
                      <template v-slot:prepend>
                        <q-icon name="event" />
                      </template>
                    </q-input>
                  </div>
                  <div>
                    <q-input
                      square
                      filled
                      v-model="cliente"
                      label="Cliente"
                      readonly
                    />
                  </div>
                  <div>
                    <q-input
                      square
                      filled
                      v-model="precio_venta"
                      label="Precio Total de la Venta"
                      readonly
                    />
                  </div>
                </div>
                <br />
                <div class="justify-center q-gutter-md row">
                  <q-input
                    style="width: 1000px; height: 200px"
                    v-model="productos"
                    filled
                    clearable
                    type="textarea"
                    color="red-12"
                    label="Productos"
                    disable
                  />
                </div>
              </div>
              <q-separator />
            </div>
            <br />
            <div class="justify-center row q-gutter-sm">
              <q-icon
                @click="editar"
                size="35px"
                left
                name="img:https://cdn-icons-png.flaticon.com/512/2525/2525762.png"
              />
              <q-icon
                @click="borrar"
                size="35px"
                left
                name="img:https://cdn-icons-png.flaticon.com/512/6711/6711573.png"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
export default {
  name: "PageVenta",
  data() {
    return {
      n_transaccion: ref(""),
      fecha_compra: ref(""),
      cliente: ref(""),
      productos: ref(""),
      precio_venta: ref(""),
      id: 0,
    };
  },
  mounted() {
    this.getVenta();
  },
  methods: {
    getVenta() {
      this.$axios
        .get(
          'http://localhost:8069/gestion/apirest/moracorp.ventas?data={"id":"' +
            this.$route.params.id +
            '"}'
        )
        .then((res) => {
          this.id = res.data[0].id;
          this.n_transaccion =
            "Nº de Transaccion: " + res.data[0].n_transaccion;
          this.fecha_compra = res.data[0].fecha_compra;
          this.precio_venta = res.data[0].precio_venta.toFixed(2);
          this.getCliente(res.data[0].cliente[0]);
          for (let i = 0; i < res.data[0].productos.length; i++) {
            this.getTransaccion(res.data[0].productos[i]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCliente(cliente_id) {
      this.$axios
        .get(
          'http://localhost:8069/gestion/apirest/moracorp.clientes?data={"id":"' +
            cliente_id +
            '"}'
        )
        .then((res) => {
          this.cliente = res.data[0].nombre;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTransaccion(transaccion_id) {
      this.$axios
        .get(
          'http://localhost:8069/gestion/apirest/moracorp.transaccion_venta?data={"id":"' +
            transaccion_id +
            '"}'
        )
        .then((res) => {
          this.productos +=
            " Nombre del Producto: " +
            res.data[0].nombre +
            ", Cantidad Vendida: " +
            res.data[0].cantidad_vendida +
            "\n";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editar() {
      this.$router.push("/ventas/editar/" + this.id);
    },
    borrar() {
      console.log(this.id);
      this.$axios
        .get("http://localhost:8069/gestion/borrar/moracorp.ventas/" + this.id)
        .then((res) => {})
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
