<script>
import {Bar} from 'vue-chartjs'
import { isPending } from 'q';

export default {
    name: 'BarChart',
    extends: Bar,
    props: ['chartData', 'isPercentage'],
    mounted () {
        const options = {
            responsive: true,
            maintainAspectRatio:false,
            scales: {

            },
            tooltips: {
                enabled: false
            }
        }
        if (this.isPercentage) {
            options.scales.yAxes = [
                    {
                        ticks: {
                            min: 0,
                            max: 100,// Your absolute max value
                            callback: function (value) {
                                return (value / this.max * 100).toFixed(0) + '%'; // convert it to percentage
                            },
                        }
                    }
                ]
        }
        this.renderChart(this.chartData, options)
    }
}
</script>

<style>

</style>