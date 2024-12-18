/* Custom wrapper for returning data. */
function wrap_response(status, message, data = null) {
    return {
        status,          // "success" or "error"
        message,         // A short description of the outcome
        data,            // The data being returned (if any)
        timestamp: new Date().toISOString() // Timestamp of the response
    };
}

module.exports = wrap_response;