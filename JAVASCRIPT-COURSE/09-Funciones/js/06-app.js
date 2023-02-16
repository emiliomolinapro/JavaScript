
// Parametros por default...

// Algunas veces mandaras llamar una función que no tendrá los argumentos que se requieren, por ejemplo cuando llenas tu perfil de facebook tal vez no llenas todos los campos,   en esos casos son muy convenientes por parametros por default, veamos nuestra función si solo le pasamos el nombre pero no el apellido

// Puedes ver que en la consola aparecerá undefined


function saludar(nombre = 'Desconocido', apellido = '') { // nombre y apellido son parametros, son valores que se le pueden pasar a la función... Los valores digamos no son reales, pues son variables...
    console.log( `Hola ${nombre}  ${apellido} ` );
}
saludar('Emilio', 'Molina ROmán'); //

saludar('Emilio');

saludar();