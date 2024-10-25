COPY (
	SELECT 
	    json_agg(
	        json_build_object(
	            'AlbumTitle', a.Album_Title,
	            'ReleaseYear', a.Release_Year,
	            'NumberOfSingles', a.Number_of_Singles,
	            'Genre', a.Genre_Name,
	            'Style', a.Style_Name,
	            'ReleaseLabel', a.RLabel_Name,
	            'Country', a.Country_Name,
	            'Type', a.Type_Name,
	            
	            'Songs', (
	                SELECT json_agg(
	                    json_build_object(
	                        'SongTitle', s.Song_Title,
	                        'TrackNumber', s.Track_Number,
	                        'Duration', s.Duration
	                    )
	                )
	                FROM Song s
	                WHERE s.Album_ID = a.Album_ID
	            ),
	            
	            'ProducedBy', (
	                SELECT json_agg(
	                    json_build_object(
	                        'ArtistName', pb.Artist_Name,
	                        'FirstName', p.First_Name,
	                        'LastName', p.Last_Name
	                    )
	                )
	                FROM produced_by pb
	                JOIN Person p ON p.Artist_Name = pb.Artist_Name
	                WHERE pb.Album_ID = a.Album_ID
	            ),
	            
	            'PerformedBy', (
	                SELECT json_agg(
	                    json_build_object(
	                        'ArtistName', p.Artist_Name,
	                        'FirstName', p.First_Name,
	                        'LastName', p.Last_Name
	                    )
	                )
	                FROM performed_by pb
	                JOIN Person p ON p.Artist_Name = pb.Artist_Name
	                WHERE pb.Album_ID = a.Album_ID
	            )
	        )
	    ) AS AlbumDetailsArray
	FROM 
	    Album a
) TO 'C://albumi.json'