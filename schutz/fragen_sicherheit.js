/* Fachfragen Schutzmaßnahme wählen (eigene Formulierungen, keine Fremdinhalte).
   Aufbau je Frage: f = Fragetext, o = Antworten, r = Nummer der richtigen Antwort (zählt ab 0). Die Reihenfolge der Antworten mischt das Spiel selbst. */
window.FRAGEN = [
 {
  "f": "Welche Farbe hat der Schutzleiter?",
  "o": [
   "Grün-gelb",
   "Blau",
   "Schwarz",
   "Rot"
  ],
  "r": 0
 },
 {
  "f": "Welche Farbe hat üblicherweise der Neutralleiter?",
  "o": [
   "Blau",
   "Grün-gelb",
   "Rot",
   "Weiß"
  ],
  "r": 0
 },
 {
  "f": "Welchen Nennfehlerstrom hat ein üblicher FI-Schalter für den Personenschutz?",
  "o": [
   "30 mA",
   "3 A",
   "300 A",
   "30 A"
  ],
  "r": 0
 },
 {
  "f": "Was schützt ein FI-Schalter vor allem?",
  "o": [
   "Menschen vor gefährlichen Fehlerströmen",
   "Leitungen vor Überlast",
   "Geräte vor Staub",
   "Die Quelle vor Rückstrom"
  ],
  "r": 0
 },
 {
  "f": "Wozu dient eine Sicherung?",
  "o": [
   "Sie schützt die Leitung vor Überlast und Kurzschluss",
   "Sie macht die Leitung dicker",
   "Sie erhöht die Spannung",
   "Sie ersetzt den Schutzleiter"
  ],
  "r": 0
 },
 {
  "f": "Warum darf man Sicherungen nicht überbrücken?",
  "o": [
   "Die Leitung kann überlasten und einen Brand auslösen",
   "Sie werden dann zu heiß zum Anfassen",
   "Die Spannung steigt dabei",
   "Das Gerät läuft dann langsamer"
  ],
  "r": 0
 },
 {
  "f": "Was ist die Aufgabe des Schutzleiters?",
  "o": [
   "Er leitet Fehlerströme vom Gehäuse ab",
   "Er führt den Betriebsstrom",
   "Er ersetzt den Schalter",
   "Er erhöht die Spannung"
  ],
  "r": 0
 },
 {
  "f": "Was geschieht mit dem Körperwiderstand bei nasser Haut?",
  "o": [
   "Er sinkt, der Strom steigt",
   "Er steigt, der Strom sinkt",
   "Er bleibt gleich",
   "Er wird unendlich"
  ],
  "r": 0
 },
 {
  "f": "Ab etwa welcher Stromstärke kann ein Stromunfall lebensgefährlich werden?",
  "o": [
   "Ab etwa 30 mA",
   "Erst ab 30 A",
   "Erst ab 3 000 A",
   "Ab 0,001 mA"
  ],
  "r": 0
 },
 {
  "f": "Was ist ein Beispiel für direkten Schutz?",
  "o": [
   "Isolierung einer Leitung",
   "Schutzleiter",
   "FI-Schalter",
   "Schutzerdung"
  ],
  "r": 0
 },
 {
  "f": "Was ist ein Beispiel für indirekten Schutz?",
  "o": [
   "Schutzleiter mit Sicherung",
   "Abdeckung einer Klemme",
   "Isolierter Griff",
   "Abstand zu Leitungen"
  ],
  "r": 0
 },
 {
  "f": "Was ist die erste Maßnahme bei einem Stromunfall?",
  "o": [
   "Stromkreis unterbrechen, ohne sich selbst zu gefährden",
   "Person sofort anfassen",
   "Auf den Arzt warten",
   "Wasser auf die Person gießen"
  ],
  "r": 0
 },
 {
  "f": "Wer darf Arbeiten an elektrischen Anlagen ausführen?",
  "o": [
   "Elektrofachkräfte",
   "Jeder, der einen Schraubendreher hat",
   "Nur Praktikanten",
   "Niemand"
  ],
  "r": 0
 },
 {
  "f": "Was sollte man mit einem Kabel mit beschädigter Isolierung tun?",
  "o": [
   "Nicht mehr benutzen und melden",
   "Mit Klebeband flicken und weiterbenutzen",
   "Weiter benutzen, wenn es trocken ist",
   "Nur noch bei kleinen Geräten benutzen"
  ],
  "r": 0
 },
 {
  "f": "Warum ist Schutzkleinspannung (z. B. 24 V) sicherer als 230 V?",
  "o": [
   "Der Strom durch den Körper bleibt klein",
   "Sie hat keinen Strom",
   "Sie ist unsichtbar",
   "Sie ist immer Gleichspannung"
  ],
  "r": 0
 },
 {
  "f": "Welcher Strom fließt bei 230 V und 1 000 Ω Körperwiderstand durch den Körper?",
  "o": [
   "230 mA",
   "23 mA",
   "2,3 A",
   "0,23 mA"
  ],
  "r": 0
 },
 {
  "f": "Schutzklasse II bedeutet …",
  "o": [
   "Schutzisolierung, kein Schutzleiter nötig",
   "Schutzleiter ist Pflicht",
   "Gehäuse aus Metall",
   "Nur für Gleichspannung"
  ],
  "r": 0
 },
 {
  "f": "Was ist ein Fehlerfall an einer Maschine?",
  "o": [
   "Ein Isolationsfehler, bei dem das Gehäuse unter Spannung gerät",
   "Der normale Betrieb",
   "Das Abschalten am Schalter",
   "Der Wechsel des Werkzeugs"
  ],
  "r": 0
 },
 {
  "f": "Warum löst die Sicherung bei einem Körperschluss mit Schutzleiter aus?",
  "o": [
   "Der Fehlerstrom über den Schutzleiter ist groß",
   "Die Spannung sinkt auf null",
   "Das Gehäuse wird isoliert",
   "Die Maschine läuft schneller"
  ],
  "r": 0
 },
 {
  "f": "Warum steht in Werkstätten an Steckdosenleisten oft ein Überlastschutz?",
  "o": [
   "Zu viele Geräte würden die Leitung überlasten",
   "Damit die Spannung steigt",
   "Damit weniger Strom fließt",
   "Damit sie schöner aussieht"
  ],
  "r": 0
 }
];
