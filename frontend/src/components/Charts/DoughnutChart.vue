<script>
import { Doughnut } from 'vue-chartjs'
import { isPending } from 'q';

export default {
    name: 'DoughnutChart',
    extends: Doughnut,
    props: ['chartData', 'isPercentage'],
    mounted () {
        const options = {
            responsive: true,
            maintainAspectRatio:false,
            tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    //get the concerned dataset
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    //calculate the total of this data set
                    var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                        return previousValue + currentValue;
                    });
                    //get the current items value
                    var currentValue = dataset.data[tooltipItem.index];
                    //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
                    var percentage = Math.floor(((currentValue/total) * 100)+0.5);

                    return percentage + "%";
                    }
                }
            } 
        }
        this.renderChart(this.chartData, options)
    }
}
</script>

<style>

</style>