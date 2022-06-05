<template>
  <apexchart
    type="bar"
    height="700"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>
<script>
export default {
  name: "ComponenteGrafico",
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {},
        yaxis: {
          title: {
            text: "Estadistica de Contabilidad de la Empresa",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " euros" + " € ";
            },
          },
        },
      },
    };
  },
  mounted() {
    this.RellenarGraficoStock();
  },
  methods: {
    RellenarGraficoStock() {
      this.$axios
        .get("http://localhost:8069/gestion/stock/moracorp.productos")
        .then((res) => {
          let productos = [];
          let ingresos = [];
          let costes = [];
          let beneficios = [];
          for (let i = 0; i < res.data.length; i++) {
            productos.push(res.data[i].nombre);
            ingresos.push(res.data[i].ingresos);
            costes.push(res.data[i].costes);
            beneficios.push(res.data[i].beneficios);
          }
          this.series = [
            {
              data: ingresos,
              name: "Ingresos",
            },
            { data: costes, name: "Costes" },
            { data: beneficios, name: "Beneficios" },
          ];
          this.chartOptions = {
            xaxis: {
              categories: productos,
            },
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goTo(event, row) {
      this.$router.push("/producto/" + row.id);
    },
  },
};
</script>
