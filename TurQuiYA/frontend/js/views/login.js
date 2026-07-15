// FUNCIÓN LOCAL DE COMUNICACIÓN CON EL BACKEND (Elimina la necesidad de importar desde api.js)
async function enviarLoginLocal(email, password) {
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const datos = await response.json();

    if (!response.ok) {
        throw new Error(datos.mensaje || 'Error en el inicio de sesión');
    }

    return datos;
}

export function login() {
    // Esperamos un instante a que el HTML se dibuje en la pantalla para activar el formulario
    setTimeout(() => {
        const form = document.getElementById('loginForm');
        const errorTxt = document.getElementById('loginError');

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault(); // Detiene por completo la recarga de la página
                
                if (errorTxt) errorTxt.innerText = ""; 
                
                const emailInput = document.getElementById('loginEmail');
                const passwordInput = document.getElementById('loginPassword');

                if (!emailInput || !passwordInput) return;

                const email = emailInput.value.trim();
                const password = passwordInput.value.trim();

                            try {
                    const respuesta = await enviarLoginLocal(email, password);
                    
                    // 1. Guardamos la sesión en el navegador
                    localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
                    
                    alert(respuesta.mensaje); // "Inicio de sesión exitoso"
                    
                    // 2. REDIRECCIÓN CORRECTA: Llamamos a la función global que renderiza el menú que me mostraste
                    if (typeof navigate === 'function') {
                        navigate('home'); // Cambia este parámetro si tu menú principal se activa con otro nombre (ej. 'inicio' o 'dashboard')
                    } else {
                        // Alternativa si manejas rutas por el hash de la URL
                        window.location.hash = '#home'; 
                    }
                    
                } catch (error) {
                    if (errorTxt) errorTxt.innerText = error.message;
                }


            });
        }
    }, 50);

    // Tu diseño e interfaz original intacta
    return `
    <div class="login-container">
        <div class="login-left">
            <h1>TurquiYA</h1>
            <p>Explora el Atlántico según tu presupuesto, tus gustos y tu tiempo.</p>
            <img src="https://unsplash.com">
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
