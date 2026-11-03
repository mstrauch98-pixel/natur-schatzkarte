// =========================================================
// Beispiel-Fundorte (nur zum Testen der Karte)
// In Phase 4 kommen die echten Einträge aus der Datenbank.
// =========================================================

const ARTEN = {
  rosskastanie: {
    name: "Rosskastanie",
    farbe: "#9B6042",
    badges: [
      { text: "Zum Basteln", klasse: "badge-play" },
      { text: "Nicht essbar", klasse: "badge-no" },
    ],
  },
  esskastanie: {
    name: "Esskastanie",
    farbe: "#244A3C",
    badges: [{ text: "Essbar", klasse: "badge-yes" }],
  },
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
    name: "Kastanienallee im Stadtpark",
    art: "rosskastanie",
    lat: 48.7606,
    lng: 8.2398,
    beschreibung: "Lange Allee mit vielen Bäumen – im Herbst liegen hier jede Menge Kastanien.",
    zugang: "oeffentlich",
    sammeln: "erlaubt",
    saison: "vorbei",
  },
  {
    id: 2,
    name: "Große Kastanie am Spielplatz",
    art: "rosskastanie",
    lat: 49.4875,
    lng: 8.4660,
    beschreibung: "Ein mächtiger Baum direkt neben dem Spielplatz, Bänke in der Nähe.",
    zugang: "oeffentlich",
    sammeln: "erlaubt",
    saison: "vorbei",
  },
  {
    id: 3,
    name: "Kastanien an der Uferpromenade",
    art: "rosskastanie",
    lat: 49.0069,
    lng: 8.4037,
    beschreibung: "Mehrere Bäume entlang des Spazierwegs am Wasser.",
    zugang: "oeffentlich",
    sammeln: "erlaubt",
    saison: "vorbei",
  },
  {
    id: 4,
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
    id: 5,
    name: "Kastanienhain am Hang",
    art: "esskastanie",
    lat: 49.5512,
    lng: 8.6824,
    beschreibung: "Kleiner Hain mit vielen Bäumen, Wege teils steil.",
    zugang: "eingeschraenkt",
    sammeln: "erlaubnis",
    saison: "vorbei",
  },
];
