export function home() {
    return `
    <section class="home">


        <div class="info" style="text-align: center; max-width: 800px; margin: 40px auto; padding: 30px; background-color: #f8fafc; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">

            <h3 style="color: #1e293b; font-size: 28px; margin-bottom: 20px; font-weight: bold;">¿Qué es TurquiYA?</h3>

            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
                TurquiYA es una plataforma turística inteligente diseñada para ayudar
                a visitantes nacionales e internacionales a descubrir Barranquilla
                y los principales destinos del departamento del Atlántico.
            </p>

            <p style="color: #475569; font-size: 16px; line-height: 1.6;">
                La plataforma utiliza inteligencia artificial para recomendar
                rutas, actividades, transporte y lugares de interés según
                el presupuesto, el tiempo disponible y las preferencias del viajero.
            </p>

        </div>

        <div class="como-funciona" style="text-align: center; max-width: 900px; margin: 50px auto; padding: 20px;">

            <h3 style="color: #1e293b; font-size: 28px; margin-bottom: 30px; font-weight: bold;">¿Cómo usar la plataforma?</h3>

            <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                <div style="background: white; padding: 25px 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); flex: 1; min-width: 180px; border-top: 4px solid #ef4444;">
                    <h4 style="color: #ef4444; font-size: 24px; margin: 0 0 15px; font-weight: bold;">1</h4>
                    <p style="color: #475569; margin: 0; font-weight: 500;">Ingresa tu presupuesto</p>
                </div>
                <div style="background: white; padding: 25px 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); flex: 1; min-width: 180px; border-top: 4px solid #eab308;">
                    <h4 style="color: #eab308; font-size: 24px; margin: 0 0 15px; font-weight: bold;">2</h4>
                    <p style="color: #475569; margin: 0; font-weight: 500;">Selecciona tu ubicación</p>
                </div>
                <div style="background: white; padding: 25px 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); flex: 1; min-width: 180px; border-top: 4px solid #10b981;">
                    <h4 style="color: #10b981; font-size: 24px; margin: 0 0 15px; font-weight: bold;">3</h4>
                    <p style="color: #475569; margin: 0; font-weight: 500;">Elige tu experiencia</p>
                </div>
                <div style="background: white; padding: 25px 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); flex: 1; min-width: 180px; border-top: 4px solid #ef4444;">
                    <h4 style="color: #ef4444; font-size: 24px; margin: 0 0 15px; font-weight: bold;">4</h4>
                    <p style="color: #475569; margin: 0; font-weight: 500;">Obtén tu ruta ideal</p>
                </div>
            </div>

        </div>



        <div class="ejemplo" style="text-align: center; max-width: 800px; margin: 40px auto; padding: 20px;">

            <h3 style="color: #1e293b; font-size: 24px; margin-bottom: 20px; font-weight: bold;">Ejemplo de planificación</h3>

            <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 25px; flex-wrap: wrap;">
                <span style="background: #e2e8f0; padding: 8px 16px; border-radius: 20px; color: #475569; font-size: 14px;"><strong>Presupuesto:</strong> $150.000 COP</span>
                <span style="background: #e2e8f0; padding: 8px 16px; border-radius: 20px; color: #475569; font-size: 14px;"><strong>Ubicación:</strong> Terminal Metropolitana</span>
                <span style="background: #e2e8f0; padding: 8px 16px; border-radius: 20px; color: #475569; font-size: 14px;"><strong>Intereses:</strong> Playa y Cultura</span>
            </div>

            <div class="imagen-demo" style="border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
                <img src="./img/ejemplo%20de%20presupuesto.png" alt="Ejemplo de planificación" style="width: 100%; height: auto; display: block;">
            </div>

        </div>

    </section>
    `;
}
