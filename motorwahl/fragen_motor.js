/* Fachfragen Motor auslegen (eigene Formulierungen, keine Fremdinhalte).
   Aufbau je Frage: f = Fragetext, o = Antworten, r = Nummer der richtigen Antwort (zählt ab 0). Die Reihenfolge der Antworten mischt das Spiel selbst. */
window.FRAGEN = [
 {
  "f": "Was bedeutet P auf dem Typenschild eines Motors?",
  "o": [
   "Die abgegebene mechanische Leistung an der Welle",
   "Die aufgenommene elektrische Leistung",
   "Der Preis",
   "Die Polzahl"
  ],
  "r": 0
 },
 {
  "f": "Wie berechnet man den Wirkungsgrad?",
  "o": [
   "η = abgegebene Leistung : aufgenommene Leistung",
   "η = aufgenommene : abgegebene Leistung",
   "η = Spannung : Strom",
   "η = P · t"
  ],
  "r": 0
 },
 {
  "f": "Wie berechnet man die Verlustleistung?",
  "o": [
   "Aufgenommene minus abgegebene Leistung",
   "Abgegebene minus aufgenommene Leistung",
   "Summe beider Leistungen",
   "Produkt beider Leistungen"
  ],
  "r": 0
 },
 {
  "f": "Ein Motor nimmt 10 kW auf und gibt 9 kW ab. Wie groß ist der Wirkungsgrad?",
  "o": [
   "90 %",
   "110 %",
   "9 %",
   "1 %"
  ],
  "r": 0
 },
 {
  "f": "Warum ist der Wirkungsgrad eines Motors immer kleiner als 100 %?",
  "o": [
   "Es entstehen Verluste, vor allem Wärme",
   "Weil die Spannung schwankt",
   "Weil die Welle bremst",
   "Weil das Typenschild ungenau ist"
  ],
  "r": 0
 },
 {
  "f": "In welche Energieform wandeln sich die Verluste meist um?",
  "o": [
   "Wärme",
   "Licht",
   "Schall allein",
   "Chemische Energie"
  ],
  "r": 0
 },
 {
  "f": "Wie lautet die Leistungsformel für einen Drehstrommotor?",
  "o": [
   "P = √3 · U · I · cos φ",
   "P = U · I",
   "P = U : I",
   "P = I² : R"
  ],
  "r": 0
 },
 {
  "f": "Was geschieht mit dem Strom, wenn bei gleicher Leistung der cos φ kleiner wird?",
  "o": [
   "Er wird größer",
   "Er wird kleiner",
   "Er bleibt gleich",
   "Er wird null"
  ],
  "r": 0
 },
 {
  "f": "Was bedeutet IP 54 auf dem Typenschild?",
  "o": [
   "Eine Schutzart gegen Staub und Wasser",
   "Die Drehzahl",
   "Den Strom",
   "Die Polzahl"
  ],
  "r": 0
 },
 {
  "f": "Welche Drehzahl hat ein zweipoliger Drehstrommotor an 50 Hz ohne Schlupf?",
  "o": [
   "3 000 1/min",
   "1 500 1/min",
   "1 000 1/min",
   "750 1/min"
  ],
  "r": 0
 },
 {
  "f": "Warum liegt die Nenndrehzahl etwas unter der Synchrondrehzahl (z. B. 2 930 statt 3 000)?",
  "o": [
   "Wegen des Schlupfs",
   "Wegen der Frequenz",
   "Wegen der Farbe",
   "Wegen des Gehäuses"
  ],
  "r": 0
 },
 {
  "f": "Ein Motor gibt 7,5 kW ab und hat einen Wirkungsgrad von 0,9. Welche Leistung nimmt er ungefähr auf?",
  "o": [
   "8,3 kW",
   "6,75 kW",
   "7,5 kW",
   "83 kW"
  ],
  "r": 0
 },
 {
  "f": "Warum sollte man einen Motor mit höherem Wirkungsgrad bevorzugen?",
  "o": [
   "Er verursacht geringere Energiekosten",
   "Er hat keinen Strom",
   "Er hat kein Typenschild",
   "Er läuft ohne Spannung"
  ],
  "r": 0
 },
 {
  "f": "Was gibt die Nennspannung auf dem Typenschild an?",
  "o": [
   "Die Spannung, für die der Motor ausgelegt ist",
   "Die Spannung am Schalter",
   "Die Spannung der Sicherung",
   "Die Spannung der Welle"
  ],
  "r": 0
 },
 {
  "f": "Welche Angabe auf dem Typenschild zeigt den Strom bei Nennbetrieb?",
  "o": [
   "I",
   "n",
   "IP",
   "η"
  ],
  "r": 0
 },
 {
  "f": "Was ist die Frequenz des öffentlichen Netzes in Deutschland?",
  "o": [
   "50 Hz",
   "60 Hz",
   "230 Hz",
   "400 Hz"
  ],
  "r": 0
 },
 {
  "f": "Welche Spannung liegt zwischen zwei Außenleitern im Drehstromnetz?",
  "o": [
   "400 V",
   "230 V",
   "24 V",
   "1 000 V"
  ],
  "r": 0
 },
 {
  "f": "Welche Spannung liegt zwischen Außenleiter und Neutralleiter?",
  "o": [
   "230 V",
   "400 V",
   "50 V",
   "12 V"
  ],
  "r": 0
 },
 {
  "f": "Ein Motor mit 14,2 A und 400 V: Wozu braucht man den Strom bei der Auslegung?",
  "o": [
   "Zur Wahl von Leitung und Sicherung",
   "Zur Wahl der Farbe",
   "Zur Wahl der Welle",
   "Für nichts"
  ],
  "r": 0
 },
 {
  "f": "Was bedeutet n auf dem Typenschild?",
  "o": [
   "Die Nenndrehzahl",
   "Die Nennspannung",
   "Der Nennstrom",
   "Die Nennleistung"
  ],
  "r": 0
 }
];
