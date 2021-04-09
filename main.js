//Iniciando la libreria Muuri
const GRID = new Muuri('.grid', {
    layout: {
        rounding: false,
      }
});

//Se agregan los eventos para el filtrado por categoria
window.addEventListener('load', () => {
    GRID.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');

    const ENLACES = document.querySelectorAll('#categorias a');
    ENLACES.forEach( (elemento) => {
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault();
            ENLACES.forEach((enlace) => enlace.classList.remove('activo'));
            evento.target.classList.add('activo');

            const CATEGORIA = evento.target.innerHTML.toLowerCase();
            CATEGORIA === 'todos' ? GRID.filter('[data-categoria]') : GRID.filter(`[data-categoria="${CATEGORIA}"]`);
        });
    });

    //Se agrega un evento para la barra de busqueda
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
        const BUSQUEDA = evento.target.value;
        GRID.filter( (item) => item.getElement().dataset.etiquetas.includes(BUSQUEDA) );
    });

    //Se agrega un evento para cuando se clickean las imagenes
    const OVERLAY = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach( (elemento) => {
        elemento.addEventListener('click', () => {
            const RUTA = elemento.getAttribute('src');
            const DESCRIPCION = elemento.parentNode.parentNode.dataset.descripcion;

            OVERLAY.classList.add('activo');
            document.querySelector('#overlay img').src = RUTA;
            document.querySelector('#overlay .descripcion').innerHTML = DESCRIPCION;
        });
    });

    //Evento para el boton de cerrar
    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        OVERLAY.classList.remove('activo');
    });

    //Evento del overlay
    OVERLAY.addEventListener('click', (evento) => {
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    }); 
});
