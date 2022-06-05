<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <h1 style="font-size: 25px">
            Introduce valores a los Campos para Crear un Cliente:
          </h1>
          <div class="justify-center q-gutter-md row items-start">
            <q-input square filled v-model="nif" label="NIF" />
            <q-input square filled v-model="nombre" label="Nombre" />
            <q-input
              style="width: 200px"
              v-model="fecha_registro"
              filled
              type="date"
              label="Fecha de Registro"
              stack-label
              :dense="dense"
            >
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-input>
            <q-input
              square
              filled
              v-model="direccion"
              style="width: 400px"
              label="Direccion"
            />
            <q-input
              filled
              v-model="telefono"
              label="Telefono"
              mask="(##) ### - ### - ###"
              fill-mask
            />
            <q-input
              style="width: 300px"
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
            <q-input
              square
              filled
              v-model="codigo_postal"
              label="Codigo Postal"
            />
            <q-input square filled v-model="localizacion" label="Localizacion">
              <template v-slot:prepend>
                <q-icon name="place" />
              </template>
            </q-input>
          </div>
          <div class="q-mt-md q-pa justify-center q-gutter-md row items-start">
            <q-btn color="deep-purple-4" @click="crear">
              <q-icon
                size="35px"
                left
                name="img:https://cdn-icons-png.flaticon.com/512/3557/3557291.png"
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
  name: "PageCrearCliente",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    CrearCliente() {
      let date = new Date();
      if (this.fecha_registro <= date.toISOString().split("T")[0]) {
        this.$axios
          .post(
            'http://localhost:8069/gestion/apirest/moracorp.clientes?data={"id":"0","nif":"' +
              this.nif +
              '","nombre":"' +
              this.nombre +
              '","fecha_registro":"' +
              this.fecha_registro +
              '","direccion":"' +
              this.direccion +
              '","telefono":"' +
              this.telefono +
              '","email":"' +
              this.email +
              '","codigo_postal":"' +
              this.codigo_postal +
              '","localizacion":"' +
              this.localizacion +
              '"}'
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        this.$router.push("/clientes");
      } else {
        window.alert(
          "Error la Fecha de Registro no puede ser posterior a la Fecha Actual."
        );
      }
    },
    crear() {
      this.CrearCliente();
    },
  },
  setup() {
    return {
      nif: ref(""),
      nombre: ref(""),
      fecha_registro: ref(""),
      direccion: ref(""),
      telefono: ref(""),
      email: ref(""),
      codigo_postal: ref(""),
      localizacion: ref(""),
    };
  },
};
</script>
<style></style>
