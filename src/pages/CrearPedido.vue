<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <h1 style="font-size: 25px">
            Introduce valores a los Campos para Crear un Pedido:
          </h1>
          <div class="justify-center q-gutter-md row items-start">
            <q-input square filled v-model="n_pedido" label="Nº de Pedido" />
            <q-input
              style="width: 300px"
              square
              filled
              v-model="venta"
              label="Identificador de la Venta"
              @change="getVenta"
            />
            <q-input
              square
              filled
              v-model="distribuidor"
              label="Distribuidor"
              readonly
            />
            <q-input
              square
              filled
              v-model="nif"
              label="NIF del Cliente"
              readonly
            />
            <q-input
              square
              filled
              v-model="nombre_cliente"
              label="Nombre del Cliente"
              readonly
            />
            <q-input
              square
              filled
              v-model="direccion_cliente"
              label="Direccion del Cliente"
              readonly
            />
            <q-input
              filled
              v-model="telefono_cliente"
              label="Telefono del Cliente"
              mask="(##) ### - ### - ###"
              fill-mask
              readonly
            />
            <q-input
              style="width: 300px"
              filled
              v-model="email_cliente"
              suffix="@email.com"
              input-class="text-right"
              label-slot
              clearable
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
                  Email del Cliente

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
              square
              filled
              v-model="mensajeria"
              style="width: 400px"
              label="Empresa de Logistica"
            />
            <q-input
              style="width: 200px"
              v-model="fecha_expedicion"
              filled
              type="date"
              label="Fecha de Expedicion"
              stack-label
              :dense="dense"
              readonly
            >
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-input>
            <q-input
              style="width: 200px"
              v-model="fecha_recepcion"
              filled
              type="date"
              label="Fecha de Recepcion"
              stack-label
              :dense="dense"
            >
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-input>
            <q-select
              style="width: 350px"
              filled
              v-model="estado"
              :options="categorias"
              label="Estado"
            />
          </div>
          <div class="q-mt-md q-pa justify-center q-gutter-md row items-start">
            <q-btn color="pink-7" @click="crear">
              <q-icon
                size="35px"
                left
                name="img:https://cdn-icons-png.flaticon.com/512/1524/1524983.png"
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
  name: "PageCrearPedido",
  data() {
    return {};
  },
  mounted() {},
  methods: {
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
    CrearPedido() {
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
            .post(
              'http://localhost:8069/gestion/apirest/moracorp.pedidos?data={"id":"0","n_pedido":"' +
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
              console.log(res);
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
    crear() {
      this.CrearPedido();
    },
  },
  setup() {
    return {
      n_pedido: ref(""),
      venta: ref(""),
      distribuidor: ref("Moracorp Electronics"),
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
};
</script>
<style></style>
