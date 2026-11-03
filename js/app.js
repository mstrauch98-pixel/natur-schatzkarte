// Natur-Schatzkarte – kleine Helfer für die Startseite

// Jahr in der Fußzeile
document.getElementById("jahr").textContent = new Date().getFullYear();

// Mobiles Menü öffnen und schließen
const menuButton = document.querySelector(".menu-toggle");
const nav = document.getElementById("hauptmenue");

menuButton.addEventListener("click", () => {
  const offen = nav.classList.toggle("offen");
  menuButton.setAttribute("aria-expanded", offen);
});

// Menü schließen, sobald ein Link angetippt wurde
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("offen");
    menuButton.setAttribute("aria-expanded", "false");
  });
});
