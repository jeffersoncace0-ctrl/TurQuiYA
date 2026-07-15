export function presupuesto() {
    // Lista de destinos integrada para calcular costes aproximados por persona
    const destinosSimulados = [
        { nombre: "Gran Malecón del Río", municipio: "Barranquilla", costoPromedio: 15000, foto: "https://unsplash.com", tiempoMinimo: "1 hora" },
        { nombre: "Ventana del Mundo", municipio: "Barranquilla", costoPromedio: 10000, foto: "https://unsplash.com", tiempoMinimo: "1 hora" },
        { nombre: "Muelle 1888", municipio: "Barranquilla", costoPromedio: 45000, foto: "https://unsplash.com", tiempoMinimo: "5 horas" },
        { nombre: "Playa Pradomar", municipio: "Puerto Colombia", costoPromedio: 60000, foto: "https://unsplash.com", tiempoMinimo: "un dia" },
        { nombre: "Castillo de Salgar", municipio: "Puerto Colombia", costoPromedio: 25000, foto: "https://unsplash.com", tiempoMinimo: "5 horas" },
        { nombre: "Macromural y Escalinatas", municipio: "Usiacurí", costoPromedio: 20000, foto: "https://unsplash.com", tiempoMinimo: "un dia" },
        { nombre: "Playa de Tubará", municipio: "Tubará", costoPromedio: 50000, foto: "https://unsplash.com", tiempoMinimo: "un dia" }
    ];

    setTimeout(() => {
        const selectTiempo = document.getElementById('tiempoDisponible');
        const contenedorOtros = document.getElementById('contenedorOtros');
        const form = document.getElementById('presupuestoForm');
        const resultadoRuta = document.getElementById('resultadoRuta');

        // Controlar si se muestra la caja de texto para "Otro tiempo"
        if (selectTiempo && contenedorOtros) {
            selectTiempo.addEventListener('change', (e) => {
                if (e.target.value === 'otros') {
                    contenedorOtros.style.display = 'block';
                    document.getElementById('otroTiempoInput').setAttribute('required', 'true');
                } else {
                    contenedorOtros.style.display = 'none';
                    document.getElementById('otroTiempoInput').removeAttribute('required');
                }
            });
        }

        // Lógica de cálculo al presionar "Crear ruta"
        if (form && resultadoRuta) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const dineroTotal = parseFloat(document.getElementById('dineroInput').value);
                const cantidadPersonas = parseInt(document.getElementById('personasInput').value);

                // Validaciones estrictas anti-negativos en el lado del cliente
                if (dineroTotal < 0 || cantidadPersonas <= 0) {
                    alert('Por favor introduce valores positivos válidos.');
                    return;
                }

                // Cálculo de presupuesto disponible individual
                const presupuestoPorPersona = dineroTotal / cantidadPersonas;

                // Filtrar los lugares que se ajustan al bolsillo del usuario
                const rutasSugeridas = destinosSimulados.filter(dest => dest.costoPromedio <= presupuestoPorPersona);

                if (rutasSugeridas.length === 0) {
                    resultadoRuta.innerHTML = `
                        <div style="background: #fff3e0; border-left: 5px solid #ff9800; padding: 15px; border-radius: 8px; color: #e65100;">
                            <strong>Presupuesto muy ajustado:</strong> No encontramos destinos comerciales que se acomoden a este presupuesto por persona ($${Math.round(presupuestoPorPersona).toLocaleString()}). Intenta aumentar el monto total.
                        </div>
                    `;
                    return;
                }

                // Renderizar las cards de las rutas recomendadas en tiempo real
                let cardsHtml = rutasSugeridas.map(dest => `
                    <div style="background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; display: flex; flex-direction: column;">
                        <img src="${dest.foto}" style="width: 100%; height: 140px; object-fit: cover;">
                        <div style="padding: 15px; display: flex; flex-direction: column; justify-content: space-between; flex-grow: 1;">
                            <div>
                                <h4 style="margin: 0 0 5px 0; color: #1e293b; font-size: 16px;">${dest.nombre}</h4>
                                <p style="margin: 0 0 10px 0; color: #0288d1; font-size: 12px; font-weight: bold; text-transform: uppercase;">${dest.municipio}</p>
                            </div>
                            <div style="background: #f8fafc; padding: 8px; border-radius: 6px; font-size: 13px; color: #475569;">
                                💰 Gasto estimado: <strong>$${dest.costoPromedio.toLocaleString()} COP</strong> por persona.
                            </div>
                        </div>
                    </div>
                `).join('');

                resultadoRuta.innerHTML = `
                    <h3 style="color: #1e293b; margin-top: 10px; margin-bottom: 5px; font-size: 18px; font-weight: bold;">Ruta recomendada para tu presupuesto</h3>
                    <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">Tienes un aproximado de <strong>$${Math.round(presupuestoPorPersona).toLocaleString()} COP</strong> para gastar por cada aventurero.</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px;">
                        ${cardsHtml}
                    </div>
                `;
            });
        }
    }, 50);

    return `
    <div style="padding: 40px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif;">
        
        <div style="background: white; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
            <h2 style="color: #1e293b; margin-top: 0; margin-bottom: 8px; font-size: 24px; font-weight: bold;">📊 Presupuesto inteligente</h2>
            <p style="color: #64748b; margin-bottom: 25px; font-size: 14px;">Calcula tu itinerario ideal de viaje por el departamento del Atlántico optimizando cada peso.</p>

            <form id="presupuestoForm">
                
                <!-- Entrada Presupuesto Mínimo 0 -->
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #334155; font-size: 14px;">Presupuesto Total disponible (COP)</label>
                    <input type="number" id="dineroInput" min="0" placeholder="Ej. 500000" style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 15px; box-sizing: border-box;" required>
                </div>

                <!-- Cantidad de personas Mínimo 1 -->
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #334155; font-size: 14px;">¿Cuántas personas van a la aventura?</label>
                    <input type="number" id="personasInput" min="1" placeholder="Ej. 2" style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 15px; box-sizing: border-box;" required>
                </div>

                <!-- Selección de Tiempo Configurable -->
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #334155; font-size: 14px;">Tiempo de viaje disponible</label>
                    <select id="tiempoDisponible" style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 15px; background-color: white; box-sizing: border-box;" required>
                        <option value="">Selecciona una opción</option>
                        <option value="1h">1 Hora</option>
                        <option value="5h">5 Horas</option>
                        <option value="1d">1 Día</option>
                        <option value="3d">3 Días</option>
                        <option value="1s">1 Semana</option>
                        <option value="otros">Otros o más...</option>
                    </select>
                </div>

                <!-- Input Dinámico para "Otros" tiempos -->
                <div id="contenedorOtros" style="margin-bottom: 20px; display: none;">
                    <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #334155; font-size: 14px;">Especifica tu tiempo disponible</label>
                    <input type="text" id="otroTiempoInput" placeholder="Ej. 10 días, 2 semanas..." style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 15px; box-sizing: border-box;">
                </div>

                <button type="submit" style="background: #0288d1; color: white; border: none; padding: 14px 24px; border-radius: 8px; font-size: 15px; cursor: pointer; font-weight: bold; width: 100%; transition: background 0.2s;">
                    🚀 Crear ruta inteligente
                </button>

            </form>
        </div>

        <!-- Bloque reactivo donde nacerán las Cards automáticas de la ruta simulada -->
        <div id="resultadoRuta" style="margin-top: 30px;"></div>

    </div>
    `;
}
