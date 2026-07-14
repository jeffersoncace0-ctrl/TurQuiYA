import { home } from './views/home.js';
import { login } from './views/login.js';
import { registro } from './views/registro.js';
import { destinos } from './views/destinos.js';
import { presupuesto } from './views/presupuesto.js';
import { perfil } from './views/perfil.js';
import { detalleDestino } from './views/detalleDestino.js';

const routes = {
    home,
    login,
    registro,
    destinos,
    presupuesto,
    perfil,
    detalle: detalleDestino
};

export async function router(page, data = null) {

    const vista = await routes[page](data);

    document.getElementById('app').innerHTML = vista;

}