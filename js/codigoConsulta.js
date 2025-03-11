const contenedorConsulta = document.querySelector('.contenedor-consulta');

let idPersonaje = localStorage.getItem('numeroId');
const direccion = `https://dragonball-api.com/api/characters/${idPersonaje}`;

const opciones = {
    method: 'GET',
    headers: {
        'accept': '*/*'
    }
};

fetch(direccion, opciones)
    .then(respuesta => {
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        return respuesta.json();
    })
    .then(personaje => {
        console.log(personaje.transformations);
        // //otra forma de ver la longitud del arreglo
        // let array = Array.from(personaje.transformations);
        // let longitud = array.length;

        //verificar que el personaje si tenga transformaciones
        if (personaje.transformations.length != 0) {

            //verificar si es un arreglo de objetos
            if (Array.isArray(personaje.transformations)) {
                personaje.transformations.forEach(transformacion => {
                    const rowConsulta = document.getElementById('rowConsulta');
                    const columna = document.createElement('col');
                    columna.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-3');

                    const carta = document.createElement('div');
                    carta.classList.add('card');

                    const imageCarta = document.createElement('img');
                    imageCarta.classList.add('card-img-top');
                    imageCarta.src = transformacion.image;

                    const bodyCarta = document.createElement('div');
                    bodyCarta.classList.add('card-body');

                    const title = document.createElement('h5');
                    title.classList.add('card-title');
                    title.textContent = transformacion.name;
                    bodyCarta.appendChild(title);

                    carta.appendChild(imageCarta);
                    carta.appendChild(bodyCarta);
                    columna.appendChild(carta);
                    rowConsulta.appendChild(columna);
                });
            } else {
                console.log("No es un arreglo de objetos");
            };
        } else {
            console.log('Este personaje no tiene transformaciones');
            const rowConsulta = document.getElementById('rowConsulta');

            const crearParrafo = document.createElement('p');
            crearParrafo.textContent = 'Este personaje no tiene transformaciones'
            rowConsulta.appendChild(crearParrafo);
        };
    })
    .catch(error => {
        console.error('Error al obtener los personajes:', error.message);
    })
    .finally(() => {
        console.log("Peticion de un personaje finalizada")
    });