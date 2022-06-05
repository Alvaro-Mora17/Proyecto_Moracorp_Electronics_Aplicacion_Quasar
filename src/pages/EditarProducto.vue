<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <div>
            <form>
              <h1>Editar Producto:</h1>
              <q-input
                v-model="n_serie"
                label="Nº de Serie:"
                stack-label
                :dense="dense"
              />
              <q-input
                v-model="nombre"
                label="Nombre:"
                stack-label
                :dense="dense"
              />
              <q-input
                v-model="marca"
                label="Marca:"
                stack-label
                :dense="dense"
              />
              <q-input
                v-model="descripcion"
                label="Descripcion:"
                stack-label
                :dense="dense"
              />
              <q-input
                v-model="precio"
                label="Precio sin IVA:"
                stack-label
                :dense="dense"
              />
              <q-input
                v-model="porcentaje_iva"
                label="Porcentaje de IVA:"
                stack-label
                :dense="dense"
              />
              <q-input
                v-model="video"
                label="URL del Video:"
                stack-label
                :dense="dense"
              />
              <br />
              <q-btn color="teal" @click="editar">
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
  name: "PageEditarProducto",
  data() {
    return {
      id: "",
      n_serie: "",
      nombre: "",
      marca: "",
      descripcion: "",
      precio: "",
      porcentaje_iva: "",
      video: "",
    };
  },
  mounted() {
    this.getProducto();
  },
  methods: {
    getProducto() {
      this.$axios
        .get(
          'http://localhost:8069/gestion/apirest/moracorp.productos?data={"id":' +
            this.$route.params.id +
            "}"
        )
        .then((res) => {
          this.id = res.data[0].id;
          this.n_serie = res.data[0].n_serie;
          this.nombre = res.data[0].nombre;
          this.marca = res.data[0].marca[0];
          this.descripcion = res.data[0].descripcion.replace(
            /(<([^>]+)>)/gi,
            ""
          );
          this.precio = res.data[0].precio;
          this.porcentaje_iva = res.data[0].porcentaje_iva;
          this.video = res.data[0].video;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editar() {
      if (!isNaN(this.precio) && !isNaN(this.porcentaje_iva)) {
        var url_embebida = "";
        if (this.video != "" && this.video.search("embed") == -1) {
          var url_embebida =
            this.video.substring(0, 23) +
            "/embed/" +
            this.video.substring(this.video.indexOf("watch?v=") + 8);
        } else {
          url_embebida = this.video;
        }
        this.$axios
          .get(
            'http://localhost:8069/gestion/editar/moracorp.productos?data={"id":"' +
              this.id +
              '","n_serie":"' +
              this.n_serie +
              '","nombre":"' +
              this.nombre +
              '","marca":"' +
              this.marca +
              '","descripcion":"' +
              this.descripcion +
              '","precio":"' +
              this.precio +
              '","porcentaje_iva":"' +
              this.porcentaje_iva +
              '","video":"' +
              url_embebida +
              '"}'
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        this.$router.push("/");
      } else {
        window.alert(
          "Error el valor introducido en Precio sin IVA o Porcentaje de IVA no es numerico. "
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
