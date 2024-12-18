/* Imports. */
const express = require('express');
const body_parser = require('body-parser');
const get_routes = require('./routes/get');
const post_routes = require('./routes/post');
const put_routes = require('./routes/put');
const delete_routes = require('./routes/delete');

/* Using express, parsing body. */
const app = express();
app.use(body_parser.json());

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