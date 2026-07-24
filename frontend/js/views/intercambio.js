/**
 * Vista: Intercambio de Monedas
 * Conversor de divisas para turistas usando ExchangeRate-API
 */

const API_URL = 'https://api.exchangerate-api.com/v4/latest';
let ratesCache = null;
let cacheBase = null;
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000;

export async function intercambio() {
    
    // TRUCO SPA: Esperamos 50ms a que el router inyecte el HTML y luego activamos los botones
    setTimeout(() => {
        initIntercambio();
    }, 50);

    return `
        <div id="intercambio-view">
            <div class="converter-card">
                <h1> Conversor de Monedas</h1>
                <p class="subtitle">Calcula tu presupuesto de viaje</p>

                <div class="form-group">
                    <label for="amount">Monto</label>
                    <input type="number" id="amount" value="100" min="0" step="0.01" placeholder="0.00">
                </div>

                <div class="currency-row">
                    <div>
                        <label for="from">De</label>
                        <select id="from">
                            <option value="USD" selected>🇺🇸 USD - Dólar US</option>
                            <option value="EUR">🇪🇺 EUR - Euro</option>
                            <option value="GBP">🇬🇧 GBP - Libra</option>
                            <option value="COP">🇨🇴 COP - Peso Colombiano</option>
                            <option value="MXN">🇲🇽 MXN - Peso Mexicano</option>
                            <option value="BRL">🇧🇷 BRL - Real</option>
                            <option value="ARS">🇦🇷 ARS - Peso Argentino</option>
                            <option value="CLP">🇨🇱 CLP - Peso Chileno</option>
                            <option value="PEN">🇵🇪 PEN - Sol Peruano</option>
                            <option value="CAD">🇨🇦 CAD - Dólar Canadiense</option>
                            <option value="AUD">🇦🇺 AUD - Dólar Australiano</option>
                            <option value="JPY">🇯🇵 JPY - Yen Japonés</option>
                            <option value="CHF">🇨🇭 CHF - Franco Suizo</option>
                        </select>
                    </div>
                    
                    <button id="swap-btn" class="swap-btn" title="Intercambiar monedas">⇄</button>
                    
                    <div>
                        <label for="to">A</label>
                        <select id="to">
                            <option value="USD">🇺🇸 USD - Dólar US</option>
                            <option value="EUR">🇪🇺 EUR - Euro</option>
                            <option value="GBP">🇬🇧 GBP - Libra</option>
                            <option value="COP" selected>🇨🇴 COP - Peso Colombiano</option>
                            <option value="MXN">🇲🇽 MXN - Peso Mexicano</option>
                            <option value="BRL">🇧🇷 BRL - Real</option>
                            <option value="ARS">🇦🇷 ARS - Peso Argentino</option>
                            <option value="CLP">🇨🇱 CLP - Peso Chileno</option>
                            <option value="PEN">🇵🇪 PEN - Sol Peruano</option>
                            <option value="CAD">🇨🇦 CAD - Dólar Canadiense</option>
                            <option value="AUD">🇦🇺 AUD - Dólar Australiano</option>
                            <option value="JPY">🇯🇵 JPY - Yen Japonés</option>
                            <option value="CHF">🇨🇭 CHF - Franco Suizo</option>
                        </select>
                    </div>
                </div>

                <button id="convert-btn" class="convert-btn">
                    🔄 Convertir
                </button>

                <div class="loading" id="loading">
                    <div class="spinner"></div>
                    <p style="margin-top: 12px; color: #666; font-size: 14px;">Consultando tasas...</p>
                </div>

                <div class="result-box" id="result">
                    <div style="font-size: 14px; color: #666; margin-bottom: 4px;">Resultado</div>
                    <div class="result-amount" id="resultAmount"></div>
                    <div class="result-rate" id="resultRate"></div>
                    <div class="result-date" id="resultDate"></div>
                </div>

                <div class="error-box" id="error"></div>

                <div class="footer">
                    Datos proporcionados por ExchangeRate-API • Actualizado diariamente
                </div>
            </div>
        </div>
    `;
}

function swapCurrencies() {
    const from = document.getElementById('from');
    const to = document.getElementById('to');
    const temp = from.value;
    from.value = to.value;
    to.value = temp;
    convert();
}

async function convert() {
    const amount = parseFloat(document.getElementById('amount').value);
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const btn = document.getElementById('convert-btn');
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');
    const error = document.getElementById('error');

    if (isNaN(amount) || amount < 0) {
        error.textContent = ' Ingresa un monto válido mayor a 0';
        error.style.display = 'block';
        result.classList.remove('show');
        return;
    }

    btn.disabled = true;
    loading.style.display = 'block';
    error.style.display = 'none';
    result.classList.remove('show');

    try {
        const now = Date.now();
        if (!ratesCache || cacheBase !== from || (now - lastFetch) > CACHE_DURATION) {
            const response = await fetch(`${API_URL}/${from}`);
            
            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status}`);
            }
            
            ratesCache = await response.json();
            cacheBase = from;
            lastFetch = now;
        }

        const rate = ratesCache.rates[to];
        
        if (!rate) {
            throw new Error(`La moneda ${to} no está disponible`);
        }

        const resultValue = amount * rate;

        const formatter = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: to,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        document.getElementById('resultAmount').textContent = formatter.format(resultValue);
        document.getElementById('resultRate').textContent = 
            `1 ${from} = ${rate.toFixed(4)} ${to}`;
        document.getElementById('resultDate').textContent = 
            `Tasa del ${ratesCache.date}`;

        result.classList.add('show');

    } catch (err) {
        error.textContent = ` ${err.message}. Verifica tu conexión e intenta de nuevo.`;
        error.style.display = 'block';
        console.error('Error:', err);
    } finally {
        btn.disabled = false;
        loading.style.display = 'none';
    }
}

function initIntercambio() {
    const btnConvertir = document.getElementById('convert-btn');
    const btnSwap = document.getElementById('swap-btn');
    const inputAmount = document.getElementById('amount');
    const selectFrom = document.getElementById('from');
    const selectTo = document.getElementById('to');

    if (btnConvertir) {
        btnConvertir.addEventListener('click', convert);
    }

    if (btnSwap) {
        btnSwap.addEventListener('click', swapCurrencies);
    }

    let debounceTimer;
    if (inputAmount) {
        inputAmount.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(convert, 500);
        });
    }

    if (selectFrom) {
        selectFrom.addEventListener('change', convert);
    }

    if (selectTo) {
        selectTo.addEventListener('change', convert);
    }

    convert();
}