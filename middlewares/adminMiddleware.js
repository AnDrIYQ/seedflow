module.exports = function(request, response, next) {
    if (request.user.role === 'admin') {
        next()
    } else {
        response.status(403).send('Forbidden');
    }
};