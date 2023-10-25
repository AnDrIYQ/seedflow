const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./config'); // Шлях до вашого конфігураційного файлу
const User = require('./models/User'); // Шлях до моделі користувача

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

module.exports = function (passport) {
    passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
        User.findById(jwtPayload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch(error => {
                return done(error, false);
            });
    }));
};
