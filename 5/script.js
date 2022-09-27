const wsUri = "wss://ws.ifelse.io/";

const output = document.querySelector(".server-response");
const btnSend = document.getElementById('button-send');
const btnGeo = document.getElementById('button-geo');

let websocket;
let latitude;
let longitude;

/*Получаем координаты при загрузке страницы*/
document.addEventListener('DOMContentLoaded', function(){
  navigator.geolocation.getCurrentPosition(
    success => {
      latitude = success.coords.latitude;
      longitude = success.coords.longitude;
    }
  );
});

function writeToScreen(message, answerType = null) {
  let textData = document.createElement('div');
  textData.className = "col-md-10 offset-md-1 " + answerType + "-data";
  textData.style.wordWrap = "break-word";
  textData.innerHTML = message;
  output.appendChild(textData);
}

btnSend.addEventListener('click', () => {
  websocket = new WebSocket(wsUri);

  websocket.onopen = function(evt) {
    let message = document.getElementById('msg').value;
    writeToScreen("SENT: " + message, 'client');
    websocket.send(message);
  };

  websocket.onmessage = function(event) {
    writeToScreen(
      '<span style="color: blue;">RESPONSE: ' + event.data+'</span>',
      'server'
    );
  };
  
  websocket.onerror = function(event) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + event.data
    );
  };
});

btnGeo.addEventListener('click', () => {
  websocket = new WebSocket(wsUri);

  websocket.onopen = function(evt) {
    let message = "SENT: Моя геолокация?";
    websocket.send(message);
  };

  websocket.onmessage = function(event) {
    writeToScreen(
      '<a href="https://www.openstreetmap.org/#map=15/' + latitude + '/' + longitude +'">Моя геолокация</a>', 'client'
    );
  };
  
  websocket.onerror = function(event) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + event.data
    );
  };
});