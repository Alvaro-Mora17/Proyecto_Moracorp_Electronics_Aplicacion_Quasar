<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="justify-center row q-gutter-sm">
          <q-date
            class="text-bold"
            style="width: 750px; height: 700px"
            title="Calendario de Pedidos"
            v-model="date"
            range
            today-btn
          />
          <div class="q-gutter">
            <q-badge style="font-size: 15px; width: 800px; height: 700">
              <pre> <h1 style="font-size: 50px">Pedidos:</h1> <p class="text-right	 text-bold">{{ fechas }}</p></pre>
            </q-badge>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";
export default {
  name: "PagePedidosCalendario",
  data() {
    return {
      date: [],
      fechas: true,
    };
  },
  mounted() {
    this.PedidosCalendario();
  },
  methods: {
    PedidosCalendario() {
      this.$axios
        .get("http://localhost:8069/gestion/pedidos/moracorp.pedidos")
        .then((res) => {
          this.fechas = "";
          let expedicion = [];
          let recepcion = [];
          for (let i = 0; i < res.data.length; i++) {
            expedicion.push(
              res.data[i].fecha_expedicion.replace("-", "/").replace("-", "/")
            );
            recepcion.push(
              res.data[i].fecha_recepcion.replace("-", "/").replace("-", "/")
            );
          }
          for (let z = 0; z < expedicion.length; z++) {
            this.date.push({
              from: expedicion[z],
              to: recepcion[z],
            });
            this.fechas +=
              "Nº de Pedido: " +
              res.data[z].n_pedido +
              ", Fecha de Expedicion: " +
              expedicion[z] +
              ", Fecha de Recepcion: " +
              recepcion[z] +
              "\n\n";
          }
          //this.fechas = this.fechas.slice(0, -1);
          /*this.rows = res.data;
          for (let i = 0; i < this.rows.length; i++) {
            this.rows[i].venta = this.rows[i].venta[1];
            let tipo = "";
            if (this.rows[i].estado == "categoria1") {
              tipo = "En el Almacen";
            } else if (this.rows[i].estado == "categoria2") {
              tipo = "En Reparto";
            } else {
              tipo = "Entregado";
            }
            this.rows[i].estado = tipo;
          }*/
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
