import { obtenerDestinos } from "../services/api.js";

export async function destinos() {

    try {

        const lista = await obtenerDestinos();

        if (lista.length === 0) {
            return `
                <div class="card">
                    <h2>Destinos turísticos</h2>
                    <p>No existen destinos disponibles.</p>
                </div>
            `;
        }

        let html = `
            <div class="card">
                <h2>Destinos del Atlántico</h2>
                <div class="catalogo">
        `;

        lista.forEach(destino => {

            html += `
                <div class="card">

                    <img
                        src="${destino.imagen}"
                        alt="${destino.nombre}"
                        class="destino-img"
                    >

                    <h3>${destino.nombre}</h3>

                    <p><strong>Categoría:</strong> ${destino.categoria}</p>
                    <p>${destino.descripcion}</p>

                   <button onclick="navigate('detalle', ${destino.id_destino})">
                        Ver detalle
                   </button>

                </div>
            `;

        });

        html += `
                </div>
            </div>
        `;

        return html;

    } catch (error) {

        console.error(error);

        return `
            <div class="error">
                Error al cargar los destinos.
            </div>
        `;

    }

}