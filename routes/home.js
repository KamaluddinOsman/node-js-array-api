const express   = require('express');
const router    = express.Router();

// route for the main index
// will no longer works after adding express.static()
router.get('/' , (request, response) => {
    response.send('Main index');
});

module.exports = router;