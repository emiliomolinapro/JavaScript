// VARIABLES
const year = document.querySelector("#year")
const marca = document.querySelector("#marca ")
const minimo = document.querySelector("#minimo")
const maximo = document.querySelector("#maximo")
const puertas = document.querySelector("#puertas")
const transmision = document.querySelector("#transmision")
const color = document.querySelector("#color")

// CONTENEDOR PARA LOS RESULTADOS 
const resultado = document.querySelector("#resultado")


const max = new Date().getFullYear();
const min = max - 10;

// Generar un Objeto con la búsqueda
const datosBusqueda = {
    marca: '',
    modelo: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}
// Llena las opciones  de años
llenarSelect();
// EVENTOS
document.addEventListener("DOMContentLoaded", () => {
    mostrarCoches(coches); // Muestra los coches al cargar HTML







})

// EVENTS LISTENER PARA LOS SELECT DE BÚSQUEDA
marca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value;
    filtrarCoche();
})

year.addEventListener('change', (e) => {
    datosBusqueda.year = e.target.value;
    filtrarCoche();
})

min.addEventListener('change', (e) => {
    datosBusqueda.min = e.target.value;
    filtrarCoche();

})

max.addEventListener('change', (e) => {
    datosBusqueda.max = e.target.value;
    filtrarCoche();
})

puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = Number(e.target.value);
    filtrarCoche();

})

transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value;
    filtrarCoche();

})

color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value;
    filtrarCoche();

})



// FUNCIONES

function mostrarCoches(coches) {

    limpiarHTML();

    coches.forEach(coche => {
        const cocheHTML = document.createElement('P');
        const { marca, modelo, year, puertas, transmision, precio, color } = coche;
        cocheHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `

        resultado.append(cocheHTML);
    });
}

// LIMPIAR HTML

function limpiarHTML() {

    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

// Genera los años del select

function llenarSelect() {

    for (let i = max; i >= min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }

}

function filtrarCoche() {
    const resultado = coches.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    if (resultado.length) {

        mostrarCoches(resultado);
    }
    else {
        noResultado();
    }
}

// FILTRO SIN RESULTADO
function noResultado() {
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay contenido; '
    resultado.appendChild(noResultado)
}

function filtrarMarca(coche) {
    const { marca } = datosBusqueda;
    if (marca) {
        return coche.marca === marca;
    }
    return coche;
}

function filtrarYear(coche) {
    const { year } = datosBusqueda;
    if (year) {
        return coche.year === parseInt(year);
    }
    return coche;
}

function filtrarMinimo(coche) {
    const { minimo } = datosBusqueda;
    if (minimo) {
        return coche.precio >= parseInt(minimo);
    }
    return coche;
}

function filtrarMaximo(coche) {
    const { maximo } = datosBusqueda;
    if (maximo) {
        return coche.precio <= parseInt(maximo);
    }
    return coche;
}

function filtrarPuertas(coche) {
    if (datosBusqueda.puertas) {
        return coche.puertas === datosBusqueda.puertas;
    }
    return coche;
}

function filtrarTransmision(coche) {
    const { transmision } = datosBusqueda;
    if (transmision) {
        return coche.transmision === (transmision);
    }
    return coche;
}

function filtrarColor(coche) {
    const { color } = datosBusqueda;
    if (color) {
        return coche.color === (color);
    }
    return coche;
}


