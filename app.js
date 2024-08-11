document.addEventListener("DOMContentLoaded",()=>{
    
  
    const apiKey = "427b61c586a3c335f08c8e22cf3b02ac"
    
    const button = document.querySelector(".button")
    const name= document.querySelector(".name")
    const temp=document.querySelector (".temp")
    const description = document.querySelector (".description")
    const minMaxTemp = document.querySelector (".min-max-temp")
    const humidity = document.querySelector (".humidity")
    const container = document.querySelector('.container')
    const loading = document.querySelector(".loading")
    const content = document.querySelector(".content")
    let error = false
    const weatherIcon = document.querySelector (".weatherIcon")
    
    
    button.addEventListener("click",async ()=>{
    content.classList.add("hidden")
    container.classList.remove("hidden")
    loading.classList.remove("hidden")
    
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
            }finally{
                loading.classList.add('hidden')
                content.classList.remove("hidden")
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
        weatherIcon.innerHTML=getWeatherIcon(data)
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
    
    const getWeatherIcon = (data)=>{
       let iconId = data.weather[0].id
       
        switch(true){
            case (iconId>=300 && iconId<400):
            return "🌧"
            case (iconId>=600 && iconId<700):
            return "🌨"
            case (iconId>800):
            return "☁"
            case (iconId>=500 && iconId<600):
            return "🌧"
            case(iconId===800):
            return "☀"
        }
    }
        
        
    })
    
    
