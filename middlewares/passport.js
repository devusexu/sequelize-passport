const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

async function verify(email, password, done) {
    try {
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return done(null, false, { message: 'Incorrect credentials' });
        }

        if (! await bcrypt.compare(password, user.password)) {
            return done(null, false, { message: 'Incorrect credentials' });
        }

        return done(null, user);
    } catch (error) {
        done(error);
    }
}

passport.use(new LocalStrategy({ usernameField: 'email' }, verify));
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        return done(null, user);    
    } catch (error) {
        done(error);     
    }
});

module.exports = passport;