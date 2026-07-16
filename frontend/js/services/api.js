const API = "https://avnlxruzurvtybzoficd.supabase.co/functions/v1";

export async function consultar(endpoint) {

    const response = await fetch(API + endpoint);

    if (!response.ok) {
        throw new Error(`Error ${response.status}`);
    }

    return response.json();
}

export function obtenerDestinos() {
    return consultar("/Destinos");
}

export async function obtenerDestino(id) {
    const destinos = await obtenerDestinos();
    return destinos.find(d => d.id_destino == id);
}