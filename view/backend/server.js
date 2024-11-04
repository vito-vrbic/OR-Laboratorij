// Import required modules
const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

// Initialize the Express application
const app = express();
const PORT = 3000; // Define the port on which the server will run

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Setup PostgreSQL client configuration
const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'n2uh6L-_IU',
    database: 'Albums',
    port: 5432
});

// Connect to the database
client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Database connection error', err));

// Endpoint to get albums with filtering
app.get('/api/albums', async (req, res) => {
    const { search, attribute } = req.query;

    // Initialize the base SQL query
    let baseQuery = `
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
                    'Producers', (
                        SELECT json_agg(
                            json_build_object(
                                'ProducerArtistName', pb.Artist_Name,
                                'ProducerFirstName', p.First_Name,
                                'ProducerLastName', p.Last_Name
                            )
                        )
                        FROM produced_by pb
                        JOIN Person p ON p.Artist_Name = pb.Artist_Name
                        WHERE pb.Album_ID = a.Album_ID
                    ),
                    'Performers', (
                        SELECT json_agg(
                            json_build_object(
                                'PerformerArtistName', p.Artist_Name,
                                'PerformerFirstName', p.First_Name,
                                'PerformerLastName', p.Last_Name
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
    `;

    // Prepare conditions for filtering
    let conditions = [];
    
    if (search) {
        // Apply different filters based on the attribute provided
        const safeSearch = search.toLowerCase();
        
        if (attribute === 'All') {
            conditions.push(`LOWER(a.Album_Title) LIKE '%${safeSearch}%'`);
            conditions.push(`LOWER(a.Release_Year::text) LIKE '%${safeSearch}%'`);
            conditions.push(`LOWER(a.Number_of_Singles::text) LIKE '%${safeSearch}%'`);
            conditions.push(`LOWER(a.Genre_Name) LIKE '%${safeSearch}%'`);
            conditions.push(`LOWER(a.Style_Name) LIKE '%${safeSearch}%'`);
            conditions.push(`LOWER(a.RLabel_Name) LIKE '%${safeSearch}%'`);
            conditions.push(`LOWER(a.Country_Name) LIKE '%${safeSearch}%'`);
            conditions.push(`LOWER(a.Type_Name) LIKE '%${safeSearch}%'`);
            
            // Include Songs, Producers, and Performers
            conditions.push(`EXISTS (SELECT 1 FROM Song s WHERE s.Album_ID = a.Album_ID AND LOWER(s.Song_Title) LIKE '%${safeSearch}%')`);
            conditions.push(`EXISTS (SELECT 1 FROM produced_by pb JOIN Person p ON p.Artist_Name = pb.Artist_Name WHERE pb.Album_ID = a.Album_ID AND (LOWER(p.Artist_Name) LIKE '%${safeSearch}%' OR LOWER(p.First_Name) LIKE '%${safeSearch}%' OR LOWER(p.Last_Name) LIKE '%${safeSearch}%'))`);            
            conditions.push(`EXISTS (SELECT 1 FROM performed_by pb JOIN Person p ON p.Artist_Name = pb.Artist_Name WHERE pb.Album_ID = a.Album_ID AND (LOWER(p.Artist_Name) LIKE '%${safeSearch}%' OR LOWER(p.First_Name) LIKE '%${safeSearch}%' OR LOWER(p.Last_Name) LIKE '%${safeSearch}%'))`);            
        } else if (attribute === 'SongTitle') {
            conditions.push(`EXISTS (SELECT 1 FROM Song s WHERE s.Album_ID = a.Album_ID AND LOWER(s.Song_Title) LIKE '%${safeSearch}%')`);
        } else if (attribute === 'PerformerName') {
            conditions.push(`EXISTS (SELECT 1 FROM performed_by pb JOIN Person p ON p.Artist_Name = pb.Artist_Name WHERE pb.Album_ID = a.Album_ID AND (LOWER(p.Artist_Name) LIKE '%${safeSearch}%' OR LOWER(p.First_Name) LIKE '%${safeSearch}%' OR LOWER(p.Last_Name) LIKE '%${safeSearch}%'))`);            
        } else if (attribute === 'ProducerName') {
            conditions.push(`EXISTS (SELECT 1 FROM produced_by pb JOIN Person p ON p.Artist_Name = pb.Artist_Name WHERE pb.Album_ID = a.Album_ID AND (LOWER(p.Artist_Name) LIKE '%${safeSearch}%' OR LOWER(p.First_Name) LIKE '%${safeSearch}%' OR LOWER(p.Last_Name) LIKE '%${safeSearch}%'))`);            
        } else if (attribute === 'TrackNumber') {
            conditions.push(`EXISTS (SELECT 1 FROM Song s WHERE s.Album_ID = a.Album_ID AND LOWER(s.Track_Number::text) LIKE '%${safeSearch}%')`);
        } else if (attribute === 'Duration') {
            conditions.push(`EXISTS (SELECT 1 FROM Song s WHERE s.Album_ID = a.Album_ID AND LOWER(s.Duration::text) LIKE '%${safeSearch}%')`);
        } else if (attribute === 'ReleaseYear') {
            conditions.push(`LOWER(a.Release_Year::text) LIKE '%${safeSearch}%'`);
        } else if (attribute === 'NumberOfSingles') {
            conditions.push(`LOWER(a.Number_of_Singles::text) LIKE '%${safeSearch}%'`);
        } else {
            conditions.push(`LOWER(a.${attribute}) LIKE '%${safeSearch}%'`);
        }
    }

    // Combine the conditions into the query
    if (conditions.length > 0) {
        baseQuery += ' WHERE ' + conditions.join(' OR ');
    }

    try {
        const result = await client.query(baseQuery);
        
        // Log the result to see what is returned
        console.log('Album data retrieved:', result.rows[0]);

        // Check if the result is valid
        if (!result.rows.length || !result.rows[0].albumdetailsarray) {
            return res.json([]);
        }

        res.json(result.rows[0].albumdetailsarray);
    } catch (error) {
        console.error('Error fetching albums:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
