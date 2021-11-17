//fill some empty datasets 

var datanull = new Array(100).fill(null);
var labelnull = new Array(100).fill("");

var datanull2 = new Array(100).fill(null);
var datanull3 = new Array(100).fill(null);
var datanull4 = new Array(100).fill(null);
var labelnull2 = new Array(100).fill("");


var datanull5 = new Array(100).fill(null);
var datanull6 = new Array(100).fill(null);
var datanull7 = new Array(100).fill(null);
var datanull8 = new Array(100).fill(null);
var datanull13 = new Array(100).fill(null);
var labelnull5 = new Array(100).fill("");

var datanull9 = new Array(100).fill(null);
var datanull10 = new Array(100).fill(null);
var datanull11 = new Array(100).fill(null);
var datanull12 = new Array(100).fill(null);
var labelnull9 = new Array(100).fill("");




const data = {
  labels: labelnull,
  datasets: [{
    label: 'User-Balance',
    data: datanull,
    fill: false,
    color: '#fc7703',
    borderColor: '#fc4503',
    backgroundColor: "rgba(255, 133, 89, 0.2)",
    fill: true,
    tension: 0.1
  }]
};

const config = {
    type: 'line',
    data: data,


};

const data_net = {
  labels: labelnull2,
  datasets: [{
    label: 'CPU_Usage',
    data: datanull2,
    color: 'green',
    borderColor: 'green',
    backgroundColor: "rgba(13, 117, 13, 0.2)",
    fill: true,
    tension: 0.1,
    yAxisID: "y1"
  },
{
  label: 'Connections',
  data: datanull3,
  color: 'blue',
  borderColor: 'blue',
  backgroundColor: "rgba(50, 155, 168, 0.2)",
  fill: true,
  tension: 0.1,
  yAxisID: "y2"
},
{
  label: 'Hashrate',
  data: datanull4,
  yAxisID: "y3",
  color: 'red',
  borderColor: 'red',
  backgroundColor: "rgba(168, 50, 60, 0.2)",
  fill: true,
  tension: 0.1,
  
}]
};

const config_net = {
    type: 'line',
    data: data_net,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        'y1': {
          title:{
            display: true,
            text: "CPU - Usage",
          },
            display: true,
            text: "CPU",
            min:0,
            max:100,
            type: 'linear',
            position: "left",
        },
        'y2': {
          title:{
            display: true,
            text: "Connections",
          },
            display: true,
            labelString: "Connection",
            type: 'linear',
            position: "right",
            min: 0,
            

        },
        'y3': {
          title:{
            display: true,
            text: "Hashrate",
          },
            display: true,
            labelString: "Hashrate",
            type: 'linear',
            position: "right",
            min: 0,
        },
    }
  }


};


//For hashrate shower of each individual device 

const data_hashrate= {
  labels: labelnull5,
  datasets: [{
    label: 'ᕲ daily 15s',
    data: datanull5,
    color: '#4fa8a5',
    borderColor: '#4fa8a5',
    tension: 0.1,
    yAxisID: "y1"
  },

{
  label: 'Hashrate Arduino',
  data: datanull6,
  color: '#4fa852',
  borderColor: '#4fa852',

  tension: 0.1,
  yAxisID: "y2"
},
{
  label: 'Hashrate ESP',
  data: datanull7,
  yAxisID: "y3",
  color: 'orange',
  borderColor: 'orange',

  tension: 0.1,
  
},
{
  label: 'Hashrate PC',
  data: datanull8,
  yAxisID: "y4",
  color: 'red',
  borderColor: 'red',

  tension: 0.1,
  
},
{
  label: 'ᕲ avg daily',
  data: datanull13,
  color: 'black',
  borderColor: 'black',
  backgroundColor: "rgba(184, 184, 184, 0.15)",
  fill: true,
  tension: 0.1,
  yAxisID: "y1"
},



]
};

const config_hashrate = {
    type: 'line',
    data: data_hashrate,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        'y1': {
          title:{
            display: true,
            text: "Daily Duco",
          },
            display: true,
            labelString: "ᕲ",
            min:0,
            
            type: 'linear',
            position: "left",
        },
        'y2': {
          title:{
            display: true,
            text: "Arduino - H/s",
          },
            display: true,
            labelString: "H/s",
            type: 'linear',
            position: "right",
            min: 0,
            

        },
        'y3': {
          title:{
            display: true,
            text: "ESP - kH/s",
          },
            display: true,
            labelString: "kH/s",
            type: 'linear',
            position: "right",
            min: 0,
            

        },
        'y4': {
          title:{
            display: true,
            text: "PC - kH/s",
          },
            display: true,
            labelString: "kH/s",
            type: 'linear',
            position: "right",
            min: 0,
            

        },
    }
  }


};

//For the connection chart
const data_connections= {
  labels: labelnull9,
  datasets: [{
    label: 'Connections All',
    data: datanull9,
    color: 'black',
    borderColor: 'black',
    backgroundColor: "rgba(184, 184, 184, 0.15)",
    fill: true,
    tension: 0.1,
  },
{
  label: 'Connections AVR',
  data: datanull10,
  color: 'green',
  borderColor: 'green',

  tension: 0.1,
},
{
  label: 'Connections ESP',
  data: datanull11,
  color: 'orange',
  borderColor: 'orange',

  tension: 0.1,
  
},
{
  label: 'Connections PC',
  data: datanull12,
  color: 'red',
  borderColor: 'red',

  tension: 0.1,
  
},



]
};

const config_connections = {
    type: 'line',
    data: data_connections,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        'y1': {
          title:{
            display: true,
            text: "Connections",
          },
            display: true,
            labelString: "Cons",
            min:0,
            
            type: 'linear',
            position: "right",
        }
      }
    }
};

function createbars(){
  let newdata = [];
  let labels = [];
  fetch("/dailynewusers.json")
    .then(response => response.json())
    .then((api)=>{   
      let data = Object.values(api);       
      let label = Object.keys(api);
      labels = [];
      let i = 0;
      data.reverse().forEach(element => {
        i++;
        if(i<10){
          newdata.push(element["new"]);
        }
      });
      i=0;
      label.reverse().forEach(element => {
        i++;
        if(i<10){
          labels.push(element);
        }
      });
      labels = labels.reverse();
      newdata = newdata.reverse();

      
  let Colors = ["#ff7700", "#ff8c00", "#ffa200", "#eb7734", "#ffc400", "#ffd900", "#ffea00"];
  chart_users = document.getElementById("daily_users").getContext('2d');
  barchart = new Chart(chart_users, {
      type: 'bar',
      data: {
          datasets: [{
              backgroundColor: Colors,
              data: newdata,
          }],
          labels: labels,
      },
      options: {
          responsive: true,
          legend: {
              position: 'bottom'
          },
          plugins: {
            legend:{
              display: false
            },
          }
      }
  });
});
}

function createpie(){
  let Colors = ["#ff7700", "#ff8c00", "#ffa200", "#eb7734", "#ffc400", "#ffd900", "#ffea00"];
  chart_miner = document.getElementById("miner_distro").getContext('2d');
  piechart = new Chart(chart_miner, {
      type: 'pie',
      data: {
          datasets: [{
              backgroundColor: Colors,
              data: [10, 10, 10, 10, 10, 10, 10, 10, 10],
          }],
          
      },
      options: {
          responsive: true,
          legend: {
              position: 'bottom'
          },
          plugins: {
              datalabels: {
                color: '#fff',
                anchor: 'end',
                align: 'start',
                offset: -10,
                borderWidth: 2,
                borderColor: '#fff',
                borderRadius: 25,
                font: {
                  weight: 'bold',
                  size: '10'
                }
              }
            }

      }
  });
}



function makegraph(){
var ctx = document.getElementById('chart1');
var chart = new Chart(ctx, config);

return chart;
}
function makenetchart(){
  var ctx = document.getElementById("net_chart");
  var chart = new Chart(ctx, config_net)
  return chart;
}

function makehashratechart(){
  var ctx = document.getElementById("hashrate_chart");
  var chart = new Chart(ctx, config_hashrate)
  return chart;
}

function makeconchart(){
  var ctx = document.getElementById("connection_chart");
  var chart = new Chart(ctx, config_connections)
  return chart;
}

function addgraph(newlabel, data, chart){
  chart.data.labels.shift();
  chart.data.labels.push(newlabel);
  var fulldata = chart.data.datasets[0].data;
  fulldata.shift();
  fulldata.push(data);
  chart.data.datasets[0].data = fulldata;
  chart.update();
}

function addgraphnet(newlabel, data1, data2, data3, chart){
  chart.data.labels.shift();
  chart.data.labels.push(newlabel);
  var d1 = chart.data.datasets[0].data;
  d1.shift();
  d1.push(data1);
  chart.data.datasets[0].data = d1;

  var d2 = chart.data.datasets[1].data;
  d2.shift();
  d2.push(data2);
  chart.data.datasets[1].data = d2;

  var d3 = chart.data.datasets[2].data;
  d3.shift();
  d3.push(data3);
  chart.data.datasets[2].data = d3;

  chart.update();
}

function addgraphash(newlabel, data1, data2, data3, data4, chart){

  chart.data.labels.shift();
  chart.data.labels.push(newlabel);
  var d1 = chart.data.datasets[0].data;
  d1.shift();
  d1.push(data1);
  chart.data.datasets[0].data = d1;

  var d2 = chart.data.datasets[1].data;
  d2.shift();
  d2.push(data2);
  chart.data.datasets[1].data = d2;

  var d3 = chart.data.datasets[2].data;
  d3.shift();
  d3.push(data3);
  chart.data.datasets[2].data = d3;

  var d4 = chart.data.datasets[3].data;
  d4.shift();
  d4.push(data4);
  chart.data.datasets[3].data = d4;

  chart.update();
}
function addgraphashnew(newlabel, data1, data2, data3, data4, data5, chart){

  chart.data.labels.shift();
  chart.data.labels.push(newlabel);
  var d1 = chart.data.datasets[0].data;
  d1.shift();
  d1.push(data1);
  chart.data.datasets[0].data = d1;

  var d2 = chart.data.datasets[1].data;
  d2.shift();
  d2.push(data2);
  chart.data.datasets[1].data = d2;

  var d3 = chart.data.datasets[2].data;
  d3.shift();
  d3.push(data3);
  chart.data.datasets[2].data = d3;

  var d4 = chart.data.datasets[3].data;
  d4.shift();
  d4.push(data4);
  chart.data.datasets[3].data = d4;

  var d5 = chart.data.datasets[4].data;
  d5.shift();
  d5.push(data5);
  chart.data.datasets[4].data = d5;

  chart.update();
}
