<template>
  <q-page>
    <div>
      <q-card class="col">
        <q-card-section>
          <div
            class="justify-center q-gutter-md row items-start"
            style="width: 100%; margin: 0 auto"
          >
            <q-date
              class="text-bold"
              style="width: 785px; height: 700px"
              title="Calendario de Pedidos"
              v-model="date"
              range
              today-btn
            />
            <div class="row items-start q-gutter">
              <q-badge
                class="col"
                style="font-size: 15px; width: 770px; height: 700px"
              >
                <div>
                  <pre><h1 style="font-size: 35px">{{ n_pedido }}</h1></pre>
                </div>
                <div>
                  <pre>{{ venta }}</pre>
                  <pre>{{ distribuidor }}</pre>
                  <pre>{{ nif }}</pre>
                  <pre>{{ direccion_cliente }}</pre>
                  <pre>{{ telefono_cliente }}</pre>
                  <pre>{{ email_cliente }}</pre>
                  <pre>{{ estado }}</pre>
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
              </q-badge>
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
  name: "PagePedido",
  data() {
    return {
      date: [],
      n_pedido: true,
      id: 0,
    };
  },
  mounted() {
    this.getPedido();
  },
  methods: {
    getPedido() {
      this.$axios
        .get(
          'http://localhost:8069/gestion/apirest/moracorp.pedidos?data={"id":"' +
            this.$route.params.id +
            '"}'
        )
        .then((res) => {
          var valor = "";
          if (res.data[0].estado == "categoria1") {
            valor = "En el Almacen";
          } else if (res.data[0].estado == "categoria2") {
            valor = "En Reparto";
          } else {
            valor = "Entregado";
          }
          this.fechas = "";
          let expedicion = [];
          let recepcion = [];
          this.id = res.data[0].id;
          this.n_pedido = "Nº Pedido: " + res.data[0].n_pedido + "\n\n\n\n\n";
          this.venta = "Identificador de la Venta: " + res.data[0].venta[0];
          this.distribuidor = "\nDistribuidor: " + res.data[0].distribuidor;
          this.nif = "\nNIF del Cliente: " + res.data[0].nif;
          this.direccion_cliente =
            "\nDireccion del Cliente: " + res.data[0].direccion_cliente;
          this.telefono_cliente =
            "\nTelefono del Cliente: " + res.data[0].telefono_cliente;
          this.email_cliente =
            "\nEmail del Cliente: " + res.data[0].email_cliente;
          this.estado = "\nEstado: " + valor + "\n\n";
          expedicion.push(
            res.data[0].fecha_expedicion.replace("-", "/").replace("-", "/")
          );
          recepcion.push(
            res.data[0].fecha_recepcion.replace("-", "/").replace("-", "/")
          );
          this.date.push({
            from: expedicion[0],
            to: recepcion[0],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editar() {
      this.$router.push("/pedidos/editar/" + this.id);
    },
    borrar() {
      console.log(this.id);
      this.$axios
        .get("http://localhost:8069/gestion/borrar/moracorp.pedidos/" + this.id)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
      this.$router.push("/pedidos");
    },
  },
  setup() {
    return {};
  },
};
</script>
