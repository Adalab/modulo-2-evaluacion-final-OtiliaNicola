'use strict';

//sacar los eventos click de los dos botones
//en el de buscar obtener el texto

const input = document.querySelector('.js_input_text');
const btnSearch = document.querySelector('.js_search');
const btnReset = document.querySelector('.js_reset');

function handleSearch (event){
    event.preventDefault();
    //obtener el valor del input
    const search = input.value;
    console.log('El valor introducido es ' + search);
}

function handleReset(event){
    event.preventDefault();
    console.log('reset');
}

btnSearch.addEventListener('click', handleSearch);

btnReset.addEventListener('click', handleReset);
