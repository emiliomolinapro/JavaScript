const criptomonedasSelect = document.querySelector('#criptomonedas')
const monedaSelect = document.querySelector('#moneda')

const formulario = document.querySelector('#formulario')
const resultado = document.querySelector('#resultado')


const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}

const obtenerCriptomonedas = criptomonedas => new Promise(resolve => {
    resolve(criptomonedas);
})


document.addEventListener('DOMContentLoaded', () => {
    consultarCriptomonedas();

    formulario.addEventListener('submit', submitFormulario)

    criptomonedasSelect.addEventListener('change', leerValor)
    monedaSelect.addEventListener('change', leerValor)

})



function consultarCriptomonedas() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => obtenerCriptomonedas(resultado.Data))
        .then(criptomonedas => selectCriptomonedas(criptomonedas))
}

function selectCriptomonedas(criptomonedas) {
    criptomonedas.forEach(cripto => {
        const { FullName, Name } = cripto.CoinInfo;

        const option = document.createElement('option')
        option.value = Name;
        option.textContent = FullName;
        criptomonedasSelect.appendChild(option)
    });
}

function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value;
    // console.log(objBusqueda)
}

function submitFormulario(e) {
    e.preventDefault();

    const { moneda, criptomoneda } = objBusqueda;

    if (moneda === '' || criptomoneda === '') {
        mostrarAlerta('Debes rellenar ambos valores')
        return;
    }

    // Consultar la API con los resultados
    consultarAPI();
}


function mostrarAlerta(mensaje) {
    const existeError = document.querySelector('.error')

    if (!existeError) {

        const divAlerta = document.createElement('div');
        divAlerta.classList.add('error')
        divAlerta.textContent = mensaje;
        formulario.appendChild(divAlerta)

        setTimeout(() => {
            divAlerta.remove();
        }, 3000);
    }
}

function consultarAPI() {
    const { moneda, criptomoneda } = objBusqueda;
    // const url = `https://min-api.cryptocompare.com/data/price?fsym=${criptomoneda}&tsyms${moneda}`
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    mostrarSpinner();
    
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(cotizacion => {
            mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda])
        })
}

function mostrarCotizacionHTML(cotizacion) {

    limpiarHTML();

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;

    const precio = document.createElement('p')
    precio.classList.add('precio');
    precio.innerHTML = `El precio es: <span>${PRICE}</span>`

    const precioAlto = document.createElement('p')
    precioAlto.innerHTML = `<p>Precio más alto del día: <span>${HIGHDAY}</span> <p>`

    const precioBajo = document.createElement('p')
    precioBajo.innerHTML = `<p>Precio más bajo del día: <span>${LOWDAY}</span> <p>`

    const ultimasHoras = document.createElement('p')
    ultimasHoras.innerHTML = `<p>Variación en el último día: <span>${CHANGEPCT24HOUR}%</span> <p>`

    const ultimaActualizacion = document.createElement('p')
    ultimaActualizacion.innerHTML = `<p>Última actualización: <span>${LASTUPDATE}</span> <p>`



    resultado.appendChild(precio)
    resultado.appendChild(precioAlto)
    resultado.appendChild(precioBajo)
    resultado.appendChild(ultimasHoras)
    resultado.appendChild(ultimaActualizacion)



}


function limpiarHTML() {

    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }

}

function mostrarSpinner() {
    limpiarHTML();

    const spinner = document.createElement('div')
    spinner.classList.add('spinner')

    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    
    `
    resultado.appendChild(spinner)
}