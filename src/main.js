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
const searchUrl = "https://api.unsplash.com/search/photos"

const fetchPhotos = async () => {
  const photos = [];
  try {
    for (let i = 0; i < 5; i++) {
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
  }
};

const printPhotos = (photos) => {
  const imagenContainer = document.querySelector(".img-container");
  imagenContainer.innerHTML = "";

  for (const photo of photos) {
    const divPhoto = document.createElement("div");
    divPhoto.classList.add("photo-container")
    const imgElement = document.createElement("img");
    imgElement.classList.add("photos")
    imgElement.src = photo;

    divPhoto.appendChild(imgElement);
    imagenContainer.appendChild(divPhoto);
  }
};


const fetchCollection = async (searchQuery) => {
  try{
   
      const response = await fetch (`${searchUrl}?query=${searchQuery}`, {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      const collections = data.results.map(result => result.urls.regular)
    printPhotos(collections)
  } catch (error) {
    console.log(error)
  }
}


const handleSearch = (e) => {
  e.preventDefault()
  const search = input.value.trim()
  if (search.length > 0){
    fetchCollection(search)
  }else
  fetchPhotos()
}

input.addEventListener("submit",handleSearch)



fetchPhotos();
