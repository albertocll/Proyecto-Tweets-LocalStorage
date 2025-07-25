//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event Listeners
eventListeners();

function eventListeners(){
    //Cuando el usuario crea un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets);

        //Mostrar los tweets al cargar la página
        crearHTML();
    })
};

// Funciones

function agregarTweet(e){
    e.preventDefault();
    
    //El area del texto
    const tweet = document.querySelector('#tweet').value;
    console.log(tweet);

    //Validación
    if(tweet === ''){
        mostrarError('Un mensaje de texto no puede ir vacío');

        return // Evita que se ejecuten más líneas de código 

    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }


    //Agregar al array de tweets
    tweets = [...tweets, tweetObj]

    console.log(tweets);

    //Una vez agregado vamos a crear el HTML
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();
}

//Mostrar error

function mostrarError(error){
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertar en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Eliminar el mensaje de error pasados 2 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 2000);
}


//Creando el HTML
function crearHTML() {

    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach(tweet => {
            //Agregar un botón  de eliminar 
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Añadir la función 
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Crear los li del HTML
            const li = document.createElement('li');

            //Añadir el texto
            li.innerText = tweet.tweet

            //Asignar el botón 
            li.appendChild(btnEliminar);

            //agregarlo al HTML, un div llamado lista-tweets
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

//Agrega los tweets actuales al local Storage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Eliminar un tweet
function borrarTweet(id){
    tweets = tweets.filter (tweet => tweet.id !== id);

    crearHTML();
}

//Limpiar el HTMl
 function limpiarHTML() {
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
 }
