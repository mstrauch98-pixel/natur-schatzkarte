// =========================================================
// Beispiel-Fundorte (nur zum Testen der Karte)
// In Phase 4 kommen die echten Einträge aus der Datenbank.
// =========================================================

const ARTEN = {
  esskastanie: { name: "Esskastanie", essbar: true, farbe: "#9B6042" },
  rosskastanie: { name: "Rosskastanie", essbar: false, farbe: "#A3412E" },
};

const ZUGANG = {
  oeffentlich: "Öffentlich zugänglich",
  eingeschraenkt: "Eingeschränkt zugänglich",
  privat: "Privatgrund – nicht betreten",
};

const SAMMELN = {
  erlaubt: "Sammeln kleiner Mengen erlaubt",
  erlaubnis: "Nur mit Erlaubnis",
  unklar: "Unklar – bitte vor Ort prüfen",
  nein: "Sammeln nicht erlaubt",
};

const SAISON = {
  fruechte: "Früchte vorhanden",
  bald: "Saison beginnt bald",
  vorbei: "Saison beendet",
};

const BEISPIEL_FUNDORTE = [
  {
    id: 1,
    name: "Esskastanien am Waldrand",
    art: "esskastanie",
    lat: 49.2925,
    lng: 8.1302,
    beschreibung: "Mehrere große Esskastanien entlang des Wanderwegs.",
    zugang: "oeffentlich",
    sammeln: "erlaubt",
    saison: "vorbei",
  },
  {
    id: 2,
    name: "Alte Kastanie am Weinberg",
    art: "esskastanie",
    lat: 49.4626,
    lng: 8.1592,
    beschreibung: "Einzelner, sehr alter Baum direkt am Feldweg.",
    zugang: "oeffentlich",
    sammeln: "unklar",
    saison: "vorbei",
  },
  {
    id: 3,
    name: "Kastanienhain am Hang",
    art: "esskastanie",
    lat: 49.5512,
    lng: 8.6824,
    beschreibung: "Kleiner Hain mit vielen Bäumen, Wege teils steil.",
    zugang: "eingeschraenkt",
    sammeln: "erlaubnis",
    saison: "vorbei",
  },
  {
    id: 4,
    name: "Rosskastanien im Stadtpark",
    art: "rosskastanie",
    lat: 48.7606,
    lng: 8.2398,
    beschreibung: "Schöne Allee – die Früchte sind aber nicht essbar.",
    zugang: "oeffentlich",
    sammeln: "erlaubt",
    saison: "vorbei",
  },
];
