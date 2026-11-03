// =========================================================
// Natur-Schatzkarte – Karte
// Kartendaten: OpenFreeMap (kostenlos, ohne Schlüssel)
// =========================================================

const map = new maplibregl.Map({
  container: "map",
  style: "https://tiles.openfreemap.org/styles/liberty",
  center: [8.4, 49.2], // Südwestdeutschland
  zoom: 7.5,
  attributionControl: { compact: true },
});

// Zoom-Knöpfe
map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

// "Wo bin ich?"-Knopf – der Standort bleibt nur auf deinem Gerät
map.addControl(
  new maplibregl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: false,
  }),
  "top-right"
);

// ---------- Hilfsfunktion gegen eingeschleusten Code ----------
function sicher(text) {
  const div = document.createElement("div");
  div.textContent = text ?? "";
  return div.innerHTML;
}

// ---------- Infofenster ----------
function popupInhalt(ort) {
  const art = ARTEN[ort.art];
  const badge = art.essbar
    ? '<span class="badge badge-yes">Essbar</span>'
    : '<span class="badge badge-no">Nicht essbar</span>';

  const zugangWarnung = ort.zugang !== "oeffentlich" ? ' class="warnung"' : "";

  return `
    <div class="popup">
      ${badge}
      <h3>${sicher(ort.name)}</h3>
      <p>${sicher(art.name)} · ${sicher(ort.beschreibung)}</p>
      <ul>
        <li${zugangWarnung}><strong>Zugang:</strong> ${sicher(ZUGANG[ort.zugang])}</li>
        <li><strong>Sammeln:</strong> ${sicher(SAMMELN[ort.sammeln])}</li>
        <li><strong>Saison:</strong> ${sicher(SAISON[ort.saison])}</li>
      </ul>
    </div>
  `;
}

// ---------- Marker setzen ----------
const marker = [];

BEISPIEL_FUNDORTE.forEach((ort) => {
  const el = document.createElement("div");
  el.className = "marker";
  el.setAttribute("aria-label", ort.name);

  const pin = document.createElement("div");
  pin.className = `pin ${ort.zugang}`;
  pin.style.background = ARTEN[ort.art].farbe;
  el.appendChild(pin);

  const m = new maplibregl.Marker({ element: el, anchor: "bottom" })
    .setLngLat([ort.lng, ort.lat])
    .setPopup(
      new maplibregl.Popup({ offset: 44, maxWidth: "300px", anchor: "bottom", focusAfterOpen: false })
        .setHTML(popupInhalt(ort))
    )
    .addTo(map);

  // Karte so verschieben, dass das Infofenster ganz zu sehen ist
  el.addEventListener("click", () => {
    map.easeTo({ center: [ort.lng, ort.lat], offset: [0, 140], duration: 500 });
  });

  marker.push({ ort, m, el });
});

// ---------- Filter ----------
document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("aktiv"));
    chip.classList.add("aktiv");

    const filter = chip.dataset.filter;
    marker.forEach(({ ort, m, el }) => {
      const sichtbar = filter === "alle" || ort.art === filter;
      el.style.display = sichtbar ? "" : "none";
      if (!sichtbar && m.getPopup().isOpen()) m.togglePopup();
    });
  });
});
