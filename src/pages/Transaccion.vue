<template>
  <q-page>
    <div>
      <q-card>
        <q-card-section>
          <div style="width: 100%; margin: 0 auto">
            <div class="justify-center q-gutter-md row items-start">
              <div>
                <pre><h1 style="font-size: 35px">{{ identificador }}</h1></pre>
                <div class="justify-center q-gutter-md row">
                  <div>
                    <q-input
                      square
                      filled
                      v-model="producto"
                      label="Producto Vendido"
                      readonly
                    />
                  </div>
                  <div>
                    <q-input
                      v-model.number="cantidad_vendida"
                      type="number"
                      label="Cantidad Vendida"
                      filled
                      style="max-width: 200px"
                      readonly
                    />
                  </div>
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
  name: "PageTransaccion",
  data() {
    return {
      producto: ref(""),
      cantidad_vendida: ref(0),
      id: 0,
    };
  },
  mounted() {
    this.getTransaccion();
  },
  methods: {
    getTransaccion() {
      this.$axios
        .get(
          'http://localhost:8069/gestion/apirest/moracorp.transaccion_venta?data={"id":"' +
            this.$route.params.id +
            '"}'
        )
        .then((res) => {
          this.id = res.data[0].id;
          this.identificador = "Identificador de Transaccion: " + this.id;
          this.producto = res.data[0].producto[1];
          this.cantidad_vendida = res.data[0].cantidad_vendida;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editar() {
      this.$router.push("/transacciones/editar/" + this.id);
    },
    borrar() {
      console.log(this.id);
      this.$axios
        .get(
          "http://localhost:8069/gestion/borrar/moracorp.transaccion_venta/" +
            this.id
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
      this.$router.push("/transacciones");
    },
  },
  setup() {
    return {};
  },
};
</script>
