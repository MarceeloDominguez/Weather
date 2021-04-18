const input = document.querySelector(".input");
const form = document.querySelector(".form");
const cardData = document.querySelector(".card");
const app = document.querySelector(".app");
const card = document.querySelector(".card");
const msj_error = document.querySelector(".error");

const api_key = "fb6841958475a15f55352f6abf975050";

const search = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputValue = input.value;
    getApi(inputValue);

    const listaItems = card.querySelectorAll(".app");
    //console.log(listaItems);
    const listaItemsArray = Array.from(listaItems);
    //console.log(listaItemsArray);

    if (listaItemsArray.length > 0) {
      const filterArray = listaItemsArray.filter((el) => {
        let contenido = "";
        if (inputValue.includes(",")) {
          contenido = el.querySelector(".city").textContent.toLowerCase();
        } else {
          contenido = el.querySelector(".city span").textContent.toLowerCase();
        }
        return contenido == inputValue.toLowerCase();
      });

      if (filterArray.length > 0) {
        msj_error.textContent = `Ya conoces el tiempo para ${
          filterArray[0].querySelector(".city span").textContent
        } ...Sea más específico y proporcione el código o nombre del país`;
        msj_error.classList.add("err-opacity");

        form.reset();

        return;
      } else {
        msj_error.classList.remove("err-opacity");
      }
    }
    msj_error.textContent = "";
    form.reset();
  });
};

const getApi = async (inputValue) => {
  // const url = `http://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${api_key}&units=metric&lang=es`;
  // const response = await fetch(url);
  // const data = await response.json(url);
  // console.log(data);
  // paintDom(data);

  // try {
  //   const url = `http://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${api_key}&units=metric&lang=es`;
  //   const response = await fetch(url);
  //   const data = await response.json(url);
  //   console.log(data);

  //   if (!response.ok) {
  //     throw { status: response.status, statusText: response.statusText };
  //   } else {
  //     msj_error.classList.remove("err-opacity-two");
  //   }
  //   paintDom(data);
  // } catch (error) {
  //   let message = "No se encontraron resultados de su búsqueda";
  //   msj_error.classList.add("err-opacity-two");
  //   msj_error.innerHTML = `${message}`;
  // }

  try {
    let res = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${api_key}&units=metric&lang=es`
    );
    let data = await res.data;
    console.log(data);

    msj_error.classList.remove("err-opacity-two");

    paintDom(data);
  } catch (error) {
    console.log(error.response);
    let message = "No se encontraron resultados de su búsqueda";
    msj_error.classList.add("err-opacity-two");
    msj_error.innerHTML = `${message}`;
  }
};

const paintDom = (data) => {
  const { name, main, wind, weather, sys } = data;
  const day = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const dayNumber = new Date().getDay();
  const dayName = day[dayNumber];

  const hours = new Date().getHours() + ":00hs";

  //const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
  //const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

  let valor = "";

  data.weather.forEach((item) => {
    if (item.icon === "01n") {
      valor = `<img class='logo' src='assest/moon.svg' alt='logo'>`;
    } else if (item.icon === "01d") {
      valor = `<img class='logo' src='assest/sun.svg' alt='logo'>`;
    } else if (item.icon === "11d" || item.icon === "11n") {
      valor = `<img class='logo' src='assest/storn.svg' alt='logo'>`;
    } else if (item.icon === "09d" || item.icon === "09n") {
      valor = `<img class='logo' src='assest/rain.svg' alt='logo'>`;
    } else if (item.icon === "10d") {
      valor = `<img class='logo' src='assest/drizzle.svg' alt='logo'>`;
    } else if (item.icon === "10n") {
      valor = `<img class='logo' src='assest/lluvia-noche.svg' alt='logo'>`;
    } else if (item.icon === "13d" || item.icon === "13n") {
      valor = `<img class='logo' src='assest/snow.svg' alt='logo'>`;
    } else if (item.icon === "09d" || item.icon === "09n") {
      valor = `<img class='logo' src='assest/lluvia-noche.svg' alt='logo'>`;
    } else if (item.icon === "50d" || item.icon === "50n") {
      valor = `<img class='logo' src='assest/atmosphere.svg' alt='logo'>`;
    } else if (item.icon === "02d") {
      valor = `<img class='logo' src='assest/clouds.svg' alt='logo'>`;
    } else if (item.icon === "02n") {
      valor = `<img class='logo' src='assest/luna-nube.svg' alt='logo'>`;
    } else if (item.icon === "03d" || item.icon === "03n") {
      valor = `<img class='logo' src='assest/nube-gris.png' alt='logo'>`;
    } else if (item.icon === "04d" || item.icon === "04n") {
      valor = `<img class='logo' src='assest/nube-gris.png' alt='logo'>`;
    }
  });

  const div = document.createElement("div");

  div.classList.add("app");
  const dataWeather = `
    <section class="card-data">
      ${valor}
      <div class="city" data-name="${name}, ${sys.country}">
      <span>${name}</span>
      <sup>${sys.country}</sup>
      </div>
      <div class="date">${dayName} ${hours}</div>
    </section>
    <main class="card-weather">
      <div class="temp">${Math.round(main.temp)}<span>°c</span></div>
      <div class="description">${weather[0].description}</div>
      <div class="max-min">${Math.round(main.temp_max)}°c / ${Math.round(
    main.temp_min
  )}°c</div>
      <div class="humidity">Humedad: ${main.humidity}%</div>
      <div class="wind">Viento: a ${wind.speed} km/h.</div>
    </main>
    `;
  cardData.innerHTML = "";
  div.innerHTML = dataWeather;
  cardData.appendChild(div);
};

document.addEventListener("DOMContentLoaded", search);
