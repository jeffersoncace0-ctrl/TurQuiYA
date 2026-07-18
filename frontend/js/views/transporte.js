/**
 * Vista: Transporte
 * Opciones de transporte y calculador de rutas con tarifas condicionales por tipo de transporte
 */

export async function transporte() {
    
    // TRUCO SPA: Esperamos 50ms a que el DOM se actualice y activamos los botones
    setTimeout(() => {
        initTransporte();
    }, 50);

    return `
        <div id="transporte-view">
            <h1 id="titleTrans">¿Cómo me desplazo?</h1>

            <div class="contenedor-transporte">
                <div class="transp-card" data-tipo="moto">
                    <a href="#logoTransp">Moto</a>
                    <p>Puedes moverte rápidamente por gran parte de la ciudad.</p>
                </div>

                <div class="transp-card" data-tipo="taxi">
                    <a href="#logoTransp">Taxi / Carros particulares</a>
                    <p>Puedes recorrer toda la ciudad de forma cómoda y segura.</p>
                </div>

                <div class="transp-card" data-tipo="busUrbano">
                    <a href="#logoTransp">Buses urbanos</a>
                    <p>Puedes viajar de norte a sur de la ciudad de una manera económica.</p>
                </div>

                <div class="transp-card" data-tipo="busIntermunicipal">
                    <a href="#logoTransp">Buses intermunicipales</a>
                    <p>Son la mejor opción para desplazarte hacia los municipios del Atlántico.</p>
                </div>
            </div>

            <div id="ruta" class="contentRuta">
                <h2>Calcular Ruta</h2>
                <p>Planifica tu recorrido. Selecciona tu punto de partida, el destino que deseas visitar y el tipo de transporte. TurQuiYA calculará la distancia aproximada para ayudarte a planificar tu viaje.</p>

                <div class="selectores-ruta">
                    <div class="selector-grupo">
                        <label for="origen">Desde</label>
                        <select name="origen" id="origen">
                            <option value="blank">Selecciona origen</option>
                            <option value="malecon">Gran Malecón del Río</option>
                            <option value="aleta">Ventana de Campeones</option>
                            <option value="mundo">Ventana al Mundo</option>
                            <option value="zoo">Zoológico de Barranquilla</option>
                            <option value="ptoCol">Puerto Colombia</option>
                            <option value="tubara">Tubará</option>
                            <option value="Usiacuri">Usiacurí</option>
                        </select>
                    </div>

                    <div class="selector-grupo">
                        <label for="destino">Hasta</label>
                        <select name="destino" id="destino">
                            <option value="blank">Selecciona destino</option>
                            <option value="malecon">Gran Malecón del Río</option>
                            <option value="aleta">Ventana de Campeones</option>
                            <option value="mundo">Ventana al Mundo</option>
                            <option value="zoo">Zoológico de Barranquilla</option>
                            <option value="ptoCol">Puerto Colombia</option>
                            <option value="tubara">Tubará</option>
                            <option value="Usiacuri">Usiacurí</option>
                        </select>
                    </div>

                    <div class="selector-grupo">
                        <label for="tipoTransporte">Tipo de transporte</label>
                        <select name="tipoTransporte" id="tipoTransporte">
                            <option value="blank">Selecciona transporte</option>
                            <option value="moto">🏍️ Moto</option>
                            <option value="taxi">🚕 Taxi / Carro particular</option>
                            <option value="busUrbano">🚌 Bus urbano</option>
                            <option value="busIntermunicipal">🚍 Bus intermunicipal</option>
                        </select>
                    </div>
                </div>

                <div class="botones-ruta">
                    <button id="btn-calcular" class="btn-calcular">Calcular recorrido</button>
                    <button id="btn-restablecer" class="btn-restablecer">Restablecer</button>
                </div>
            </div>

            <div id="resultado" class="tarjeta-resultado">
                <h2>🧭 Información del recorrido (aprox.)</h2>
                <p><strong>🚗 Transporte:</strong> <span id="transporteTxt">-</span></p>
                <p><strong>📍 Origen:</strong> <span id="origenTxt">-</span></p>
                <p><strong>🎯 Destino:</strong> <span id="destinoTxt">-</span></p>
                <p><strong>📏 Distancia aprox.:</strong> <span id="distanciaTxt">-</span></p>
                <p><strong>⏱️ Tiempo estimado aprox.:</strong> <span id="tiempoTxt">-</span></p>
                <p><strong>💰 Costo aprox.:</strong> <span id="costoTxt">-</span></p>
                <p class="nota-tarifa">* Tarifa aplicada según distancia y tipo de transporte</p>
            </div>

            <!-- ENLACES DE LOGOS CORREGIDOS USANDO CLEARBIT API -->
            <div id="logoTransp" style="display: flex; justify-content: center; gap: 30px; align-items: center; flex-wrap: wrap; margin-top: 20px; padding-bottom: 20px;">
                <a href="https://web.didiglobal.com/co/pasajero/" target="_blank" rel="noopener noreferrer">
                    <img src="https://logo.clearbit.com/didiglobal.com" alt="DiDi" style="height: 35px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                </a>
                <a href="https://www.uber.com/co/es/" target="_blank" rel="noopener noreferrer">
                    <img src="https://logo.clearbit.com/uber.com" alt="Uber" style="height: 35px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                </a>
                <a href="https://yango.com/es_co/" target="_blank" rel="noopener noreferrer">
                    <img src="https://logo.clearbit.com/yango.com" alt="Yango" style="height: 35px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                </a>
                <a href="https://indrive.com/es-co" target="_blank" rel="noopener noreferrer">
                    <img src="https://logo.clearbit.com/indrive.com" alt="InDriver" style="height: 35px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                </a>
            </div>
        </div>
    `;
}

// ======== DATOS DE LUGARES ========
const lugares = {
    malecon:  { nombre: "Gran Malecón del Río", lat: 10.9986, lng: -74.7813 },
    aleta:    { nombre: "Ventana de Campeones", lat: 10.9875, lng: -74.8010 },
    mundo:    { nombre: "Ventana al Mundo",     lat: 11.0194, lng: -74.8493 },
    zoo:      { nombre: "Zoológico de Barranquilla", lat: 10.9982, lng: -74.8074 },
    ptoCol:   { nombre: "Puerto Colombia",      lat: 10.9872, lng: -74.9546 },
    tubara:   { nombre: "Tubará",               lat: 10.8740, lng: -75.0006 },
    Usiacuri: { nombre: "Usiacurí",              lat: 10.7426, lng: -74.9766 }
};

// ======== CONFIGURACIÓN POR TIPO DE TRANSPORTE ========
const configTransporte = {
    moto: {
        nombre: "Moto",
        velocidad: 45, 
        tipoTarifa: "por_km", 
        tarifaBase: 3000, 
        tarifas: [
            { min: 0,    max: 4,    valor: 2500, descripcion: "$2.500 COP/km" },      
            { min: 4.01, max: 10,   valor: 1800, descripcion: "$1.800 COP/km" },      
            { min: 10.01, max: 999, valor: 1200, descripcion: "$1.200 COP/km" }       
        ]
    },
    taxi: {
        nombre: "Taxi / Carro particular",
        velocidad: 35, 
        tipoTarifa: "por_km",
        tarifaBase: 5500, 
        tarifas: [
            { min: 0,    max: 4,    valor: 4000, descripcion: "$4.000 COP/km" },      
            { min: 4.01, max: 10,   valor: 2500, descripcion: "$2.500 COP/km" },      
            { min: 10.01, max: 999, valor: 1800, descripcion: "$1.800 COP/km" }       
        ]
    },
    busUrbano: {
        nombre: "Bus urbano",
        velocidad: 20, 
        tipoTarifa: "fija", 
        tarifaBase: 0,
        tarifas: [
            { min: 0,    max: 4,    valor: 2800, descripcion: "$2.800 COP (fijo)" },  
            { min: 4.01, max: 10,   valor: 2800, descripcion: "$2.800 COP (fijo)" },  
            { min: 10.01, max: 999, valor: 3500, descripcion: "$3.500 COP (fijo)" }   
        ]
    },
    busIntermunicipal: {
        nombre: "Bus intermunicipal",
        velocidad: 55, 
        tipoTarifa: "por_km",
        tarifaBase: 5000, 
        tarifas: [
            { min: 0,    max: 4,    valor: 3500, descripcion: "$3.500 COP/km" },      
            { min: 4.01, max: 10,   valor: 2200, descripcion: "$2.200 COP/km" },      
            { min: 10.01, max: 999, valor: 1500, descripcion: "$1.500 COP/km" }       
        ]
    }
};

// ======== FUNCIONES AUXILIARES ========
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function obtenerTarifa(distanciaKm, tipoTransporte) {
    const config = configTransporte[tipoTransporte];
    if (!config) {
        return { valor: 4000, rango: "Desconocido", descripcion: "Tarifa estándar" };
    }

    for (const rango of config.tarifas) {
        if (distanciaKm >= rango.min && distanciaKm <= rango.max) {
            return {
                valor: rango.valor,
                rango: rango.min + " - " + (rango.max === 999 ? "∞" : rango.max) + " km",
                descripcion: rango.descripcion,
                tipo: config.tipoTarifa
            };
        }
    }

    const ultimo = config.tarifas[config.tarifas.length - 1];
    return {
        valor: ultimo.valor,
        rango: ultimo.min + " - " + (ultimo.max === 999 ? "∞" : ultimo.max) + " km",
        descripcion: ultimo.descripcion,
        tipo: config.tipoTarifa
    };
}

function calcularTiempo(distanciaKm, tipoTransporte) {
    const velocidad = configTransporte[tipoTransporte]?.velocidad || 35;
    const tiempoHoras = distanciaKm / velocidad;
    const tiempoMinutos = Math.round(tiempoHoras * 60);
    
    if (tiempoMinutos < 60) {
        return tiempoMinutos + " min aprox.";
    } else {
        const horas = Math.floor(tiempoMinutos / 60);
        const minutos = tiempoMinutos % 60;
        if (minutos === 0) {
            return horas + " h aprox.";
        }
        return horas + " h " + minutos + " min aprox.";
    }
}

function calcularCosto(distanciaKm, tipoTransporte) {
    const config = configTransporte[tipoTransporte];
    const tarifa = obtenerTarifa(distanciaKm, tipoTransporte);

    let costoTotal;
    let detalleCosto;

    if (config.tipoTarifa === "fija") {
        costoTotal = tarifa.valor;
        detalleCosto = "Tarifa fija: " + tarifa.descripcion;
    } else {
        const costoVariable = distanciaKm * tarifa.valor;
        costoTotal = config.tarifaBase + costoVariable;
        detalleCosto = "Banderazo: $" + config.tarifaBase.toLocaleString("es-CO") + 
                      " + " + tarifa.descripcion;
    }

    return {
        total: "$" + Math.round(costoTotal).toLocaleString("es-CO") + " COP aprox.",
        detalle: detalleCosto + " (rango: " + tarifa.rango + ")"
    };
}

function calcular() {
    const origenVal = document.getElementById("origen").value;
    const destinoVal = document.getElementById("destino").value;
    const tipoTransporteVal = document.getElementById("tipoTransporte").value;

    if (!origenVal || origenVal === "blank" || !destinoVal || destinoVal === "blank") {
        alert("Por favor selecciona un origen y un destino.");
        return;
    }

    if (!tipoTransporteVal || tipoTransporteVal === "blank") {
        alert("Por favor selecciona un tipo de transporte.");
        return;
    }

    if (origenVal === destinoVal) {
        alert("El origen y el destino deben ser diferentes.");
        return;
    }

    const o = lugares[origenVal];
    const d = lugares[destinoVal];
    const config = configTransporte[tipoTransporteVal];

    const distancia = calcularDistancia(o.lat, o.lng, d.lat, d.lng);
    const tiempo = calcularTiempo(distancia, tipoTransporteVal);
    const costoInfo = calcularCosto(distancia, tipoTransporteVal);

    document.getElementById("transporteTxt").textContent = config.nombre;
    document.getElementById("origenTxt").textContent = o.nombre;
    document.getElementById("destinoTxt").textContent = d.nombre;
    document.getElementById("distanciaTxt").textContent = distancia.toFixed(2) + " km aprox.";
    document.getElementById("tiempoTxt").textContent = tiempo;
    document.getElementById("costoTxt").textContent = costoInfo.total;
    
    const notaTarifa = document.querySelector(".nota-tarifa");
    if (notaTarifa) {
        notaTarifa.textContent = "* " + costoInfo.detalle;
    }

    document.getElementById("resultado").style.display = "block";
}

function restablecer() {
    document.getElementById("origen").selectedIndex = 0;
    document.getElementById("destino").selectedIndex = 0;
    document.getElementById("tipoTransporte").selectedIndex = 0;

    document.getElementById("transporteTxt").textContent = "-";
    document.getElementById("origenTxt").textContent = "-";
    document.getElementById("destinoTxt").textContent = "-";
    document.getElementById("distanciaTxt").textContent = "-";
    document.getElementById("tiempoTxt").textContent = "-";
    document.getElementById("costoTxt").textContent = "-";

    const notaTarifa = document.querySelector(".nota-tarifa");
    if (notaTarifa) {
        notaTarifa.textContent = "* Tarifa aplicada según distancia y tipo de transporte";
    }

    document.getElementById("resultado").style.display = "none";
}

export function initTransporte() {
    const btnCalcular = document.getElementById("btn-calcular");
    const btnRestablecer = document.getElementById("btn-restablecer");

    if (btnCalcular) {
        btnCalcular.addEventListener("click", calcular);
    }
    if (btnRestablecer) {
        btnRestablecer.addEventListener("click", restablecer);
    }

    const tarjetas = document.querySelectorAll(".transp-card");
    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener("click", function() {
            const tipo = this.getAttribute("data-tipo");
            const select = document.getElementById("tipoTransporte");
            if (select && tipo) {
                select.value = tipo;
                tarjetas.forEach(t => t.style.borderColor = "#2E86DE");
                this.style.borderColor = "#eab308";
            }
        });
    });
}