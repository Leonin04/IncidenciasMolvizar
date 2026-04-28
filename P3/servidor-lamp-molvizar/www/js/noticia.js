//Primero selecciono todos los elementos del DOM que voy a utilizar mas adelante para tenerlos a mano

const caja = document.querySelector('.caja_comentarios');
const boton = document.querySelector('.boton_comentarios');
const menu = document.querySelector('.menu_comentarios');
const seccion = document.querySelector('.seccion_comentarios');
const addComment = document.querySelector('.añadir_comentario');
const formulario = document.querySelector('.form_comentarios');
const cerrarForm = document.querySelector('.cerrar_form');
const submitForm = document.querySelector('.submit');
const campoComentario = formulario.querySelector('textarea[name="comentario"]');

const localidades = ["Molvizar", "Almuñécar", "Salobreña", "Motril", "Gualchos", "Lobres", "Itrabo", "Calahonda", "Torrenueva"];

let comentarios = [
    {
        autor: "Ares",
        email: "ares@gmail.com",
        fecha: "05-04-2026",
        hora: "14:30",
        contenido: "¡Qué buen artículo! Me sirvió mucho."
    },
    {
        autor: "Javier",
        email: "javi@gmail.com",
        fecha: "05-04-2026",
        hora: "09:15",
        contenido: "Ha sido un suceso horrible, mis condolencias a las familias afectadas."
    },
    {
        autor: "Lucía",
        email: "lucia@gmai.com",
        fecha: "04-04-2026",
        hora: "18:45",
        contenido: "No puedo creer que esto haya pasado en nuestro pueblo."
    }
];

let comentariosEscritos = 0;

let formAbierto = false;

//Función para añadir un comentario a la seccion de comentarios.
function addComentario(comentario) {
    nuevoArticulo = document.createElement('article');
    nuevoArticulo.classList.add('comentario');

    nuevoArticulo.innerHTML = `
        <strong>${comentario.autor}</strong>
        <p class="fecha">${comentario.fecha} - ${comentario.hora}</p>
        <p>${comentario.contenido}</p>
    `;
    seccion.appendChild(nuevoArticulo);
}

function cargarComentarios() { //Funcion para cargar todos los comentario, o los restantes, que haya en la coleccion de comentarios
    while (comentariosEscritos < comentarios.length) {
        addComentario(comentarios[comentariosEscritos]);
        comentariosEscritos++;
    }
}

cargarComentarios();//Cargo los comentarios iniciales al cargar la pagina

caja.addEventListener('mouseenter', () => { //Al pasar el cursor por la caja de comentarios, se muestra el menu de comentarios y se desplaza el boton hacia la izquierda para que no quede encima del menu
    menu.classList.add('mostrar'); //Añado la clase para que la propiedad display ya no sea none.
    boton.style.right = '300px';
});

caja.addEventListener('mouseleave', () => {
    menu.classList.remove('mostrar');
    boton.style.right = '0px';
});

addComment.addEventListener('click', () => { //Al hacer click en el boton de añadir comentario, se muestra el formulario para añadir un nuevo comentario y el boton para cerrar el formulario
    formulario.classList.add('mostrar');
    cerrarForm.classList.add('mostrar');
});

cerrarForm.addEventListener('click', () => {
    formulario.classList.remove('mostrar');
    cerrarForm.classList.remove('mostrar');
});

comentario.addEventListener('input', () => { //Añadimos un listener a la clase de los comentarios para que mientras escribes se pongan en mayuscula los pueblos
    let contenido = campoComentario.value;
    localidades.forEach(pueblo => {
        //Esta expresión regular busca de forma aislada el nombre del pueblo, sin importar mayúsculas o minúsculas, para evitar reemplazos parciales dentro de otras palabras. Por ejemplo, si el pueblo es "Almuñécar", no se reemplazará la parte "Almu" dentro de otras palabras.
        //La g de "gi" indica que se reemplazan todas las apariciones, y la i que se ignoran mayusculas o minúsculas.
        const regex = new RegExp(`\\b${pueblo}\\b`, 'gi');

        contenido = contenido.replace(regex, pueblo.toUpperCase());
    });
    campoComentario.value = contenido;
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    // Expresión regular para validar el formato del correo electrónico. El correo debe comenzar por un numero de caracteres alfanuméricos, seguidos de un @, otro número de caracteres alfanuméricos y finalmente una . seguido de entre 2 y 10 caracteres.
    const regexEmail = /^\w+@\w+(\.\w{2,10})+$/;

    let autor = formulario.nombre.value;
    let email = formulario.email.value;
    let contenido = formulario.comentario.value;

    // No compruebo si los campos están vacíos porque el formulario ya tiene el atributo "required" en cada campo, lo que impide que se envíe sin completar.
    if (!regexEmail.test(email)) {
        alert('Por favor, introduce un correo electrónico válido. Ejemplo: usuario@dominio.com');
        return;
    }
    let fecha = new Date();
    let nuevoComentario = {
        autor: autor,
        fecha: `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`,
        email: email,
        hora: `${fecha.getHours()}:${fecha.getMinutes().toString().padStart(2, '0')}`,
        contenido: contenido
    };
    comentarios.push(nuevoComentario);
    cargarComentarios();
    formulario.reset(); //Limpiamos el formulario
});