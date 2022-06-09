var xWeightValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
var yWeightValues = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

new Chart("weightChart", {
    type: "line",
    data: {
        labels: xWeightValues,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: yWeightValues
        }]
    },
    options: {
        legend: {display: false},
        // scales: {
        //     yAxes: [{ticks: {min: 6, max: 16}}],
        // }
    }
});

var xCaloriesValues = ["Italy", "France", "Spain", "USA", "Argentina", "Vietnam", "China", "Thailand", "Malaysia", "Russia"];
var yCaloriesValues = [55, 49, 44, 24, 15, 26, 70, 69, 50, 55];

new Chart("caloriesChart", {
    type: "bar",
    data: {
        labels: xCaloriesValues,
        datasets: [{
            backgroundColor: "#d06060",
            data: yCaloriesValues
        }]
    },
    options: {
        legend: {display: false},
        // title: {
        //     display: true,
        //     text: "World Wine Production 2018"
        // }
    }
});

var xExerciseValues = ["Italy", "France", "Spain", "USA", "Argentina"];
var yExerciseValues = [55, 49, 44, 24, 15];

new Chart("exerciseChart", {
    type: "bar",
    data: {
        labels: xExerciseValues,
        datasets: [{
            backgroundColor: "#d06060",
            data: yExerciseValues
        }]
    },
    options: {
        legend: {display: false},
        // title: {
        //     display: true,
        //     text: "World Wine Production 2018"
        // }
    }
});
