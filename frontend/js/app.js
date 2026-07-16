import { router } from './router.js';

// Función mágica que controla visualmente el menú según el login
function controlarMenuDinamico() {
    const usuarioLogueado = localStorage.getItem('usuario');
    const botonLogin = document.getElementById('btn-login');
    const botonesPrivados = document.querySelectorAll('#navbar .privado');

    if (usuarioLogueado) {
        // SI SE LOGUEÓ: Esconde "Iniciar sesión" y muestra los 6 apartados nuevos
        if (botonLogin) botonLogin.style.display = 'none';
        botonesPrivados.forEach(btn => btn.style.display = 'inline-block');
    } else {
        // NO SE HA LOGUEADO: Muestra "Iniciar sesión" y esconde todo lo demás de forma estricta
        if (botonLogin) botonLogin.style.display = 'inline-block';
        botonesPrivados.forEach(btn => btn.style.display = 'none');
    }
}

window.navigate = async (page, data = null) => {
    try {
        await router(page, data);
        controlarMenuDinamico(); // Revisa el estado de la sesión en cada navegación
        localStorage.setItem('ultimaPagina', page); // Guarda la página actual para no perderla
    } catch(error){
        console.error("Error navegando:", error);
    }
};

// Función para cuando el usuario quiera salir del sistema
window.cerrarSesion = () => {
    localStorage.removeItem('usuario'); // Borra las credenciales de la memoria
    localStorage.removeItem('ultimaPagina'); // Borra el historial de la última página
    window.navigate('login'); // Redirige al inicio de sesión limpio
};

document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogueado = localStorage.getItem('usuario');
    const ultimaPagina = localStorage.getItem('ultimaPagina');
    
    if (usuarioLogueado && ultimaPagina && ultimaPagina !== 'login') {
        window.navigate(ultimaPagina); // Retoma donde estaba
    } else {
        window.navigate('login'); // Carga inicial si no hay sesión
    }
});
