<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <h1 style="font-size: 25px">
            Introduce valores a los Campos para Crear un Proveedor:
          </h1>
          <div class="justify-center q-gutter-md row items-start">
            <q-input square filled v-model="cif" label="CIF" />
            <q-input square filled v-model="nombre" label="Nombre" />
            <q-input
              style="width: 200px"
              v-model="fecha_fundacion"
              filled
              type="date"
              label="Fecha de Fundacion"
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
              v-model="tipo_sociedad"
              :options="categorias"
              label="Tipo Sociedad"
            />
            <q-input
              style="width: 400px"
              square
              filled
              v-model="direccion"
              label="Direccion del Proveedor"
            />
            <q-input
              square
              filled
              v-model="codigo_postal"
              label="Codigo Postal"
            />
            <q-input
              filled
              v-model="telefono"
              label="Telefono"
              mask="(##) ### - ### - ###"
              fill-mask
            />
            <q-input
              style="width: 400px"
              filled
              v-model="email"
              suffix="@email.com"
              input-class="text-right"
              label-slot
              clearable
            >
              <template v-slot:label>
                <div class="row items-center all-pointer-events">
                  <q-icon
                    class="q-mr-xs"
                    color="deep-orange"
                    size="24px"
                    name="mail"
                  />
                  Email

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
            <q-input square filled v-model="sede" label="Sede Central">
              <template v-slot:prepend>
                <q-icon name="place" />
              </template>
            </q-input>
          </div>
          <div class="q-mt-md q-pa justify-center q-gutter-md row items-start">
            <q-btn color="amber-5" @click="crear">
              <q-icon
                size="35px"
                left
                name="img:https://cdn-icons-png.flaticon.com/512/4394/4394557.png"
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
  name: "PageCrearProveedor",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    CrearProveedor() {
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
            .post(
              'http://localhost:8069/gestion/apirest/moracorp.proveedores?data={"id":"0","cif":"' +
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
              console.log(res);
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
    crear() {
      this.CrearProveedor();
    },
  },
  setup() {
    return {
      cif: ref(""),
      nombre: ref(""),
      fecha_fundacion: ref(""),
      tipo_sociedad: ref(""),
      direccion: ref(""),
      codigo_postal: ref(""),
      telefono: ref(""),
      email: ref(""),
      sede: ref(""),
      categorias: [
        "Sociedad de Responsabilidad Limitada (S.L.)",
        "Sociedad Anónima (S.A.)",
        "Sociedad Colectiva (S.C.)",
        "Sociedad Cooperativa",
      ],
    };
  },
};
</script>
<style></style>
