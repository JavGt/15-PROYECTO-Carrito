// Variables 
const carrito = document.querySelector('#carrito');
const contenedoCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = []
cargarEventListener();

function cargarEventListener() {
    // Cuando agregar un curso presionado "Agregar"
    listaCursos.addEventListener('click', agregarCurso)

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    // Vaciar el carrito de compras
    vaciarCarrito.addEventListener("click", e=>{
        e.preventDefault();
        // Reseteamos ele arreglo y volvemos a llamar carrito
        articulosCarrito = []
        limpiarHTML();
    })
}

// Funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e) {
    e.preventDefault();
    // console.log(e.target.classList)
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo por el data-id 
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
        console.log(articulosCarrito);
        carritoHTML();
    }
}

// Lee el contendio del HTML que le dismos click y extrae la información del curos
function leerDatosCurso(curso) {
    // console.log(curso)

    // Crear un objeto con el contenido del curso actual
    const infoCuros = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('A').getAttribute('data-id'),
        cantidad: 1
    }
    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCuros.id)

    // console.log(existe);

    if (existe) {
        const curso = articulosCarrito.map( curso => {
            if (curso.id === infoCuros.id) {
                curso.cantidad ++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; //Retorna los objetos que no son actualizados
            }
        } );
        articulosCarrito = [...curso]
    } else {
        // Agrega elemenetos al curso de carrito
        articulosCarrito = [...articulosCarrito, infoCuros]
    }

    
    // console.log(articulosCarrito);
    carritoHTML();
}

// Muestra el carrito de compras en el html
function carritoHTML() {
    // console.log(contenedoCarrito);

    // Limpiar el html
    limpiarHTML();

    // Recorre en carrito y genera el html
    articulosCarrito.forEach(curso => {

        const row = document.createElement('TR');
        const { id, imagen, nombre, precio, cantidad  } = curso;

        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}"> X </td>
        `;
        // Agrega el html del carrito en el tbody
        contenedoCarrito.appendChild(row)
    })
}

// Elimina los cursos del html
function limpiarHTML() {
    // Forma lenta
    // contenedoCarrito.innerHTML = "";

    while( contenedoCarrito.firstChild ) {
        contenedoCarrito.removeChild(contenedoCarrito.firstChild);
    }
}