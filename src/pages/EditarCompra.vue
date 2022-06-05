<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <div>
            <form>
              <h1>Editar Compra:</h1>
              <q-input
                v-model="n_transaccion"
                label="Nº de Transaccion:"
                stack-label
                :dense="dense"
              />
              <q-input
                v-model="proveedor"
                label="Nombre del Proveedor:"
                stack-label
                :dense="dense"
              />
              <q-input
                v-model="fecha_compra"
                type="date"
                label="Fecha de Compra:"
                stack-label
                :dense="dense"
              >
                <template v-slot:prepend>
                  <q-icon name="event" />
                </template>
              </q-input>
              <q-input
                v-model="fecha_entrega"
                type="date"
                label="Fecha de Entrega:"
                stack-label
                :dense="dense"
              >
                <template v-slot:prepend>
                  <q-icon name="event" />
                </template>
              </q-input>
              <q-input
                v-model="producto"
                label="Producto:"
                stack-label
                :dense="dense"
              />
              <q-input
                v-model="precio_unidad"
                label="Precio por Unidad sin IVA:"
                stack-label
                :dense="dense"
              />
              <q-input
                square
                v-model="porcentaje_iva"
                label="Porcentaje de IVA:"
                stack-label
                :dense="dense"
              />
              <q-input square v-model="cantidad" label="Cantidad" />
              <br />
              <q-btn color="purple" @click="editar">
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
  name: "PageEditarCompra",
  data() {
    return {
      id: "",
      n_transaccion: ref(""),
      proveedor: ref(""),
      fecha_compra: ref(""),
      fecha_entrega: ref(""),
      producto: ref(""),
      precio_unidad: ref(""),
      porcentaje_iva: ref(""),
      cantidad: ref(""),
    };
  },
  mounted() {
    this.getCompra();
  },
  methods: {
    getCompra() {
      this.$axios
        .get(
          'http://localhost:8069/gestion/apirest/moracorp.compras?data={"id":' +
            this.$route.params.id +
            "}"
        )
        .then((res) => {
          this.id = res.data[0].id;
          this.n_transaccion = res.data[0].n_transaccion;
          this.proveedor = res.data[0].proveedor[0];
          this.fecha_compra = res.data[0].fecha_compra;
          this.fecha_entrega = res.data[0].fecha_entrega;
          this.producto = res.data[0].producto[0];
          this.precio_unidad = res.data[0].precio_unidad;
          this.porcentaje_iva = res.data[0].porcentaje_iva;
          this.cantidad = res.data[0].cantidad;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editar() {
      if (
        this.comprobar_fechas(this.fecha_compra, this.fecha_entrega) &&
        this.comprobar_numerico(
          this.precio_unidad,
          this.porcentaje_iva,
          this.cantidad
        )
      ) {
        this.$axios
          .get(
            'http://localhost:8069/gestion/editar/moracorp.compras?data={"id":"' +
              this.id +
              '","n_transaccion":"' +
              this.n_transaccion +
              '","proveedor":"' +
              this.proveedor +
              '","fecha_compra":"' +
              this.fecha_compra +
              '","fecha_entrega":"' +
              this.fecha_entrega +
              '","producto":"' +
              this.producto +
              '","precio_unidad":"' +
              this.precio_unidad +
              '","porcentaje_iva":"' +
              this.porcentaje_iva +
              '","cantidad":"' +
              this.cantidad +
              '"}'
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        this.actualizar_stock();
        this.$router.push("/compras");
      }
    },
    comprobar_fechas(compra, entrega) {
      if (compra > entrega) {
        window.alert(
          "Error la Fecha de Compra no puede ser posterior a la Fecha de Entrega."
        );
        return false;
      } else {
        return true;
      }
    },
    comprobar_numerico(precio, porcentaje, cantidad) {
      if (!isNaN(precio) && !isNaN(porcentaje) && !isNaN(cantidad)) {
        if (cantidad > 0) {
          return true;
        } else {
          window.alert(
            "Error el campo cantidad no puede ser menor o igual a cero."
          );
        }
      } else {
        window.alert(
          "Error uno de los campos numericos(Precio sin IVA,Porcentaje de IVA,Cantidad) a recibido un valor no valido."
        );
        return false;
      }
    },
    actualizar_stock() {
      this.$axios
        .get(
          "http://localhost:8069/gestion/compras/actualizar/moracorp.compras"
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
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
