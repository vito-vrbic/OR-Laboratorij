/* Imports. */
const express = require('express');
const db = require('../db');
const wrap_response = require('../wrapper');

const router = express.Router();

// DELETE endpoint to delete album and related data (songs, performers, producers)
router.delete('/albums/:album_id', async (req, res) => {
    const albumId = req.params.album_id; // Get the album ID from the URL parameter

    // Start a transaction to ensure all deletions happen atomically
    try {
        // Start transaction
        await db.query('BEGIN'); 

        // Check if the album exists
        const albumCheckQuery = `SELECT * FROM album WHERE album_id = $1;`;
        const albumCheckResult = await db.query(albumCheckQuery, [albumId]);

        if (albumCheckResult.rows.length === 0) {
            // If album doesn't exist, return 404 error
            return res.status(404).json(wrap_response('error', 'Album not found.'));
        }

        // Delete songs associated with the album
        const deleteSongsQuery = `DELETE FROM song WHERE album_id = $1;`;
        await db.query(deleteSongsQuery, [albumId]);

        // Delete performers associated with the album
        const deletePerformersQuery = `DELETE FROM performed_by WHERE album_id = $1;`;
        await db.query(deletePerformersQuery, [albumId]);

        // Delete producers associated with the album
        const deleteProducersQuery = `DELETE FROM produced_by WHERE album_id = $1;`;
        await db.query(deleteProducersQuery, [albumId]);

        // Finally, delete the album itself
        const deleteAlbumQuery = `DELETE FROM album WHERE album_id = $1;`;
        await db.query(deleteAlbumQuery, [albumId]);

        // Commit the transaction if all operations are successful
        await db.query('COMMIT');
        
        res.status(200).json(wrap_response('success', 'Album and related data deleted successfully.'));
    } catch (err) {
        // Rollback transaction in case of an error
        await db.query('ROLLBACK'); 
        console.error('Error deleting album and related data:', err);
        res.status(500).json(wrap_response('error', 'Error deleting album and related data.'));
    }
});

/* Export. */
module.exports = router;
