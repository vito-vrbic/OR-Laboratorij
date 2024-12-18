/* Imports. */
const express = require('express');
const db = require('../db');
const wrap_response = require('../wrapper');

const router = express.Router();

/* Function to convert mm:ss string into total seconds */
function convert_duration_to_seconds(duration) {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + seconds;
}

/* Function to check and insert the artist if it doesn't exist in the person table */
async function check_and_insert_artist(artistName) {
    const artistCheckQuery = `
        SELECT artist_name FROM person WHERE artist_name = $1;
    `;
    const artistCheckResult = await db.query(artistCheckQuery, [artistName]);
    
    // If the artist doesn't exist, insert them
    if (artistCheckResult.rows.length === 0) {
        const [firstName, lastName] = artistName.split(' ');
        const artistInsertQuery = `
            INSERT INTO person (artist_name, first_name, last_name)
            VALUES ($1, $2, $3);
        `;
        await db.query(artistInsertQuery, [artistName, firstName || '', lastName || '']);
    }
}

/* POST Function */
router.post('/albums', async (req, res) => {
    const {
        album_title, 
        release_year, 
        number_of_singles, 
        genre_name, 
        style_name, 
        rlabel_name, 
        country_name, 
        type_name, 
        songs = [], 
        producers = [], 
        performers = []
    } = req.body;

    // Validate input data
    if (!album_title || !release_year || !songs.length || !producers.length || !performers.length) {
        return res.status(400).json(wrap_response('error', 'All data about album, songs, producers, and performers is necessary.'));
    }

    // Track changes to undo them in case of error
    const changesMade = {
        album_id: null,
        genre_name,
        style_name,
        rlabel_name,
        country_name,
        type_name,
        song_titles: [],
        producer_names: [],
        performer_names: []
    };

    try {
        // Check if the genre_name exists in the genre table
        const genreCheckQuery = `
            SELECT genre_name FROM genre WHERE genre_name = $1;
        `;
        const genreCheckResult = await db.query(genreCheckQuery, [genre_name]);
        
        if (genreCheckResult.rows.length === 0) {
            const genreInsertQuery = `
                INSERT INTO genre (genre_name) VALUES ($1);
            `;
            await db.query(genreInsertQuery, [genre_name]);
        }

        // Check if the style_name exists in the style table
        const styleCheckQuery = `
            SELECT style_name FROM style WHERE style_name = $1;
        `;
        const styleCheckResult = await db.query(styleCheckQuery, [style_name]);

        if (styleCheckResult.rows.length === 0) {
            const styleInsertQuery = `
                INSERT INTO style (style_name) VALUES ($1);
            `;
            await db.query(styleInsertQuery, [style_name]);
        }

        // Check if the rlabel_name exists in the rlabel table
        const rlabelCheckQuery = `
            SELECT rlabel_name FROM rlabel WHERE rlabel_name = $1;
        `;
        const rlabelCheckResult = await db.query(rlabelCheckQuery, [rlabel_name]);

        if (rlabelCheckResult.rows.length === 0) {
            const rlabelInsertQuery = `
                INSERT INTO rlabel (rlabel_name) VALUES ($1);
            `;
            await db.query(rlabelInsertQuery, [rlabel_name]);
        }

        // Check if the country_name exists in the country table
        const countryCheckQuery = `
            SELECT country_name FROM country WHERE country_name = $1;
        `;
        const countryCheckResult = await db.query(countryCheckQuery, [country_name]);

        if (countryCheckResult.rows.length === 0) {
            const countryInsertQuery = `
                INSERT INTO country (country_name) VALUES ($1);
            `;
            await db.query(countryInsertQuery, [country_name]);
        }

        // Check if the type_name exists in the type table
        const typeCheckQuery = `
            SELECT type_name FROM type WHERE type_name = $1;
        `;
        const typeCheckResult = await db.query(typeCheckQuery, [type_name]);

        if (typeCheckResult.rows.length === 0) {
            const typeInsertQuery = `
                INSERT INTO type (type_name) VALUES ($1);
            `;
            await db.query(typeInsertQuery, [type_name]);
        }

        // Insert the album into the album table
        const albumInsertQuery = `
            INSERT INTO album (
                album_title, 
                release_year, 
                number_of_singles, 
                genre_name, 
                style_name, 
                rlabel_name, 
                country_name, 
                type_name
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING album_id;
        `;
        
        const albumResult = await db.query(albumInsertQuery, [
            album_title, 
            release_year, 
            number_of_singles, 
            genre_name, 
            style_name, 
            rlabel_name, 
            country_name, 
            type_name
        ]);

        changesMade.album_id = albumResult.rows[0].album_id;

        // Insert songs into the database
        const songInsertPromises = songs.map(song => {
            const durationInSeconds = convert_duration_to_seconds(song.duration);
            const songInsertQuery = `
                INSERT INTO song (song_title, track_number, duration, album_id)
                VALUES ($1, $2, $3, $4);
            `;
            changesMade.song_titles.push(song.song_title); // Track inserted song titles
            return db.query(songInsertQuery, [song.song_title, song.track_number, durationInSeconds, changesMade.album_id]);
        });

        // Check and insert producers into the database
        const producerInsertPromises = producers.map(async producer => {
            await check_and_insert_artist(producer.artist_name); 
            const producerInsertQuery = `
                INSERT INTO produced_by (album_id, artist_name)
                VALUES ($1, $2);
            `;
            changesMade.producer_names.push(producer.artist_name); // Track inserted producer names
            return db.query(producerInsertQuery, [changesMade.album_id, producer.artist_name]);
        });

        // Check and insert performers into the database
        const performerInsertPromises = performers.map(async performer => {
            await check_and_insert_artist(performer.artist_name); 
            const performerInsertQuery = `
                INSERT INTO performed_by (album_id, artist_name)
                VALUES ($1, $2);
            `;
            changesMade.performer_names.push(performer.artist_name); // Track inserted performer names
            return db.query(performerInsertQuery, [changesMade.album_id, performer.artist_name]);
        });

        // Wait for all inserts to complete
        await Promise.all([
            ...songInsertPromises,
            ...producerInsertPromises,
            ...performerInsertPromises
        ]);

        res.status(201).json(wrap_response('success', 'Album and related data inserted successfully.', { album_id: changesMade.album_id }));
    } catch (err) {
        console.error('Error inserting album with related data:', err);

        // Rollback any changes made before the error
        try {
            // Rollback songs
            for (let songTitle of changesMade.song_titles) {
                const deleteSongQuery = `DELETE FROM song WHERE song_title = $1;`;
                await db.query(deleteSongQuery, [songTitle]);
            }

            // Rollback producers
            for (let producerName of changesMade.producer_names) {
                const deleteProducerQuery = `DELETE FROM produced_by WHERE album_id = $1 AND artist_name = $2;`;
                await db.query(deleteProducerQuery, [changesMade.album_id, producerName]);
            }

            // Rollback performers
            for (let performerName of changesMade.performer_names) {
                const deletePerformerQuery = `DELETE FROM performed_by WHERE album_id = $1 AND artist_name = $2;`;
                await db.query(deletePerformerQuery, [changesMade.album_id, performerName]);
            }

            // Rollback album
            const deleteAlbumQuery = `DELETE FROM album WHERE album_id = $1;`;
            await db.query(deleteAlbumQuery, [changesMade.album_id]);

            // Optionally rollback genre, style, rlabel, country, type if needed
            res.status(500).json(wrap_response('error', 'Error inserting album with related data, changes rolled back.', []));
        } catch (rollbackError) {
            console.error('Error during rollback:', rollbackError);
            res.status(500).json(wrap_response('error', 'Critical error during rollback, manual intervention required.', []));
        }
    }
});

/* Export. */
module.exports = router;
