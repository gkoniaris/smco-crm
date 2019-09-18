<template>
  <div class="row mt-4 text-center">
    <div class="col-md-12">
      <h3>Στατιστικά</h3>
      <hr>
    </div>
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-4">
          <h4>Αναμονή πελάτη</h4>
            <BarChart
              :height="300"
              :isPercentage="true"
              v-if="diagrams.daysUntilClosed"
              :chart-data="diagrams.daysUntilClosed"
            ></BarChart>
          </div>
          <div class="col-md-4">
            <h4>Ευχαρίστηση πελατών</h4>
            <DoughnutChart
              :height="300"
              v-if="diagrams.happiness"
              :chart-data="diagrams.happiness"
            ></DoughnutChart>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash"
import Vue from "vue"
import fetch from "../../fetch.js"
import Bluebird from "bluebird"
import BarChart from "../Charts/BarChart"
import DoughnutChart from '../Charts/DoughnutChart'

export default {
  name: "StatsIndex",
  components: { BarChart, DoughnutChart },
  data: () => {
    return {
      stats: {},
      diagrams: {
        daysUntilClosed: null,
        happiness: null
      }
    };
  },
  mounted() {
    this.getAllStats();
  },
  methods: {
    buildDaysUntilClosedDiagram(diagram, data) {
      const colors = ["#75acc1", "#6fc385"];
      data.forEach((diagramType, idx) => {
        const type = diagramType.type;
        const data = diagramType.data;
        const dummyArray = [0, 1, 2, 3, 4];
        const dataset = {
          label: type === "questions" ? "Ερωτήσεις" : "Συσκευές",
          data: dummyArray.map(number =>
            _.get(
              diagramType.data.find(x => x.numeric_range == parseInt(number)),
              "percentage",
              0
            )
          ),
          backgroundColor: colors[idx]
        };
        if (this.diagrams[diagram]) {
          this.diagrams[diagram].datasets.push(dataset);
        } else {
          Vue.set(this.diagrams, diagram, {
            labels: [
              "0 έως 1",
              "2 έως 4",
              "5 έως 8",
              "9 έως 15",
              "πάνω από 15"
            ],
            datasets: [dataset]
          });
        }
      });
    },
    buildHapinessDiagram (diagram, data){
      Vue.set(this.diagrams, diagram, {
        labels: ['Χαρούμενοι', 'Δυσαρεστημένοι'],
        datasets: [{
          data: [data.happyCount, data.unhappyCount],
          backgroundColor: ["#75e893", "#ff6969"]
        }]
      })
    },
    getAllStats() {
      return Bluebird.map(['daysUntilClosed', 'happiness'], statType => {
        return fetch.get(`/stats?type=${statType}`).then(results => {
          this.stats[statType] = results.data.stats;
          if (statType === 'daysUntilClosed') this.buildDaysUntilClosedDiagram(statType, this.stats[statType]);
          if (statType === 'happiness') this.buildHapinessDiagram(statType, this.stats[statType]);
        });
      });
    }
  }
};
</script>
<style>
h3, h4{
      color: black;
}
</style>