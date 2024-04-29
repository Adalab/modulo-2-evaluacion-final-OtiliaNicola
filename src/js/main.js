'use strict';

//Sacar los eventos click de los dos botones
//En el de buscar obtener el texto

const input = document.querySelector('.js_input_text');
const btnSearch = document.querySelector('.js_search');
const btnReset = document.querySelector('.js_reset');
const ul = document.querySelector('.js_list');
const ulFavourites = document.querySelector('.js_favourites');

let favouriteCocktails = [];

//Función en la que indicamos que si no hay imagen se devuelva la URL
function getCocktailImg(cocktail) {
    if (cocktail.strDrinkThumb !== null && cocktail.strDrinkThumb !== "")
        return cocktail.strDrinkThumb;
    else
        return 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
}

//Crear la lista de favoritos 
function addToFavourites(cocktail) {
    // recupero el listado en el que quiero mirar si existe

    // poner en un booleano si exite o no en el listado

    //Añadimos elemento html a listado de favoritos
    const li = document.createElement('li');
    li.classList.add('section__all--licoc');
    li.setAttribute('id', cocktail.idDrink);
    li.dataset.cocktailId = cocktail.idDrink;
    ulFavourites.appendChild(li);

    const imageFav = document.createElement('img');
    imageFav.classList.add('small-img',);
    imageFav.src = cocktail.strDrinkThumb;
    imageFav.setAttribute('alt', cocktail.strDrinkThumb);
    li.appendChild(imageFav);

    const nameFav = document.createElement('h3');
    nameFav.textContent = cocktail.strDrink;
    li.appendChild(nameFav);

    const xBtn = document.createElement('button');
    xBtn.textContent = 'x';
    xBtn.classList.add('remove-button');
    xBtn.addEventListener('click', () => removeFavourite(li));
    li.appendChild(xBtn);
    //Guardamos el nuevo favorito en el LocalStorage
    //1. Recuperamos lo que ya existiese en el LocalStorage
    let storedCocktails = JSON.parse(localStorage.getItem("cocktails"));
    console.log(storedCocktails);
    //2. Si es nulo inicializamos el array
    if (storedCocktails === null)
        storedCocktails = [];
    //3. Añadimos al array un objeto con las propiedades que necesitemos
    storedCocktails.push({
        idDrink: cocktail.idDrink,
        strDrink: cocktail.strDrink,
        strDrinkThumb: cocktail.strDrinkThumb
    });
    //4. Guardamos el valor de la coleccion actualizada en el LS
    localStorage.setItem("cocktails", JSON.stringify(storedCocktails));
}

// función que recibe elemento html como parámetro y elimina un favorito
function removeFavourite(cocktailElement) {
    // obtener el id o nombre del cocktail para poder buscarlo en el listado del local sotrage
    const cocktailId = cocktailElement.dataset.cocktailId;
    // obtenemos el storage la lista de cocktails que tenemos alcenada
    let storedCocktails = JSON.parse(localStorage.getItem("cocktails"));
    console.log(storedCocktails);
    // eliminamos de la lista del storage el cocktail seleccionado
    storedCocktails = storedCocktails.filter(cocktail =>
        cocktail.idDrink !== cocktailId);
    //guardamos la nueva lista en el storage
    localStorage.setItem("cocktails", JSON.stringify(storedCocktails));
    //elimnamos el elemento html
    ulFavourites.removeChild(cocktailElement);
}

//Agregar un evento click a la lista de cócteles
function addEventListenerToResultItem(liElement, cocktailsList) {
    liElement.addEventListener('click', event => {
        const cocktailId = event.currentTarget.dataset.cocktailId;
        const cocktail = cocktailsList.find((cocktail) => cocktail.strDrink === cocktailId);
        addToFavourites(cocktail);
    });
}

//Creamos la li desde JS con DOM avanzado
function setResultsInList(data) {
    //Limpio el html que hubiese con resultado anteriores
    ul.innerHTML = '';
    //Obtengo la lista de cocktails de los datos recibidos como parametro
    const cocktails = data.drinks;
    //Recorro la lista
    for (const cocktail of cocktails) {
        //Creo las constantes que quiero que me pinte en el navegador
        const name = cocktail.strDrink;
        const img = cocktail.strDrinkThumb;

        const li = document.createElement('li');
        li.classList.add('section__all--licoc');
        li.setAttribute('id', cocktail.idDrink);
        li.dataset.cocktailId = cocktail.strDrink;
        ul.appendChild(li);
        const h3 = document.createElement('h3');
        h3.textContent = name;
        li.appendChild(h3);
        const image = document.createElement('img');
        image.classList.add('small-img');
        li.classList.add('img',);
        image.src = img;
        image.setAttribute('alt', name);
        li.appendChild(image);
        // Añado el event listener
        addEventListenerToResultItem(li, cocktails);
    }
}

function handleSearch(event) {
    event.preventDefault();
    //Obtenemos el texto que ha introducido el usuario
    const search = input.value;
    //Llamamos a la función para que haga la llamada al API
    getResultsFromApi(search);
}

function handleReset(event) {
    event.preventDefault();
    //Limpiar el valor del input
    input.value = '';
    //Limpiar listado resultado
    ul.innerHTML = '';
    //Limpiamos listado favoritos
    ulFavourites.innerHTML = '';
    //Limpiar el localStorage
    localStorage.removeItem("cocktails");
}

//Eventos de los botones
btnSearch.addEventListener('click', handleSearch);
btnReset.addEventListener('click', handleReset);

function getResultsFromApi(textToSearch) {
    //Generamos la URL incluyendo el parámetro de búsqueda
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${textToSearch}`;
    //Llamamos al API con fetch
    fetch(url)
        .then(response => response.json())
        .then(data => setResultsInList(data))
        .catch(error => console.log(error));
}


function init() {
    //Generamos la URL incluyendo el parámetro de búsqueda
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`;
    //Llamamos al API con fetch
    fetch(url)
        .then(response => response.json())
        .then(data => setResultsInList(data))
        .catch(error => console.log(error));
}
init();

// hacer una función que recupere y pinte la colección de cocktails del localstorage
function renderFavouritesCocktail() {
    // 1,recuperar colección de cocktails del storage
    const storedCocktails = JSON.parse(localStorage.getItem("cocktails"));
    // 2, comporbar que la recuperas que no sea nulo o vacío
    if (storedCocktails && storedCocktails.length > 0) {
        // 3, iterar la colección y añadir elementos al ul de favoritos Para ello cada elemento del bucle lo mandaremos a la función addtofavourites
        storedCocktails.forEach(cocktail => {
            console.log(cocktail);
            addToFavourites(cocktail);
        });
    }
}
renderFavouritesCocktail();




