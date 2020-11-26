function customMiddleware(request, response, next) {
    //here you can right your middleware logic
    console.log('this console log came from custom middleware');
    next();
}

module.exports = customMiddleware;