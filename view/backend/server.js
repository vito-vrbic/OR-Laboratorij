const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Use CORS middleware
app.use(cors());

// Load dataset
const datasetPath = path.join(__dirname, '../../data/albums.json'); // Adjust if your file is named differently
let albumsData = [];

// Read the JSON file
fs.readFile(datasetPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading dataset:', err);
        return;
    }
    try {
        albumsData = JSON.parse(data);
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});

// Helper function to safely convert to lower case if not null
const safeToLower = (value) => {
    return value && typeof value === 'string' ? value.toLowerCase() : '';
};

// Endpoint to get all albums or filter by attribute
app.get('/api/albums', (req, res) => {
    const { search, attribute } = req.query;

    let filteredAlbums = albumsData;

    // Perform filtering if search is provided
    if (search) {
        filteredAlbums = albumsData.filter(album => {
            let found = false;

            // Check for each attribute when searching all
            if (attribute === 'All') {
                found = safeToLower(album.AlbumTitle).includes(safeToLower(search)) ||
                        safeToLower(album.ReleaseYear.toString()).includes(search) ||
                        // Search for NumberOfSingles as a string
                        safeToLower(album.NumberOfSingles.toString()).includes(search) ||
                        safeToLower(album.Genre).includes(safeToLower(search)) ||
                        safeToLower(album.Style).includes(safeToLower(search)) ||
                        safeToLower(album.ReleaseLabel).includes(safeToLower(search)) ||
                        safeToLower(album.Country).includes(safeToLower(search)) ||
                        safeToLower(album.Type).includes(safeToLower(search)) ||
                        (album.Producers && album.Producers.some(producer => 
                            safeToLower(producer.ProducerArtistName).includes(safeToLower(search)) ||
                            safeToLower(producer.ProducerFirstName).includes(safeToLower(search)) ||
                            safeToLower(producer.ProducerLastName).includes(safeToLower(search)))) ||
                        (album.Performers && album.Performers.some(performer => 
                            safeToLower(performer.PerformerArtistName).includes(safeToLower(search)) ||
                            safeToLower(performer.PerformerFirstName).includes(safeToLower(search)) ||
                            safeToLower(performer.PerformerLastName).includes(safeToLower(search)))) ||
                        (album.Songs && album.Songs.some(song => 
                            safeToLower(song.SongTitle).includes(safeToLower(search)) ||
                            safeToLower(song.TrackNumber.toString()) === search ||
                            safeToLower(song.Duration.toString()) === search));
            } else if (attribute === 'SongTitle') {
                found = album.Songs && album.Songs.some(song => safeToLower(song.SongTitle) === safeToLower(search));
            } else if (attribute === 'PerformerName') {
                found = album.Performers && album.Performers.some(performer => 
                    safeToLower(performer.PerformerArtistName) === safeToLower(search) ||
                    safeToLower(performer.PerformerFirstName) === safeToLower(search) ||
                    safeToLower(performer.PerformerLastName) === safeToLower(search));
            } else if (attribute === 'ProducerName') {
                found = album.Producers && album.Producers.some(producer => 
                    safeToLower(producer.ProducerArtistName) === safeToLower(search) ||
                    safeToLower(producer.ProducerFirstName) === safeToLower(search) ||
                    safeToLower(producer.ProducerLastName) === safeToLower(search));
            } else if (attribute === 'TrackNumber') {
                found = album.Songs && album.Songs.some(song => safeToLower(song.TrackNumber.toString()) === search);
            } else if (attribute === 'Duration') {
                found = album.Songs && album.Songs.some(song => safeToLower(song.Duration.toString()) === search);
            } else if (attribute === 'ReleaseYear') {
                found = safeToLower(album.ReleaseYear.toString()) === search;
            } else if (attribute === 'NumberOfSingles') {
                // Filter directly by NumberOfSingles
                found = safeToLower(album.NumberOfSingles.toString()) === search; 
            } else {
                const valueToCheck = album[attribute] ? album[attribute].toString() : '';
                found = safeToLower(valueToCheck).includes(safeToLower(search));
            }

            return found;
        });
    }

    // If no albums match the filter, respond with an empty array
    res.json(filteredAlbums);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
