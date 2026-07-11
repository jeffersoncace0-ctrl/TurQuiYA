import {home} from './views/home.js';
import {login} from './views/login.js';
import {registro} from './views/registro.js';
import {destinos} from './views/destinos.js';
import {presupuesto} from './views/presupuesto.js';
import {perfil} from './views/perfil.js';

const routes={
home,
login,
registro,
destinos,
presupuesto,
perfil
};

export function router(page){
document.getElementById('app').innerHTML = routes[page]();
}
