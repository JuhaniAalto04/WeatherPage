const view = document.getElementById("view").innerHTML;
let chartLabel;
let context;
let canvas;
console.log(view);
const showReadings = (readingsData) =>{
  const table = document.getElementById("dataTable");
  readingsData.map(item => {
      const row = document.createElement('tr');
      // Date
      createDate(item, row);
      // ---- Data ----
      createData(item, row);
      table.appendChild(row);
  })
  if(view == 2 || view == 3){
   canvas = document.getElementById('chart-canvas');
   context = document.getElementById('chart-canvas').getContext("2d");
    buildChart(readingsData)
  }
};
const buildChart = (data) =>{
  const chartData = Object.values(data).map(item => Object.values(item)[2]);
  const times = Object.values(data).map(item => Object.values(item)[0].slice(11,16));
  makeChart = new Chart(context, {
    type: "bar",
    data: {
        labels: times,
        datasets: [{
        label: chartLabel,
        backgroundColor: "#7a9eb1",
        borderRadius: 3,
        data: chartData
        }] 
    },
    options: {
        maintainAspectRatio: false
    }
})
  
}

const createDate = (item, row) => {
  // ----- Päivämäärä -----
  const dataDate = document.createElement('td');
  dataDate.innerHTML = item.date_time.slice(0,10);
  row.appendChild(dataDate);
  // ---- Kellonaika ----
  const dataTime = document.createElement('td');
  dataTime.innerHTML = item.date_time.slice(11,16);
  row.appendChild(dataTime);
}
const createData = (item, row) => {
  if(view == 1){
  const tData = document.createElement('td');
  tData.innerHTML = Object.keys(item.data)[0] + ": " + Object.values(item.data)[0];
  row.appendChild(tData);
  }
  else if(view == 2 || view == 3){
    const tData = document.createElement('td');
    tData.innerHTML = Object.values(item)[2].slice(0,5);
    row.appendChild(tData);
  }
  else{
    console.log("error404, you shouldn't be here.")
  }
}

const Readings = async() => {
  try {
      const response = await fetch('http://webapi19sa-1.course.tamk.cloud/v1/weather/limit/50');
      const data = await response.json();
      console.log("50: ");
      console.log(data);
      showReadings(data);
  } catch (error) {
      console.log(error);
  }
}
const tempReadings = async() => {
  try {
      const response = await fetch('http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature');
      const data = await response.json();
      console.log("Temp: ");
      console.log(data);
      showReadings(data);
  } catch (error) {
      console.log(error);
  }
}
const speedReadings = async() => {
  try {
      const response = await fetch('http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed');
      const data = await response.json();
      console.log("Speed: ");
      console.log(data);
      showReadings(data);
  } catch (error) {
      console.log(error);
  }
}
if(view == 1){
Readings(); 
}
else if(view == 2){
  chartLabel = "Lämpötila"
  tempReadings();
}
else if(view == 3){
  chartLabel = "Tuulen nopeus"
  speedReadings();
}