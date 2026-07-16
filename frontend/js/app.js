import { router } from './router.js';

// Función mágica que controla visualmente el menú según el login
function controlarMenuDinamico() {
    const usuarioLogueado = localStorage.getItem('usuario');
    const botonLogin = document.getElementById('btn-login');
    const botonesPrivados = document.querySelectorAll('#navbar .privado');

    if (usuarioLogueado) {
        // SI SE LOGUEÓ: Esconde "Iniciar sesión" y muestra los apartados nuevos
        if (botonLogin) botonLogin.style.display = 'none';
        botonesPrivados.forEach(btn => btn.style.display = 'inline-block');
    } else {
        // NO SE HA LOGUEADO: Muestra "Iniciar sesión" y esconde todo lo demás
        if (botonLogin) botonLogin.style.display = 'inline-block';
        botonesPrivados.forEach(btn => btn.style.display = 'none');
    }
}

window.navigate = async (page, data = null) => {
    const usuarioLogueado = localStorage.getItem('usuario');
    
    // 1. DEFINIMOS QUÉ RUTAS SON PÚBLICAS
    const rutasPublicas = ['home', 'login', 'registro'];

    // 2. EL GUARDIÁN: Si no está logueado e intenta ir a una ruta privada, lo bloqueamos
    if (!usuarioLogueado && !rutasPublicas.includes(page)) {
        console.warn("Intento de acceso a zona privada. Redirigiendo...");
        page = 'login'; // Lo obligamos a ir a login
    }

    try {
        await router(page, data);
        controlarMenuDinamico(); // Actualiza los botones en cada clic
        
        // Solo guardamos el historial si NO es el login o registro
        if (page !== 'login' && page !== 'registro') {
            localStorage.setItem('ultimaPagina', page);
        }
    } catch(error) {
        console.error("Error navegando:", error);
    }
};

// Función para cuando el usuario quiera salir del sistema
window.cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('ultimaPagina');
    window.navigate('home'); // Al salir, lo mandamos al inicio, no al login directamente
};

document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogueado = localStorage.getItem('usuario');
    const ultimaPagina = localStorage.getItem('ultimaPagina');
    
    if (usuarioLogueado) {
        // Si ya está logueado, lo mandamos a donde estaba o a destinos por defecto
        window.navigate(ultimaPagina ? ultimaPagina : 'destinos');
    } else {
        // SI NO ESTÁ LOGUEADO: ¡Cargamos el Landing Page (home)!
        window.navigate('home'); 
    }
});