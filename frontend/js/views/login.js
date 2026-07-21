// =====================================================
// login.js — Login con Supabase Auth (Mejorado)
// =====================================================

import { iniciarSesion, obtenerPerfilUsuario } from '../services/api.js';

export function login() {
    setTimeout(() => {
        const form = document.getElementById('loginForm');
        const errorTxt = document.getElementById('loginError');


        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                if (errorTxt) errorTxt.innerText = ""; 
                
                const emailInput = document.getElementById('loginEmail');
                const passwordInput = document.getElementById('loginPassword');

                if (!emailInput || !passwordInput) return;

                const email = emailInput.value.trim();
                const password = passwordInput.value.trim();

                try {
                    // 1. Iniciar sesión en Auth
                    const { user, session } = await iniciarSesion(email, password);
                    localStorage.setItem('supabase_session', JSON.stringify(session));
                    
                    // 2. Intentar buscar el perfil público
                    let perfil = null;
                    try {
                        perfil = await obtenerPerfilUsuario();
                    } catch (perfilErr) {
                        console.warn("No hay perfil extendido o tabla inaccesible, usando datos básicos.");
                    }
                    
                    // Evitamos guardar un texto "null". Si no hay perfil, guardamos los datos básicos de Auth.
                    const datosParaGuardar = perfil ? perfil : user;
                    localStorage.setItem('usuario', JSON.stringify(datosParaGuardar));
                    
                    navigate('home');
                    
                    if (typeof navigate === 'function') {
                        navigate('home');
                    } else {
                        window.location.hash = '#home';
                    }
                    
                } catch (error) {
                    // ESTO ES CLAVE: Mostrará en consola la razón real del bloqueo
                    console.error("🕵️‍♂️ Error real de conexión:", error); 
                    
                    if (error.message === "Failed to fetch") {
                        if (errorTxt) errorTxt.innerText = "Error de red. Verifica Supabase CORS o tu bloqueador de anuncios.";
                    } else {
                        if (errorTxt) errorTxt.innerText = error.message || "Correo o contraseña incorrectos.";
                    }
                }
            });
        const btnToggleLogin = document.getElementById('toggleLoginPassword');
        const inputLogin = document.getElementById('loginPassword');

        if (btnToggleLogin && inputLogin) {
            btnToggleLogin.addEventListener('click', () => {
                if (inputLogin.type === 'password') {
                    inputLogin.type = 'text';
                    btnToggleLogin.textContent = '👁️ Ocultar';
                } else {
                    inputLogin.type = 'password';
                    btnToggleLogin.textContent = '👁️ Revelar';
                }
            });
        }
        }
    }, 50);

return `
    <div class="login-container">
        <div class="login-left">
            <h1>TurquiYA</h1>
        </div>
        <div class="login-right">
            <h2>Iniciar sesión</h2>
            <p class="subtitulo">Ingresa tus datos para continuar</p>
            <form id="loginForm">
                <label>Correo electrónico</label>
                <input type="email" id="loginEmail" placeholder="Ingresa tu correo" required>
                <label>Contraseña</label>
                <div style="display: flex; gap: 10px; align-items: stretch; width: 100%;">
                    <input type="password" id="loginPassword" placeholder="Ingresa tu contraseña" style="flex: 1 1 auto !important; width: 100% !important; min-width: 0 !important; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 15px; box-sizing: border-box; outline-color: #3b82f6;" required>
                    <button type="button" id="toggleLoginPassword" style="flex: 0 0 auto !important; width: max-content !important; min-width: max-content !important; white-space: nowrap; background: #cbd5e1; color: #334155; border: none; padding: 0 15px; border-radius: 8px; font-size: 13px; font-weight: bold; cursor: pointer; transition: background 0.2s;">
                        👁️ Revelar
                    </button>                  
                </div>
                <p id="loginError" class="error" style="color: red; font-size: 14px; margin-top: 5px; margin-bottom: 10px; min-height: 18px;"></p>
                <button type="submit">Ingresar</button>
            </form>
            <div class="separador">
                <span>o</span>
            </div>
            <button type="button" class="google">Continuar con Google</button>
            <div class="registro-link">
                ¿Nuevo en TurquiYA?
                <a onclick="navigate('registro')">Crear cuenta</a>
            </div>
        </div>
    </div>
    `;
}