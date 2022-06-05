<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <div>
            <form>
              <h1>Editar Pedido:</h1>
              <q-input
                v-model="n_pedido"
                label="Nº de Pedido:"
                stack-label
                :dense="dense"
              />
              <q-input
                v-model="venta"
                label="Identificador de la Venta:"
                stack-label
                :dense="dense"
                @change="getVenta"
              />
              <q-input
                v-model="distribuidor"
                label="Distribuidor:"
                stack-label
                :dense="dense"
                readonly
              />
              <q-input
                v-model="nif"
                label="NIF del Cliente:"
                stack-label
                :dense="dense"
                readonly
              />
              <q-input
                v-model="nombre_cliente"
                label="Nombre del Cliente:"
                stack-label
                :dense="dense"
                readonly
              />
              <q-input
                v-model="direccion_cliente"
                label="Direccion del Cliente:"
                stack-label
                :dense="dense"
                readonly
              />
              <q-input
                v-model="telefono_cliente"
                label="Telefono del Cliente:"
                mask="(##) ### - ### - ###"
                fill-mask
                stack-label
                :dense="dense"
                readonly
              />
              <q-input
                v-model="email_cliente"
                suffix="@email.com"
                input-class="text-right"
                label-slot
                clearable
                stack-label
                :dense="dense"
                readonly
              >
                <template v-slot:label>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="deep-orange"
                      size="24px"
                      name="mail"
                    />
                    Email del Cliente:

                    <q-tooltip
                      class="bg-grey-8"
                      anchor="top left"
                      self="bottom left"
                      :offset="[0, 8]"
                      >Direccion de Email</q-tooltip
                    >
                  </div>
                </template>
              </q-input>
              <q-input
                v-model="mensajeria"
                label="Empresa de Logistica:"
                stack-label
                :dense="dense"
              />
              <q-input
                v-model="fecha_expedicion"
                type="date"
                label="Fecha de Expedicion:"
                stack-label
                :dense="dense"
                readonly
              >
                <template v-slot:prepend>
                  <q-icon name="event" />
                </template>
              </q-input>
              <q-input
                v-model="fecha_recepcion"
                type="date"
                label="Fecha de Recepcion:"
                stack-label
                :dense="dense"
              >
                <template v-slot:prepend>
                  <q-icon name="event" />
                </template>
              </q-input>
              <q-select
                v-model="estado"
                :options="categorias"
                label="Estado:"
                stack-label
                :dense="dense"
              />
              <br />
              <q-btn color="pink-7" @click="editar">
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
  name: "PageEditarPedido",
  data() {
    return {
      id: "",
      n_pedido: ref(""),
      venta: ref(""),
      distribuidor: ref(""),
      nif: ref(""),
      nombre_cliente: ref(""),
      direccion_cliente: ref(""),
      telefono_cliente: ref(""),
      email_cliente: ref(""),
      mensajeria: ref(""),
      fecha_expedicion: ref(""),
      fecha_recepcion: ref(""),
      estado: ref(""),
      categorias: ["En el Almacen", "En Reparto", "Entregado"],
    };
  },
  mounted() {
    this.getPedido();
  },
  methods: {
    getPedido() {
      this.$axios
        .get(
          'http://localhost:8069/gestion/apirest/moracorp.pedidos?data={"id":' +
            this.$route.params.id +
            "}"
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
          this.id = res.data[0].id;
          this.n_pedido = res.data[0].n_pedido;
          this.venta = res.data[0].venta[0];
          this.distribuidor = res.data[0].distribuidor;
          this.nif = res.data[0].nif;
          this.nombre_cliente = res.data[0].nombre_cliente;
          this.direccion_cliente = res.data[0].direccion_cliente;
          this.telefono_cliente = res.data[0].telefono_cliente;
          this.email_cliente = res.data[0].email_cliente;
          this.mensajeria = res.data[0].mensajeria;
          this.fecha_expedicion = res.data[0].fecha_expedicion;
          this.fecha_recepcion = res.data[0].fecha_recepcion;
          this.estado = valor;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getVenta() {
      this.$axios
        .get(
          'http://localhost:8069/gestion/apirest/moracorp.ventas?data={"id":"' +
            this.venta +
            '"}'
        )
        .then((res) => {
          this.fecha_expedicion = res.data[0].fecha_compra;
          this.getValoresCliente(res.data[0].cliente[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getValoresCliente(cliente_id) {
      this.$axios
        .get(
          'http://localhost:8069/gestion/apirest/moracorp.clientes?data={"id":"' +
            cliente_id +
            '"}'
        )
        .then((res) => {
          this.nif = res.data[0].nif;
          this.nombre_cliente = res.data[0].nombre;
          this.direccion_cliente = res.data[0].direccion;
          this.telefono_cliente = res.data[0].telefono;
          this.email_cliente = res.data[0].email;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editar() {
      if (this.fecha_expedicion <= this.fecha_recepcion) {
        var valor = "";
        var centinela = true;
        if (this.estado == "En el Almacen") {
          valor = "categoria1";
        } else if (this.estado == "En Reparto") {
          valor = "categoria2";
        } else if (this.estado == "Entregado") {
          valor = "categoria3";
        } else {
          centinela = false;
        }
        if (centinela) {
          this.$axios
            .get(
              'http://localhost:8069/gestion/editar/moracorp.pedidos?data={"id":"' +
                this.id +
                '","n_pedido":"' +
                this.n_pedido +
                '","venta":' +
                this.venta +
                ',"distribuidor":"' +
                this.distribuidor +
                '","nif":"' +
                this.nif +
                '","nombre_cliente":"' +
                this.nombre_cliente +
                '","direccion_cliente":"' +
                this.direccion_cliente +
                '","telefono_cliente":"' +
                this.telefono_cliente +
                '","email_cliente":"' +
                this.email_cliente +
                '","mensajeria":"' +
                this.mensajeria +
                '","fecha_expedicion":"' +
                this.fecha_expedicion +
                '","fecha_recepcion":"' +
                this.fecha_recepcion +
                '","estado":"' +
                valor +
                '"}'
            )
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          this.$router.push("/pedidos");
        } else {
          window.alert(
            "Error el Estado no puede estar vacio seleccione alguna de las opciones permitidas."
          );
        }
      } else {
        window.alert(
          "Error la Fecha de Recepcion no puede ser anterior a la Fecha de Expedicion."
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
.q-select .q-field__label {
  font-size: 25px;
}
</style>
