<<<<<<< HEAD
const API = 'http://localhost:3000';

export async function consultar(endpoint) {
=======
const API = "https://avnlxruzurvtybzoficd.supabase.co/functions/v1";

export async function consultar(endpoint) {

>>>>>>> feature_todo
    const response = await fetch(API + endpoint);

    if (!response.ok) {
        throw new Error(`Error ${response.status}`);
    }

<<<<<<< HEAD
    return await response.json();
}

export async function obtenerDestinos() {
    return consultar('/destinos');
}
export async function obtenerDestino(id) {
    return consultar(`/destinos/${id}`);
=======
    return response.json();
}

export function obtenerDestinos() {
    return consultar("/Destinos");
}

export async function obtenerDestino(id) {
    const destinos = await obtenerDestinos();
    return destinos.find(d => d.id_destino == id);
>>>>>>> feature_todo
}