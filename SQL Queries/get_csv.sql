COPY (
    SELECT 
        a.Album_Title AS "AlbumTitle",
        a.Release_Year AS "ReleaseYear",
        a.Number_of_Singles AS "NumberOfSingles",
        a.Genre_Name AS "Genre",
        a.Style_Name AS "Style",
        a.RLabel_Name AS "ReleaseLabel",
        a.Country_Name AS "Country",
        a.Type_Name AS "Type",
        s.Song_Title AS "SongTitle",
        pb.Artist_Name AS "ProducedBy",
        p.Artist_Name AS "PerformedBy"
    FROM 
        Album a
    LEFT JOIN 
        Song s ON s.Album_ID = a.Album_ID
    LEFT JOIN 
        produced_by pb ON pb.Album_ID = a.Album_ID
    LEFT JOIN 
        performed_by p ON p.Album_ID = a.Album_ID
) TO 'C://albumi.csv' WITH (FORMAT csv, HEADER true);