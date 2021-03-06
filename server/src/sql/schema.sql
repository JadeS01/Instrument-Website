CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	artist text NOT NULL,
	album text NOT NULL,
	notes varchar NOT NULL
);

INSERT INTO songs (id, song_title, artist, album, notes) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'Ludwig van Beethoven', 'Symphony No. 9', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4');

INSERT INTO songs (id, song_title, artist, album, notes) 
VALUES (2, 'Prelude in C', 'J.S. Bach', 'BWV 846', 'C4 E4 G4 C5 E5 G4 C5 E5 C4 E4 G4 C5 E5 G4 C5 E5 C4 D4 A4 D5 F5 A4 D5 F5 C4 D4 A4 D5 F5 A4 D5 F5 B3 D4 G4 D5 F5 G4 D5 F5 B3 D4 G4 D5 F5 G4 D5 F5 C4 E4 G4 C5 E5 G4 C5 E5 C4 E4 G4 C5 E5 G4 C5 E5');

INSERT INTO songs (id, song_title, artist, album, notes) 
VALUES (3, 'Objection! 2001', 'Masakazu Sugimori', 'Ace Attorney OST', 'D4 G4 D5 D4 G4 D5 D4 G4 D5');

INSERT INTO songs (id, song_title, artist, album, notes) 
VALUES (4, 'Fallen Down', 'Toby Fox', 'Undertale OST', 'A4 D4 E4 D4 G#3 D4 E4 D4 G3 D4 E4 G4 F#4 E4 D4 A3');

INSERT INTO songs (id, song_title, artist, album, notes) 
VALUES (5, 'Für Elise', 'Ludwig van Beethoven', 'BiA 515', 'E5 D#5 E5 D#5 E5 B4 D5 C5 A4');