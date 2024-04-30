//Función en la que indicamos que si no hay imagen se devuelva la URL
function getCocktailImg(cocktail) {
    if (cocktail.strDrinkThumb !== null && cocktail.strDrinkThumb !== "")
        return cocktail.strDrinkThumb;
    else
        return 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
}
//Función para crear la lista de favoritos
function addToFavourites(cocktail) {
    let favouriteCocktails = JSON.parse(localStorage.getItem("cocktails"));
    // Verifico si ya está añadido a favoritos
    const isAddTuFavourites = favouriteCocktails?.some(favCocktail => favCocktail.idDrink === cocktail.idDrink);
    if (!isAddTuFavourites) {
        // Si el listado es nulo inicializamos la colección
        if (favouriteCocktails === null) {
            favouriteCocktails = [];
        }
        //Lo añado a la lista de fav
        favouriteCocktails.push(cocktail);
        //Añadimos elemento html a listado de favoritos
        const li = document.createElement('li');
        li.classList.add('section__all--licoc', 'fav-cocktail');
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
    } else {
        console.log('El cóctel ya está en la lista de favoritos.');
    }
    //Guardamos el nuevo favorito en el LocalStorage
    //1. Recuperamos lo existente en el LocalStorage
    let storedCocktails = JSON.parse(localStorage.getItem("cocktails"));
    console.log(storedCocktails);
    //2. Si es null inicializamos el array
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
//Función que recibe elemento HTML como parámetro y elimina un FAV
function removeFavourite(cocktailElement) {
    //1.Obtener el id o nombre del cocktail para poder buscarlo en el listado del LS
    const cocktailId = cocktailElement.dataset.cocktailId;
    //2.Obtener el LS la lista de cocktails que tenemos alcenada
    let storedCocktails = JSON.parse(localStorage.getItem("cocktails"));
    console.log(storedCocktails);
    //3.Eliminamos de la lista del LS el cocktail seleccionado
    storedCocktails = storedCocktails.filter(cocktail =>
        cocktail.idDrink !== cocktailId);
    //4.Guardamos la nueva lista en el LS
    localStorage.setItem("cocktails", JSON.stringify(storedCocktails));
    //5.Elimnamos el elemento HTML
    ulFavourites.removeChild(cocktailElement);
}
//Función para agregar un evento click a la lista de cócteles
function addEventListenerToResultItem(liElement, cocktailsList) {
    liElement.addEventListener('click', event => {
        const cocktailId = event.currentTarget.dataset.cocktailId;
        const cocktail = cocktailsList.find((cocktail) => cocktail.strDrink === cocktailId);
        addToFavourites(cocktail);
    });
}
//Función para crear la li desde JS con DOM avanzado
function setResultsInList(data) {
    //1.Limpiamos el HTML que hubiese con resultado anteriores
    ul.innerHTML = '';
    //2.Obtenemos la li de cocktails de los datos recibidos como parámetro
    const cocktails = data.drinks;
    //2.Recorremos la li
    for (const cocktail of cocktails) {
        //Creamos las constantes que quieremos que pinte en el navegador
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
        //Añadimos el event listener
        addEventListenerToResultItem(li, cocktails);
    }
}
//Función botón buscar
function handleSearch(event) {
    event.preventDefault();
    //Obtenemos el texto que ha introducido el usuario
    const search = input.value;
    //Llamamos a la función para que haga la llamada al API
    getResultsFromApi(search);
}
//Función botón reset
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
//Función API
function getResultsFromApi(textToSearch) {
    //Generamos la URL incluyendo el parámetro de búsqueda
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${textToSearch}`;
    //Llamamos al API con fetch
    fetch(url)
        .then(response => response.json())
        .then(data => setResultsInList(data))
        .catch(error => console.log(error));
}
//Función inicial para que nos pinte la li de margaritas
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
//Función que recupere y pinte la colección de cocktails del LS
function renderFavouritesCocktail() {
    //1.Recuperamos colección de cocktails del LS
    const storedCocktails = JSON.parse(localStorage.getItem("cocktails"));
    //2.Comporbamos que no sea nulo o vacío
    if (storedCocktails && storedCocktails.length > 0) {
        //3.Iteramos la colección y añadimos elementos al ul de Fav 
        //4.Para ello cada elemento del bucle lo mandaremos a la función addtofavourites
        storedCocktails.forEach(cocktail => {
            console.log(cocktail);
            addToFavourites(cocktail);
        });
    }
}
renderFavouritesCocktail();

//Eventos de los botones
btnSearch.addEventListener('click', handleSearch);
btnReset.addEventListener('click', handleReset);


