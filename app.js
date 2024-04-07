document.addEventListener("DOMContentLoaded",()=>{
    
  
    const apiKey = "427b61c586a3c335f08c8e22cf3b02ac"
    
    const button = document.querySelector(".button")
    const name= document.querySelector(".name")
    const temp=document.querySelector (".temp")
    const description = document.querySelector (".description")
    const minMaxTemp = document.querySelector (".min-max-temp")
    const humidity = document.querySelector (".humidity")
    const container = document.querySelector('.container')
    let error = false
    
    
    
    button.addEventListener("click",async ()=>{
    
        const cityName = document.querySelector(".cityName").value
        document.querySelector(".cityName").value=""
        if(cityName){
            try{
                const weatherData = await getWeatherData(cityName)
                
                if(error){
                    container.removeChild(errorMessage)
                    displayWeatherInfo(weatherData)
                    error=false
                }
                else{
                    displayWeatherInfo(weatherData)
                }
                
            }
            catch(error){
                console.error(error)
            }
        }
        else{
            displayError('Please enter a city name')
        }
        
        

        
    })

    async function getWeatherData (city){
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
         
        if(!response.ok){
            displayError('City not found!')
            throw new Error ("City not found!")
            
        }else {
            return await response.json()
        }
    }
    
    function displayWeatherInfo(data){
        
        name.innerHTML=(data.name+", "+ data.sys.country)
        temp.innerHTML=(data.main.temp+"°C")
        description.innerHTML=(data.weather[0].description)
        minMaxTemp.innerHTML =(data.main.temp_min+"°"+"/"+data.main.temp_max+"°")
        humidity.innerHTML =("Humidity: "+data.main.humidity+"%")
    }

    function displayError(message){
        error=true
        container.childNodes.forEach(item=>item.innerHTML='')
        errorMessage = document.createElement('p')
        errorMessage.innerHTML=message
        container.appendChild(errorMessage)
    
    }
        
        
    })
    
    