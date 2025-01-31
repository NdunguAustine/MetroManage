
// Charts
const lineChartOptions = {
    series: [{
        name: 'Earnings',
        data: [10, 40, 60, 90, 120, 150, 180]
    }],
    chart: {
        type: 'line',
        height: 350
    },
    xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
};

const donutChartOptions = {
    series: [70, 30],
    chart: {
        type: 'donut'
    },
    labels: ['Completed', 'Pending']
};

const lineChart = new ApexCharts(document.querySelector("#line-chart"), lineChartOptions);
lineChart.render();

const donutChart = new ApexCharts(document.querySelector("#donut-chart"), donutChartOptions);
donutChart.render();
