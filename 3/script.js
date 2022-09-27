const btn = document.querySelector('.btn-get');
const info = document.querySelector('#info');

btn.addEventListener('click', () => {
  /*получаем размеры экрана*/
  info.innerHTML = "Ширина экрана " + window.screen.width + "<br>";
  info.innerHTML += "Высота экрана " + window.screen.height + "<br>";
  /*получаем размеры экрана*/

  /*получаем координаты или ошибку их получения*/
  navigator.geolocation.getCurrentPosition(
    success => info.innerHTML += "Широта " + success.coords.latitude + "<br>" + "Долгота " + success.coords.longitude,
    error => info.innerHTML += "Информация о местоположении недоступна"
  );
  /*получаем координаты или ошибку их получения*/
    
});