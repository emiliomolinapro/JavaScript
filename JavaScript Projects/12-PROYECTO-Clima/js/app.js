const container = document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)

})

function buscarClima(e) {

    e.preventDefault();

    // Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        mostrarError('Ambos campos son obligatorios');
        return;
    }

    consultarAPI(ciudad, pais)

}


function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100')

    if (!alerta) {
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded',
            'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'border');

        alerta.innerHTML = `
        <strong class= "font-bold"> Error! </strong>
        <span class = "block">${mensaje} </span> 
        `
        container.appendChild(alerta)

        setTimeout(() => {
            alerta.remove();
        }, 5000);


    }
}

function consultarAPI(ciudad, pais) {

    const appId = '2229869b50cf84ad21190afabd4401efd'

    const url = `api.openweathermap.org/data/2.5/forecast?id=524901&appid=${appId}
    `
    





    limpiarHTML();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            if (datos.cod === '404') {
                mostrarError("Ciudad no encontrada")
            }

            mostrarClima(datos);
        })

}

function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min } } = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombre = document.createElement('p')
    nombre.textContent = `Clima en ${name}`
    nombre.classList.add('font-bold', 'text-')

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    actual.innerHTML = `M??xima: ${max} &#8451;`
    actual.classList.add('text-xl');

    const tempMinimma = document.createElement('p');
    actual.innerHTML = `M??nima: ${min} &#8451;`
    actual.classList.add('text-xl');



    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(nombre);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinimma);



    resultado.appendChild(resultadoDiv);
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

const kelvinACentigrados = (grados) => parseInt(grados - 273.15)


function Spinner() {
    const divSpinner = document.createElement('div')
    divSpinner.classList.add('sk-fading-circle')
    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    
    `
    resultado.appendChild(divSpinner)
}