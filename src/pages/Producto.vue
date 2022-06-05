<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="col">
        <q-card-section horizontal>
          <q-img :src="src2" style="max-width: 650px; height: 415px" />
          <q-card-section>
            <h1 style="font-size: 35px">{{ n_serie }}</h1>
            <div style="font-size: 15px">{{ nombre }}</div>
            <p></p>
            <div style="font-size: 15px">{{ marca }}</div>
            <p></p>
            <div style="font-size: 15px">{{ descripcion }}</div>
            <p></p>
            <div style="font-size: 15px">{{ precio_iva }}</div>
            <p></p>
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
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-md">
      <q-video :ratio="8 / 4" :src="src" />
    </div>
  </q-page>
</template>

<script>
import { ref, route } from "vue";

//import { defineComponent, ref } from "vue";
export default {
  name: "PageProducto",
  data() {
    return {
      n_serie: true,
      src: true,
      id: 0,
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
          var url_embebida = "";
          if (
            res.data[0].video != "" &&
            res.data[0].video.search("embed") == -1
          ) {
            var url_embebida =
              res.data[0].video.substring(0, 23) +
              "/embed/" +
              res.data[0].video.substring(
                res.data[0].video.indexOf("watch?v=") + 8
              );
          } else {
            url_embebida = res.data[0].video;
          }
          this.id = res.data[0].id;
          this.n_serie = "Nº de Serie: " + res.data[0].n_serie;
          this.nombre = "Nombre: " + res.data[0].nombre;
          this.marca = "Marca: " + res.data[0].marca[1];
          this.descripcion =
            "Descripcion: " +
            res.data[0].descripcion.replace(/(<([^>]+)>)/gi, "");
          this.precio_iva = "PVP: " + res.data[0].precio_iva.toFixed(2);
          this.src = url_embebida;
          var image = new Image();
          image.src = "data:image/png;base64," + res.data[0].foto.slice(2, -1);
          this.src2 = image.src;
          console.log(res.data[0].foto);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editar() {
      this.$router.push("/producto/editar/" + this.id);
    },
    borrar() {
      console.log(this.id);
      this.$axios
        .get(
          "http://localhost:8069/gestion/borrar/moracorp.productos/" + this.id
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
      this.$router.push("/");
    },
  },
};
</script>
