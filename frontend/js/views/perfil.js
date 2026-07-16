export function perfil() {
    // 1. Intentamos recuperar los datos del usuario logueado
    let datosUsuario = {
        nombre: "Viajero TurquiYA",
        email: "admin@turquiya.com",
        pais: "Colombia 🇨🇴",
        bio: "¡Listo para explorar las playas y la cultura del Atlántico!"
    };

    try {
        const sesion = localStorage.getItem('usuario');
        if (sesion) {
            const usuarioObj = JSON.parse(sesion);
            if (usuarioObj.nombre) datosUsuario.nombre = usuarioObj.nombre;
            if (usuarioObj.email) datosUsuario.email = usuarioObj.email;
        }
    } catch (e) {
        console.error("Error leyendo sesión:", e);
    }

    // 2. Lógica interactiva para manejar los eventos del perfil
    setTimeout(() => {
        const form = document.getElementById('perfilForm');
        const fotoInput = document.getElementById('fotoInput');
        const previewFoto = document.getElementById('previewFoto');
        const btnTogglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('perfilPassword');

        // Cambiar dinámicamente la foto de perfil al seleccionar un archivo
        if (fotoInput && previewFoto) {
            fotoInput.addEventListener('change', (e) => {
                const archivo = e.target.files[0];
                if (archivo) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        previewFoto.src = event.target.result;
                    };
                    reader.readAsDataURL(archivo);
                }
            });
        }

        // Mostrar u ocultar el texto de la contraseña
        if (btnTogglePassword && passwordInput) {
            btnTogglePassword.addEventListener('click', () => {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    btnTogglePassword.textContent = '👁️ Ocultar';
                } else {
                    passwordInput.type = 'password';
                    btnTogglePassword.textContent = '👁️ Revelar';
                }
            });
        }

        // Guardar cambios localmente en la interfaz
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('¡Perfil actualizado con éxito localmente! 🎉');
            });
        }
    }, 50);

    // 3. Estructura HTML con diseño premium adaptado a tu barra azul
    return `
    <div style="padding: 40px 20px; max-width: 700px; margin: 0 auto; font-family: sans-serif;">
        <div style="background: white; border-radius: 16px; padding: 35px; box-shadow: 0 4px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; border-top: 5px solid #ef4444;">
            
            <h2 style="margin-top: 0; margin-bottom: 5px; font-size: 28px; font-weight: 800; background: linear-gradient(135deg, #ef4444, #eab308, #10b981); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">👤 Perfil del viajero</h2>
            <p style="color: #64748b; margin-bottom: 30px; font-size: 14px;">Gestiona tu información personal, personaliza tu biografía y mantén tu cuenta segura.</p>

            <form id="perfilForm">
                
                <!-- ZONA DE FOTO DE PERFIL / AVATAR INTERACTIVO -->
                <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 30px; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px dashed #cbd5e1;">
                    <div style="width: 110px; height: 110px; border-radius: 50%; overflow: hidden; border: 3px solid #eab308; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin-bottom: 12px; background: #e2e8f0;">
                        <img id="previewFoto" src="https://unsplash.com" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <label for="fotoInput" style="background: #10b981; color: white; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: bold; cursor: pointer; transition: background 0.2s; box-shadow: 0 2px 4px rgba(16,185,129,0.3);">
                        📸 Cambiar foto de perfil
                    </label>
                    <input type="file" id="fotoInput" accept="image/*" style="display: none;">
                </div>

                <!-- CAMPO NOMBRE -->
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #ef4444; font-size: 15px;">Nombre completo</label>
                    <input type="text" value="${datosUsuario.nombre}" style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 15px; box-sizing: border-box; outline-color: #ef4444;" required>
                </div>

                <!-- CAMPO CORREO -->
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #64748b; font-size: 15px;">Correo electrónico</label>
                    <input type="email" value="${datosUsuario.email}" style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 15px; background-color: #f1f5f9; color: #64748b; box-sizing: border-box;" readonly>
                    <small style="color: #94a3b8; font-size: 12px; margin-top: 4px; display: block;">El correo electrónico está vinculado a tu cuenta y no se puede modificar.</small>
                </div>

                <!-- CAMPO CONTRASEÑA INTERACTIVO -->
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #eab308; font-size: 15px;">Contraseña de seguridad</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="password" id="perfilPassword" placeholder="Escribe tu nueva contraseña si deseas cambiarla" style="flex-grow: 1; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 15px; box-sizing: border-box; outline-color: #eab308;">
                        <button type="button" id="togglePassword" style="background: #cbd5e1; color: #334155; border: none; padding: 0 15px; border-radius: 8px; font-size: 13px; font-weight: bold; cursor: pointer;">👁️ Revelar</button>
                    </div>
                </div>

                <!-- CAMPO PAÍS -->
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #10b981; font-size: 15px;">País de procedencia</label>
                    <input type="text" value="${datosUsuario.pais}" style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 15px; box-sizing: border-box; outline-color: #10b981;" required>
                </div>

                <!-- CAMPO BIOGRAFÍA -->
                <div style="margin-bottom: 25px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #ef4444; font-size: 15px;">Biografía / Sobre ti</label>
                    <textarea id="perfilBio" rows="4" style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 15px; font-family: sans-serif; box-sizing: border-box; resize: vertical; outline-color: #ef4444;" placeholder="Cuéntanos un poco sobre tus gustos al viajar...">${datosUsuario.bio}</textarea>
                </div>

                <!-- BOTÓN ACCIÓN -->
                <button type="submit" style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; border: none; padding: 14px 24px; border-radius: 8px; font-size: 15px; cursor: pointer; font-weight: bold; width: 100%; box-shadow: 0 4px 10px rgba(239, 68, 68, 0.25);">
                    💾 Guardar cambios del perfil
                </button>

            </form>
        </div>
    </div>
    `;
}
