export function home() {
    return `
    <section class="home">

        <div class="hero">
            <h2>Bienvenido a TurquiYA</h2>
            <p class="subtitulo">
                Explora el Atlántico según tu presupuesto, tus gustos y tu tiempo.
            </p>

            <button onclick="navigate('login')">
                Iniciar sesión
            </button>
        </div>

        <div class="info">

            <h3>¿Qué es TurquiYA?</h3>

            <p>
                TurquiYA es una plataforma turística inteligente diseñada para ayudar
                a visitantes nacionales e internacionales a descubrir Barranquilla
                y los principales destinos del departamento del Atlántico.
            </p>

            <p>
                La plataforma utiliza inteligencia artificial para recomendar
                rutas, actividades, transporte y lugares de interés según
                el presupuesto, el tiempo disponible y las preferencias del viajero.
            </p>

        </div>

        <div class="como-funciona">

            <h3>¿Cómo usar la plataforma?</h3>

            <ol>
                <li>Ingresa tu presupuesto.</li>
                <li>Selecciona tu ubicación.</li>
                <li>Elige el tipo de experiencia que deseas.</li>
                <li>Obtén una ruta turística personalizada.</li>
            </ol>

        </div>

        <div class="preguntas">

            <h3>Preguntas frecuentes</h3>

            <h4>¿Cuánto presupuesto tienes?</h4>

            <p>
                Con un presupuesto entre $50.000 y $100.000 COP podrás visitar
                lugares como el Gran Malecón, Playa Miramar y Ventana al Mundo.
            </p>

            <p>
                Si cuentas con un presupuesto de $150.000 COP o más,
                TurquiYA podrá recomendarte recorridos que incluyan
                Puerto Colombia, Castillo de Salgar y Playa Salgar,
                mostrando además el costo del transporte y el tiempo estimado.
            </p>

        </div>

        <div class="ejemplo">

            <h3>Ejemplo de planificación</h3>

            <p><strong>Presupuesto:</strong> $150.000 COP</p>
            <p><strong>Ubicación:</strong> Terminal Metropolitana</p>
            <p><strong>Intereses:</strong> Playa y Cultura</p>

            <div class="imagen-demo">
                <p>Aquí irá una imagen del mapa o una ruta turística.</p>
            </div>

        </div>

    </section>
    `;
}