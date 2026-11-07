/* Fachfragen Ersatzwiderstand-Puzzle (eigene Formulierungen, keine Fremdinhalte).
   Aufbau je Frage: f = Fragetext, o = Antworten, r = Nummer der richtigen Antwort (zählt ab 0). Die Reihenfolge der Antworten mischt das Spiel selbst. */
window.FRAGEN = [
 {
  "f": "Womit beginnt man bei einer gemischten Schaltung meist die Berechnung?",
  "o": [
   "Mit dem Zusammenfassen der Teile, die rein in Reihe oder rein parallel liegen",
   "Mit dem größten Widerstand",
   "Mit der Quelle",
   "Mit der Sicherung"
  ],
  "r": 0
 },
 {
  "f": "Zwei gleiche Widerstände von 60 Ω liegen parallel. Wie groß ist der Ersatzwiderstand?",
  "o": [
   "30 Ω",
   "120 Ω",
   "60 Ω",
   "3 600 Ω"
  ],
  "r": 0
 },
 {
  "f": "20 Ω und 30 Ω liegen in Reihe. Wie groß ist der Ersatzwiderstand?",
  "o": [
   "50 Ω",
   "12 Ω",
   "10 Ω",
   "600 Ω"
  ],
  "r": 0
 },
 {
  "f": "R₁ liegt in Reihe zu R₂ ‖ R₃. Welcher Strom fließt durch R₁?",
  "o": [
   "Der Gesamtstrom",
   "Nur der Strom von R₂",
   "Der Strom von R₃",
   "Null"
  ],
  "r": 0
 },
 {
  "f": "Welche Spannung liegt an R₂ und R₃, die parallel liegen?",
  "o": [
   "Dieselbe Spannung an beiden",
   "Die Summe beider Teilspannungen",
   "Null",
   "An R₂ immer mehr als an R₃"
  ],
  "r": 0
 },
 {
  "f": "In einer gemischten Schaltung fällt ein paralleler Zweig aus (offen). Was geschieht mit dem Gesamtwiderstand?",
  "o": [
   "Er steigt",
   "Er sinkt",
   "Er bleibt gleich",
   "Er wird null"
  ],
  "r": 0
 },
 {
  "f": "Was gilt für den Gesamtstrom in R₁ + (R₂ ‖ R₃)?",
  "o": [
   "Er teilt sich hinter R₁ auf R₂ und R₃ auf",
   "Er fließt nur durch R₂",
   "Er wird in R₁ verbraucht",
   "Er verdoppelt sich in R₃"
  ],
  "r": 0
 },
 {
  "f": "Zwei Widerstände R₁ = 1 kΩ und R₂ = 3 kΩ bilden an 12 V einen unbelasteten Spannungsteiler. Welche Spannung liegt an R₂?",
  "o": [
   "9 V",
   "3 V",
   "6 V",
   "12 V"
  ],
  "r": 0
 },
 {
  "f": "Was geschieht mit der Teilspannung eines Spannungsteilers, wenn man ihn belastet?",
  "o": [
   "Sie sinkt",
   "Sie steigt",
   "Sie bleibt gleich",
   "Sie wird zur Quellspannung"
  ],
  "r": 0
 },
 {
  "f": "Wozu dient der Vorwiderstand vor einer Maschinenleuchte?",
  "o": [
   "Er nimmt die überschüssige Spannung auf",
   "Er erhöht die Spannung",
   "Er speichert Strom",
   "Er vermeidet jede Wärme"
  ],
  "r": 0
 },
 {
  "f": "Wie ist der Gesamtwiderstand einer Parallelschaltung zu den Einzelwerten?",
  "o": [
   "Kleiner als der kleinste Einzelwiderstand",
   "Größer als der größte",
   "Gleich dem Mittelwert",
   "Gleich der Summe"
  ],
  "r": 0
 },
 {
  "f": "In einer Reihenschaltung bekommt welcher Widerstand die größte Teilspannung?",
  "o": [
   "Der größte Widerstand",
   "Der kleinste Widerstand",
   "Alle gleich viel",
   "Der erste"
  ],
  "r": 0
 },
 {
  "f": "100 Ω und 100 Ω parallel, dazu 50 Ω in Reihe. Wie groß ist der Gesamtwiderstand?",
  "o": [
   "100 Ω",
   "250 Ω",
   "75 Ω",
   "200 Ω"
  ],
  "r": 0
 },
 {
  "f": "Wie geht man bei einer gemischten Schaltung vor, wenn man einen Zweigstrom kennt und die Quellspannung sucht?",
  "o": [
   "Rückwärts: von der bekannten Größe aus Schritt für Schritt",
   "Gar nicht, das geht nicht",
   "Man rät die Spannung",
   "Nur mit der Sicherung"
  ],
  "r": 0
 },
 {
  "f": "Zwei Parallelzweige liegen an derselben Spannung. Der Zweig mit dem kleineren Widerstand führt …",
  "o": [
   "den größeren Strom",
   "den kleineren Strom",
   "keinen Strom",
   "genauso viel Strom"
  ],
  "r": 0
 },
 {
  "f": "Was ist die erste Frage beim Lesen einer Schaltung?",
  "o": [
   "Welche Widerstände liegen in Reihe, welche parallel?",
   "Wie viel kostet sie?",
   "Wie lang sind die Leitungen?",
   "Welche Farbe haben die Widerstände?"
  ],
  "r": 0
 },
 {
  "f": "40 Ω ‖ 40 Ω ergibt 20 Ω. Dazu 30 Ω in Reihe. Wie groß ist der Gesamtwiderstand?",
  "o": [
   "50 Ω",
   "110 Ω",
   "70 Ω",
   "20 Ω"
  ],
  "r": 0
 },
 {
  "f": "Fällt in einer Reihenschaltung ein Widerstand aus (offen), was geschieht?",
  "o": [
   "Der ganze Stromkreis ist unterbrochen",
   "Die anderen leuchten heller",
   "Nichts",
   "Der Strom steigt"
  ],
  "r": 0
 },
 {
  "f": "Ein Zweigstrom und der Gesamtstrom sind gleich groß. Was folgt daraus für den anderen Zweig?",
  "o": [
   "Dort fließt kein Strom",
   "Dort fließt der doppelte Strom",
   "Er hat den Widerstand null",
   "Er ist in Reihe"
  ],
  "r": 0
 },
 {
  "f": "Die Spannungen eines Spannungsteilers ergeben zusammen …",
  "o": [
   "die Quellspannung",
   "die Hälfte der Quellspannung",
   "das Doppelte der Quellspannung",
   "null"
  ],
  "r": 0
 }
];
