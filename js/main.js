let SearchInput = document.getElementById("SearchInput");
let Content = document.getElementById("content");
let data=[]

SearchInput.addEventListener("keyup", function () {
    GetData(SearchInput.value)
})



async function GetData(city) {
    let response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=2dacb28dce634504a84184045241001&q=${city}&days=3&aqi=yes&alerts=yes`
    );
    data = (await response.json())
    console.log(data)
DisplayData()
    
    
}
GetData("Cairo")

function DisplayData() {
    let div = ``
    for (let i = 0; i < data.forecast.forecastday.length; i++) {
      const d = new Date(data.forecast.forecastday[i].date).toDateString(
        "weekday"
      );
      div += `<div class="col-lg-4 border border-color shadow-lg border-3  my-5 text-light">
               <div class="d-flex"><h3 class="m-auto">${d}</h3> </div> 
                <h5>${data.location.name}</h5>
                <h1>${data.forecast.forecastday[i].day.avgtemp_c}<sup>o</sup>C</h1>
           <div class="d-flex align-items-center">     <p>${data.forecast.forecastday[i].day.condition.text}</p>
               <img src="${data.forecast.forecastday[i].day.condition.icon}" alt="" class="img-fluid ms-auto">
               </div>

            </div>`;
    }
    Content.innerHTML = div
}