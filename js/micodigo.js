const contenedorCartas = document.querySelector('.contenedor-cartas');

let pagina = 1;
let numItems = 58;

// Definimos la URL con los parámetros incluidos

const urldragon = `https://dragonball-api.com/api/characters?page=${pagina}&limit=${numItems}`;

// Configuración de la petición
const opciones = {
    method: 'GET',
    headers: {
        'accept': '*/*'
    }
};

// Realizamos la petición con fetch
fetch(urldragon, opciones)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Aquí ya tenemos la información en formato JavaScript (objeto)
        console.log('Personajes:', data);

        //verificar si data.items es un arreglo de objetos
        if (Array.isArray(data.items)) {
            data.items.forEach(personaje => {  //del objeto data, recorra la propiedad items que es un arreglo de objetos

                const rowCartas = document.getElementById('rowCartas');
                const columna = document.createElement('col');
                columna.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-3');

                const carta = document.createElement('div');
                carta.classList.add('card');

                const imageCarta = document.createElement('img');
                imageCarta.classList.add('card-img-top');
                imageCarta.src = personaje.image;

                const bodyCarta = document.createElement('div');
                bodyCarta.classList.add('card-body');

                const title = document.createElement('h5');
                title.classList.add('card-title');
                title.textContent = personaje.name;

                const parrafo1 = document.createElement('p');
                const parrafo2 = document.createElement('p');
                const parrafo3 = document.createElement('p');
                parrafo1.textContent = `${personaje.race} - ${personaje.gender}`
                parrafo2.textContent = `Base KI: ${personaje.ki}`;
                parrafo3.textContent = `Max KI: ${personaje.maxKi}`;

                parrafo1.classList.add('card-text');
                parrafo2.classList.add('card-text');
                parrafo3.classList.add('card-text');

                const linkCarta = document.createElement('a');
                linkCarta.setAttribute('id', personaje.id);
                linkCarta.textContent = "Ver transformaciones"
                linkCarta.href = "consultaPersona.html";
                linkCarta.classList.add('carta', 'btn', 'btn-primary');
                
                bodyCarta.appendChild(title);
                bodyCarta.appendChild(parrafo1);
                bodyCarta.appendChild(parrafo2);
                bodyCarta.appendChild(parrafo3);
                bodyCarta.appendChild(linkCarta);

                carta.appendChild(imageCarta);
                carta.appendChild(bodyCarta);
                columna.appendChild(carta);
                rowCartas.appendChild(columna);
            });
        } else {
            console.log("No es un arreglo de objetos");
        };
        const cartas = document.querySelectorAll('.carta');
        let arrayCartas = Array.from(cartas);
        arrayCartas.forEach((carta) => {
            carta.addEventListener('click', () => {
                console.log(carta.id);
                let numId = carta.id;
                localStorage.setItem('numeroId', numId);
                let idPersonaje = carta.id;
                // const direccion = `https://dragonball-api.com/api/characters/${idPersonaje}`;

                // const opciones = {
                //     method: 'GET',
                //     headers: {
                //         'accept': '*/*'
                //     }
                // };

                // fetch(direccion, opciones)
                //     .then(respuesta => {
                //         if (!respuesta.ok) {
                //             throw new Error(`Error HTTP: ${respuesta.status}`);
                //         }
                //         return respuesta.json();
                //     })
                //     .then(personaje => {

                //         //verificar que el personaje si tenga transformaciones
                //         if (personaje.transformations.length != 0) {

                //             //verificar si es un arreglo de objetos
                //             if (Array.isArray(personaje.transformations)){
                //                 personaje.transformations.forEach(transformacion => {
                //                     const rowConsulta = document.getElementById('rowConsulta');
                //                     const columna = document.createElement('col');
                //                     columna.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-3');

                //                     const carta = document.createElement('div');
                //                     carta.classList.add('card');

                //                     const imageCarta = document.createElement('img');
                //                     imageCarta.classList.add('card-img-top');
                //                     imageCarta.src = "./img/azul.jpg";

                //                     const bodyCarta = document.createElement('div');
                //                     bodyCarta.classList.add('card-body');

                //                     const title = document.createElement('h5');
                //                     title.classList.add('card-title');
                //                     title.textContent = transformacion.name;
                //                     bodyCarta.appendChild(title);

                //                     carta.appendChild(imageCarta);
                //                     carta.appendChild(bodyCarta);
                //                     columna.appendChild(carta);
                //                     rowConsulta.appendChild(columna);
                //                 });
                //             } else {
                //                 console.log("No es un arreglo de objetos");
                //             };
                //         } else {
                //             console.log('Este personaje no tiene transformaciones');
                //             const rowConsulta = document.getElementById('rowConsulta');
                            
                //             const crearParrafo = document.createElement('p');
                //             crearParrafo.textContent = 'Este personaje no tiene transformaciones'
                //             rowConsulta.appendChild(crearParrafo);
                //         };
                //     })
                //     .catch(error => {
                //         console.error('Error al obtener los personajes:', error.message);
                //     })
                //     .finally(() => {
                //         console.log("Peticion de un personaje finalizada")
                //     });
            });
        })
    })
    .catch(error => {
        console.error('Error al obtener los personajes:', error.message);
    })
    .finally(() => {
        console.log("Petición de dragon ball finalizada");
    });