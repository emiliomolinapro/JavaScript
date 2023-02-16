// VARIABLES
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


// EVENT LISTENERS
eventListeners();
function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML();
    })
}




// FUNCIONES

function agregarTweet(e) {
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    if (tweet === '') {
        mostrarError('No puede ir vacío')
        return;
    }

    const tweetObj = {
        id: Date.now(),
        texto: tweet
    }

    tweets = [...tweets, tweetObj];


    crearHTML();
}


// Mostrar mensaje de error

function mostrarError(mensaje) {

    const mensajeError = document.createElement('P');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000)
}

// Muestra un listado de los tweets

function crearHTML() {

    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            // Agregar botón de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }
            // Creando html
            const li = document.createElement('li');

            // añadir el texto
            li.innerText = tweet.texto;

            // Asignar el botón
            li.appendChild(btnEliminar);

            // insertarlo en html
            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}

// Limpiar HTML

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}

// Agregar los tweets a Local Storage

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Función de borrar tweet

function borrarTweet (id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}