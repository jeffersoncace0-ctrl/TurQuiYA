export function presupuesto() {
    // Lista de destinos integrada para calcular costes aproximados por persona
    const destinosSimulados = [
        { nombre: "Gran Malecón del Río", municipio: "Barranquilla", costoPromedio: 15000, foto: "./img/Barranquilla%20Malencon.jpeg", tiempoMinimo: "1 hora", categoria: "gastronomia" },
        { nombre: "Ventana del Mundo", municipio: "Barranquilla", costoPromedio: 10000, foto: "./img/Barranquilla%20ventana%20del%20mudo.jpg", tiempoMinimo: "1 hora", categoria: "cultura" },
        { nombre: "Muelle 1888", municipio: "Puerto Colombia", costoPromedio: 45000, foto: "./img/Puerto%20muelle%201888.jpeg", tiempoMinimo: "5 horas", categoria: "gastronomia" },
        { nombre: "Playa Pradomar", municipio: "Puerto Colombia", costoPromedio: 60000, foto: "./img/Puerto%20pradomar.jfif", tiempoMinimo: "un dia", categoria: "fiesta" },
        { nombre: "Castillo de Salgar", municipio: "Puerto Colombia", costoPromedio: 25000, foto: "./img/Puerto%20castillo.png", tiempoMinimo: "5 horas", categoria: "cultura" },
        { nombre: "Macromural y Escalinatas", municipio: "Usiacurí", costoPromedio: 20000, foto: "./img/Usiacurí%20macromural.jpg", tiempoMinimo: "un dia", categoria: "cultura" },
        { nombre: "Playa Velero", municipio: "Tubará", costoPromedio: 50000, foto: "./img/tubara%20velero.webp", tiempoMinimo: "un dia", categoria: "playa" },
        { nombre: "Parque Mirador Miramar", municipio: "Barranquilla", costoPromedio: 5000, foto: "./img/Barranquilla%20miramar.jpeg", tiempoMinimo: "2 horas", categoria: "naturaleza" }
    ];

    setTimeout(() => {
        const selectTiempo = document.getElementById('tiempoDisponible');
        const contenedorOtros = document.getElementById('contenedorOtros');
        const form = document.getElementById('presupuestoForm');
        const resultadoRuta = document.getElementById('resultadoRuta');
        const dineroInput = document.getElementById('dineroInput');
        const personasInput = document.getElementById('personasInput');
        const aiMessage = document.getElementById('ai-message');
        const otroTiempoInput = document.getElementById('otroTiempoInput');
        const tiempoCalculado = document.getElementById('tiempoCalculado');

        // Reacción en tiempo real de la IA (Tu código adaptado)
        const actualizarReaccionIA = () => {
            // Limpiamos los puntos de miles antes de calcular
            const valorLimpio = dineroInput.value.replace(/\./g, '');
            const dinero = parseFloat(valorLimpio) || 0;
            const personas = parseInt(personasInput.value) || 1;
            
            if(dinero === 0) {
                aiMessage.innerHTML = "¡Hola! Soy tu <strong>Guía IA Atlántico</strong>. Cuéntame cuánto presupuesto tienes y con cuántas personas viajas, y te armaré un plan al instante.";
                return;
            }

            const ppp = dinero / personas;

            if (ppp <= 35000) {
                aiMessage.innerHTML = "<strong>¡Un presupuesto ajustado, pero de una!</strong> 💡 Te armaré una ruta mochilera bien bacana para ahorrar platica sin dejar de gozar.";
            } else if (ppp <= 70000) {
                aiMessage.innerHTML = "<strong>¡Un muy buen presupuesto, colega!</strong> 🌊 Nos da bastante margen para recomendarte buenas opciones de comida típica y experiencias muy completas.";
            } else {
                aiMessage.innerHTML = "<strong>¡Excelente presupuesto, cipote plan!</strong> 🥂 Con esto podemos incluir transporte cómodo, buena comida típica y las mejores entradas a sitios culturales del Atlántico.";
            }
        };

        // Formateador de miles en tiempo real (Código de tu compañero)
        if (dineroInput) {
            dineroInput.addEventListener('input', function(e) {
                let valor = this.value.replace(/\D/g, ''); // Deja solo números
                if (valor !== '') {
                    this.value = parseInt(valor, 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                } else {
                    this.value = '';
                }
                actualizarReaccionIA(); // Despierta a la IA después de formatear
            });
        }

        if (personasInput && aiMessage) {
            personasInput.addEventListener('input', actualizarReaccionIA);
        }

        // Controlar si se muestra la caja de texto para "Otro tiempo"
        if (selectTiempo && contenedorOtros) {
            selectTiempo.addEventListener('change', (e) => {
                if (e.target.value === 'otros') {
                    contenedorOtros.style.display = 'block';
                    if(otroTiempoInput) otroTiempoInput.setAttribute('required', 'true');
                } else {
                    contenedorOtros.style.display = 'none';
                    if(otroTiempoInput) otroTiempoInput.removeAttribute('required');
                }
            });
        }

        // Lógica de cálculo de tiempo inteligente (Código de tu compañero)
        if (otroTiempoInput && tiempoCalculado) {
            otroTiempoInput.addEventListener('input', (e) => {
                const texto = e.target.value.toLowerCase();
                const regex = /(\d+)\s*(segundo|minuto|hora|d[ií]a|semana|mes|año)s?/i;
                const match = texto.match(regex);
                
                if (match && e.target.value.trim() !== '') {
                    const valor = parseInt(match[1]);
                    const unidad = match[2].replace('í', 'i');
                    let segundos = 0;
                    
                    switch(unidad) {
                        case 'segundo': segundos = valor; break;
                        case 'minuto': segundos = valor * 60; break;
                        case 'hora': segundos = valor * 3600; break;
                        case 'dia': segundos = valor * 86400; break;
                        case 'semana': segundos = valor * 604800; break;
                        case 'mes': segundos = valor * 2592000; break;
                        case 'año': segundos = valor * 31536000; break;
                    }
                    
                    tiempoCalculado.style.display = 'block';
                    tiempoCalculado.style.color = '#10b981';
                    tiempoCalculado.innerHTML = `✅ <strong>Reconocido:</strong> ${valor} ${unidad}(s)<br>⏱️ <strong>Conversión:</strong> ${segundos.toLocaleString()} segundos.`;
                } else if (e.target.value.trim() !== '') {
                    tiempoCalculado.style.display = 'block';
                    tiempoCalculado.style.color = '#ef4444';
                    tiempoCalculado.innerHTML = `❌ Formato no reconocido. (Ej: "2 dias", "1 semana")`;
                } else {
                    tiempoCalculado.style.display = 'none';
                }
            });
        }

        // Lógica de cálculo al presionar "Crear ruta"
        if (form && resultadoRuta) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                // Quita los puntos antes de convertir a número para hacer el cálculo real
                const dineroTotalCrudo = document.getElementById('dineroInput').value.replace(/\./g, '');
                const dineroTotal = parseFloat(dineroTotalCrudo);
                const cantidadPersonas = parseInt(document.getElementById('personasInput').value);

                if (dineroTotal < 0 || cantidadPersonas <= 0) {
                    alert('Por favor introduce valores positivos válidos.');
                    return;
                }

                const presupuestoPorPersona = dineroTotal / cantidadPersonas;
                const expElegida = document.getElementById('tipoExperiencia').value;

                resultadoRuta.innerHTML = `
                    <div style="text-align: center; padding: 40px; animation: fadeIn 0.3s ease;">
                        <div style="display: inline-block; width: 50px; height: 50px; border: 4px solid #f1f5f9; border-top: 4px solid #ef4444; border-right: 4px solid #eab308; border-bottom: 4px solid #10b981; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                        <p style="color: #334155; font-size: 16px; font-weight: bold; margin-top: 20px;">✨ TurquiYA AI está armando la ruta perfecta...</p>
                        <p style="color: #64748b; font-size: 13px;">Analizando tu presupuesto y tus gustos por la ${expElegida}...</p>
                        <style>
                            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                        </style>
                    </div>
                `;

                setTimeout(() => {
                    const selectElem = document.getElementById('tipoExperiencia');
                    const nombreExperiencia = selectElem.options[selectElem.selectedIndex].text.replace(/^[^\w]*/, '').trim();
                    
                    const totalExperiencia1 = dineroTotal * 0.99; 
                    const totalExperiencia2 = dineroTotal * 0.75; 

                    let htmlAI = `
                        <div style="animation: fadeIn 0.5s ease;">
                            <div style="background: linear-gradient(135deg, #1e293b, #0f172a); color: white; padding: 25px; border-radius: 16px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; overflow: hidden;">
                                <div style="position: absolute; top: -30px; right: -30px; width: 150px; height: 150px; background: linear-gradient(135deg, #ef4444, #eab308); opacity: 0.2; border-radius: 50%; filter: blur(30px);"></div>
                                <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 22px; display: flex; align-items: center; gap: 10px; font-weight: 900;">
                                    ✨ Resultados de tu Guía IA Atlántico
                                </h3>
                                <p style="margin: 0; font-size: 15px; color: #cbd5e1; line-height: 1.5;">Con un total de <strong>$${dineroTotal.toLocaleString('es-CO')} COP</strong> para ${cantidadPersonas} personas y tu interés en <strong>${nombreExperiencia}</strong>, te armé estos tres planes bien bacanos:</p>
                            </div>
                    `;

                    // Card Experiencia Total
                    htmlAI += `
                        <div style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.08); border: 2px solid #ef4444; margin-bottom: 30px; position: relative;">
                            <div style="background: #ef4444; color: white; padding: 12px 20px; font-weight: bold; font-size: 18px; display: flex; justify-content: space-between; align-items: center;">
                                <span>🔥 Opción 1: Experiencia Total</span>
                                <span style="font-size: 14px; background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 12px;">Ajustada al 100%</span>
                            </div>
                            <div style="padding: 25px;">
                                <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-top: 0; margin-bottom: 20px; font-style: italic;">
                                    "Aquí tienes la ruta ideal para exprimir cada centavo de tus $${dineroTotal.toLocaleString('es-CO')} COP en una inmersión súper premium."
                                </p>

                                <div style="margin-bottom: 20px;">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 13px; font-weight: bold; color: #475569;">
                                        <span>Consumo del presupuesto</span>
                                        <span>99%</span>
                                    </div>
                                    <div style="width: 100%; background: #e2e8f0; border-radius: 10px; height: 10px; overflow: hidden;">
                                        <div style="width: 99%; background: #ef4444; height: 100%; border-radius: 10px;"></div>
                                    </div>
                                </div>

                                <div style="display: flex; justify-content: space-between; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">
                                    <span style="color: #64748b; font-weight: bold;">Presupuesto calculado:</span>
                                    <span style="color: #ef4444; font-weight: 900; font-size: 18px;">$${totalExperiencia1.toLocaleString('es-CO', {maximumFractionDigits: 0})} COP</span>
                                </div>
                                <h4 style="margin: 0 0 15px 0; color: #1e293b;">Desglose del plan (para ${cantidadPersonas} personas):</h4>
                                <ul style="list-style: none; padding: 0; margin: 0 0 20px 0; color: #475569; font-size: 14.5px; line-height: 2;">
                                    <li style="display: flex; justify-content: space-between;"><span>🚗 Transporte cómodo y privado:</span> <strong>$${(dineroTotal * 0.12).toLocaleString('es-CO', {maximumFractionDigits: 0})}</strong></li>
                                    <li style="display: flex; justify-content: space-between;"><span>🥘 Restaurante premium y antojos:</span> <strong>$${(dineroTotal * 0.47).toLocaleString('es-CO', {maximumFractionDigits: 0})}</strong></li>
                                    <li style="display: flex; justify-content: space-between;"><span>🎟️ Tours VIP y actividades:</span> <strong>$${(dineroTotal * 0.20).toLocaleString('es-CO', {maximumFractionDigits: 0})}</strong></li>
                                    <li style="display: flex; justify-content: space-between; color: #94a3b8;"><span>🛡️ Reserva imprevistos:</span> <strong>$${(dineroTotal * 0.20).toLocaleString('es-CO', {maximumFractionDigits: 0})}</strong></li>
                                </ul>
                                <button style="width: 100%; background: #ef4444; color: white; padding: 12px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);">Ver itinerario paso a paso</button>
                            </div>
                        </div>
                    `;

                    // Card Aventura Inteligente
                    htmlAI += `
                        <div style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.08); border: 2px solid #f59e0b; margin-bottom: 30px; position: relative;">
                            <div style="background: #f59e0b; color: white; padding: 12px 20px; font-weight: bold; font-size: 18px; display: flex; justify-content: space-between; align-items: center;">
                                <span>💡 Opción 2: Aventura Inteligente</span>
                                <span style="font-size: 14px; background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 12px;">Ahorro del 25%</span>
                            </div>
                            <div style="padding: 25px;">
                                <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-top: 0; margin-bottom: 20px; font-style: italic;">
                                    "Mismo destino, pero cambiando el restaurante premium por un almuerzo tradicional en la plaza y usando transporte público intermunicipal."
                                </p>

                                <div style="margin-bottom: 20px;">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 13px; font-weight: bold; color: #475569;">
                                        <span>Consumo del presupuesto</span>
                                        <span>75%</span>
                                    </div>
                                    <div style="width: 100%; background: #e2e8f0; border-radius: 10px; height: 10px; overflow: hidden;">
                                        <div style="width: 75%; background: #f59e0b; height: 100%; border-radius: 10px;"></div>
                                    </div>
                                </div>

                                <div style="display: flex; justify-content: space-between; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">
                                    <span style="color: #64748b; font-weight: bold;">Presupuesto calculado:</span>
                                    <span style="color: #f59e0b; font-weight: 900; font-size: 18px;">$${totalExperiencia2.toLocaleString('es-CO', {maximumFractionDigits: 0})} COP</span>
                                </div>
                                <h4 style="margin: 0 0 15px 0; color: #1e293b;">Desglose del plan (para ${cantidadPersonas} personas):</h4>
                                <ul style="list-style: none; padding: 0; margin: 0 0 20px 0; color: #475569; font-size: 14.5px; line-height: 2;">
                                    <li style="display: flex; justify-content: space-between;"><span>🚌 Transporte público intermunicipal:</span> <strong>$${(dineroTotal * 0.08).toLocaleString('es-CO', {maximumFractionDigits: 0})}</strong></li>
                                    <li style="display: flex; justify-content: space-between;"><span>🍛 Almuerzo en plaza local:</span> <strong>$${(dineroTotal * 0.35).toLocaleString('es-CO', {maximumFractionDigits: 0})}</strong></li>
                                    <li style="display: flex; justify-content: space-between;"><span>🚶 Recorridos guiados sencillos:</span> <strong>$${(dineroTotal * 0.32).toLocaleString('es-CO', {maximumFractionDigits: 0})}</strong></li>
                                    <li style="display: flex; justify-content: space-between; color: #10b981; font-weight: bold;"><span>💵 Ahorro directo en tu bolsillo:</span> <strong>$${(dineroTotal * 0.25).toLocaleString('es-CO', {maximumFractionDigits: 0})}</strong></li>
                                </ul>
                                <button style="width: 100%; background: #f59e0b; color: white; padding: 12px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 10px rgba(245, 158, 11, 0.3);">Ver itinerario paso a paso</button>
                            </div>
                        </div>
                    `;

                    // Card Ruta Mochilera
                    const totalExperiencia3 = dineroTotal * 0.50; // 50%
                    htmlAI += `
                        <div style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.08); border: 2px solid #10b981; margin-bottom: 30px; position: relative;">
                            <div style="background: #10b981; color: white; padding: 12px 20px; font-weight: bold; font-size: 18px; display: flex; justify-content: space-between; align-items: center;">
                                <span>🎒 Opción 3: Ruta Mochilera</span>
                                <span style="font-size: 14px; background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 12px;">Ahorro del 50%</span>
                            </div>
                            <div style="padding: 25px;">
                                <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-top: 0; margin-bottom: 20px; font-style: italic;">
                                    "¡Viajar barato también es delicioso! Una ruta autoguiada por el Centro Histórico de Barranquilla con el mayor ahorro posible."
                                </p>

                                <div style="margin-bottom: 20px;">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 13px; font-weight: bold; color: #475569;">
                                        <span>Consumo del presupuesto</span>
                                        <span>50%</span>
                                    </div>
                                    <div style="width: 100%; background: #e2e8f0; border-radius: 10px; height: 10px; overflow: hidden;">
                                        <div style="width: 50%; background: #10b981; height: 100%; border-radius: 10px;"></div>
                                    </div>
                                </div>

                                <div style="display: flex; justify-content: space-between; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">
                                    <span style="color: #64748b; font-weight: bold;">Presupuesto calculado:</span>
                                    <span style="color: #10b981; font-weight: 900; font-size: 18px;">$${totalExperiencia3.toLocaleString('es-CO', {maximumFractionDigits: 0})} COP</span>
                                </div>
                                <h4 style="margin: 0 0 15px 0; color: #1e293b;">Desglose del plan (para ${cantidadPersonas} personas):</h4>
                                <ul style="list-style: none; padding: 0; margin: 0 0 20px 0; color: #475569; font-size: 14.5px; line-height: 2;">
                                    <li style="display: flex; justify-content: space-between;"><span>🚌 Transporte en Transmetro:</span> <strong>$${(dineroTotal * 0.05).toLocaleString('es-CO', {maximumFractionDigits: 0})}</strong></li>
                                    <li style="display: flex; justify-content: space-between;"><span>🥟 Fritos, arepas y comida callejera:</span> <strong>$${(dineroTotal * 0.25).toLocaleString('es-CO', {maximumFractionDigits: 0})}</strong></li>
                                    <li style="display: flex; justify-content: space-between;"><span>🚶 Recorrido histórico libre (Barrio Abajo):</span> <strong>$${(dineroTotal * 0.20).toLocaleString('es-CO', {maximumFractionDigits: 0})}</strong></li>
                                    <li style="display: flex; justify-content: space-between; color: #10b981; font-weight: bold;"><span>💵 Ahorro directo en tu bolsillo:</span> <strong>$${(dineroTotal * 0.50).toLocaleString('es-CO', {maximumFractionDigits: 0})}</strong></li>
                                </ul>
                                <button style="width: 100%; background: #10b981; color: white; padding: 12px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);">Ver itinerario paso a paso</button>
                            </div>
                        </div>
                    `;

                    htmlAI += `</div>`;
                    resultadoRuta.innerHTML = htmlAI;

                }, 1800);
            });
        }
    }, 50);

    return `
    <div style="padding: 40px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif;">
        
        <div style="background: white; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; position: relative;">
            
            <!-- Burbuja flotante de IA (Tu código) -->
            <div id="ai-bubble" style="background: linear-gradient(135deg, #10b981, #047857); color: white; padding: 18px; border-radius: 16px 16px 16px 0; font-size: 14.5px; box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3); margin-bottom: 30px; display: flex; gap: 12px; align-items: flex-start; transition: all 0.3s ease; border-left: 5px solid #eab308;">
                <div style="font-size: 30px; animation: pulse 2s infinite;">🤖</div>
                <div id="ai-message" style="line-height: 1.5;">¡Hola! Soy tu <strong>Guía IA Atlántico</strong>. Cuéntame cuánto presupuesto tienes y con cuántas personas viajas, y te armo un plan al instante.</div>
            </div>
            <style>@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }</style>

            <h2 style="color: #1e293b; margin-top: 0; margin-bottom: 8px; font-size: 24px; font-weight: bold;">📊 Presupuesto inteligente</h2>
            <p style="color: #64748b; margin-bottom: 25px; font-size: 14px;">Calcula tu itinerario ideal de viaje por el departamento del Atlántico optimizando cada peso.</p>

            <form id="presupuestoForm">
                
                <!-- Input cambiado a type="text" para permitir los puntos de miles -->
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #334155; font-size: 14px;">Presupuesto Total disponible (COP)</label>
                    <input type="text" id="dineroInput" placeholder="Ej. 500.000" style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 15px; box-sizing: border-box;" required>
                </div>

                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #334155; font-size: 14px;">¿Cuántas personas van a la aventura?</label>
                    <input type="number" id="personasInput" min="1" placeholder="Ej. 2" style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 15px; box-sizing: border-box;" required>
                </div>

                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #334155; font-size: 14px;">Tipo de Experiencia que buscas</label>
                    <select id="tipoExperiencia" style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 15px; background-color: white; box-sizing: border-box;" required>
                        <option value="">Selecciona una opción...</option>
                        <option value="cultura">🏛️ Cultura e Historia</option>
                        <option value="gastronomia">🥘 Gastronomía</option>
                        <option value="naturaleza">🌿 Naturaleza</option>
                        <option value="playa">🏖️ Playa y Brisa</option>
                        <option value="fiesta">🎉 Fiesta y Diversión</option>
                    </select>
                </div>

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

                <!-- Input Dinámico para "Otros" tiempos (Código de tu compañero con calculadora) -->
                <div id="contenedorOtros" style="margin-bottom: 20px; display: none;">
                    <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #334155; font-size: 14px;">Especifica tu tiempo disponible</label>
                    <input type="text" id="otroTiempoInput" placeholder="Ej. 10 días, 2 semanas..." style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 15px; box-sizing: border-box;">
                    <div id="tiempoCalculado" style="margin-top: 10px; font-size: 14px; background: #f8fafc; padding: 10px; border-radius: 8px; border-left: 4px solid #10b981; display: none;"></div>
                </div>

                <button type="submit" style="background: #0288d1; color: white; border: none; padding: 14px 24px; border-radius: 8px; font-size: 15px; cursor: pointer; font-weight: bold; width: 100%; transition: background 0.2s;">
                    🚀 Crear ruta inteligente
                </button>

            </form>
        </div>

        <div id="resultadoRuta" style="margin-top: 30px;"></div>

    </div>
    `;
}