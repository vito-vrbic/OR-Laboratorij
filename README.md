# Dataset: Music Albums and Songs

This repository contains an open dataset of music albums and songs. The data included in this dataset is factual information about albums (album title, artists, producers, release year, genre, style, number of singles, record label, country of release, type), as well as factual information about songs (title, track number on the album, duration) within each album.

This repository and dataset have been created as an exercise for the course [Open Computing](https://www.fer.unizg.hr/en/course/opecom_b) at [University of Zagreb Faculty of Electrical Engineering and Computing](https://www.fer.unizg.hr/en).

## Formats

The data is available in the following formats:
- CSV: [albums.csv](./data/albums.csv)
- JSON: [albums.json](./data/albums.json)

## Data Structure

### Database

The accompanying image shows the ER model of the database containing this dataset: ![ER Model](https://github.com/user-attachments/assets/6606ea55-651d-4b2b-b6a2-ba7ad4182ad3)


The database itself contains the following tables:
#### Person Table

| Column Name | Data Type    | Description                       |
|-------------|--------------|-----------------------------------|
| Artist_Name | VARCHAR(100) | The full artist name (Primary Key)|
| First_Name  | VARCHAR(100) | First name if applicable          |
| Last_Name   | VARCHAR(100) | Last name if applicable           |

#### Genre Table

| Column Name | Data Type    | Description                       |
|-------------|--------------|-----------------------------------|
| Genre_Name  | VARCHAR(100) | Genre name (Primary Key)          |

#### Style Table

| Column Name | Data Type    | Description                       |
|-------------|--------------|-----------------------------------|
| Style_Name  | VARCHAR(100) | Style name (Primary Key)          |

#### RLabel Table

| Column Name | Data Type    | Description                       |
|-------------|--------------|-----------------------------------|
| RLabel_Name | VARCHAR(100) | Record label name (Primary Key)   |

#### Country Table

| Column Name  | Data Type    | Description                       |
|--------------|--------------|-----------------------------------|
| Country_Name | VARCHAR(100) | Country name (Primary Key)        |

#### Type Table

| Column Name | Data Type    | Description                       |
|-------------|--------------|-----------------------------------|
| Type_Name   | VARCHAR(100) | Type name (Primary Key)           |

#### Album Table

| Column Name         | Data Type    | Description                                                             |
|---------------------|--------------|-------------------------------------------------------------------------|
| Album_ID            | INT          | Unique identifier for the album (Primary Key)                          |
| Album_Title         | VARCHAR(100) | Title of the album                                                     |
| Release_Year        | INT          | Year of release (must be > 0 and <= 2100)                             |
| Number_of_Singles   | INT          | Number of singles (must be >= 0)                                      |
| Genre_Name          | VARCHAR(100) | Genre of the album (Foreign Key referencing Genre(Genre_Name))        |
| Style_Name          | VARCHAR(100) | Style of the album (Foreign Key referencing Style(Style_Name))        |
| RLabel_Name         | VARCHAR(100) | Record label of the album (Foreign Key referencing RLabel(RLabel_Name))|
| Country_Name        | VARCHAR(100) | Country of the album (Foreign Key referencing Country(Country_Name))  |
| Type_Name           | VARCHAR(100) | Type of the album (Foreign Key referencing Type(Type_Name))           |

#### Song Table

| Column Name | Data Type    | Description                                           |
|-------------|--------------|------------------------------------------------------ |
| Song_Title  | VARCHAR(100) | Title of the song                                     |
| Track_Number| INT          | Track number of the song                              |
| Duration    | INT          | Duration of the song in seconds (must be > 0)         |
| Album_ID    | INT          | ID of the album (Foreign Key referencing Album(Album_ID))|
| Primary Key | (Track_Number, Album_ID) | Combined primary key                          |

#### produced_by Table

| Column Name   | Data Type    | Description                                          |
|---------------|--------------|------------------------------------------------------|
| Album_ID      | INT          | ID of the album (Foreign Key referencing Album(Album_ID))|
| Artist_Name   | VARCHAR(100) | Name of the artist (Foreign Key referencing Person(Artist_Name))|
| Primary Key   | (Album_ID, Artist_Name) | Combined primary key                     |

#### performed_by Table

| Column Name   | Data Type    | Description                                          |
|---------------|--------------|------------------------------------------------------|
| Album_ID      | INT          | ID of the album (Foreign Key referencing Album(Album_ID))|
| Artist_Name   | VARCHAR(100) | Name of the artist (Foreign Key referencing Person(Artist_Name))|
| Primary Key   | (Album_ID, Artist_Name) | Combined primary key                     |

### CSV & JSON Attributes

The dataset is provided in CSV format with the following columns/in JSON with the following keys:
- AlbumTitle - The title of the album.
- ReleaseYear - The year that the album was released.
- NumberOfSingles - Number of singles which originated from this album.
- Genre - Genre of album.
- Style - Style of album.
- ReleaseLabel - The label of the album release.
- Country - The origin country of the album.
- Type - The type of the album (studio album, EP, etc.)
- SongTitle - The title of a song on the album.
- TrackNumber - The order number of the song on the album.
- Duration - The duration of the song.
- ProducedBy - The producers of the album.
- PerformedBy - The performers of the album.

## Additional Information

### Dimensions of the Dataset

This dataset contains 12 albums and 149 songs.

### Language of the Dataset

English

### Used Tools

PostgreSQL database, pgAdmin 4 development platform, and functions for exporting data from the database to other formats.

### Data Sources

- [MusicBrainz](https://www.musicbrainz.org) (core data, licensed under CC0)
- [Discogs](https://www.discogs.com) (CC0 data, factual data sourced within Discogs terms of use)
- [Wikidata](https://www.wikidata.org) (licensed under CC0)

### Dataset Version
1.0
 
### Last updated:


October 2024.

### Author

This repository and dataset was created by **Vito Vrbić**. 


### Contakt

For any questions or inquiries, you can contact me at: vito.vrbic@unizg.fer.hr

### License

This dataset is available under the [Creative Commons Zero (CC0) license](./LICENSE).
