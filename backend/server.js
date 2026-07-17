const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();

app.use(cors());
app.use(express.json());

// BASE DE DATOS TEMPORAL EN MEMORIA
const usuariosLocal = [
    {
        identificador: 'admin@turquiya.com',
        nombre: 'Administrador TurquiYA',
        contraseña: 'admin123',
        pais: 'Colombia',
        moneda: 'COP - Peso colombiano'
    }
];

// LISTADO COMPLETO DE DESTINOS SOLICITADOS
const destinosLocal = [
    // BARRANQUILLA
    { id_destino: 1, nombre: "Gran Malecón del Río", municipio: "Barranquilla", categoria: "Recreación", descripcion: "Extenso corredor turístico a la orilla del Río Magdalena con zonas gastronómicas, comerciales y deportivas.", eficiencia: "Excelente (9.5/10)", foto: "./img/Barranquilla%20Malencon.jpeg" },
    { id_destino: 2, nombre: "Ventana del Mundo", municipio: "Barranquilla", categoria: "Monumento", descripcion: "Imponente monumento de 45 metros de altura construido en vidrio, ícono del desarrollo de la ciudad.", eficiencia: "Muy Buena (9.0/10)", foto: "./img/Barranquilla%20ventana%20del%20mudo.jpg" },
    { id_destino: 5, nombre: "Mirador de los Nogales", municipio: "Barranquilla", categoria: "Naturaleza", descripcion: "Espacio urbano elevado ideal para observar los mejores atardeceres y vistas panorámicas de la ciudad.", eficiencia: "Aceptable (8.2/10)", foto: "./img/Barranquilla%20mirador%20de%20los%20nogales.jfif" },
    { id_destino: 6, nombre: "Mirador de Miramar", municipio: "Barranquilla", categoria: "Naturaleza", descripcion: "Parque naturalizado urbano preferido por locales para realizar caminatas y contemplar el norte de Barranquilla.", eficiencia: "Muy Buena (8.5/10)", foto: "./img/Barranquilla%20miramar.jpeg" },
    { id_destino: 7, nombre: "Zoológico de Barranquilla", municipio: "Barranquilla", categoria: "Recreación", descripcion: "Santuario de fauna y flora con fines educativos enfocado en la conservación de especies nativas de la región.", eficiencia: "Buena (8.6/10)", foto: "./img/Barranquilla%20zoo.jpg" },
    { id_destino: 8, nombre: "Estatua de Shakira", municipio: "Barranquilla", categoria: "Monumento", descripcion: "Monumento en bronce dedicado a la superestrella mundial de la música nacida en Barranquilla.", eficiencia: "Excelente (9.4/10)", foto: "./img/Barranquilla%20shakira.jpg" },
    { id_destino: 9, nombre: "La Aleta del Tiburón", municipio: "Barranquilla", categoria: "Monumento", descripcion: "Monumento moderno construido en honor al equipo de fútbol de la ciudad, el Junior de Barranquilla.", eficiencia: "Muy Buena (8.9/10)", foto: "./img/Barranquilla%20aleta.avif" },
    { id_destino: 22, nombre: "Miura Steakhouse", municipio: "Barranquilla", categoria: "Gastronomía", descripcion: "Exclusivo restaurante especializado en cortes de carne premium y coctelería de autor.", eficiencia: "Excelente (9.6/10)", foto: "./img/Rsquilla%20miura.jpg" },
    { id_destino: 23, nombre: "Porthos Steakhouse", municipio: "Barranquilla", categoria: "Gastronomía", descripcion: "Reconocido por sus deliciosas hamburguesas y ambiente perfecto para ir con amigos y familia.", eficiencia: "Excelente (9.5/10)", foto: "./img/RsquillaPorthos.jpg" },
    { id_destino: 24, nombre: "Sabina Restaurante", municipio: "Barranquilla", categoria: "Gastronomía", descripcion: "Restaurante de comida mediterránea con un ambiente elegante, ideal para cenas románticas.", eficiencia: "Muy Buena (9.2/10)", foto: "./img/RsquillaSabina.jpg" },
    { id_destino: 25, nombre: "Restaurante Amor", municipio: "Barranquilla", categoria: "Gastronomía", descripcion: "Un lugar mágico lleno de detalles románticos, excelente gastronomía local y buena música.", eficiencia: "Excelente (9.4/10)", foto: "./img/Rsquilla%20amor.jpg" },
    { id_destino: 26, nombre: "Risto Bar", municipio: "Barranquilla", categoria: "Gastronomía", descripcion: "Lugar moderno para disfrutar de buenos tragos, excelente música y un ambiente inigualable.", eficiencia: "Muy Buena (9.0/10)", foto: "./img/BrRistoBar.jpg" },
    
    // PUERTO COLOMBIA
    { id_destino: 3, nombre: "Ventana de los Sueños", municipio: "Puerto Colombia", categoria: "Monumento", descripcion: "Faro y monumento interactivo que rinde homenaje a los inmigrantes que impulsaron el progreso del departamento.", eficiencia: "Excelente (9.2/10)", foto: "./img/Puerto%20ventana%20de%20los%20sueños.webp" },
    { id_destino: 4, nombre: "Muelle 1888", municipio: "Puerto Colombia", categoria: "Gastronomía", descripcion: "Complejo turístico y gastronómico que recrea la arquitectura caribeña e invita a degustar los sabores locales.", eficiencia: "Muy Buena (8.8/10)", foto: "./img/Puerto%20muelle%201888.jpeg" },
    { id_destino: 10, nombre: "Playa Pradomar", municipio: "Puerto Colombia", categoria: "Playa", descripcion: "Una de las playas más concurridas, famosa por sus olas ideales para el surf y su vibrante ambiente nocturno.", eficiencia: "Excelente (9.1/10)", foto: "./img/Puerto%20pradomar.jfif" },
    { id_destino: 11, nombre: "Castillo de Salgar", municipio: "Puerto Colombia", categoria: "Historia", descripcion: "Antiguo fuerte de la colonia española restaurado, perfecto para eventos culturales y vistas al mar abierto.", eficiencia: "Excelente (9.3/10)", foto: "./img/Puerto%20castillo.png" },
    { id_destino: 12, nombre: "Playa Sabanilla", municipio: "Puerto Colombia", categoria: "Playa", descripcion: "Extensa playa con modernas casetas y canchas deportivas, ideal para pasar el día entero en familia.", eficiencia: "Muy Buena (8.7/10)", foto: "./img/Puerto%20sabanilla.avif" },
    { id_destino: 13, nombre: "Playa Miramar", municipio: "Puerto Colombia", categoria: "Playa", descripcion: "Playa tranquila ubicada cerca al muelle histórico, ideal para caminatas al atardecer y gastronomía marina.", eficiencia: "Buena (8.4/10)", foto: "./img/Puerto%20miramar.webp" },
    { id_destino: 27, nombre: "Kilymandiaro", municipio: "Puerto Colombia", categoria: "Fiesta", descripcion: "Famoso club de playa en Pradomar con ambiente de fiesta, excelente música y vistas al mar.", eficiencia: "Excelente (9.3/10)", foto: "./img/Rspuerto%20kilymandiaro.jpg" },
    { id_destino: 28, nombre: "Restaurante Muelle", municipio: "Puerto Colombia", categoria: "Gastronomía", descripcion: "Ubicado frente al histórico muelle, ofrece los mejores pescados y mariscos del Caribe.", eficiencia: "Muy Buena (9.1/10)", foto: "./img/Rspuerto%20muelle.jpg" },
    { id_destino: 29, nombre: "Restaurante Playa", municipio: "Puerto Colombia", categoria: "Gastronomía", descripcion: "Restaurante a la orilla del mar, perfecto para disfrutar de un coctel mientras cae el sol.", eficiencia: "Buena (8.8/10)", foto: "./img/RsPuerto%20playa.jpg" },
    { id_destino: 30, nombre: "Bar Sofi", municipio: "Puerto Colombia", categoria: "Fiesta", descripcion: "Un rincón acogedor en Puerto para disfrutar de unas cervezas frías y buena compañía.", eficiencia: "Muy Buena (8.9/10)", foto: "./img/Brpuerto%20sofi.jpg" },
    { id_destino: 31, nombre: "Restaurante Nikky", municipio: "Puerto Colombia", categoria: "Gastronomía", descripcion: "Excelente oferta gastronómica con vistas impresionantes al mar de Puerto Colombia.", eficiencia: "Excelente (9.2/10)", foto: "./img/Rspuerto%20nikky.jpg" },
    { id_destino: 32, nombre: "Bar Mirador", municipio: "Puerto Colombia", categoria: "Fiesta", descripcion: "Bar con la mejor vista panorámica para relajarse al final de la tarde.", eficiencia: "Muy Buena (9.0/10)", foto: "./img/Barpuerto%20mirador.jpg" },
    
    // TUBARÁ
    { id_destino: 14, nombre: "Playa Velero", municipio: "Tubará", categoria: "Playa", descripcion: "Hermosa playa turística perfecta para disfrutar de las olas, la brisa marina y la tranquilidad de Tubará.", eficiencia: "Muy Buena (8.8/10)", foto: "./img/tubara%20velero.webp" },
    
    // USIACURÍ
    { id_destino: 15, nombre: "Macromural y Escalinatas", municipio: "Usiacurí", categoria: "Cultura", descripcion: "Un lienzo gigante a cielo abierto plasmado sobre los techos de las viviendas, visible desde las coloridas escalinatas.", eficiencia: "Excelente (9.5/10)", foto: "./img/Usiacurí%20macromural.jpg" },
    { id_destino: 16, nombre: "Casa Museo Julio Flórez", municipio: "Usiacurí", categoria: "Historia", descripcion: "Lugar de residencia del célebre poeta colombiano, donde se conservan sus obras jurídicas, manuscritos y restos.", eficiencia: "Muy Buena (9.2/10)", foto: "./img/Usiacurí%20museo.jpg" },
    { id_destino: 17, nombre: "Centro Artesanal Corina Urueta", municipio: "Usiacurí", categoria: "Cultura", descripcion: "Punto de encuentro donde artesanos locales exhiben y comercializan hermosas piezas tejidas en palma de iraca.", eficiencia: "Excelente (9.4/10)", foto: "./img/Usiacurí%20artesanal.jpg" },
    { id_destino: 18, nombre: "Iglesia Santo Domingo de Guzmán", municipio: "Usiacurí", categoria: "Religión", descripcion: "Parroquia histórica colonial ubicada en lo alto de una colina, destacada por su hermosa fachada blanca.", eficiencia: "Buena (8.8/10)", foto: "./img/Usiacurí%20iglesia.jpg" },
    { id_destino: 19, nombre: "Pozos Medicinales", municipio: "Usiacurí", categoria: "Naturaleza", descripcion: "Pozos de aguas mineromedicinales que le otorgaron al municipio renombre turístico de salud a inicios del siglo.", eficiencia: "Aceptable (8.0/10)", foto: "./img/Usiacurí%20pozos.jpeg" },
    { id_destino: 20, nombre: "Parque Mirador", municipio: "Usiacurí", categoria: "Naturaleza", descripcion: "Estructura moderna en la cima del cerro que regala una panorámica espectacular de 360 grados de todo el municipio.", eficiencia: "Excelente (9.3/10)", foto: "./img/Usiacurí%20parque.jpg" },
    { id_destino: 21, nombre: "Bosque de Luriza", municipio: "Usiacurí", categoria: "Naturaleza", descripcion: "Distrito de conservación natural perfecto para el senderismo, avistamiento de aves y exploración científica.", eficiencia: "Muy Buena (9.0/10)", foto: "./img/Usiacurí%20bosque.jpg" }
];

// RUTAS DE LOGIN Y REGISTRO LOCAL
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = usuariosLocal.find(u => u.identificador === email);
        if (!usuario || usuario.contraseña !== password) {
            return res.status(401).json({ mensaje: 'El correo electrónico o la contraseña son incorrectos.' });
        }
        res.status(200).json({ mensaje: 'Inicio de sesión exitoso', usuario: { nombre: usuario.nombre, email: usuario.identificador } });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno en el servidor.' });
    }
});

// CONSULTAR TODOS LOS DESTINOS REALES
app.get('/destinos', (req, res) => {
    res.status(200).json(destinosLocal);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor activo con destinos reales en http://localhost:${PORT}`);
});
