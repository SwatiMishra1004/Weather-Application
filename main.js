    document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search-box button');
    console.log(searchButton); 
    const searchBox = document.querySelector('.search-box input');
    const image = document.querySelector('#weather-image');
    const temperature = document.querySelector('#temperature');
    const description = document.querySelector('#description');
    const humidity = document.querySelector('#humidity span');
    const wind = document.querySelector('#wind span');
    
    searchButton.addEventListener('click', () => {
      const APIKey = 'b93ab1328f7f9d927736657c2f2a2d56';
      const city = searchBox.value;
      if (city == '') return;
    
      try {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(json => {
            if (!json.weather || !json.weather[0] || !json.weather[0].main) {
              console.error('Invalid weather data');
              return;
            }
    
            temperature.textContent = `${json.main.temp}°C`;
            description.textContent = json.weather[0].description;
            humidity.textContent = `${json.main.humidity}%`;
            wind.textContent = `${json.wind.speed} m/s`;
    
            switch (json.weather[0].main) {
              case 'Clear':
                image.src = 'clear.png';
                break;
    
              case 'Rain':
                image.src = 'rain.png';
                break;
    
              case 'Snow':
                image.src = 'snow.png';
                break;
    
              case 'Clouds':
                image.src = 'cloud.png';
                break;
    
              case 'Mist':
                image.src = 'mist.png';
                break;
    
              case 'Haze':
                image.src = 'mist.png';
                break;
    
              default:
                image.src = 'cloud.png';
            }
          })
          .catch(error => console.error('Error fetching weather data:', error));
      } catch (error) {
        console.error('Error fetching weather data:', error);
        // Display an error message to the user
      }
    });
  });
  
