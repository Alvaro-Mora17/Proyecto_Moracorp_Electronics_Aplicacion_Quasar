<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <h1 style="font-size: 25px">
            Introduce valores a los Campos para Crear una Transaccion de Venta:
          </h1>
          <div class="justify-center q-gutter-md row items-start">
            <q-input square filled v-model="producto" label="Producto" />
            <q-input
              v-model.number="cantidad_vendida"
              type="number"
              label="Cantidad Vendida"
              filled
              style="max-width: 200px"
            />
          </div>
          <div class="q-mt-md q-pa justify-center q-gutter-md row items-start">
            <q-btn color="red" @click="crear">
              <q-icon
                size="35px"
                left
                name="img:https://cdn-icons-png.flaticon.com/512/4222/4222025.png"
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
  name: "PageCrearTransaccion",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    CrearTransaccion() {
      if (this.cantidad_vendida >= 1) {
        this.$axios
          .post(
            'http://localhost:8069/gestion/apirest/moracorp.transaccion_venta?data={"id":"0","producto":"' +
              this.producto +
              '","cantidad_vendida":"' +
              this.cantidad_vendida +
              '"}'
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        this.$router.push("/ventas");
      } else {
        window.alert(
          "Error para tramitar una Transaccion de Venta se debe al menos vender un Producto."
        );
      }
    },
    crear() {
      this.CrearTransaccion();
    },
  },
  setup() {
    return {
      producto: ref(""),
      cantidad_vendida: ref(1),
    };
  },
};
</script>
<style></style>
