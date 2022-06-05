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
                      square
                      filled
                      v-model="proveedor"
                      label="Nombre del Proveedor"
                      readonly
                    />
                  </div>
                  <div>
                    <q-input
                      style="width: 200px"
                      v-model="fecha_compra"
                      filled
                      type="date"
                      label="Fecha de Compra"
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
                      style="width: 200px"
                      v-model="fecha_entrega"
                      filled
                      type="date"
                      label="Fecha de Entrega"
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
                      v-model="producto"
                      label="Producto"
                      readonly
                    />
                  </div>
                  <div>
                    <q-input
                      style="width: 225px"
                      square
                      filled
                      v-model="precio_unidad"
                      label="Precio por Unidad sin IVA"
                      readonly
                    />
                  </div>
                  <div>
                    <q-input
                      square
                      filled
                      v-model="porcentaje_iva"
                      label="Porcentaje de IVA"
                      readonly
                    />
                  </div>
                  <div>
                    <q-input
                      style="width: 225px"
                      square
                      filled
                      v-model="precio_iva"
                      label="Precio por Unidad con IVA"
                      readonly
                    />
                  </div>
                  <div>
                    <q-input
                      square
                      filled
                      v-model="cantidad"
                      label="Cantidad"
                      readonly
                    />
                  </div>
                  <div>
                    <q-input
                      style="width: 250px"
                      square
                      filled
                      v-model="precio_total"
                      label="Precio Total de la Compra"
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
  name: "PageCompra",
  data() {
    return {
      n_transaccion: ref(""),
      proveedor: ref(""),
      fecha_compra: ref(""),
      fecha_entrega: ref(""),
      producto: ref(""),
      precio_unidad: ref(""),
      porcentaje_iva: ref(""),
      precio_iva: ref(""),
      cantidad: ref(""),
      precio_total: ref(""),
      id: 0,
    };
  },
  mounted() {
    this.getCompra();
  },
  methods: {
    getCompra() {
      this.$axios
        .get(
          'http://localhost:8069/gestion/apirest/moracorp.compras?data={"id":"' +
            this.$route.params.id +
            '"}'
        )
        .then((res) => {
          this.id = res.data[0].id;
          this.n_transaccion =
            "Nº de Transaccion: " + res.data[0].n_transaccion;
          this.proveedor = res.data[0].proveedor[1];
          this.fecha_compra = res.data[0].fecha_compra;
          this.fecha_entrega = res.data[0].fecha_entrega;
          this.producto = res.data[0].producto[1];
          this.precio_unidad = res.data[0].precio_unidad.toFixed(2);
          this.porcentaje_iva = res.data[0].porcentaje_iva;
          this.precio_iva = res.data[0].precio_iva.toFixed(2);
          this.cantidad = res.data[0].cantidad;
          this.precio_total = res.data[0].precio_total.toFixed(2);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editar() {
      this.$router.push("/compras/editar/" + this.id);
    },
    borrar() {
      console.log(this.id);
      this.$axios
        .get("http://localhost:8069/gestion/borrar/moracorp.compras/" + this.id)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
      this.$router.push("/compras");
    },
  },
  setup() {
    return {};
  },
};
</script>
