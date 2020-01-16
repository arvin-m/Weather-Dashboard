var latitude = 0;
var longitude = 0;
var urlBase ="http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=b650042e3a82aa70290734a60a8cb3e3q=";
var urlForcaste="http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=b650042e3a82aa70290734a60a8cb3e3q=";
var tempCel= "&units=metric";
var tempFah= "&units=imperial";
var input=$("#userInput");
var btn = $("#searchBtn");

// search option section
// ("#austin");
// ("#Chicago");
// ("#newYork");
// ("#orlando");
// ("#sanFran");
// ("#seatt");
// ("#denver");
// ("#atlanta");




// check if the browser support the getlocation API
// function supportRequest() {
//   if (navigator.getLocation) {
//     navigator.geolocation.getCurrentPosition(getPosition);
//   }
//   else {
//     alert("Geolocation is not supported by this browser !");
//   }
// }

// navigator.geolocation.getCurrentPosition(getPosition);


// getting current location from navigator API
// function getPosition(position) {
//   console.log("this is position:", position);
//   console.log("this is latitude:", position.coords.latitude);
//   console.log("this is longitude", position.coords.longitude);
//   console.log();
//   latitude =  position.coords.latitude;
//   longitude = position.coords.longitude;
//   console.log("this is latitude:",latitude);
//   console.log("this is longitude",longitude);
// }

// search button funcrtion


$(btn).on("click",function(event){
    event.preventDefault();
    // hiding the error box when the page load at the second time
    $("#errorMessage").attr("style","display:none");
    var userInput = input.val();
    console.log("hi");
    console.log(userInput);
   
    if(userInput != ""){
        

        $.ajax({
            url:"http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=b650042e3a82aa70290734a60a8cb3e3&q="+userInput+tempCel,
            type:"GET",
            
            success:function(wetherInfo){
                console.log(wetherInfo);
                $(".cityName").html("Location: "+ wetherInfo.name+" Date: ");
                $(".weather").html(wetherInfo.weather[0].description);
                $(".tempature").html("Tempature: "+ wetherInfo.main.temp+"&#8451");
                $(".humidity").html("Humidity: "+JSON.stringify(wetherInfo.main.humidity)+" %");
                // becuse speed object has number in it we need to convert that with JSON.stringfy to string
                $(".wind").html("Wind speed : "+JSON.stringify(wetherInfo.wind.speed)+"m/s");
                $(".uvIndex").html("UVIndex: ");

               


            }
        });

        // 5 day forcast ajax call
        $.ajax({
            url:"http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=b650042e3a82aa70290734a60a8cb3e3&q="+userInput+tempCel,
            type:"GET",
           
            success:function(forecastInfo){
                console.log(forecastInfo);
                $("#date1").html("Date: "+ forecastInfo.list[5].dt_txt);
                $("#tempD1").html("Tempature: "+ forecastInfo.list[5].main.temp+"&#8451");
                $("#humD1").html("Humidity: "+JSON.stringify(forecastInfo.list[5].main.humidity)+" %");
                              

            }
        });




    }
    else{
        $("#errorMessage").attr("style","display:block");

        $("#errorMessage").html("The Input Cannot Be Empty!");
    }
    


});
console.log("helooooo")

