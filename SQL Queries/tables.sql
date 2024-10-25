CREATE TABLE Person
(
  Artist_Name VARCHAR(100) NOT NULL,
  First_Name VARCHAR(100) NULL,
  Last_Name VARCHAR(100) NULL,
  PRIMARY KEY (Artist_Name)
);

CREATE TABLE Genre
(
  Genre_Name VARCHAR(100) NOT NULL,
  PRIMARY KEY (Genre_Name)
);

CREATE TABLE Style
(
  Style_Name VARCHAR(100) NOT NULL,
  PRIMARY KEY (Style_Name)
);

CREATE TABLE RLabel
(
  RLabel_Name VARCHAR(100) NOT NULL,
  PRIMARY KEY (RLabel_Name)
);

CREATE TABLE Country
(
  Country_Name VARCHAR(100) NOT NULL,
  PRIMARY KEY (Country_Name)
);

CREATE TABLE Type
(
  Type_Name VARCHAR(100) NOT NULL,
  PRIMARY KEY (Type_Name)
);

CREATE TABLE Album
(
  Album_ID INT NOT NULL,
  Album_Title VARCHAR(100) NOT NULL,
  Release_Year INT NOT NULL CHECK (Release_Year > 0 AND Release_Year <= 2100),
  Number_of_Singles INT NOT NULL CHECK (Number_of_Singles >= 0),
  Genre_Name VARCHAR(100) NOT NULL,
  Style_Name VARCHAR(100) NOT NULL,
  RLabel_Name VARCHAR(100) NOT NULL,
  Country_Name VARCHAR(100) NOT NULL,
  Type_Name VARCHAR(100) NOT NULL,
  PRIMARY KEY (Album_ID),
  FOREIGN KEY (Genre_Name) REFERENCES Genre(Genre_Name),
  FOREIGN KEY (Style_Name) REFERENCES Style(Style_Name),
  FOREIGN KEY (RLabel_Name) REFERENCES RLabel(RLabel_Name),
  FOREIGN KEY (Country_Name) REFERENCES Country(Country_Name),
  FOREIGN KEY (Type_Name) REFERENCES Type(Type_Name)
);

CREATE TABLE Song
(
  Song_Title VARCHAR(100) NOT NULL,
  Track_Number INT NOT NULL,
  Duration INT NOT NULL CHECK (Duration > 0),
  Album_ID INT NOT NULL,
  PRIMARY KEY (Track_Number, Album_ID),
  FOREIGN KEY (Album_ID) REFERENCES Album(Album_ID)
);

CREATE TABLE produced_by
(
  Album_ID INT NOT NULL,
  Artist_Name VARCHAR(100) NOT NULL,
  PRIMARY KEY (Album_ID, Artist_Name),
  FOREIGN KEY (Album_ID) REFERENCES Album(Album_ID),
  FOREIGN KEY (Artist_Name) REFERENCES Person(Artist_Name)
);

CREATE TABLE performed_by
(
  Album_ID INT NOT NULL,
  Artist_Name VARCHAR(100) NOT NULL,
  PRIMARY KEY (Album_ID, Artist_Name),
  FOREIGN KEY (Album_ID) REFERENCES Album(Album_ID),
  FOREIGN KEY (Artist_Name) REFERENCES Person(Artist_Name)
);
