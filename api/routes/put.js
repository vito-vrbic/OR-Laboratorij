/* Imports. */
const express = require('express');
const db = require('../db');
const wrap_response = require('../wrapper');

const router = express.Router();

function convert_duration_to_seconds(duration) {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + seconds;
}

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

/* PUT request for updating an existing album along with related songs, producers, and performers. */
router.put('/albums/:id', async (req, res) => {
    const id = req.params.id; // Get the album id from the URL parameter
    const {
        album_title, 
        release_year, 
        number_of_singles, 
        genre_name, 
        style_name, 
        rlabel_name, 
        country_name, 
        type_name,
        songs,         // List of songs to update/insert
        performers,    // List of performers to update/insert
        producers      // List of producers to update/insert
    } = req.body;

    // Validate input data
    if (!album_title || !release_year || !genre_name || !style_name || !rlabel_name || !country_name || !type_name) {
        return res.status(400).json(wrap_response('error', 'Album title, release year, and other required fields are necessary.'));
    }

    try {
        // Check if the album exists
        const albumCheckQuery = `SELECT * FROM album WHERE album_id = $1;`;
        const albumCheckResult = await db.query(albumCheckQuery, [id]);

        if (albumCheckResult.rows.length === 0) {
            return res.status(404).json(wrap_response('error', 'Album not found.'));
        }

        // Check and insert genre if necessary
        const genreCheckQuery = `SELECT * FROM genre WHERE genre_name = $1;`;
        const genreCheckResult = await db.query(genreCheckQuery, [genre_name]);

        if (genreCheckResult.rows.length === 0) {
            const genreInsertQuery = `INSERT INTO genre (genre_name) VALUES ($1);`;
            await db.query(genreInsertQuery, [genre_name]);
        }

        // Check and insert style if necessary
        const styleCheckQuery = `SELECT * FROM style WHERE style_name = $1;`;
        const styleCheckResult = await db.query(styleCheckQuery, [style_name]);

        if (styleCheckResult.rows.length === 0) {
            const styleInsertQuery = `INSERT INTO style (style_name) VALUES ($1);`;
            await db.query(styleInsertQuery, [style_name]);
        }

        // Check and insert record label if necessary
        const rlabelCheckQuery = `SELECT * FROM rlabel WHERE rlabel_name = $1;`;
        const rlabelCheckResult = await db.query(rlabelCheckQuery, [rlabel_name]);

        if (rlabelCheckResult.rows.length === 0) {
            const rlabelInsertQuery = `INSERT INTO rlabel (rlabel_name) VALUES ($1);`;
            await db.query(rlabelInsertQuery, [rlabel_name]);
        }

        // Check and insert country if necessary
        const countryCheckQuery = `SELECT * FROM country WHERE country_name = $1;`;
        const countryCheckResult = await db.query(countryCheckQuery, [country_name]);

        if (countryCheckResult.rows.length === 0) {
            const countryInsertQuery = `INSERT INTO country (country_name) VALUES ($1);`;
            await db.query(countryInsertQuery, [country_name]);
        }

        // Check and insert type if necessary
        const typeCheckQuery = `SELECT * FROM type WHERE type_name = $1;`;
        const typeCheckResult = await db.query(typeCheckQuery, [type_name]);

        if (typeCheckResult.rows.length === 0) {
            const typeInsertQuery = `INSERT INTO type (type_name) VALUES ($1);`;
            await db.query(typeInsertQuery, [type_name]);
        }

        // Update the album in the album table with the new or existing values
        const albumUpdateQuery = `
            UPDATE album
            SET album_title = $1, 
                release_year = $2, 
                number_of_singles = $3, 
                genre_name = $4, 
                style_name = $5, 
                rlabel_name = $6, 
                country_name = $7, 
                type_name = $8
            WHERE album_id = $9;
        `;
        
        await db.query(albumUpdateQuery, [
            album_title, 
            release_year, 
            number_of_singles, 
            genre_name, 
            style_name, 
            rlabel_name, 
            country_name, 
            type_name, 
            id
        ]);

        // DELETE songs that are not in the request
        if (songs && songs.length > 0) {
            const songTitles = songs.map(song => song.song_title);
            await db.query(`
                DELETE FROM song WHERE album_id = $1 AND song_title NOT IN ($2);
            `, [id, songTitles]);

            // Insert or update songs in the album
            for (const song of songs) {
                const songCheckQuery = `SELECT * FROM song WHERE album_id = $1 AND song_title = $2;`;
                const songCheckResult = await db.query(songCheckQuery, [id, song.song_title]);

                if (songCheckResult.rows.length === 0) {
                    const songInsertQuery = `
                        INSERT INTO song (album_id, song_title, track_number, duration)
                        VALUES ($1, $2, $3, $4);
                    `;
                    await db.query(songInsertQuery, [id, song.song_title, song.track_number, convert_duration_to_seconds(song.duration)]);
                }
            }
        }

        // DELETE performers that are not in the request
        if (performers && performers.length > 0) {
            const performerNames = performers.map(p => p.artist_name); // Fix: extract artist_name from the objects
            await db.query(`
                DELETE FROM performed_by WHERE album_id = $1 AND artist_name NOT IN ($2);
            `, [id, performerNames]);

            // Optionally, insert new performers
            for (const performer of performers) {
                await check_and_insert_artist(performer.artist_name); // Fix: pass artist_name, not object
                const performerCheckQuery = `SELECT * FROM performed_by WHERE album_id = $1 AND artist_name = $2;`;
                const performerCheckResult = await db.query(performerCheckQuery, [id, performer.artist_name]);

                if (performerCheckResult.rows.length === 0) {
                    const performerInsertQuery = `
                        INSERT INTO performed_by (album_id, artist_name)
                        VALUES ($1, $2);
                    `;
                    await db.query(performerInsertQuery, [id, performer.artist_name]);
                }
            }
        }

        // DELETE producers that are not in the request
        if (producers && producers.length > 0) {
            const producerNames = producers.map(p => p.artist_name); // Fix: extract artist_name from the objects
            await db.query(`
                DELETE FROM produced_by WHERE album_id = $1 AND artist_name NOT IN ($2);
            `, [id, producerNames]);

            // Optionally, insert new producers
            for (const producer of producers) {
                await check_and_insert_artist(producer.artist_name); // Fix: pass artist_name, not object
                const producerCheckQuery = `SELECT * FROM produced_by WHERE album_id = $1 AND artist_name = $2;`;
                const producerCheckResult = await db.query(producerCheckQuery, [id, producer.artist_name]);

                if (producerCheckResult.rows.length === 0) {
                    const producerInsertQuery = `
                        INSERT INTO produced_by (album_id, artist_name)
                        VALUES ($1, $2);
                    `;
                    await db.query(producerInsertQuery, [id, producer.artist_name]);
                }
            }
        }

        res.status(200).json(wrap_response('success', 'Album and related data updated successfully.', { id }));
    } catch (err) {
        console.error('Error updating album and related data:', err);
        res.status(500).json(wrap_response('error', 'Error updating album and related data.'));
    }
});

/* Export. */
module.exports = router;
