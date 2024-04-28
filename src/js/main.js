'use strict';

//sacar los eventos click de los dos botones
//en el de buscar obtener el texto

const input = document.querySelector('.js_input_text');
const btnSearch = document.querySelector('.js_search');
const btnReset = document.querySelector('.js_reset');
const ul = document.querySelector('.js_list');
const ulFavourites = document.querySelector('.js_favourites');

let favouriteCocktails = [];


function getCocktailImg(cocktail) {
    if (cocktail.strDrinkThumb !== null && cocktail.strDrinkThumb !== "")
        return cocktail.strDrinkThumb;
    else
        return 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
}

//Crear la lista de favoritos 
function addToFavourites(cocktail) {
    const li = document.createElement('li');
    li.classList.add('favourite-cocktail-item');
    li.setAttribute('id', cocktail.idDrink);
    li.dataset.cocktailId = cocktail.idDrink;
    ulFavourites.appendChild(li);

    const imageFav = document.createElement('img');
    imageFav.src = cocktail.strDrinkThumb;
    imageFav.setAttribute('alt', cocktail.strDrinkThumb);
    li.appendChild(imageFav);

    const nameFav = document.createElement('h3');
    nameFav.textContent = cocktail.name;
    li.appendChild(nameFav);

    const xBtn = document.createElement('button');
    xBtn.textContent = 'x';
    xBtn.classList.add('remove-button');
    xBtn.addEventListener('click', () => removeFavourites(cocktail));
    li.appendChild(xBtn);
}
function removeFavourite(cocktail) {
    favouriteCocktails = favouriteCocktails.filter(item => item.idDrink !== cocktail.idDrink);
}

//Agregar un evento click a la lista de cócteles
function addEventListenerToResultItem(liElement, cocktailsList) {
    liElement.addEventListener('click', event => {
        const cocktailId = event.currentTarget.dataset.cocktailId;
        const cocktail = cocktailsList.find((cocktail) => cocktail.strDrink === cocktailId);
        addToFavourites(cocktail);
    });
}

//DOM avanzado
function setResultsInList(data) {
    // Limpio el htmk que hubiese con resultado anteriores
    ul.innerHTML = '';
    //Obtengo la lista de cocktails de los datos recibidos como parametro
    const cocktails = data.drinks;
    // Recorro la lista
    for (const cocktail of cocktails) {
        //creo las constantes que quiero que me pinte en el navegador
        const name = cocktail.strDrink;
        const img = cocktail.strDrinkThumb;

        const li = document.createElement('li');
        li.classList.add('cocktail-item');
        li.setAttribute('id', cocktail.idDrink);
        li.dataset.cocktailId = cocktail.strDrink;
        ul.appendChild(li);
        const h3 = document.createElement('h3');
        h3.textContent = name;
        li.appendChild(h3);
        const image = document.createElement('img');
        image.src = img;
        image.setAttribute('alt', name);
        li.appendChild(image);
        // Añado el event listener
        addEventListenerToResultItem(li, cocktails);
    }
}


function handleSearch(event) {
    event.preventDefault();
    //obtenemos el texto que ha introducido el usuario
    const search = input.value;
    // Llamamos a función que haga la llamada al API
    getResultsFromApi(search);
}

function handleReset(event) {
    event.preventDefault();
    // limpiar el valor del input
    input.value = '';
    //limpiar listado resultado
    ul.innerHTML = '';
    // Limpiamos listado favoritos
    ulFavourites.innerHTML = '';
    // Limpiar el localStorage
    console.log('Limpiar el localStorage');
}

btnSearch.addEventListener('click', handleSearch);
btnReset.addEventListener('click', handleReset);

function getResultsFromApi(textToSearch) {
    // generamos la url incluyendo el parametro de busqueda
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${textToSearch}`;
    //llamamos al api con fetch
    fetch(url)
        .then(response => response.json())
        .then(data => setResultsInList(data))
        .catch(error => console.log(error));
}