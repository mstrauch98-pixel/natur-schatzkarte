// =========================================================
// Bezeichnungen für Arten, Zugang, Sammeln und Saison
// Die Fundorte selbst kommen aus der Supabase-Datenbank.
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
