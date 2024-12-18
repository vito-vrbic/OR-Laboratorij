/* Imports. */
const express = require('express');
const body_parser = require('body-parser');
const get_routes = require('./routes/get');
const post_routes = require('./routes/post');
const put_routes = require('./routes/put');
const delete_routes = require('./routes/delete');

/* Using express, parsing body. */
const app = express();

/* Custom error handling for JSON parsing */
app.use(body_parser.json({
    strict: true,  // Ensures that the JSON must be valid
    type: 'application/json' // Ensures only requests with Content-Type 'application/json' are parsed
}));

// Middleware to catch and handle JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Invalid JSON format' });
    }
    next(err); // If not a JSON error, pass it to the next middleware
});

/* Using the routes. */
app.use(get_routes);
app.use(post_routes);
app.use(put_routes);
app.use(delete_routes);

/* Starting the server. */
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});