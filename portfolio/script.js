//boton para volver arriba
const btnTop = document.createElement("button");
btnTop.textContent = "↑";
btnTop.id = "btnTop";
btnTop.title = "Volver arriba";
document.body.appendChild(btnTop);

window.addEventListener("scroll", () => {
  btnTop.style.display = window.scrollY > 200 ? "block" : "none";
});

btnTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
//Formulario
const formReferencia = document.getElementById("form-referencia");
const listaReferencias = document.getElementById("lista-referencias");

if (formReferencia && listaReferencias) {
  formReferencia.addEventListener("submit", (e) => {
    e.preventDefault();

    // obtener valores del formulario
    const nombre = formReferencia.nombre.value.trim();
    const email = formReferencia.email.value.trim();
    const texto = formReferencia.texto.value.trim();

    // validación básica
    if (!nombre || !email || !texto) {
      alert("Por favor, completá todos los campos.");
      return;
    }
    const emailValido = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailValido.test(email)) {
      alert("Por favor, ingresá un correo electrónico válido.");
      return;
    } 
    // crear nueva referencia
    const nuevaReferencia = document.createElement("blockquote");
    nuevaReferencia.textContent = `“${texto}”`;

    const nuevoFooter = document.createElement("footer");
    nuevoFooter.innerHTML = `<cite>${nombre} — ${email}</cite>`;

    // agregar al final de la lista
    listaReferencias.appendChild(nuevaReferencia);
    listaReferencias.appendChild(nuevoFooter)
  });
}
// Formulario (mostrar/ocultar)
const formularioReferencia = document.querySelector("#form-referencia");

if (formularioReferencia) {
  formularioReferencia.style.display = "none";

  const btnMostrarForm = document.createElement("button");
  btnMostrarForm.id = "botonTest";
  btnMostrarForm.textContent = "Agregar una Referencia";

  formularioReferencia.parentNode.insertBefore(btnMostrarForm, formularioReferencia);

  btnMostrarForm.addEventListener("click", () => {
    const visible = formularioReferencia.style.display === "block";
    formularioReferencia.style.display = visible ? "none" : "block";
    btnMostrarForm.textContent = visible ? "Agregar una Referencia" : "Ocultar formulario";
  });
}
//footer que cambia segun el dia actual
const footer = document.querySelector("footer p");
if (footer) {
  const fecha = new Date();

  const opciones = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
  const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
  
  footer.innerHTML = `&copy; ${fechaFormateada} — Nicolas Cavassini`;
}
//resaltar seccion de navbar
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#Enlaces a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 60; // para compensar el nav sticky
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});


// seccion que aparecen
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((section) => {
  observer.observe(section);
});
//seccion para el clima con api key
const boton =document.getElementById("boton")
boton.addEventListener("click",async() =>{
  const ciudad= document.getElementById("ciudad").value.trim();
  const apiKey= "2ebdf9bd5f670e0a56e7afdde0eeff5c";
  if (!ciudad){
    alert("Ingrese una ciudad");
    return;
  }
  try{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;
    const response = await fetch(url);
    if (!response.ok) {
      resultado.innerHTML = "<p>No se encontró la ciudad.</p>";
      return;
    }

    const data = await response.json();
    const temp = data.main.temp;
    const descripcion = data.weather[0].description;
    const nombre = data.name;

    resultado.innerHTML = `
      <h2>${nombre}</h2>
      <p>Temperatura: ${temp}°C</p>
      <p>Condición: ${descripcion}</p>
    `;
  } 
  catch (error) {
    console.error(error);
    resultado.innerHTML = "<p>Ocurrió un error al obtener los datos.</p>";
}



});