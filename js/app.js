// Variables
const carrito = document.querySelector('#carrito'); // Interior del carrito
const contenedorCarrito = document.querySelector('#lista-carrito tbody'); // Cuerpo de la Tabla
const listaCursos = document.querySelector('#lista-cursos'); // Contenedor de los cursos
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); // Botón vaciar carrito
let articulosCarrito = [];

console.log(listaCursos.target);

cargarEventListener();
function cargarEventListener(){
    // Cuando se presione el div que contiene todos los cursos
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vacía el carrito
    vaciarCarritoBtn.addEventListener('click', (event) =>{
        event.preventDefault();
        limpiarHTML();
    });
}

// Funciones
function agregarCurso(e){
    // Verificar que se presiona click sobre el elemento "AGREGAR AL CARRITO"
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
    
// Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        // Quito del arreglo articulosCarrito el curso con el id "cursoId"
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        console.log(articulosCarrito);

        carritoHTML();
    }
}

// Lee el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCurso(curso){

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h3').textContent,
        precio: curso.querySelector('.precio').textContent,
        id: curso.querySelector('button').getAttribute('data-id'),
        cantidad: 1,
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    }else{
        // Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();    
}

// Muestra el carrito de compras en el HTML
function carritoHTML(){
    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100%">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <button class="borrar-curso" data-id="${curso.id}">×</button>
            </td>
        `;

        // Agrega el HTML del carrito en el tdoby
        contenedorCarrito.appendChild(row);
    })
}


// Elimina los cursos del tbody
function limpiarHTML(){
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    // Forma rápida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

