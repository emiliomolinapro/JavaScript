
// CONSTRUCTORES

class Seguro {
    constructor(marca, year, tipo) {
        this.marca = marca;
        this.year = year;
        this.tipo = tipo;
    }
    cotizarSeguro = function () {
        let cantidad;
        const base = 2000;
        switch (this.marca) {
            case '1':
                cantidad = base * 1.15;
                break;
            case '2':
                cantidad = base * 1.05;
                break;
            case '3':
                cantidad = base * 1.35;
                break;
        }
        // Leer el año, cada año más viejo se reduce un 3%
        const diferencia = new Date().getFullYear() - this.year;

        cantidad -= ((diferencia * 3) * cantidad) / 100

        // SEGURO BÁSICO => 30% MÁS  SEGURO COMPLETO => 50% MÁS
        if (this.tipo === 'basico') {
            cantidad *= 1.30;
        } else {
            cantidad *= 1.50
        }
        return cantidad;
    }

}

class UI {
    constructor() { }
    // LLena las opciones de los años
    llenarOpciones() {
        const max = new Date().getFullYear(), min = max - 20;

        const selectYear = document.querySelector("#year");

        for (let i = max; i > min; i--) {
            let option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            selectYear.appendChild(option)
        }
    }
    mostrarResultado = (total, seguro) => {
        const { marca, year, tipo } = seguro;

        let textoMarca;
        switch (marca) {
            case '1':
                textoMarca = 'Americano'
                break;
            case '2':
                textoMarca = 'Asiatico'
                break;
            case '3':
                textoMarca = 'Europeo'
                break;

            default:
                break;
        }



        const div = document.createElement('DIV');
        div.classList.add('mt-10');
        div.innerHTML = `
        <p class = "header"> Tu resumen </p>
        <p class = "font-bold"> Marca: <span class="font-normal"> ${textoMarca} </span></p>
        <p class = "font-bold"> Año: <span class="font-normal"> ${year} </span></p>
        <p class = "font-bold"> Tipo: <span class="font-normal capitalize"> ${tipo} </span></p>
        <p class = "font-bold"> Total: <span class="font-normal"> ${total} $ </span></p>
         
        `
        const resultadoDiv = document.querySelector("#resultado");

        // Mostrar el spinner
        const spinner = document.querySelector("#cargando");
        spinner.style.display = "block";

        setTimeout(() => {
            spinner.style.display = 'none';
            resultadoDiv.appendChild(div)

        }, 3000);
    }
    // Muestra alertas en pantalla
    mostrarMensaje = function (mensaje, tipo) {

        const div = document.createElement('div');

        if (tipo === 'error') {
            div.classList.add('error')
        } else {
            div.classList.add('correcto')
        }

        div.classList.add('mensaje', 'mt-10');
        div.textContent = mensaje;

        // INSERTAR EN HTML
        const formulario = document.querySelector("#cotizar-seguro");
        formulario.insertBefore(div, document.querySelector("#resultado"));

        setTimeout(() => {
            div.remove();
        }, 3000);
    }

}


// INSTANCIAR UI 
const ui = new UI();


document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();
})

eventListeners();
function eventListeners() {
    const formulario = document.querySelector("#cotizar-seguro");
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();
    // Leer la marca seleccionada
    const marca = document.querySelector("#marca").value;
    // console.log(marca)
    // Leer año seleccionado
    const year = document.querySelector("#year").value;

    // Leer tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error')
        return;
    } else {
        ui.mostrarMensaje('Cotizando', 'exito')
    }
    // Ocultar cotizaciones previas
    const resultados = document.querySelector("#resultado div");
    if (resultados != null) {
        resultados.remove();
    }

    // Instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);

    const total = seguro.cotizarSeguro();
    // Utilizar el prototype que va a cotizar

    ui.mostrarResultado(total, seguro);

}