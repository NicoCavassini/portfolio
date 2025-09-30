// ============================
// FUNCIONALIDADES DEL PORTFOLIO
// ============================

// 1. Resaltar el link activo en el navbar
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

// 2. Botón para volver arriba
const btnTop = document.createElement("button");
btnTop.innerText = "↑";
btnTop.id = "btnTop";
document.body.appendChild(btnTop);

btnTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btnTop.style.display = "block";
  } else {
    btnTop.style.display = "none";
  }
});

// 3. Animaciones al hacer scroll (secciones que aparecen)
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
