// =====================================================
// registro.js — Registro con Supabase Auth
// =====================================================

import { registrarUsuario } from '../services/api.js';

export function registro() {
    setTimeout(() => {
        const form = document.getElementById("registroForm");

        if (form) {
            form.addEventListener("submit", async (e) => {
                e.preventDefault();

                const nombre = document.getElementById("nombre").value.trim();
                const apellido = document.getElementById("apellido").value.trim();
                const correo = document.getElementById("correo").value.trim();
                const pais = document.getElementById("pais").value;
                const moneda = document.getElementById("moneda").value;
                const password = document.getElementById("password").value.trim();
                const confirmar = document.getElementById("confirmar").value.trim();
                const terminos = document.getElementById("terminos").checked;

                const error = document.getElementById("mensajeError");
                const success = document.getElementById("mensajeSuccess");

                error.textContent = "";
                success.textContent = "";

                if (!nombre || !apellido || !correo || !pais || !moneda || !password || !confirmar) {
                    error.textContent = "Todos los campos son obligatorios.";
                    return;
                }

                const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!correoValido.test(correo)) {
                    error.textContent = "Ingresa un correo electrónico válido.";
                    return;
                }

                const seguridadPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*!]).{6,}$/;
                if (!seguridadPassword.test(password)) {
                    error.textContent = "La contraseña debe tener mínimo 6 caracteres, una mayúscula, una minúscula, un número y un símbolo especial.";
                    return;
                }

                if (password !== confirmar) {
                    error.textContent = "Las contraseñas no coinciden.";
                    return;
                }

                if (!terminos) {
                    error.textContent = "Debes aceptar los términos y condiciones.";
                    return;
                }

                try {
                    const paisLimpio = pais.split(' ')[0];
                    const monedaLimpia = moneda.split(' ')[0];

                    await registrarUsuario(correo, password, {
                        nombre: nombre,
                        apellido: apellido,
                        pais: paisLimpio,
                        moneda_preferida: monedaLimpia
                    });

                    success.textContent = "Cuenta creada correctamente 🎉 Redirigiendo al login...";
                    form.reset();

                    setTimeout(() => {
                        if (typeof navigate === 'function') {
                            navigate('login');
                        } else {
                            window.location.hash = '#login';
                        }
                    }, 2000);

                } catch (err) {
                    error.textContent = err.message || "Error al crear la cuenta. Intenta de nuevo.";
                }
            });
        }
    }, 0);

    return `
    <div class="registro-container">
        <div class="registro-info">
            <div class="logo"><h1>TurquiYA</h1></div>
            <h2>Descubre el<br><span>Atlántico</span><br>a tu ritmo y presupuesto</h2>
            <p>Playas, gastronomía y cultura del Caribe colombiano.</p>
            <div class="feature">
                <h3>Planificador por presupuesto</h3>
                <p>Organiza tu viaje según tu dinero disponible.</p>
            </div>
            <div class="feature">
                <h3>Rutas personalizadas</h3>
                <p>Encuentra destinos según tus gustos.</p>
            </div>
            <div class="feature">
                <h3>Inteligencia artificial</h3>
                <p>Recomendaciones adaptadas a ti.</p>
            </div>
        </div>
        <div class="registro-form">
            <h2>Crear cuenta</h2>
            <p class="subtitulo">Regístrate y comienza tu aventura.</p>
            <form id="registroForm">
                <div class="fila">
                    <input id="nombre" type="text" placeholder="Nombre" required>
                    <input id="apellido" type="text" placeholder="Apellido" required>
                </div>
                <input id="correo" type="email" placeholder="Correo electrónico" required>
                <select id="pais">
                    <option value="">Selecciona tu país</option>
                    <option>Colombia 🇨🇴</option>
                    <option>Argentina 🇦🇷</option>
                    <option>México 🇲🇽</option>
                    <option>España 🇪🇸</option>
                    <option>Estados Unidos 🇺🇸</option>
                </select>
                <select id="moneda">
                    <option>Selecciona tu moneda</option>
                    <option>COP - Peso colombiano</option>
                    <option>USD - Dólar estadounidense</option>
                    <option>EUR - Euro</option>
                    <option>GBP - Libra esterlina</option>
                </select>
                <input id="password" type="password" placeholder="Contraseña segura" required>
                <div class="reglas">
                    <p>La contraseña debe contener:</p>
                    <ul>
                        <li>Una letra mayúscula</li>
                        <li>Una letra minúscula</li>
                        <li>Un número</li>
                        <li>Un símbolo especial (@#$%&*!)</li>
                        <li>Mínimo 6 caracteres</li>
                    </ul>
                </div>
                <input id="confirmar" type="password" placeholder="Confirmar contraseña" required>
                <div class="acciones">
                    <label class="check">
                        <input id="terminos" type="checkbox">
                        <span>Acepto términos y condiciones</span>
                    </label>
                    <button type="submit">Crear mi cuenta</button>
                </div>
            </form>
            <p id="mensajeError" class="error"></p>
            <p id="mensajeSuccess" class="success"></p>
            <div class="separador"><span>O</span></div>
            <button class="google">Registrarse con Google</button>
        </div>
    </div>
    `;
}