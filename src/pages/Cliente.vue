<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="col">
        <q-card-section horizontal>
          <q-avatar size="450px">
            <img :src="src" />
          </q-avatar>
          <q-card-section>
            <div>
              <h1 style="font-size: 35px">{{ nif }}</h1>
            </div>
            <div style="font-size: 15px">{{ nombre }}</div>
            <p></p>
            <div style="font-size: 15px">{{ direccion }}</div>
            <p></p>
            <div style="font-size: 15px">{{ localizacion }}</div>
            <p></p>
            <div style="font-size: 15px">{{ codigo_postal }}</div>
            <p></p>
            <div style="font-size: 15px">{{ telefono }}</div>
            <p></p>
            <div style="font-size: 15px">{{ email }}</div>
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
  </q-page>
</template>

<script>
import { ref, route } from "vue";

//import { defineComponent, ref } from "vue";
export default {
  name: "PageCliente",
  data() {
    return {
      nombre: true,
      src: true,
      id: 0,
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
          this.nif = "NIF: " + res.data[0].nif;
          this.nombre = "Nombre: " + res.data[0].nombre;
          this.localizacion = "Ciudad: " + res.data[0].localizacion;
          this.codigo_postal = "C.P: " + res.data[0].codigo_postal;
          this.telefono = "Telefono: " + res.data[0].telefono;
          this.email = "Email: " + res.data[0].email;
          var image = new Image();
          image.src = "data:image/png;base64," + res.data[0].foto.slice(2, -1);
          this.src = image.src;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editar() {
      this.$router.push("/clientes/editar/" + this.id);
    },
    borrar() {
      console.log(this.id);
      this.$axios
        .get(
          "http://localhost:8069/gestion/borrar/moracorp.clientes/" + this.id
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
      this.$router.push("/clientes");
    },
  },
};
</script>
