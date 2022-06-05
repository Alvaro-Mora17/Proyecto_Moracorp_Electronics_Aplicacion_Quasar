<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Moracorp App </q-toolbar-title>
        <div>
          <q-avatar size="75px">
            <img src="~assets/moracorp.png" />
          </q-avatar>
        </div>
        <!--<div>Quasar v{{ $q.version }}</div>-->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list padding style="margin-top: 150px">
        <q-item-label header> Links Esenciales </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <q-img class="absolute-top" src="~assets/fondo.jpg" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="85px" class="q-mb-sm">
            <img src="~assets/moracorp.png" />
          </q-avatar>
          <div class="text-weight-bold" style="color: #0b1a29">
            Alvaro Mora Lopez
          </div>
          <div style="color: #0b1a29">@almolo17</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md q-gutter-sm">
        <q-btn color="teal" @click="irproductos">
          <q-icon
            size="45px"
            left
            name="img:https://cdn-icons-png.flaticon.com/512/3556/3556550.png"
          />
          <div>Productos</div>
        </q-btn>
        <q-btn color="purple" @click="ircompras">
          <q-icon
            size="45px"
            left
            name="img:https://cdn-icons-png.flaticon.com/512/3523/3523887.png"
          />
          <div>Compras</div>
        </q-btn>
        <q-btn color="red" @click="irventas">
          <q-icon
            size="45px"
            left
            name="img:https://cdn-icons-png.flaticon.com/512/2727/2727313.png"
          />
          <div>Ventas</div>
        </q-btn>
        <q-btn color="green" @click="irstock">
          <q-icon
            size="45px"
            left
            name="img:https://cdn-icons-png.flaticon.com/512/2728/2728472.png"
          />
          <div>Stock</div>
        </q-btn>
        <q-btn color="amber-5" @click="irproveedores">
          <q-icon
            size="45px"
            left
            name="img:https://cdn-icons-png.flaticon.com/512/5351/5351684.png"
          />
          <div>Proveedores</div>
        </q-btn>
        <q-btn color="deep-purple-4" @click="irclientes">
          <q-icon
            size="45px"
            left
            name="img:https://cdn-icons-png.flaticon.com/512/1529/1529061.png"
          />
          <div>Clientes</div>
        </q-btn>
        <q-btn color="pink-7" @click="irpedidos">
          <q-icon
            size="45px"
            left
            name="img:https://cdn-icons-png.flaticon.com/512/3880/3880040.png"
          />
          <div>Pedidos</div>
        </q-btn>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Odoo",
    caption: "Pagina Principal",
    icon: "img:https://w7.pngwing.com/pngs/936/291/png-transparent-odoo-business-payment-de-gea-spain-purple-violet-payment-thumbnail.png",
    link: "http://localhost:8069/web#action=35&model=ir.module.module&view_type=kanban&cids=&menu_id=5",
  },
  {
    title: "Modulo Moracorp",
    caption: "Modulo Personalizado",
    icon: "img:https://w7.pngwing.com/pngs/936/291/png-transparent-odoo-business-payment-de-gea-spain-purple-violet-payment-thumbnail.png",
    link: "http://localhost:8069/web#action=366&model=moracorp.productos&view_type=list&cids=&menu_id=295",
  },
  {
    title: "Sitio Web",
    caption: "Web",
    icon: "public",
    link: "http://localhost:8069/",
  },
  {
    title: "Contactos",
    caption: "Modulo de Contactos",
    icon: "record_voice_over",
    link: "http://localhost:8069/web#action=328&model=res.partner&view_type=kanban&cids=&menu_id=255",
  },
  {
    title: "Ajustes",
    caption: "Ajustes Odoo",
    icon: "img:https://cdn.pixabay.com/photo/2016/10/19/03/59/socialmedia-1752079_960_720.png",
    link: "http://localhost:8069/web#id=&action=141&model=res.config.settings&view_type=form&cids=&menu_id=4",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    irproductos() {
      this.$router.push("/");
    },
    ircompras() {
      this.$router.push("/compras");
    },
    irventas() {
      this.$router.push("/ventas");
    },
    irstock() {
      this.$router.push("/stock");
    },
    irproveedores() {
      this.$router.push("/proveedores");
    },
    irclientes() {
      this.$router.push("/clientes");
    },
    irpedidos() {
      this.$router.push("/pedidos");
    },
  },
});
</script>
