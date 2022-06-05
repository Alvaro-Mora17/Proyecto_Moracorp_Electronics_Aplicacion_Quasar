const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Productos.vue") },
      { path: "producto/:id", component: () => import("pages/Producto.vue") },
      {
        path: "producto/crear",
        component: () => import("pages/CrearProducto.vue"),
      },
      {
        path: "producto/editar/:id",
        component: () => import("pages/EditarProducto.vue"),
      },
      { path: "compras", component: () => import("pages/Compras.vue") },
      { path: "compras/:id", component: () => import("pages/Compra.vue") },
      {
        path: "compras/crear",
        component: () => import("pages/CrearCompra.vue"),
      },
      {
        path: "compras/editar/:id",
        component: () => import("pages/EditarCompra.vue"),
      },
      { path: "ventas", component: () => import("pages/Ventas.vue") },
      { path: "ventas/:id", component: () => import("pages/Venta.vue") },
      { path: "ventas/crear", component: () => import("pages/CrearVenta.vue") },
      {
        path: "ventas/editar/:id",
        component: () => import("pages/EditarVenta.vue"),
      },
      {
        path: "transacciones",
        component: () => import("pages/Transacciones.vue"),
      },
      {
        path: "transacciones/:id",
        component: () => import("pages/Transaccion.vue"),
      },
      {
        path: "transacciones/crear",
        component: () => import("pages/CrearTransaccion.vue"),
      },
      {
        path: "transacciones/editar/:id",
        component: () => import("pages/EditarTransaccion.vue"),
      },
      { path: "stock", component: () => import("pages/Stock.vue") },
      {
        path: "stock/grafico",
        component: () => import("pages/StockGrafico.vue"),
      },
      {
        path: "proveedores",
        component: () => import("pages/Proveedores.vue"),
      },
      {
        path: "proveedores/:id",
        component: () => import("pages/Proveedor.vue"),
      },
      {
        path: "proveedores/crear",
        component: () => import("pages/CrearProveedor.vue"),
      },
      {
        path: "proveedores/editar/:id",
        component: () => import("pages/EditarProveedor.vue"),
      },
      {
        path: "clientes",
        component: () => import("pages/Clientes.vue"),
      },
      {
        path: "clientes/:id",
        component: () => import("pages/Cliente.vue"),
      },
      {
        path: "clientes/crear",
        component: () => import("pages/CrearCliente.vue"),
      },
      {
        path: "clientes/editar/:id",
        component: () => import("pages/EditarCliente.vue"),
      },
      {
        path: "pedidos",
        component: () => import("pages/Pedidos.vue"),
      },
      {
        path: "pedidos/:id",
        component: () => import("pages/Pedido.vue"),
      },
      {
        path: "pedidos/crear",
        component: () => import("pages/CrearPedido.vue"),
      },
      {
        path: "pedidos/editar/:id",
        component: () => import("pages/EditarPedido.vue"),
      },
      {
        path: "pedidos/calendario",
        component: () => import("pages/PedidosCalendario.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
