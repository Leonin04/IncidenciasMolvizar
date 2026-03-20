const boton = document.querySelector('.comentarios');
const caja = document.querySelector('.caja_comentarios');

if (boton && caja) {
    // 1. Cuando entras al botón: se muestra la caja y se desplaza el botón
    boton.addEventListener('mouseover', () => {
        caja.classList.add('mostrar');
        // Calculamos el ancho de la caja y le sumamos un margen
        boton.style.right = `${caja.offsetWidth-2}px`;
    });

    // 2. Cuando el ratón sale de la CAJA: se esconde todo y el botón vuelve
    caja.addEventListener('mouseleave', () => {
        caja.classList.remove('mostrar');
        boton.style.right = '0px'; // Volver al borde de la pantalla
    });
}