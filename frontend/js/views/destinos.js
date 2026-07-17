// =====================================================
// destinos.js — Catálogo de destinos (Conectado a Supabase)
// =====================================================

import { obtenerDestinos } from '../services/api.js';

// Función global que abre la ventana flotante en el centro de la página
window.abrirModalDestino = (nombre, municipio, categoria, descripcion, eficiencia, imagen) => {
    const modalExistente = document.getElementById('modal-detalle-destino');
    if (modalExistente) modalExistente.remove();

    const modalHtml = `
        <div id="modal-detalle-destino" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; z-index: 10000; padding: 20px;">
            <div style="background: white; border-radius: 12px; width: 100%; max-width: 600px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.3); position: relative;">
                
                <img src="${imagen}" alt="${nombre}" style="width: 100%; height: 280px; object-fit: cover;">
                
                <div style="padding: 25px;">
                    <h2 style="margin: 0 0 10px 0; color: #333; font-size: 24px;">${nombre}</h2>
                    <p style="margin: 0 0 15px 0; color: #ef4444; font-weight: bold; font-size: 14px; text-transform: uppercase;">${municipio} • Categoría: ${categoria}</p>
                    
                    <h4 style="margin: 0 0 5px 0; color: #555;">Descripción del lugar:</h4>
                    <p style="margin: 0 0 20px 0; color: #666; line-height: 1.6; font-size: 15px;">${descripcion}</p>
                    
                    <div style="background: #f1f8e9; padding: 12px 15px; border-radius: 6px; border-left: 5px solid #7cb342; margin-bottom: 20px;">
                        <span style="font-weight: bold; color: #33691e;">Eficiencia del Operador Turístico:</span> 
                        <span style="color: #2e7d32; font-weight: bold;">${eficiencia || 'No calificado'}</span>
                    </div>

                    <button onclick="document.getElementById('modal-detalle-destino').remove()" style="width: 100%; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; border: none; padding: 12px; border-radius: 6px; font-size: 16px; cursor: pointer; font-weight: bold; box-shadow: 0 4px 6px rgba(239, 68, 68, 0.2);">
                        Cerrar Ventana
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
};

export async function destinos() {
    let listado = [];
    
    // Obtenemos los destinos directamente desde Supabase
    try {
        listado = await obtenerDestinos();
    } catch (error) {
        console.error("Error cargando destinos de la base de datos:", error);
        return `<div style="text-align:center; padding: 50px;"><h3>Error al cargar los destinos. Verifica tu conexión a internet.</h3></div>`;
    }

    // 1. Agrupar por municipio (Nivel Base)
    const barranquilla = listado.filter(d => d.municipio === "Barranquilla");
    const puerto = listado.filter(d => d.municipio === "Puerto Colombia");
    const tubara = listado.filter(d => d.municipio === "Tubará");
    const usiacuri = listado.filter(d => d.municipio === "Usiacurí");

    // 2. Definir palabras clave para subcategorías (Agregué gastronomía y fiesta que vienen del server.js de tu compañero)
    const categoriasPlayas = ["playa", "balneario", "playas"];
    const categoriasVidaNocturna = ["bar", "restaurante", "discoteca", "vida nocturna", "club", "bares", "restaurantes", "gastronomía", "fiesta"];

    const esPlaya = (d) => d.categoria && categoriasPlayas.includes(d.categoria.toLowerCase().trim());
    const esVidaNocturna = (d) => d.categoria && categoriasVidaNocturna.includes(d.categoria.toLowerCase().trim());

    // 3. Filtrar Barranquilla (Separando playas, vida nocturna y el RESTO)
    const barranquillaPlayas = barranquilla.filter(esPlaya);
    const barranquillaNocturna = barranquilla.filter(esVidaNocturna);
    const barranquillaOtros = barranquilla.filter(d => !esPlaya(d) && !esVidaNocturna(d));

    // 4. Filtrar Puerto Colombia
    const puertoPlayas = puerto.filter(esPlaya);
    const puertoNocturna = puerto.filter(esVidaNocturna);
    const puertoOtros = puerto.filter(d => !esPlaya(d) && !esVidaNocturna(d));

    const generarTarjetas = (arreglo) => {
        return arreglo.map(d => `
            <div class="tarjeta-destino" style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: flex; flex-direction: column;">
                <img src="${d.imagen}" style="width: 100%; height: 180px; object-fit: cover;">
                <div style="padding: 15px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h3 style="margin: 0 0 5px 0; font-size: 18px; color: #333;">${d.nombre}</h3>
                        <p style="margin: 0 0 5px 0; font-size: 13px; color: #777; font-weight: bold;">Categoría: ${d.categoria}</p>
                    </div>
                    <button onclick="abrirModalDestino('${d.nombre.replace(/'/g, "\\'")}', '${d.municipio}', '${d.categoria}', '${d.descripcion.replace(/'/g, "\\'")}', '${d.eficiencia}', '${d.imagen}')" style="margin-top: 15px; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; border: none; padding: 10px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; box-shadow: 0 4px 6px rgba(239, 68, 68, 0.2);">
                        Ver detalle
                    </button>
                </div>
            </div>
        `).join('');
    };

    return `
    <div style="padding: 30px; max-width: 1200px; margin: 0 auto; font-family: sans-serif;">
        <h2 style="text-align: center; margin-bottom: 40px; font-size: 38px; font-weight: 800; background: linear-gradient(135deg, #ef4444, #eab308, #10b981); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">Destinos Turísticos del Atlántico</h2>
        
        <!-- BARRANQUILLA (Con su ID para el Scroll) -->
        <h3 id="seccion-barranquilla" style="color: #ef4444; border-bottom: 3px solid #ef4444; padding-bottom: 5px; margin-top: 20px; margin-bottom: 15px; font-size: 24px;">Barranquilla</h3>
        
        <h4 style="color: #555; margin: 15px 0 10px 0; font-size: 18px; font-style: italic;">Cultura, Monumentos y Naturaleza</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-bottom: 25px;">
            ${barranquillaOtros.length > 0 ? generarTarjetas(barranquillaOtros) : '<p style="color: #999; grid-column: 1/-1;">No se encontraron registros.</p>'}
        </div>

        <h4 style="color: #555; margin: 15px 0 10px 0; font-size: 18px; font-style: italic;">Vida Nocturna (Bares y Restaurantes)</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-bottom: 25px;">
            ${barranquillaNocturna.length > 0 ? generarTarjetas(barranquillaNocturna) : '<p style="color: #999; grid-column: 1/-1;">No se encontraron registros.</p>'}
        </div>


        <!-- PUERTO COLOMBIA (Con su ID para el Scroll) -->
        <h3 id="seccion-puerto" style="color: #eab308; border-bottom: 3px solid #eab308; padding-bottom: 5px; margin-bottom: 15px; font-size: 24px;">Puerto Colombia</h3>
        
        <h4 style="color: #555; margin: 15px 0 10px 0; font-size: 18px; font-style: italic;">Playas</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-bottom: 25px;">
            ${puertoPlayas.length > 0 ? generarTarjetas(puertoPlayas) : '<p style="color: #999; grid-column: 1/-1;">No se encontraron playas registradas.</p>'}
        </div>

        <h4 style="color: #555; margin: 15px 0 10px 0; font-size: 18px; font-style: italic;">Vida Nocturna (Bares y Restaurantes)</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-bottom: 25px;">
            ${puertoNocturna.length > 0 ? generarTarjetas(puertoNocturna) : '<p style="color: #999; grid-column: 1/-1;">No se encontraron registros.</p>'}
        </div>
        
        <h4 style="color: #555; margin: 15px 0 10px 0; font-size: 18px; font-style: italic;">Historia y Monumentos</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px;">
            ${puertoOtros.length > 0 ? generarTarjetas(puertoOtros) : '<p style="color: #999; grid-column: 1/-1;">No se encontraron registros.</p>'}
        </div>


        <!-- TUBARÁ -->
        <h3 id="seccion-tubara" style="color: #10b981; border-bottom: 3px solid #10b981; padding-bottom: 5px; margin-bottom: 15px; font-size: 24px;">Tubará</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px;">
            ${tubara.length > 0 ? generarTarjetas(tubara) : '<p style="color: #999; grid-column: 1/-1;">No se encontraron destinos registrados.</p>'}
        </div>


        <!-- USIACURÍ (Con su ID para el Scroll) -->
        <h3 id="seccion-usiacuri" style="color: #ef4444; border-bottom: 3px solid #ef4444; padding-bottom: 5px; margin-bottom: 15px; font-size: 24px;">Usiacurí</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px;">
            ${usiacuri.length > 0 ? generarTarjetas(usiacuri) : '<p style="color: #999; grid-column: 1/-1;">No se encontraron destinos registrados.</p>'}
        </div>
    </div>
    `;
}