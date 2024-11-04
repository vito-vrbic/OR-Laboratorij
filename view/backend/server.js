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
    albumsData = JSON.parse(data);
});

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
                found = album.AlbumTitle.toLowerCase().includes(search.toLowerCase()) ||
                        album.ReleaseYear.toString() === search ||
                        album.NumberOfSingles.toString().includes(search) ||
                        album.Genre.toLowerCase().includes(search.toLowerCase()) ||
                        album.Style.toLowerCase().includes(search.toLowerCase()) ||
                        album.ReleaseLabel.toLowerCase().includes(search.toLowerCase()) ||
                        album.Country.toLowerCase().includes(search.toLowerCase()) ||
                        album.Type.toLowerCase().includes(search.toLowerCase()) ||
                        album.Producers.some(producer => 
                            producer.ProducerArtistName.toLowerCase().includes(search.toLowerCase()) ||
                            producer.ProducerFirstName.toLowerCase().includes(search.toLowerCase()) ||
                            producer.ProducerLastName.toLowerCase().includes(search.toLowerCase())) ||
                        album.Performers.some(performer => 
                            performer.PerformerArtistName.toLowerCase().includes(search.toLowerCase()) ||
                            performer.PerformerFirstName.toLowerCase().includes(search.toLowerCase()) ||
                            performer.PerformerLastName.toLowerCase().includes(search.toLowerCase())) ||
                        album.Songs.some(song => 
                            song.SongTitle.toLowerCase().includes(search.toLowerCase()) ||
                            song.TrackNumber.toString() === search ||
                            song.Duration.toString() === search);
            } else if (attribute === 'SongTitle') {
                found = album.Songs.some(song => song.SongTitle.toLowerCase() === search.toLowerCase());
            } else if (attribute === 'PerformerName') {
                found = album.Performers.some(performer => 
                    performer.PerformerArtistName.toLowerCase() === search.toLowerCase() ||
                    performer.PerformerFirstName.toLowerCase() === search.toLowerCase() ||
                    performer.PerformerLastName.toLowerCase() === search.toLowerCase());
            } else if (attribute === 'ProducerName') {
                found = album.Producers.some(producer => 
                    producer.ProducerArtistName.toLowerCase() === search.toLowerCase() ||
                    producer.ProducerFirstName.toLowerCase() === search.toLowerCase() ||
                    producer.ProducerLastName.toLowerCase() === search.toLowerCase());
            } else if (attribute === 'TrackNumber') {
                found = album.Songs.some(song => song.TrackNumber.toString() === search);
            } else if (attribute === 'Duration') {
                found = album.Songs.some(song => song.Duration.toString() === search);
            } else if (attribute === 'ReleaseYear') {
                found = album.ReleaseYear.toString() === search;
            } else {
                const valueToCheck = album[attribute] ? album[attribute].toString().toLowerCase() : '';
                found = valueToCheck.includes(search.toLowerCase());
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