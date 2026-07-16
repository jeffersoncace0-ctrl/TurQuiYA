export function descubre() {
    return `
    <div style="padding: 40px 20px; max-width: 1000px; margin: 0 auto; font-family: 'Montserrat', sans-serif;">
        <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #1e293b; font-size: 36px; font-weight: 900; margin-bottom: 10px;">🌟 Descubre el Atlántico</h1>
            <p style="color: #64748b; font-size: 16px; max-width: 600px; margin: 0 auto;">Explora las zonas más espectaculares de nuestro departamento. Desde la vibrante ciudad hasta la cultura viva y las hermosas playas.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 40px;">
            
            <!-- Barranquilla -->
            <div style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); display: flex; flex-wrap: wrap; align-items: center; border: 1px solid #e2e8f0;">
                <div style="flex: 1; min-width: 300px; height: 350px;">
                    <img src="./img/Barranquilla%20Malencon.jpeg" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div style="flex: 1; min-width: 300px; padding: 40px;">
                    <span style="background: #ef4444; color: white; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">La Capital</span>
                    <h2 style="color: #1e293b; font-size: 30px; font-weight: 800; margin: 15px 0;">Barranquilla</h2>
                    <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 25px;">La Puerta de Oro de Colombia. Vibra con el Gran Malecón del Río, la monumental Ventana del Mundo y la mejor gastronomía costeña. Una metrópolis moderna que no olvida sus raíces, su alegría y su Carnaval.</p>
                    <button onclick="navigate('destinos')" style="background: #1e293b; color: white; border: none; padding: 12px 25px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">Explorar sus destinos 👉</button>
                </div>
            </div>

            <!-- Puerto Colombia -->
            <div style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); display: flex; flex-wrap: wrap; align-items: center; border: 1px solid #e2e8f0; flex-direction: row-reverse;">
                <div style="flex: 1; min-width: 300px; height: 350px;">
                    <img src="./img/Puerto%20muelle%201888.jpeg" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div style="flex: 1; min-width: 300px; padding: 40px;">
                    <span style="background: #eab308; color: white; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">Historia y Playa</span>
                    <h2 style="color: #1e293b; font-size: 30px; font-weight: 800; margin: 15px 0;">Puerto Colombia</h2>
                    <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 25px;">Cuna de la migración en Colombia. Enamórate del histórico Muelle 1888, relájate en las hermosas playas de Pradomar o Miramar y contempla los mejores atardeceres del departamento desde el Castillo de Salgar.</p>
                    <button onclick="navigate('destinos')" style="background: #1e293b; color: white; border: none; padding: 12px 25px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">Explorar sus destinos 👉</button>
                </div>
            </div>

            <!-- Usiacurí -->
            <div style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); display: flex; flex-wrap: wrap; align-items: center; border: 1px solid #e2e8f0;">
                <div style="flex: 1; min-width: 300px; height: 350px;">
                    <img src="./img/Usiacurí%20macromural.jpg" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div style="flex: 1; min-width: 300px; padding: 40px;">
                    <span style="background: #10b981; color: white; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">Pueblo Mágico</span>
                    <h2 style="color: #1e293b; font-size: 30px; font-weight: 800; margin: 15px 0;">Usiacurí</h2>
                    <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 25px;">El rincón más colorido y pacífico del departamento. Camina por el imponente Macromural, conoce las hermosas artesanías tejidas en palma de iraca y sumérgete en la naturaleza del Bosque de Luriza.</p>
                    <button onclick="navigate('destinos')" style="background: #1e293b; color: white; border: none; padding: 12px 25px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">Explorar sus destinos 👉</button>
                </div>
            </div>

        </div>
    </div>
    `;
}
