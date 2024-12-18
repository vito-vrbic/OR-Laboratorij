/* Imports. */
const express = require('express');
const db = require('../db');
const wrap_response = require('../wrapper');

const router = express.Router();

/* GET request for the entire collection of albums, including detailed info about songs, producers, and performers. */
router.get('/albums', async (req, res) => {
    try {
        const albumsQuery = `
            SELECT 
                a.album_id, 
                a.album_title, 
                a.release_year, 
                a.number_of_singles, 
                g.genre_name AS genre, 
                s.style_name AS style, 
                r.rlabel_name AS release_label, 
                c.country_name AS country, 
                t.type_name AS type
            FROM album a
            LEFT JOIN genre g ON a.genre_name = g.genre_name
            LEFT JOIN style s ON a.style_name = s.style_name
            LEFT JOIN rlabel r ON a.rlabel_name = r.rlabel_name
            LEFT JOIN country c ON a.country_name = c.country_name
            LEFT JOIN type t ON a.type_name = t.type_name;
        `;

        const albumsResult = await db.query(albumsQuery);

        if (albumsResult.rows.length === 0) {
            return res.json(wrap_response('success', 'No albums found in the database.', []));
        }

        const albumIds = albumsResult.rows.map(album => album.album_id);

        const songsQuery = `
            SELECT 
                song_title, 
                track_number, 
                duration, 
                album_id
            FROM song
            WHERE album_id = ANY($1::int[]);
        `;

        const producersQuery = `
            SELECT 
                pb.album_id, 
                p.artist_name, 
                p.first_name, 
                p.last_name
            FROM produced_by pb
            JOIN person p ON pb.artist_name = p.artist_name
            WHERE pb.album_id = ANY($1::int[]);
        `;

        const performersQuery = `
            SELECT 
                pb.album_id, 
                p.artist_name, 
                p.first_name, 
                p.last_name
            FROM performed_by pb
            JOIN person p ON pb.artist_name = p.artist_name
            WHERE pb.album_id = ANY($1::int[]);
        `;

        const [songsResult, producersResult, performersResult] = await Promise.all([
            db.query(songsQuery, [albumIds]),
            db.query(producersQuery, [albumIds]),
            db.query(performersQuery, [albumIds])
        ]);

        const songsMap = songsResult.rows.reduce((map, song) => {
            if (!map[song.album_id]) map[song.album_id] = [];
            map[song.album_id].push({
                title: song.song_title,
                track_number: song.track_number,
                duration: song.duration
            });
            return map;
        }, {});

        const producersMap = producersResult.rows.reduce((map, producer) => {
            if (!map[producer.album_id]) map[producer.album_id] = [];
            map[producer.album_id].push({
                artist_name: producer.artist_name,
                first_name: producer.first_name,
                last_name: producer.last_name
            });
            return map;
        }, {});

        const performersMap = performersResult.rows.reduce((map, performer) => {
            if (!map[performer.album_id]) map[performer.album_id] = [];
            map[performer.album_id].push({
                artist_name: performer.artist_name,
                first_name: performer.first_name,
                last_name: performer.last_name
            });
            return map;
        }, {});

        const detailedAlbums = albumsResult.rows.map(album => ({
            ...album,
            songs: songsMap[album.album_id] || [],
            producers: producersMap[album.album_id] || [],
            performers: performersMap[album.album_id] || []
        }));

        res.json(wrap_response('success', 'Albums fetched successfully.', detailedAlbums));
    } catch (err) {
        res.status(500).json(wrap_response('error', 'Failed to fetch albums.', []));
    }
});

/* GET request for all the data about an album with a certain id {:id}. */
router.get('/albums/:id', async (req, res) => {
    try {
        const albumId = req.params.id;

        const albumQuery = `
            SELECT 
                a.album_id, 
                a.album_title, 
                a.release_year, 
                a.number_of_singles, 
                g.genre_name AS genre, 
                s.style_name AS style, 
                r.rlabel_name AS release_label, 
                c.country_name AS country, 
                t.type_name AS type
            FROM album a
            LEFT JOIN genre g ON a.genre_name = g.genre_name
            LEFT JOIN style s ON a.style_name = s.style_name
            LEFT JOIN rlabel r ON a.rlabel_name = r.rlabel_name
            LEFT JOIN country c ON a.country_name = c.country_name
            LEFT JOIN type t ON a.type_name = t.type_name
            WHERE a.album_id = $1;
        `;

        const albumResult = await db.query(albumQuery, [albumId]);

        if (albumResult.rows.length === 0) {
            return res.status(404).json(wrap_response('error', 'Album not found.', null));
        }

        const songsQuery = `
            SELECT 
                song_title, 
                track_number, 
                duration
            FROM song
            WHERE album_id = $1
            ORDER BY track_number;
        `;

        const producersQuery = `
            SELECT 
                p.artist_name, 
                p.first_name, 
                p.last_name
            FROM produced_by pb
            JOIN person p ON pb.artist_name = p.artist_name
            WHERE pb.album_id = $1;
        `;

        const performersQuery = `
            SELECT 
                p.artist_name, 
                p.first_name, 
                p.last_name
            FROM performed_by pb
            JOIN person p ON pb.artist_name = p.artist_name
            WHERE pb.album_id = $1;
        `;

        const [songsResult, producersResult, performersResult] = await Promise.all([
            db.query(songsQuery, [albumId]),
            db.query(producersQuery, [albumId]),
            db.query(performersQuery, [albumId])
        ]);

        const album = {
            ...albumResult.rows[0],
            songs: songsResult.rows,
            producers: producersResult.rows,
            performers: performersResult.rows
        };

        res.json(wrap_response('success', 'Album fetched successfully.', album));
    } catch (err) {
        res.status(500).json(wrap_response('error', 'Failed to fetch album.', []));
    }
});

/* GET request for all songs from an album with a certain id {:id}. */
router.get('/albums/:id/songs', async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
            SELECT 
                song_title, 
                track_number, 
                duration
            FROM song
            WHERE album_id = $1
            ORDER BY track_number;
        `;

        const result = await db.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json(wrap_response('error', 'No songs found for the specified album.', null));
        }

        res.json(wrap_response('success', 'Songs fetched successfully.', result.rows));
    } catch (err) {
        res.status(500).json(wrap_response('error', 'Failed to fetch songs.', []));
    }
});

/* GET request for a song with a certain number {:num} from an album with a certain id {:id}. */
router.get('/albums/:id/songs/:num', async (req, res) => {
    try {
        const { id, num } = req.params;

        const query = `
            SELECT 
                song_title, 
                track_number, 
                duration
            FROM song
            WHERE album_id = $1 AND track_number = $2;
        `;

        const result = await db.query(query, [id, num]);

        if (result.rows.length === 0) {
            return res.status(404).json(wrap_response('error', 'Song not found in the specified album.', null));
        }

        res.json(wrap_response('success', 'Song fetched successfully.', result.rows[0]));
    } catch (err) {
        res.status(500).json(wrap_response('error', 'Failed to fetch song.', []));
    }
});

/* GET request for all the data about the producers of an album with a certain id {:id}. */
router.get('/albums/:id/producers', async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
            SELECT 
                p.artist_name, 
                p.first_name, 
                p.last_name
            FROM produced_by pb
            JOIN person p ON pb.artist_name = p.artist_name
            WHERE pb.album_id = $1;
        `;

        const result = await db.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json(wrap_response('error', 'No producers found for the specified album.', null));
        }

        res.json(wrap_response('success', 'Producers fetched successfully.', result.rows));
    } catch (err) {
        res.status(500).json(wrap_response('error', 'Failed to fetch producers.', []));
    }
});

/* GET request for all the data about the performers of an album with a certain id {:id}. */
router.get('/albums/:id/performers', async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
            SELECT 
                p.artist_name, 
                p.first_name, 
                p.last_name
            FROM performed_by pb
            JOIN person p ON pb.artist_name = p.artist_name
            WHERE pb.album_id = $1;
        `;

        const result = await db.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json(wrap_response('error', 'No performers found for the specified album.', null));
        }

        res.json(wrap_response('success', 'Performers fetched successfully.', result.rows));
    } catch (err) {
        res.status(500).json(wrap_response('error', 'Failed to fetch performers.', []));
    }
});

/* Export. */
module.exports = router;
