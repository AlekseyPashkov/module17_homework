const btn = document.querySelector('.btn-get');
const info = document.querySelector('#info');

/*начальные координаты на случай запрета определения геолокации пользователем*/
let latitude = 44.8405248;
let longitude = 33.034112;
/*начальные координаты на случай запрета определения геолокации пользователем*/

const getTasks = () => {
  return fetch('https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=' + latitude + '&long=' + longitude)
    .then((response) => {
      console.log('response', response);
      return response.json();
    })
    .then((json) => { return json; })
    .catch(() => { console.log('error') });
}

btn.addEventListener('click', async () => {

  navigator.geolocation.getCurrentPosition(
    success => {
      latitude = success.coords.latitude;
      longitude = success.coords.longitude;
    }
  );

  const requestResult = await getTasks();

  info.innerHTML = 'Временная зона: ' + requestResult.timezone + '<br/>' + 'Местные дата и время: ' + requestResult.date_time_txt;

});