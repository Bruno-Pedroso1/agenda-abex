  <template>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </template>

  <script>
  import { Bar } from "vue-chartjs/legacy";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from "chart.js";

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  );

  export default {
    name: "ServiceCityGraph",
    components: { Bar },

    props: {
      chartId: {
        type: String,
        default: "bar-chart",
      },
      datasetIdKey: {
        type: String,
        default: "label",
      },
      width: {
        type: Number,
        default: 300,
      },
      height: {
        type: Number,
        default: 300,
      },
      cssClasses: {
        default: "",
        type: String,
      },
      styles: {
        type: Object,
        default: () => ({}),
      },
      plugins: {
        type: Array,
        default: () => [],
      },
      chartData: {
        type: Object, 
        required: true,
      },
      chartOptions: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
