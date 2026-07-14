const API = 'http://localhost:3000';

export async function consultar(endpoint) {
    const response = await fetch(API + endpoint);

    if (!response.ok) {
        throw new Error(`Error ${response.status}`);
    }

    return await response.json();
}

export async function obtenerDestinos() {
    return consultar('/destinos');
}
export async function obtenerDestino(id) {
    return consultar(`/destinos/${id}`);
}