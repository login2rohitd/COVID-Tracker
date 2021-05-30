
let dates;
let daily_infected_count;

async function getCountForChart() {
    const res123       = await fetch("https://api.covid19india.org/data.json");
    const responsedata = await res123.json();

    const datewisedata = responsedata.cases_time_series;                    //datewisedata is of array type.

    //dates = ['a', 'b', 'c', 'd'];  
    dates = datewisedata.map(abc => abc.dateymd);                           //Used Map to create Array of dates from 'datewisedata' Array.
    daily_infected_count = datewisedata.map(abc => abc.dailyconfirmed);

    loadChart();            //I have contained below chart js operation in loadchart() function becaues I want those chart operation to be done only after getting values in dates and daily count array.
}


function loadChart() {

    let myChart_abc = document.getElementById('myChart').getContext('2d');         //For canvas type of element, we need to provide getContext.

    let lineChart = new Chart(myChart_abc, {           
        type: 'line',              //Type of chart: Bar, line, pie, horizontal bar, ...

        data: {
            labels: dates,                     //labels are the X-Axis elements which takes input in array format.
            datasets: [{                       //in datasets we provide data for line. [Note: This is array so we can provide data for another lines also.]  here we are going to show only one line.
                label: 'Daily Infected Count', //Label for 1st line graph.
                data: daily_infected_count,    //Data for1st line graph. it takes input in array format.
                backgroundColor: 'rgba(255,99,132,0.6)',    //colour of 1st line.
                borderWidth: 1,
                borderColor: '#777',
                fill: true                     //This is to fill area below line.   //true, false, 'start', 'end'
            }]
        },

        options: {
            title: {
                //display: true,
                //text: '',
                //fontSize: 25
            },
            layout: {
                padding: {
                    left: 50,
                    right: 0,
                    bottom: 0,
                    top: 0
                }
            },
            elements: {
                line: {
                    tension: 0           //Increase this to get smooth line in case of line chart.
                },
                point: {
                    radius: 0.6           //This is radius of circles which are visible on line.
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {       //This font is for Lable at top.
                            size: 15,                    //This is in px.
                            family: 'Bookman Old Style'    
                        }
                    }
                }
            },
            scales: {         //These below fonts are for axes
                x: {
                    ticks: {
                        font: {
                            size: 10,
                            family: 'Bookman Old Style'
                        }
                    }
                },
                y: {
                    ticks: {
                        font: {
                            size: 10,
                            family: 'Bookman Old Style'
                        }
                    }
                }
            }
        }

    });

}































