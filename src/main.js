import "./style.css";

const header = document.querySelector(".header");
const divLogo = document.createElement("div");
const img = document.createElement("img");
const divBtn = document.createElement("div");
const btnNew = document.createElement("button");
const btnExplore = document.createElement("button");
const form = document.createElement("form");
const input = document.createElement("input");
const divLogin = document.createElement("div");
const login = document.createElement("button");
const register = document.createElement("button");

divLogo.classList.add("logo-container");
img.src =
  "https://i.pinimg.com/280x280_RS/f6/e9/3a/f6e93a06b500b2d87ffd32e1f56f7c6f.jpg";
divBtn.classList.add("btn-div");
btnNew.textContent = "Hoy";
btnNew.classList.add("buttons");
btnExplore.textContent = "Explorar";
btnExplore.classList.add("buttons");
form.classList.add("input-container");
input.placeholder = "Buscar";
input.classList.add("input");
login.textContent = "Iniciar Sesión";
divLogin.classList.add("login-container");
login.classList.add("login");
register.textContent = "Registrarse";
register.classList.add("register");

divLogo.appendChild(img);
divBtn.appendChild(btnNew);
divBtn.appendChild(btnExplore);
divLogo.appendChild(divBtn);
header.appendChild(divLogo);
form.appendChild(input);
header.appendChild(form);
divLogin.appendChild(login);
divLogin.appendChild(register);
header.appendChild(divLogin);

const accessKey = "EGdKue5UuiKjVkBjOPUDckF_UyZY3ROjv28eWwUeNQU";
const url = "https://api.unsplash.com/photos/random";
const searchUrl = "https://api.unsplash.com/search/photos";

const fetchPhotos = async () => {
  const photos = [];
  try {
    for (let i = 0; i < 50; i++) {
      const response = await fetch(url, {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      photos.push(data.urls.regular);
    }
    printPhotos(photos);
  } catch (error) {
    console.log(error);
    recomendedSearch()
  }
};

const fetchCollection = async (searchQuery) => {
  try {
    const response = await fetch(`${searchUrl}?query=${searchQuery}`, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const collections = data.results.map((result) => result.urls.regular);
    if (collections.length > 0){
      
    printPhotos(collections);
    }else{
      recomendedSearch()
    }
  } catch (error) {
    console.log(error);
  }
};

const printPhotos = (photos) => {
  const imagenContainer = document.querySelector(".img-container");
  imagenContainer.innerHTML = "";

  
    for (const photo of photos) {
      const divPhoto = document.createElement("div");
      divPhoto.classList.add("photo-container");
      const imgElement = document.createElement("img");
      imgElement.classList.add("photos");
      imgElement.src = photo;

      divPhoto.appendChild(imgElement);
      imagenContainer.appendChild(divPhoto);
    }
  

  }


const recomendedSearch = () =>{
  const messagesContainer = document.createElement("div")
  const errorMessage = document.createElement("p");
  const recomendedMessage = document.createElement("p");
  errorMessage.textContent = "No se han encontrado imagenes relacionadas";
  recomendedMessage.textContent = "Busquedas recomendadas";

  const btnContainer = document.createElement("div");
  const btnRecomended1 = document.createElement("button");
  const btnRecomended2 = document.createElement("button");
  const btnRecomended3 = document.createElement("button");

  messagesContainer.classList.add("message-container")
  btnContainer.classList.add("btn-container");
  btnRecomended1.classList.add("btn-recomended");
  btnRecomended2.classList.add("btn-recomended");
  btnRecomended3.classList.add("btn-recomended");

  btnRecomended1.textContent = "Viajes";
  btnRecomended2.textContent = "Decoracion";
  btnRecomended3.textContent = "Playa";
  

  btnContainer.appendChild(btnRecomended1);
  btnContainer.appendChild(btnRecomended2);
  btnContainer.appendChild(btnRecomended3);
  messagesContainer.appendChild(errorMessage);
  messagesContainer.appendChild(recomendedMessage)
  document.body.appendChild(messagesContainer);
  document.body.appendChild(btnContainer);

  const buttons = document.querySelectorAll(".btn-recomended");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      input.value = button.textContent;
      fetchCollection(button.textContent);
    });
  });

}

const handleSearch = (e) => {
  e.preventDefault();
  const search = input.value.trim();
  if (search.length > 0) {
    fetchCollection(search);
    console.log(search);
  } else 
  fetchPhotos();
};

form.addEventListener("submit", handleSearch);

fetchPhotos();
