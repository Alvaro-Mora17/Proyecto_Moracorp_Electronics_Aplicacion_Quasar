<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <h1 style="font-size: 25px">
            Introduce valores a los Campos para Crear un Producto:
          </h1>
          <div class="justify-center q-gutter-md row items-start">
            <q-input square filled v-model="n_serie" label="Nº de Serie" />
            <q-input square filled v-model="nombre" label="Nombre" />
            <q-input square filled v-model="marca" label="Marca" />
            <!--<q-input square filled v-model="foto" label="Foto" />-->
            <q-input square filled v-model="precio" label="Precio sin IVA" />
            <q-input
              square
              filled
              v-model="porcentaje_iva"
              label="Porcentaje de IVA"
            />
          </div>
          <div class="q-mt-md q-pa justify-center q-gutter-md row items-start">
            <q-input
              style="width: 1000px; height: 200px"
              square
              filled
              v-model="descripcion"
              color="teal"
              type="textarea"
              label="Descripcion"
            />
          </div>
          <div class="justify-center q-gutter-md row items-start">
            <q-input
              style="width: 1000px"
              square
              filled
              v-model="video"
              color="teal"
              label="URL del Video"
            />
          </div>
          <br />
          <div class="justify-center q-gutter-md row items-start">
            <q-btn color="teal" @click="crear">
              <q-icon
                size="35px"
                left
                name="img:https://cdn-icons-png.flaticon.com/512/1740/1740376.png"
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
  name: "PageCrearProducto",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    CrearProductos() {
      if (!isNaN(this.precio) == true && !isNaN(this.porcentaje_iva) == true) {
        var url_embebida = "";
        if (this.video != "") {
          var url_embebida =
            this.video.substring(0, 23) +
            "/embed/" +
            this.video.substring(this.video.indexOf("watch?v=") + 8);
        }
        this.$axios
          .post(
            'http://localhost:8069/gestion/apirest/moracorp.productos?data={"id":"0","n_serie":"' +
              this.n_serie +
              '","nombre":"' +
              this.nombre +
              '","marca":"' +
              this.marca +
              /*'","foto":"' +
              this.foto +*/
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
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        this.$router.push("/");
      } else {
        window.alert(
          "Error el Precio sin IVA o el Porcentaje de IVA se le ha insertado un dato erroneo" +
            ",revise ambos campos he inserte un valor numerico."
        );
      }
    },
    crear() {
      this.CrearProductos();
    },
  },
  setup() {
    return {
      n_serie: ref(""),
      nombre: ref(""),
      marca: ref(""),
      //foto: ref(""),
      descripcion: ref(""),
      precio: ref(""),
      porcentaje_iva: ref(""),
      video: ref(""),
    };
  },
};
</script>
<style></style>
