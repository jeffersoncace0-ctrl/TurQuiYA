export function registro() {

    setTimeout(() => {
        const form = document.getElementById("registroForm");
        const passwordInput = document.getElementById("password");
        const togglePasswordButton = document.getElementById("togglePassword");
        const error = document.getElementById("mensajeError");
        const success = document.getElementById("mensajeSuccess");

        togglePasswordButton.addEventListener("click", () => {
            const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
            passwordInput.setAttribute("type", type);
            togglePasswordButton.textContent = type === "password" ? "Ver" : "Ocultar";
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const apellido = document.getElementById("apellido").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const password = passwordInput.value.trim();

            error.textContent = "";
            success.textContent = "";

            if (!nombre || !apellido || !correo || !password) {
                error.textContent = "Todos los campos son obligatorios.";
                return;
            }

            const requisitosClave = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._#-])[A-Za-z\d@$!%*?&._#-]{8,}$/;

            if (!requisitosClave.test(password)) {
                error.textContent = "La contraseña debe tener mínimo 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&._#-).";
                return;
            }

            success.textContent = "Cuenta creada correctamente.";
            form.reset();
            togglePasswordButton.textContent = "👁️"; // Resetea el ojito
        });

    }, 0);

    return `
    <div class="registro-container">
        <div class="registro-info">
            <div class="logo">
                <h1> TurQuiYA</h1>
            </div>
            <h2>
                Descubre el
                <br>
                <span>Atlántico</span>
                <br>
                a tu ritmo y presupuesto
            </h2>
            <p>
                Playas, gastronomía y cultura del Caribe colombiano.
            </p>
            <div class="feature">
                <h3>Planificador por presupuesto</h3>
                <p>Calcula cuánto puedes gastar.</p>
            </div>
            <div class="feature">
                <h3> Rutas personalizadas</h3>
                <p>Encuentra lugares según tus intereses.</p>
            </div>
        </div>

        <div class="registro-form">
            <h2>Crea tu cuenta</h2>
            <p class="subtitulo">
                Regístrate para comenzar tu aventura.
            </p>
            <form id="registroForm">
                <div class="fila">
                    <input id="nombre" placeholder="Nombre">
                    <input id="apellido" placeholder="Apellido">
                </div>
                
                <input id="correo" type="email" placeholder="Correo electrónico">
                
                <div class="fila">
                    <input placeholder="País">
                    <input placeholder="Moneda">
                </div>
                
                <!-- Contenedor relativo para posicionar el ojo encima del input -->
                <div class="fila" style="position: relative; margin-bottom: 15px;">
                    <input id="password" type="password" placeholder="Contraseña" style="padding-right: 40px; width: 100%;">
                    <button type="button" id="togglePassword" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 18px; padding: 0;">
                        👁️
                    </button>
                </div>
                
                <label class="check">
                    <input type="checkbox">
                    Acepto los términos y condiciones
                </label>
                
                <button type="submit">
                    Crear mi cuenta
                </button>
            </form>
            <p id="mensajeError" class="error"></p>
            <p id="mensajeSuccess" class="success"></p>
        </div>
    </div>
    `;
}