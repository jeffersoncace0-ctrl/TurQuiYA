import { obtenerDestino } from "../services/api.js";

export async function detalleDestino(id) {

    try {

        const destino = await obtenerDestino(id);

        return `

            <div class="card">

                <img
                    src="${destino.imagen}"
                    class="destino-img"
                    alt="${destino.nombre}"
                >

                <h2>${destino.nombre}</h2>

                <p><strong>Categoría:</strong> ${destino.categoria}</p>

                <p><strong>Ubicación:</strong> ${destino.ubicacion}</p>

                <p><strong>Precio:</strong> $${destino.precio}</p>

                <p>${destino.descripcion}</p>

                <button onclick="navigate('destinos')">
                    Volver al catálogo
                </button>

            </div>

        `;

    } catch (error) {

        console.error(error);

        return `
            <div class="error">
                No fue posible cargar el destino.
            </div>
        `;

    }

}