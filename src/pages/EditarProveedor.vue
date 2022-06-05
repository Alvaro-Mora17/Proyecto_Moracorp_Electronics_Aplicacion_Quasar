<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <div>
            <form>
              <h1>Editar Proveedor:</h1>
              <q-input v-model="cif" label="CIF:" stack-label :dense="dense" />
              <q-input
                v-model="nombre"
                label="Nombre:"
                stack-label
                :dense="dense"
              />
              <q-input
                v-model="fecha_fundacion"
                type="date"
                label="Fecha de Fundacion:"
                stack-label
                :dense="dense"
              >
                <template v-slot:prepend>
                  <q-icon name="event" />
                </template>
              </q-input>
              <q-select
                v-model="tipo_sociedad"
                :options="categorias"
                label="Tipo Sociedad:"
                stack-label
                :dense="dense"
              />
              <q-input
                v-model="direccion"
                label="Direccion del Proveedor:"
                stack-label
                :dense="dense"
              />
              <q-input
                v-model="codigo_postal"
                label="Codigo Postal:"
                stack-label
                :dense="dense"
              />
              <q-input
                v-model="telefono"
                label="Telefono:"
                mask="(##) ### - ### - ###"
                fill-mask
                stack-label
                :dense="dense"
              />
              <q-input
                v-model="email"
                suffix="@email.com"
                input-class="text-right"
                label-slot
                clearable
                stack-label
                :dense="dense"
              >
                <template v-slot:label>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="deep-orange"
                      size="24px"
                      name="mail"
                    />
                    Email:

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
                v-model="sede"
                label="Sede Central:"
                stack-label
                :dense="dense"
              >
                <template v-slot:prepend>
                  <q-icon name="place" />
                </template>
              </q-input>
              <br />
              <q-btn color="amber-5" @click="editar">
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
  name: "PageEditarProveedor",
  data() {
    return {
      id: "",
      cif: "",
      nombre: "",
      fecha_fundacion: "",
      tipo_sociedad: "",
      direccion: "",
      codigo_postal: "",
      telefono: "",
      email: "",
      sede: "",
      categorias: [
        "Sociedad de Responsabilidad Limitada (S.L.)",
        "Sociedad Anónima (S.A.)",
        "Sociedad Colectiva (S.C.)",
        "Sociedad Cooperativa",
      ],
    };
  },
  mounted() {
    this.getProveedor();
  },
  methods: {
    getProveedor() {
      this.$axios
        .get(
          'http://localhost:8069/gestion/apirest/moracorp.proveedores?data={"id":' +
            this.$route.params.id +
            "}"
        )
        .then((res) => {
          var valor = "";
          if (res.data[0].tipo_sociedad == "categoria1") {
            valor = "Sociedad de Responsabilidad Limitada (S.L.)";
          } else if (res.data[0].tipo_sociedad == "categoria2") {
            valor = "Sociedad Anónima (S.A.)";
          } else if (res.data[0].tipo_sociedad == "categoria3") {
            valor = "Sociedad Colectiva (S.C.)";
          } else {
            valor = "Sociedad Cooperativa";
          }
          this.id = res.data[0].id;
          this.cif = res.data[0].cif;
          this.nombre = res.data[0].nombre;
          this.fecha_fundacion = res.data[0].fecha_fundacion;
          this.tipo_sociedad = valor;
          this.direccion = res.data[0].direccion;
          this.codigo_postal = res.data[0].codigo_postal;
          this.telefono = res.data[0].telefono;
          this.email = res.data[0].email;
          this.sede = res.data[0].sede;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editar() {
      let date = new Date();
      if (this.fecha_fundacion < date.toISOString().split("T")[0]) {
        var valor = "";
        var centinela = true;
        if (
          this.tipo_sociedad == "Sociedad de Responsabilidad Limitada (S.L.)"
        ) {
          valor = "categoria1";
        } else if (this.tipo_sociedad == "Sociedad Anónima (S.A.)") {
          valor = "categoria2";
        } else if (this.tipo_sociedad == "Sociedad Colectiva (S.C.)") {
          valor = "categoria3";
        } else if (this.tipo_sociedad == "Sociedad Cooperativa") {
          valor = "categoria4";
        } else {
          centinela = false;
        }
        if (centinela) {
          this.$axios
            .get(
              'http://localhost:8069/gestion/editar/moracorp.proveedores?data={"id":"' +
                this.id +
                '","cif":"' +
                this.cif +
                '","nombre":"' +
                this.nombre +
                '","fecha_fundacion":"' +
                this.fecha_fundacion +
                '","tipo_sociedad":"' +
                valor +
                '","direccion":"' +
                this.direccion +
                '","codigo_postal":"' +
                this.codigo_postal +
                '","telefono":"' +
                this.telefono +
                '","email":"' +
                this.email +
                '","sede":"' +
                this.sede +
                '"}'
            )
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          this.$router.push("/proveedores");
        } else {
          window.alert(
            "Error el Tipo de Sociedad no puede estar vacio seleccione alguna de las opciones permitidas."
          );
        }
      } else {
        window.alert(
          "Error la Fecha de Fundacion no puede ser posterior o igual a la Fecha Actual."
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
