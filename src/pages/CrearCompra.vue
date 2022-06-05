<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <h1 style="font-size: 25px">
            Introduce valores a los Campos para Crear una Compra:
          </h1>

          <div class="justify-center q-gutter-md row items-start">
            <q-input
              square
              filled
              v-model="n_transaccion"
              label="Nº de Transaccion"
            />
            <q-input
              square
              filled
              v-model="proveedor"
              label="Nombre del Proveedor"
            />
            <q-input
              style="width: 200px"
              v-model="fecha_compra"
              filled
              type="date"
              label="Fecha de Compra"
              stack-label
              :dense="dense"
            >
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-input>
            <q-input
              style="width: 200px"
              v-model="fecha_entrega"
              filled
              type="date"
              label="Fecha de Entrega"
              stack-label
              :dense="dense"
            >
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-input>
            <q-input square filled v-model="producto" label="Producto" />
            <q-input
              style="width: 225px"
              square
              filled
              v-model="precio_unidad"
              label="Precio por Unidad sin IVA"
            />
            <q-input
              square
              filled
              v-model="porcentaje_iva"
              label="Porcentaje de IVA"
            />
            <q-input square filled v-model="cantidad" label="Cantidad" />
          </div>
          <div class="q-mt-md q-pa justify-center q-gutter-md row items-start">
            <q-btn color="purple" @click="crear">
              <q-icon
                size="35px"
                left
                name="img:https://cdn-icons-png.flaticon.com/512/925/925036.png"
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
  name: "PageCrearCompra",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    CrearCompra() {
      if (
        this.comprobar_fechas(this.fecha_compra, this.fecha_entrega) &&
        this.comprobar_numerico(
          this.precio_unidad,
          this.porcentaje_iva,
          this.cantidad
        )
      ) {
        this.$axios
          .post(
            'http://localhost:8069/gestion/apirest/moracorp.compras?data={"id":"0","n_transaccion":"' +
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
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        this.actualizar_stock();
        this.$router.push("/compras");
      }
    },
    crear() {
      this.CrearCompra();
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
    return {
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
};
</script>
<style></style>
