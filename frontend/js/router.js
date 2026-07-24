import { home } from './views/home.js';
import { login } from './views/login.js';
import { registro } from './views/registro.js';
import { destinos } from './views/destinos.js';
import { presupuesto } from './views/presupuesto.js';
import { perfil } from './views/perfil.js';
import { detalleDestino } from './views/detalleDestino.js';
import { descubre } from './views/descubre.js';
// Importamos las nuevas vistas de tu compañero
import { transporte } from './views/transporte.js';
import { intercambio } from './views/intercambio.js';

const routes = {
    home,
    login,
    registro,
    destinos,
    presupuesto,
    perfil,
    detalle: detalleDestino,
    descubre,
    transporte, // Nueva ruta registrada
    intercambio // Nueva ruta registrada
};

export async function router(page, data = null) {
    const app = document.getElementById("app");

    if (!app) {
        console.error("No existe el contenedor #app");
        return;
    }

    const view = routes[page];

    if (!view) {
        app.innerHTML = `
        <div class="seccion">
            <h2>Página no encontrada</h2>
            <p>La sección que buscas no existe.</p>
            <button onclick="navigate('home')">Volver al inicio</button>
        </div>
        `;
        return;
    }

    try {
        const contenido = await view(data);
        app.innerHTML = contenido;
        window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
        console.error("Error cargando vista:", error);
        app.innerHTML = `
        <div class="seccion">
            <h2>Error cargando página</h2>
            <p>Ocurrió un problema al abrir esta sección.</p>
        </div>
        `;
    }
}