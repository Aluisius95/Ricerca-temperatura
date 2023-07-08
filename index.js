// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = "<h1>Cerca la tua città e vedi che temperatura c'è</h1>";
const searchBar = document.getElementById('search');

//Genero l'URL per la chiamata API di OpenWeather
const apiKey = 'c8575717a1220d09ce3635c7fe0e40e9';
const URL =
  'https://api.openweathermap.org/data/2.5/weather?appid=' +
  apiKey +
  '&units=metric&q=';

//generazione HTML
const txt = document.createElement('input');
txt.setAttribute('type', 'text');
const btn = document.createElement('button');
btn.innerHTML = 'cerca';
btn.addEventListener('over', () => this.style('color','red'))
searchBar.appendChild(txt);
searchBar.appendChild(btn);
const today = new Date().toLocaleDateString();

//creazione richiesta
function newReq(city, callback) {
  const request = new XMLHttpRequest();
  
  //versione con la Promise
  request.onload = () => new Promise((resolve, reject) => {
    console.log(request.status);
    if (request.status === 200) {
      resolve(JSON.parse(request.response));
    } else {
      reject('Error');
    }
  }).then(
    (x) => callback(x),
    (x) => console.log(x)
  );

  /*versione classica con la function
  request.onload = function () {
    console.log(request.status);
    if (request.status === 200) {
      callback(JSON.parse(request.response));
    } else {
      throw 'Error';
    }
  };*/

  request.open('GET', URL + city, true);
  request.send();
}

//Stampa la temperatura della città ricercata
function printTemp(city) {
  newReq(city,
    (info) => (document.getElementById('answer').innerHTML = 'Oggi, ' + today + ', a ' + city + ' ci sono ' + info.main.temp + ' °C e una pressione di ' + info.main.pressure + ' Pa')
  );
}
btn.addEventListener('click', () => printTemp(txt.value));


/**/