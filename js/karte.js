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

// Ortsnamen auf Deutsch anzeigen (sonst Originalname)
map.on("style.load", () => {
  map.getStyle().layers.forEach((layer) => {
    const feld = layer.layout && layer.layout["text-field"];
    // Nur Beschriftungen mit Ortsnamen ändern, keine Hausnummern oder Straßennummern
    if (layer.type === "symbol" && feld && JSON.stringify(feld).includes("name")) {
      map.setLayoutProperty(layer.id, "text-field", [
        "coalesce",
        ["get", "name:de"],
        ["get", "name"],
      ]);
    }
  });
});

// Zoom-Knöpfe
map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

// ---------- Kurze Meldungen am unteren Rand ----------
function meldung(text) {
  let box = document.getElementById("meldung");
  if (!box) {
    box = document.createElement("div");
    box.id = "meldung";
    box.setAttribute("role", "status");
    document.body.appendChild(box);
  }
  box.textContent = text;
  box.classList.add("sichtbar");
  clearTimeout(box._timer);
  box._timer = setTimeout(() => box.classList.remove("sichtbar"), 7000);
}

// ---------- "Wo bin ich?"-Knopf ----------
// Der Standort bleibt nur auf deinem Gerät und wird nirgends gespeichert.
let standortMarker = null;

function zeigeStandort(pos) {
  const punkt = [pos.coords.longitude, pos.coords.latitude];

  if (!standortMarker) {
    const el = document.createElement("div");
    el.className = "standort-punkt";
    standortMarker = new maplibregl.Marker({ element: el }).setLngLat(punkt).addTo(map);
  } else {
    standortMarker.setLngLat(punkt);
  }

  map.flyTo({ center: punkt, zoom: 13 });
}

function standortFehler(fehler, knopf) {
  knopf.classList.remove("laedt");

  if (fehler.code === 1) {
    meldung("Standort nicht erlaubt. Prüfe in den iPad-Einstellungen unter Datenschutz → Ortungsdienste → Safari-Websites.");
  } else if (fehler.code === 3) {
    meldung("Der Standort konnte nicht schnell genug ermittelt werden. Bitte versuche es noch einmal.");
  } else {
    meldung("Dein Standort ist gerade nicht verfügbar. Sind die Ortungsdienste eingeschaltet?");
  }
}

function standortSuchen(knopf) {
  if (!("geolocation" in navigator)) {
    meldung("Dein Browser unterstützt keine Standortsuche.");
    return;
  }

  knopf.classList.add("laedt");

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      knopf.classList.remove("laedt");
      zeigeStandort(pos);
    },
    (fehler) => {
      // Zweiter Versuch ohne GPS (z. B. iPad nur mit WLAN)
      if (fehler.code === 3 || fehler.code === 2) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            knopf.classList.remove("laedt");
            zeigeStandort(pos);
          },
          (f2) => standortFehler(f2, knopf),
          { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 }
        );
      } else {
        standortFehler(fehler, knopf);
      }
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
  );
}

class StandortKnopf {
  onAdd() {
    this.box = document.createElement("div");
    this.box.className = "maplibregl-ctrl maplibregl-ctrl-group";

    const knopf = document.createElement("button");
    knopf.type = "button";
    knopf.className = "standort-knopf";
    knopf.title = "Wo bin ich?";
    knopf.setAttribute("aria-label", "Wo bin ich?");
    knopf.innerHTML =
      '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="4" fill="currentColor"/>' +
      '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<path d="M12 1v4M12 19v4M1 12h4M19 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
      "</svg>";
    knopf.addEventListener("click", () => standortSuchen(knopf));

    this.box.appendChild(knopf);
    return this.box;
  }

  onRemove() {
    this.box.remove();
  }
}

map.addControl(new StandortKnopf(), "top-right");

// ---------- Hilfsfunktion gegen eingeschleusten Code ----------
function sicher(text) {
  const div = document.createElement("div");
  div.textContent = text ?? "";
  return div.innerHTML;
}

// ---------- Infofenster ----------
function popupInhalt(ort) {
  const art = ARTEN[ort.art];
  const badge = art.badges
    .map((b) => `<span class="badge ${b.klasse}">${sicher(b.text)}</span>`)
    .join(" ");

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
