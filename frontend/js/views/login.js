// =====================================================
// login.js — Login con Supabase Auth
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
                    const { user, session } = await iniciarSesion(email, password);
                    
                    localStorage.setItem('supabase_session', JSON.stringify(session));
                    
                    const perfil = await obtenerPerfilUsuario();
                    localStorage.setItem('usuario', JSON.stringify(perfil));
                    
                    alert("Inicio de sesión exitoso");
                    
                    if (typeof navigate === 'function') {
                        navigate('home');
                    } else {
                        window.location.hash = '#home';
                    }
                    
                } catch (error) {
                    if (errorTxt) errorTxt.innerText = error.message || "Correo o contraseña incorrectos.";
                }
            });
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
                <input type="email" id="loginEmail" placeholder="correo@gmail.com" required>
                <label>Contraseña</label>
                <input type="password" id="loginPassword" placeholder="********" required>
                <p class="password-info">Tu contraseña debe cumplir los requisitos de seguridad.</p>
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