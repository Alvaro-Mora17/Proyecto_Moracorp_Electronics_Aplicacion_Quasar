<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <div>
            <form>
              <h1>Editar Venta:</h1>
              <q-input
                v-model="producto"
                label="Producto Vendido:"
                stack-label
                :dense="dense"
              />
              <q-input
                v-model.number="cantidad_vendida"
                type="number"
                label="Cantidad Vendida:"
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
  name: "PageEditarTransaccion",
  data() {
    return {
      id: "",
      producto: ref(""),
      cantidad_vendida: 0,
    };
  },
  mounted() {
    this.getTransaccion();
  },
  methods: {
    getTransaccion() {
      this.$axios
        .get(
          'http://localhost:8069/gestion/apirest/moracorp.transaccion_venta?data={"id":' +
            this.$route.params.id +
            "}"
        )
        .then((res) => {
          this.id = res.data[0].id;
          this.producto = res.data[0].producto[0];
          this.cantidad_vendida = res.data[0].cantidad_vendida;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editar() {
      if (this.cantidad_vendida >= 1) {
        this.$axios
          .get(
            'http://localhost:8069/gestion/editar/moracorp.transaccion_venta?data={"id":"' +
              this.id +
              '","producto":"' +
              this.producto +
              '","cantidad_vendida":"' +
              this.cantidad_vendida +
              '"}'
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        this.$router.push("/transacciones");
      } else {
        window.alert(
          "Error para tramitar una Transaccion de Venta se debe al menos vender un Producto."
        );
      }
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
