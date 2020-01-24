var latitude = 0;
var longitude = 0;
var urlBaseCurrent = "https://api.openweathermap.org/data/2.5/weather?appid=b650042e3a82aa70290734a60a8cb3e3&q=";
var urlForcaste = "https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=b650042e3a82aa70290734a60a8cb3e3&q=";

var tempCel = "&units=metric";
var tempFah = "&units=imperial";
var input = $("#userInput");
var userInput = input.val();

var searchBtn = $("#searchBtn");
var localTime = moment().format('L');
var citySearchedArr =[localStorage.getItem("historyOfCity",JSON.stringify(citySearchedArr))];
var list =$(".cityList")

// current Location API
var latitude = 0;
var longitude = 0;

if(citySearchedArr.length > 0 ){
  reloadThePage();


}



function reloadThePage(){
  $("#errorMessage").attr("style", "display:none");
  $("#result-box").attr("style", "display:block");
 
  
    var history = localStorage.getItem("Cityname");
    
    
    

    $.ajax({
      url: urlBaseCurrent + history + tempFah,
      type: "GET",

      success: function (wetherInfo) {

        $(".cityName").html("Location: " + wetherInfo.name + `<img src='https://openweathermap.org/img/w/${wetherInfo.weather[0].icon}.png'>` + "(" + localTime + ")");
        $(".weather").html(" Description : " + wetherInfo.weather[0].description);
        $(".tempature").html("Tempature: " + Math.floor(wetherInfo.main.temp) + "&#8457");
        $(".humidity").html("Humidity: " + JSON.stringify(wetherInfo.main.humidity) + "%");
        $(".wind").html("Wind speed : " + JSON.stringify(wetherInfo.wind.speed) + " m/s");


        var cityLatitud = wetherInfo.coord.lat;
        var cityLongitude = wetherInfo.coord.lon;
        UVI(cityLatitud,cityLongitude);
       
        




      }
    });

    
  function UVI(lat,lon){
    //  UVIndex Call
$.ajax({
url:"https://api.openweathermap.org/data/2.5/uvi?appid=b650042e3a82aa70290734a60a8cb3e3&lat="+lat+"&lon="+lon,
type:"GET",
success :function(uvIndexInfo){
  
  $(".uvIndex").html(uvIndexInfo.value);
  var uvVal=uvIndexInfo.value;
    
  if(uvVal <3){
    
    $("#UV").attr("class","uvIndex badge badge-primary");
  }else if(uvVal>3 && uvVal<5){
    
    $("#UV").attr("class","uvIndex badge badge-warning");

  }  
  
  else{
    
    
    $("#UV").attr("class","uvIndex badge badge-danger");

  }

  

}
})




}

   

    // 5 day forcast ajax call
    $.ajax({
      url: urlForcaste + history + tempFah,
      type: "GET",

      success: function (forecastInfo) {


        // Day one
        $("#date1").html(forecastInfo.list[5].dt_txt.slice(0, 10));
        $("#iconD1").html(`<img src='https://openweathermap.org/img/w/${forecastInfo.list[5].weather[0].icon}.png'>`);
        $("#tempD1").html("Tempature: " + Math.floor(forecastInfo.list[5].main.temp) + "&#8457");
        $("#humD1").html("Humidity: " + JSON.stringify(forecastInfo.list[5].main.humidity) + "%");

        // Day two
        $("#date2").html(forecastInfo.list[8].dt_txt.slice(0, 10));
        $("#iconD2").html(`<img src='https://openweathermap.org/img/w/${forecastInfo.list[8].weather[0].icon}.png'>`);
        $("#tempD2").html("Tempature: " + Math.floor(forecastInfo.list[8].main.temp) + "&#8457");
        $("#humD2").html("Humidity: " + JSON.stringify(forecastInfo.list[8].main.humidity) + "%");

        // day three
        $("#date3").html(forecastInfo.list[15].dt_txt.slice(0, 10));
        $("#iconD3").html(`<img src='https://openweathermap.org/img/w/${forecastInfo.list[7].weather[0].icon}.png'>`);
        $("#tempD3").html("Tempature: " + Math.floor(forecastInfo.list[15].main.temp) + "&#8457");
        $("#humD3").html("Humidity: " + JSON.stringify(forecastInfo.list[15].main.humidity) + "%");

        // day four
        $("#date4").html(forecastInfo.list[23].dt_txt.slice(0, 10));
        $("#iconD4").html(`<img src='https://openweathermap.org/img/w/${forecastInfo.list[23].weather[0].icon}.png'>`);
        $("#tempD4").html("Tempature: " + Math.floor(forecastInfo.list[23].main.temp) + "&#8457");
        $("#humD4").html("Humidity: " + JSON.stringify(forecastInfo.list[23].main.humidity) + "%");

        // day five
        $("#date5").html(forecastInfo.list[31].dt_txt.slice(0, 10));
        $("#iconD5").html(`<img src='https://openweathermap.org/img/w/${forecastInfo.list[31].weather[0].icon}.png'>`);
        $("#tempD5").html("Tempature: " + Math.floor(forecastInfo.list[31].main.temp) + "&#8457");
        $("#humD5").html("Humidity: " + JSON.stringify(forecastInfo.list[31].main.humidity) + "%");







      }
    });




  }
  
  




// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
$("#currentBtn").on("click",function(){
  $("#errorMessage").attr("style", "display:none");
  // $("#result-box").attr("style", "display:block");

  // check if the browser support the getlocation API
function supportRequest() {
  if (navigator.getLocation) {


    navigator.geolocation.getCurrentPosition(getPosition);
  } else {
    alert("Geolocation is not supported by this browser !");
  }
}

function getPosition(success) {
  

  latitude = success.coords.latitude;
  longitude = success.coords.longitude;
  

  

  weather()



}
navigator.geolocation.getCurrentPosition(getPosition);





})


// current location API call

function weather() {
  
  $("#result-box").attr("style", "display:block");




  var CurrentUrlBase = "https://api.openweathermap.org/data/2.5/weather?appid=b650042e3a82aa70290734a60a8cb3e3&lat=" + latitude + "&lon=" + longitude + "&units=imperial";
 

  $.ajax({
    url: CurrentUrlBase,
    type: "GET",

    success: function (wetherInfo) {
     
      $(".cityName").html("Location: " + wetherInfo.name + `<img src='https://openweathermap.org/img/w/${wetherInfo.weather[0].icon}.png'>` + "(" + localTime + ")");
      $(".weather").html(" Description : " + wetherInfo.weather[0].description);
      $(".tempature").html("Tempature: " + Math.floor( wetherInfo.main.temp) + "&#8457");
      $(".humidity").html("Humidity: " + JSON.stringify(wetherInfo.main.humidity) + "%");
      $(".wind").html("Wind speed : " + JSON.stringify(wetherInfo.wind.speed) + " m/s");
      



    }
  });
  

     
   // UVIndex Call
   $.ajax({
    url:"https://api.openweathermap.org/data/2.5/uvi?appid=b650042e3a82aa70290734a60a8cb3e3&lat="+latitude+"&lon="+longitude,
    type:"GET",
    success :function(uvIndexInfo){
      
      $(".uvIndex").html(uvIndexInfo.value);
      var uvVal=uvIndexInfo.value;
    
    if(uvVal <3){
      
      $("#UV").attr("class","uvIndex badge badge-primary");
    }else if(uvVal>3 && uvVal<5){
      
      $("#UV").attr("class","uvIndex badge badge-warning");

    }  
    
    else{
      
      
      $("#UV").attr("class","uvIndex badge badge-danger");

    }

      

    }
  })

  // 5 day forcast ajax call
  $.ajax({
    url: urlForcaste + userInput + tempFah,
    type: "GET",

    success: function (forecastInfo) {


      // Day one
      $("#date1").html(forecastInfo.list[5].dt_txt.slice(0, 10));
      $("#iconD1").html(`<img src='https://openweathermap.org/img/w/${forecastInfo.list[5].weather[0].icon}.png'>`);
      $("#tempD1").html("Tempature: " + Math.floor(forecastInfo.list[5].main.temp) + "&#8457");
      $("#humD1").html("Humidity: " + JSON.stringify(forecastInfo.list[5].main.humidity) + "%");

      // Day two
      $("#date2").html(forecastInfo.list[8].dt_txt.slice(0, 10));
      $("#iconD2").html(`<img src='https://openweathermap.org/img/w/${forecastInfo.list[8].weather[0].icon}.png'>`);
      $("#tempD2").html("Tempature: " + Math.floor(forecastInfo.list[8].main.temp) + "&#8457");
      $("#humD2").html("Humidity: " + JSON.stringify(forecastInfo.list[8].main.humidity) + "%");

      // day three
      $("#date3").html(forecastInfo.list[15].dt_txt.slice(0, 10));
      $("#iconD3").html(`<img src='https://openweathermap.org/img/w/${forecastInfo.list[7].weather[0].icon}.png'>`);
      $("#tempD3").html("Tempature: " + Math.floor(forecastInfo.list[15].main.temp) + "&#8457");
      $("#humD3").html("Humidity: " + JSON.stringify(forecastInfo.list[15].main.humidity) + "%");

      // day four
      $("#date4").html(forecastInfo.list[23].dt_txt.slice(0, 10));
      $("#iconD4").html(`<img src='https://openweathermap.org/img/w/${forecastInfo.list[23].weather[0].icon}.png'>`);
      $("#tempD4").html("Tempature: " + Math.floor(forecastInfo.list[23].main.temp) + "&#8457");
      $("#humD4").html("Humidity: " + JSON.stringify(forecastInfo.list[23].main.humidity) + "%");

      // day five
      $("#date5").html(forecastInfo.list[31].dt_txt.slice(0, 10));
      $("#iconD5").html(`<img src='https://openweathermap.org/img/w/${forecastInfo.list[31].weather[0].icon}.png'>`);
      $("#tempD5").html("Tempature: " + Math.floor(forecastInfo.list[31].main.temp) + "&#8457");
      $("#humD5").html("Humidity: " + JSON.stringify(forecastInfo.list[31].main.humidity) + "%");







    }
  });
};


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // city list sidebar function call
  $("#listBody").on("click",".cityList", function(event){
         
    event.preventDefault();
    // $("#currentWeatherBox").attr("style", "display:none");
    $("#result-box").attr("style", "display:block");
   


    var cityName = $(this).text();
   
    

    $.ajax({
      url: urlBaseCurrent + cityName + tempFah,
      type: "GET",

      success: function (wetherInfo) {
       

        $(".cityName").html("Location: " + wetherInfo.name + `<img src='https://openweathermap.org/img/w/${wetherInfo.weather[0].icon}.png'>` + "(" + localTime + ")");
        $(".weather").html(" Description : " + wetherInfo.weather[0].description);
        $(".tempature").html("Tempature: " + Math.floor(wetherInfo.main.temp)+ "&#8457");
        $(".humidity").html("Humidity: " + JSON.stringify(wetherInfo.main.humidity) + "%");
        $(".wind").html("Wind speed : " + JSON.stringify(wetherInfo.wind.speed) + " m/s");

         var cityLatitud = wetherInfo.coord.lat;
         var cityLongitude = wetherInfo.coord.lon;
         UVI(cityLatitud,cityLongitude);
        
      }
    });
    

    function UVI(lat,lon){
        //  UVIndex Call
   $.ajax({
    url:"https://api.openweathermap.org/data/2.5/uvi?appid=b650042e3a82aa70290734a60a8cb3e3&lat="+lat+"&lon="+lon,
    type:"GET",
    success :function(uvIndexInfo){
      
      $(".uvIndex").html(uvIndexInfo.value);
      var uvVal=uvIndexInfo.value;
    
    if(uvVal <3){
      $("#UV").removeClass("uvIndex badge badge-secondary");
      $("#UV").addClass("uvIndex badge badge-primary");
    }else if(uvVal>3 && uvVal<5){
      $("#UV").removeClass("uvIndex badge badge-secondary");
      $("#UV").addClass("uvIndex badge badge-warning");

    }  
    
    else{
      $("#UV").removeClass("uvIndex badge badge-secondary");
      
      $("#UV").addClass("uvIndex badge badge-danger");

    }

      

    }
  })




    }
    
    


  
        
    // 5 day forcast ajax call
    $.ajax({
      url: urlForcaste + cityName + tempFah,
      type: "GET",

      success: function (forecastInfo) {


        // Day one
        $("#date1").html(forecastInfo.list[5].dt_txt.slice(0, 10));
        $("#iconD1").html(`<img src='https://openweathermap.org/img/w/${forecastInfo.list[5].weather[0].icon}.png'>`);
        $("#tempD1").html("Tempature: " +Math.floor(forecastInfo.list[5].main.temp) + "&#8457");
        $("#humD1").html("Humidity: " + JSON.stringify(forecastInfo.list[5].main.humidity) + "%");

        // Day two
        $("#date2").html(forecastInfo.list[8].dt_txt.slice(0, 10));
        $("#iconD2").html(`<img src='https://openweathermap.org/img/w/${forecastInfo.list[8].weather[0].icon}.png'>`);
        $("#tempD2").html("Tempature: " + Math.floor(forecastInfo.list[8].main.temp) + "&#8457");
        $("#humD2").html("Humidity: " + JSON.stringify(forecastInfo.list[8].main.humidity) + "%");

        // day three
        $("#date3").html(forecastInfo.list[15].dt_txt.slice(0, 10));
        $("#iconD3").html(`<img src='https://openweathermap.org/img/w/${forecastInfo.list[7].weather[0].icon}.png'>`);
        $("#tempD3").html("Tempature: " + Math.floor(forecastInfo.list[15].main.temp) + "&#8457");
        $("#humD3").html("Humidity: " + JSON.stringify(forecastInfo.list[15].main.humidity) + "%");

        // day four
        $("#date4").html(forecastInfo.list[23].dt_txt.slice(0, 10));
        $("#iconD4").html(`<img src='https://openweathermap.org/img/w/${forecastInfo.list[23].weather[0].icon}.png'>`);
        $("#tempD4").html("Tempature: " + Math.floor(forecastInfo.list[23].main.temp)  + "&#8457");
        $("#humD4").html("Humidity: " + JSON.stringify(forecastInfo.list[23].main.humidity) + "%");

        // day five
        $("#date5").html(forecastInfo.list[31].dt_txt.slice(0, 10));
        $("#iconD5").html(`<img src='https://openweathermap.org/img/w/${forecastInfo.list[31].weather[0].icon}.png'>`);
        $("#tempD5").html("Tempature: " + Math.floor(forecastInfo.list[31].main.temp) + "&#8457");
        $("#humD5").html("Humidity: " + JSON.stringify(forecastInfo.list[31].main.humidity) + "%");







      }
    });





  });



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // search button function
  $(searchBtn).on("click", function (event) {
    event.preventDefault();
    // hiding the error box when the page load at the second time
    $("#errorMessage").attr("style", "display:none");
     userInput = input.val();

    
    if (userInput != "") {

      $("#currentWeatherBox").attr("style", "display:none");
      $("#result-box").attr("style", "display:block");
      // clear the search box after serach Btn clikced
      $("#userInput").val("");
      
      localStorage.setItem("Cityname",userInput);
      citySearchedArr.push(userInput);
      localStorage.setItem("historyOfCity",citySearchedArr);
      console.log(citySearchedArr);
      

      createList();
      
      

      
      



      $.ajax({
        url: urlBaseCurrent + userInput + tempFah,
        type: "GET",

        success: function (wetherInfo) {

          $(".cityName").html("Location: " + wetherInfo.name + `<img src='https://openweathermap.org/img/w/${wetherInfo.weather[0].icon}.png'>` + "(" + localTime + ")");
          $(".weather").html(" Description : " + wetherInfo.weather[0].description);
          $(".tempature").html("Tempature: " + Math.floor(wetherInfo.main.temp) + "&#8457");
          $(".humidity").html("Humidity: " + JSON.stringify(wetherInfo.main.humidity) + "%");
          $(".wind").html("Wind speed : " + JSON.stringify(wetherInfo.wind.speed) + " m/s");


          var cityLatitud = wetherInfo.coord.lat;
          var cityLongitude = wetherInfo.coord.lon;
          UVI(cityLatitud,cityLongitude);

          




        }
      });

      
    function UVI(lat,lon){
      //  UVIndex Call
 $.ajax({
  url:"https://api.openweathermap.org/data/2.5/uvi?appid=b650042e3a82aa70290734a60a8cb3e3&lat="+lat+"&lon="+lon,
  type:"GET",
  success :function(uvIndexInfo){
    
    $(".uvIndex").html(uvIndexInfo.value);
    var uvVal=uvIndexInfo.value;
    
    if(uvVal <3){
      
      $("#UV").attr("class","uvIndex badge badge-primary");
    }else if(uvVal>3 && uvVal<5){
      
      $("#UV").attr("class","uvIndex badge badge-warning");

    }  
    
    else{
      
      
      $("#UV").attr("class","uvIndex badge badge-danger");

    }

    

  }
})




  }

     

      // 5 day forcast ajax call
      $.ajax({
        url: urlForcaste + userInput + tempFah,
        type: "GET",

        success: function (forecastInfo) {


          // Day one
          $("#date1").html(forecastInfo.list[5].dt_txt.slice(0, 10));
          $("#iconD1").html(`<img src='https://openweathermap.org/img/w/${forecastInfo.list[5].weather[0].icon}.png'>`);
          $("#tempD1").html("Tempature: " + Math.floor(forecastInfo.list[5].main.temp) + "&#8457");
          $("#humD1").html("Humidity: " + JSON.stringify(forecastInfo.list[5].main.humidity) + "%");

          // Day two
          $("#date2").html(forecastInfo.list[8].dt_txt.slice(0, 10));
          $("#iconD2").html(`<img src='https://openweathermap.org/img/w/${forecastInfo.list[8].weather[0].icon}.png'>`);
          $("#tempD2").html("Tempature: " + Math.floor(forecastInfo.list[8].main.temp) + "&#8457");
          $("#humD2").html("Humidity: " + JSON.stringify(forecastInfo.list[8].main.humidity) + "%");

          // day three
          $("#date3").html(forecastInfo.list[15].dt_txt.slice(0, 10));
          $("#iconD3").html(`<img src='https://openweathermap.org/img/w/${forecastInfo.list[7].weather[0].icon}.png'>`);
          $("#tempD3").html("Tempature: " + Math.floor(forecastInfo.list[15].main.temp) + "&#8457");
          $("#humD3").html("Humidity: " + JSON.stringify(forecastInfo.list[15].main.humidity) + "%");

          // day four
          $("#date4").html(forecastInfo.list[23].dt_txt.slice(0, 10));
          $("#iconD4").html(`<img src='https://openweathermap.org/img/w/${forecastInfo.list[23].weather[0].icon}.png'>`);
          $("#tempD4").html("Tempature: " + Math.floor(forecastInfo.list[23].main.temp) + "&#8457");
          $("#humD4").html("Humidity: " + JSON.stringify(forecastInfo.list[23].main.humidity) + "%");

          // day five
          $("#date5").html(forecastInfo.list[31].dt_txt.slice(0, 10));
          $("#iconD5").html(`<img src='https://openweathermap.org/img/w/${forecastInfo.list[31].weather[0].icon}.png'>`);
          $("#tempD5").html("Tempature: " + Math.floor(forecastInfo.list[31].main.temp) + "&#8457");
          $("#humD5").html("Humidity: " + JSON.stringify(forecastInfo.list[31].main.humidity) + "%");







        }
      });




    }
    else {
      $("#errorMessage").attr("style", "display:block");

      $("#errorMessage").html("The Input Cannot Be Empty!");
    }



  });

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function createList(){
  console.log("input",userInput);
  
  
  
  var newListItem =$("<li>").text(userInput);
    newListItem.addClass("list-group-item cityList");
    $("#listBody").append(newListItem);


}

    


