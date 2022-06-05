<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <div>
            <form>
              <h1>Editar Cliente:</h1>
              <q-input v-model="nif" label="NIF:" stack-label :dense="dense" />
              <q-input
                v-model="nombre"
                label="Nombre:"
                stack-label
                :dense="dense"
              />
              <q-input
                v-model="fecha_registro"
                type="date"
                label="Fecha de Registro:"
                stack-label
                :dense="dense"
              >
                <template v-slot:prepend>
                  <q-icon name="event" />
                </template>
              </q-input>
              <q-input
                v-model="direccion"
                label="Direccion:"
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
                v-model="codigo_postal"
                label="Codigo Postal:"
                stack-label
                :dense="dense"
              />
              <q-input
                square
                v-model="localizacion"
                label="Localizacion:"
                stack-label
                :dense="dense"
              >
                <template v-slot:prepend>
                  <q-icon name="place" />
                </template>
              </q-input>
              <br />
              <q-btn color="deep-purple-4" @click="editar">
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
  name: "PageEditarCliente",
  data() {
    return {
      id: "",
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
  mounted() {
    this.getCliente();
  },
  methods: {
    getCliente() {
      this.$axios
        .get(
          'http://localhost:8069/gestion/apirest/moracorp.clientes?data={"id":' +
            this.$route.params.id +
            "}"
        )
        .then((res) => {
          this.id = res.data[0].id;
          this.nif = res.data[0].nif;
          this.nombre = res.data[0].nombre;
          this.fecha_registro = res.data[0].fecha_registro;
          this.direccion = res.data[0].direccion;
          this.telefono = res.data[0].telefono;
          this.email = res.data[0].email;
          this.codigo_postal = res.data[0].codigo_postal;
          this.localizacion = res.data[0].localizacion;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editar() {
      let date = new Date();
      if (this.fecha_registro <= date.toISOString().split("T")[0]) {
        this.$axios
          .get(
            'http://localhost:8069/gestion/editar/moracorp.clientes?data={"id":"' +
              this.id +
              '","nif":"' +
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
            console.log(res.data);
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
