const carrito = document.querySelector('#carrito'); // Interior del carrito
const contenedorCarrito = document.querySelector('#lista-carrito tbody'); // Cuerpo de la Tabla
const listaCursos = document.querySelector('#lista-cursos'); // Contenedor de los cursos
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); // Botón vaciar carrito


cargarEventListener();
function cargarEventListener(){
    // Cuando se presione el botón "AGREGAR AL CARRITO"
    listaCursos.addEventListener('click', agregarCurso);
}

// Funciones
function agregarCurso(e){
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
        

// Lee el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCurso(curso){

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h3').textContent,
        precio: curso.querySelector('.precio').textContent,
        cantidad: 1,
    }

    console.log(infoCurso);
}
