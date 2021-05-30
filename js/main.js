//To get 3 cards hovered on the page load.
$(document).ready(function () {
    jQuery('.mycardsinfected').addClass('on_pageload_infected').
      delay(350).queue(function (next) { $(this).removeClass("on_pageload_infected"); next(); }).
      delay(100).queue(function (next) { $('.mycardsrecovered').addClass('on_pageload_recovered'); next(); }).
      delay(350).queue(function (next) { $('.mycardsrecovered').removeClass("on_pageload_recovered"); next(); }).
      delay(100).queue(function (next) { $('.mycardsdeaths').addClass('on_pageload_deaths'); next(); }).
      delay(350).queue(function (next) { $('.mycardsdeaths').removeClass("on_pageload_deaths"); next(); }).
      delay(100).queue(function (next) { $('.mycardsvaccinated').addClass('on_pageload_vaccinated'); next(); }).
      delay(350).queue(function (next) { $('.mycardsvaccinated').removeClass("on_pageload_vaccinated"); next(); });
    });
    
    async function getCountries() {

      const res123 = await fetch("https://covid19.mathdro.id/api/countries");

      const responsedata = await res123.json();
      //console.log(responsedata); //For my understanding

      let select = document.getElementById("countrySelect");

      for (i = 0; i < responsedata.countries.length; i++) {
        let opt = document.createElement("option");
        opt.innerHTML = responsedata.countries[i].name;
        opt.value = responsedata.countries[i].iso2;
        select.options.add(opt, (responsedata.countries[i].name == "India" ? 1 : i + 2));    //To get India at 2nd position after Global.
      }

      document.getElementById('countrySelect').value = 'IN';  //to Show India At start
      getCount(); //I wanted to load count only after india is selected in dropdown That's why I have callbacked this getCount() function here also.
    }

  //This getcount function is called on onchange of dropdown.  
  async function getCount() {          
    let selected_country_code = document.getElementById("countrySelect").value;   //To get selected country from dropdown.

    let url = "https://covid19.mathdro.id/api" + (selected_country_code == "" ? "" : "/countries/" + selected_country_code);  //alert(url);

    const res123       = await fetch(url);           //console.log(res123); //For my understanding
    const responsedata = await res123.json();  //console.log(responsedata); //For my understanding

    let infected  = responsedata.confirmed.value;
    let recovered = responsedata.recovered.value;
    let deaths    = responsedata.deaths.value

    document.getElementById('infectedcardvalue').innerHTML = infected.toLocaleString();
    document.getElementById('recoveredcardvalue').innerHTML = recovered.toLocaleString();
    document.getElementById('deathscardvalue').innerHTML = deaths.toLocaleString();

    //document.getElementById('infectedcardperc').innerHTML = '';
    document.getElementById('recoveredcardperc').innerHTML = parseFloat(recovered / infected * 100).toFixed(2);
    document.getElementById('deathscardperc').innerHTML = parseFloat(deaths / infected * 100).toFixed(2);

    document.getElementById('infectedcardlastupdated').innerHTML = new Date(responsedata.lastUpdate).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });
    document.getElementById('recoveredcardlastupdated').innerHTML = new Date(responsedata.lastUpdate).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });
    document.getElementById('deathscardlastupdated').innerHTML = new Date(responsedata.lastUpdate).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });

    //Vaccination data and chart are available only for India.
    if (selected_country_code == 'IN') {
      document.getElementById("vaccinated").hidden = false;

      const res123 = await fetch("https://api.covid19india.org/data.json");
      const responsedata = await res123.json();

      const latestdata = responsedata.tested[responsedata.tested.length-1];
      const total_doses_administstered = latestdata.totaldosesadministered;
      const updated_time = latestdata.updatetimestamp;

      document.getElementById('vaccinatedcardvalue').innerHTML = (parseInt(total_doses_administstered).toLocaleString());
      document.getElementById('vaccinatedcardperc').innerHTML = parseFloat(total_doses_administstered / 1340631990 * 100).toFixed(2);     //Population is hard coded here.
      document.getElementById('vaccinatedcardlastupdated').innerHTML = new Date( updated_time.substring(6, 10)+'-'+updated_time.substring(3, 5)+'-'+updated_time.substring(0, 2) ).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });

      //For chart
      document.getElementsByClassName('chartContainer')[0].hidden = false;
      getCountForChart();        //This function is written in linechart.js
    }else {
      document.getElementById("vaccinated").hidden = true;
      document.getElementsByClassName('chartContainer')[0].hidden = true;
    }

    toCounterUpNumbers();          //To counter-up Number.
  }

  function toCounterUpNumbers() {
    $("#infectedcardvalue").counterUp({ delay: 40, time: 1000 });       //delay: speed of counting,  time: actual time to show final count. 
    $("#recoveredcardvalue").counterUp({ delay: 40, time: 1000 });
    $("#deathscardvalue").counterUp({ delay: 40, time: 1000 });
    $("#vaccinatedcardvalue").counterUp({ delay: 40, time: 1000 });
    //$("#infectedcardperc")       .counterUp({ delay: 40, time: 1000 });
    $("#recoveredcardperc").counterUp({ delay: 40, time: 1000 });
    $("#deathscardperc").counterUp({ delay: 40, time: 1000 });
    $("#vaccinatedcardperc").counterUp({ delay: 40, time: 1000 });
  };
