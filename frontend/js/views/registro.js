export function registro() {

setTimeout(()=>{

const form=document.getElementById("registroForm");

form.addEventListener("submit",(e)=>{

e.preventDefault();

const nombre=document.getElementById("nombre").value.trim();
const apellido=document.getElementById("apellido").value.trim();
const correo=document.getElementById("correo").value.trim();
const password=document.getElementById("password").value.trim();

const error=document.getElementById("mensajeError");
const success=document.getElementById("mensajeSuccess");

error.textContent="";
success.textContent="";

if(!nombre||!apellido||!correo||!password){

error.textContent="Todos los campos son obligatorios.";

return;

}

if(password.length<6){

error.textContent="La contraseña debe tener mínimo 6 caracteres.";

return;

}

success.textContent="Cuenta creada correctamente.";

form.reset();

});

},0);

return`

<div class="registro-container">

<div class="registro-info">

<div class="logo">
<h1>🌴 TurquiYA</h1>
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

<h3>💰 Planificador por presupuesto</h3>

<p>Calcula cuánto puedes gastar.</p>

</div>

<div class="feature">

<h3>🗺️ Rutas personalizadas</h3>

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

<input
id="nombre"
placeholder="Nombre">

<input
id="apellido"
placeholder="Apellido">

</div>

<input
id="correo"
type="email"
placeholder="Correo electrónico">

<div class="fila">

<input
placeholder="País">

<input
placeholder="Moneda">

</div>

<input
id="password"
type="password"
placeholder="Contraseña">

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